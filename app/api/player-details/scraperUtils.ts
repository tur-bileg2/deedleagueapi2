import * as cheerio from 'cheerio';
import { Player, GameLog, PlayerSummaryStats, PlayerAverageStats } from '../../types';

// --- Selector Constants ---
export const SELECTORS = {
    // Basic information
    NAME: 'h1.player-title.pltitlebigger',
    IMAGE: 'img.plfacejpg',
    PLAYER_INFO_BOX: 'div.player-left div.player-details',
    POSITION: '.pld_pos',
    HEIGHT: '.pld_height',
    AGE: '.pld_born',
    NATIONALITY: '.pld_nationality',
    
    // Stats tables
    STATS_CONTAINER: 'div.dvgamesstats',
    GAME_LOG_TABLE: 'table.my_Title:has(tr.my_Headers td:contains("Details"))',
    GAME_LOG_ROWS: 'tr.my_pStats1, tr.my_pStats2',
    SUMMARY_TABLE: 'div.dvgamesstats table.my_Title:has(tr.my_Headers td:contains("Summary"))',
    AVERAGE_TABLE: 'div.dvgamesstats table.my_Title:has(tr.my_Headers td:contains("AVERAGES"))',
    SUMMARY_ROW: 'tr.my_pStats2',
    AVERAGE_ROW: 'tr.my_pStats1',
    ADVANCED_STATS_TABLE: 'table[id^="offbox"]'
};

// --- Helper Functions ---

/**
 * Safely get text content with trimming and null checks
 */
export function safeGetText(element: cheerio.Cheerio<any> | undefined): string {
    if (!element || element.length === 0) return '';
    return element.text().trim();
}

/**
 * Safely get an attribute with null checks
 */
export function safeGetAttr(element: cheerio.Cheerio<any> | undefined, attr: string): string | undefined {
    if (!element || element.length === 0) return undefined;
    const value = element.attr(attr);
    return value ? value.trim() : undefined;
}

/**
 * Extract value after a label (e.g., "Position: Guard" -> "Guard")
 */
export function extractValueAfterColon(text: string): string {
    const parts = text.split(':');
    return parts.length > 1 ? parts.slice(1).join(':').trim() : text.trim();
}

/**
 * Parse a string to a number, returning undefined if NaN
 */
export function parseNumberSafe(value: string): number | undefined {
    if (!value) return undefined;
    const num = parseFloat(value);
    return isNaN(num) ? undefined : num;
}

// --- Individual Scraping Functions ---

/**
 * Scrape basic player information
 */
export function scrapeBasicInfo($: cheerio.CheerioAPI): Pick<Partial<Player>, 'name' | 'position' | 'height' | 'age' | 'nationality' | 'imageUrl'> {
    const result: ReturnType<typeof scrapeBasicInfo> = {};
    
    try {
        // Name - Most reliable as it's a page title
        const nameElement = $(SELECTORS.NAME).first();
        if (nameElement.length > 0) {
            const rawName = safeGetText(nameElement);
            result.name = rawName.replace(/ basketball profile/i, '').trim();
        }
        
        // Image URL
        const imageElement = $(SELECTORS.IMAGE);
        if (imageElement.length > 0) {
            const imageUrl = safeGetAttr(imageElement, 'src');
            if (imageUrl) {
                // Make URL absolute if it's not already
                result.imageUrl = imageUrl.startsWith('http') ? imageUrl : 
                                 `https://www.asia-basket.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
            }
        }
        
        // Position, height, age, nationality from player details box
        const infoBox = $(SELECTORS.PLAYER_INFO_BOX);
        
        const position = infoBox.find(SELECTORS.POSITION);
        if (position.length > 0) {
            result.position = extractValueAfterColon(safeGetText(position));
        }
        
        const height = infoBox.find(SELECTORS.HEIGHT);
        if (height.length > 0) {
            result.height = extractValueAfterColon(safeGetText(height));
        }
        
        const age = infoBox.find(SELECTORS.AGE);
        if (age.length > 0) {
            result.age = extractValueAfterColon(safeGetText(age));
        }
        
        const nationality = infoBox.find(SELECTORS.NATIONALITY);
        if (nationality.length > 0) {
            result.nationality = extractValueAfterColon(safeGetText(nationality));
        }
    } catch (error) {
        console.error("Error scraping basic info:", error);
    }
    
    return result;
}

/**
 * Scrape career history
 */
export function scrapeCareerHistory($: cheerio.CheerioAPI): Pick<Partial<Player>, 'careerHistory'> {
    const career: { year: string; team: string; league: string }[] = [];
    
    try {
        // This is a placeholder - update with the actual career history table selector
        $('table.career-history, table.team-history').find('tbody tr').each((_, row) => {
            const cells = $(row).find('td');
            if (cells.length >= 2) {
                const entry = {
                    year: safeGetText(cells.eq(0)),
                    team: safeGetText(cells.eq(1)),
                    league: cells.length > 2 ? safeGetText(cells.eq(2)) : ''
                };
                if (entry.year && entry.team) { // Only add if we have at least year and team
                    career.push(entry);
                }
            }
        });
    } catch (error) {
        console.error("Error scraping career history:", error);
    }
    
    return { careerHistory: career.length > 0 ? career : undefined };
}

/**
 * Scrape game logs
 */
export function scrapeGameLogs($: cheerio.CheerioAPI): Pick<Partial<Player>, 'gameLogs'> {
    const gameLogs: GameLog[] = [];
    
    try {
        $(SELECTORS.GAME_LOG_TABLE).find(SELECTORS.GAME_LOG_ROWS).each((_, row) => {
            const cells = $(row).find('td');
            if (cells.length >= 18) {
                const resultLink = cells.eq(3).find('a');
                const log: GameLog = {
                    date: safeGetText(cells.eq(0)),
                    team: safeGetText(cells.eq(1)),
                    opponent: safeGetText(cells.eq(2)),
                    result: safeGetText(resultLink),
                    boxScoreUrl: safeGetAttr(resultLink, 'href'),
                    min: safeGetText(cells.eq(4)),
                    pts: safeGetText(cells.eq(5)),
                    fgp2: safeGetText(cells.eq(6)),
                    fgp3: safeGetText(cells.eq(7)),
                    ft: safeGetText(cells.eq(8)),
                    rebOff: safeGetText(cells.eq(9)),
                    rebDef: safeGetText(cells.eq(10)),
                    rebTotal: safeGetText(cells.eq(11)),
                    ast: safeGetText(cells.eq(12)),
                    pf: safeGetText(cells.eq(13)),
                    blk: safeGetText(cells.eq(14)),
                    stl: safeGetText(cells.eq(15)),
                    to: safeGetText(cells.eq(16)),
                    rank: safeGetText(cells.eq(17))
                };
                gameLogs.push(log);
            }
        });
    } catch (error) {
        console.error("Error scraping game logs:", error);
    }
    
    return { gameLogs: gameLogs.length > 0 ? gameLogs : undefined };
}

/**
 * Scrape summary and average stats
 */
export function scrapeSummaryAndAverageStats($: cheerio.CheerioAPI): Pick<Partial<Player>, 'summaryStats' | 'averageStats'> {
    const summaryStats: PlayerSummaryStats[] = [];
    const averageStats: PlayerAverageStats[] = [];
    
    try {
        // Summary stats
        $(SELECTORS.SUMMARY_TABLE).find(SELECTORS.SUMMARY_ROW).each((_, row) => {
            const cells = $(row).find('td');
            if (cells.length >= 16) {
                summaryStats.push({
                    team: safeGetText(cells.eq(0)),
                    games: safeGetText(cells.eq(1)),
                    min: safeGetText(cells.eq(2)),
                    pts: safeGetText(cells.eq(3)),
                    fgp2: safeGetText(cells.eq(4)),
                    fgp3: safeGetText(cells.eq(5)),
                    ft: safeGetText(cells.eq(6)),
                    rebOff: safeGetText(cells.eq(7)),
                    rebDef: safeGetText(cells.eq(8)),
                    rebTotal: safeGetText(cells.eq(9)),
                    ast: safeGetText(cells.eq(10)),
                    pf: safeGetText(cells.eq(11)),
                    blk: safeGetText(cells.eq(12)),
                    stl: safeGetText(cells.eq(13)),
                    to: safeGetText(cells.eq(14)),
                    rank: safeGetText(cells.eq(15))
                });
            }
        });
        
        // Average stats
        $(SELECTORS.AVERAGE_TABLE).find(SELECTORS.AVERAGE_ROW).each((_, row) => {
            const cells = $(row).find('td');
            if (cells.length >= 16) {
                averageStats.push({
                    team: safeGetText(cells.eq(0)),
                    games: safeGetText(cells.eq(1)),
                    min: safeGetText(cells.eq(2)),
                    pts: safeGetText(cells.eq(3)), // PPG
                    fgp2Pct: safeGetText(cells.eq(4)),
                    fgp3Pct: safeGetText(cells.eq(5)),
                    ftPct: safeGetText(cells.eq(6)),
                    rebOff: safeGetText(cells.eq(7)),
                    rebDef: safeGetText(cells.eq(8)),
                    rebTotal: safeGetText(cells.eq(9)),
                    ast: safeGetText(cells.eq(10)),
                    pf: safeGetText(cells.eq(11)),
                    blk: safeGetText(cells.eq(12)),
                    stl: safeGetText(cells.eq(13)),
                    to: safeGetText(cells.eq(14)),
                    rank: safeGetText(cells.eq(15))
                });
            }
        });
    } catch (error) {
        console.error("Error scraping summary/average stats:", error);
    }
    
    return {
        summaryStats: summaryStats.length > 0 ? summaryStats : undefined,
        averageStats: averageStats.length > 0 ? averageStats : undefined
    };
}

/**
 * Scrape advanced stats
 */
export function scrapeAdvancedStats($: cheerio.CheerioAPI): Pick<Partial<Player>, 'advancedStats'> {
  try {
    const advancedStatsTable = $(SELECTORS.ADVANCED_STATS_TABLE);
    
    if (advancedStatsTable.length === 0) {
      // No advanced stats table found
      return {};
    }
    
    // Find the row with the actual data (class "my_pStats1" or similar)
    const dataRow = advancedStatsTable.find('tr.my_pStats1, tr.adstatscolor');
    
    if (dataRow.length === 0) {
      // No data row found
      return {};
    }
    
    const cells = dataRow.find('td');
    if (cells.length < 24) {
      // Not enough cells, something is wrong
      console.warn(`Advanced stats table found but has only ${cells.length} cells, expected 24+`);
      return {};
    }
    
    // Extract values from cells
    const advancedStats = {
      points: {
        value: parseNumberSafe(safeGetText(cells.eq(0))) || 0,
        team: parseNumberSafe(safeGetText(cells.eq(1))) || 0,
        percentage: parseNumberSafe(safeGetText(cells.eq(2))) || 0
      },
      twoPointFG: {
        made: {
          value: parseNumberSafe(safeGetText(cells.eq(3))) || 0,
          team: parseNumberSafe(safeGetText(cells.eq(4))) || 0, 
          percentage: parseNumberSafe(safeGetText(cells.eq(5))) || 0
        },
        attempted: {
          value: parseNumberSafe(safeGetText(cells.eq(6))) || 0,
          team: parseNumberSafe(safeGetText(cells.eq(7))) || 0,
          percentage: parseNumberSafe(safeGetText(cells.eq(8))) || 0
        }
      },
      threePointFG: {
        made: {
          value: parseNumberSafe(safeGetText(cells.eq(9))) || 0,
          team: parseNumberSafe(safeGetText(cells.eq(10))) || 0,
          percentage: parseNumberSafe(safeGetText(cells.eq(11))) || 0
        },
        attempted: {
          value: parseNumberSafe(safeGetText(cells.eq(12))) || 0,
          team: parseNumberSafe(safeGetText(cells.eq(13))) || 0,
          percentage: parseNumberSafe(safeGetText(cells.eq(14))) || 0
        }
      },
      freeThrows: {
        made: {
          value: parseNumberSafe(safeGetText(cells.eq(15))) || 0,
          team: parseNumberSafe(safeGetText(cells.eq(16))) || 0,
          percentage: parseNumberSafe(safeGetText(cells.eq(17))) || 0
        },
        attempted: {
          value: parseNumberSafe(safeGetText(cells.eq(18))) || 0,
          team: parseNumberSafe(safeGetText(cells.eq(19))) || 0,
          percentage: parseNumberSafe(safeGetText(cells.eq(20))) || 0
        }
      },
      assists: {
        value: parseNumberSafe(safeGetText(cells.eq(21))) || 0,
        team: parseNumberSafe(safeGetText(cells.eq(22))) || 0,
        percentage: parseNumberSafe(safeGetText(cells.eq(23))) || 0
      }
    };
    
    return { advancedStats };
  } catch (error) {
    console.error("Error scraping advanced stats:", error);
    return {};
  }
}

/**
 * Main function to combine all scraping results
 */
export function scrapePlayerDetails(html: string, playerId: string): Partial<Player> {
    const $ = cheerio.load(html);
    console.log(`Starting comprehensive scrape for player ${playerId}`);
    
    const details: Partial<Player> = {
        id: playerId,
        ...scrapeBasicInfo($),
        ...scrapeCareerHistory($),
        ...scrapeGameLogs($),
        ...scrapeSummaryAndAverageStats($),
        ...scrapeAdvancedStats($) // Add advanced stats scraping
    };
    
    console.log(`Completed scraping for player ${playerId}, found data fields: ${Object.keys(details).join(', ')}`);
    return details;
}
