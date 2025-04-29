import { NextRequest, NextResponse } from 'next/server';
import { HTTPRequest } from 'puppeteer';
import * as cheerio from 'cheerio';
import { Player } from '../../types';
import { browserService } from '../puppeteer-service';
import { verifyApiKey } from '../../middleware/api-auth';

// --- Cache Configuration ---
const CACHE_DURATION_MS = 60 * 60 * 1000; // Cache for 1 hour
let cachedData: { players: Player[], timestamp: number, expected: number, partial: boolean } | null = null;
// -------------------------

// Helper function to scrape players from HTML content (using cheerio)
function scrapePlayersFromHtml(html: string): Player[] {
    const $ = cheerio.load(html);
    const players: Player[] = [];
    $('table.dataTable#players tbody tr, table.authorstable tbody tr').each((index, element) => {
        if ($(element).find('th').length > 0 || $(element).find('td').length < 7) return;
        const nameCell = $(element).find('td:nth-child(1)');
        const nameElement = nameCell.find('a');
        const name = nameElement.text().trim();
        const profileUrl = nameElement.attr('href') || ''; // e.g., ".../player/A--Bathuyag/757769"
        if (!name || !profileUrl) return;

        // Extract ID from profileUrl (e.g., https://.../player/Name/ID)
        const urlParts = profileUrl.split('/');
        const id = urlParts[urlParts.length - 1] || `unknown-${index}`; // Gets "757769"

        const player: Player = {
            id: id, // Assigns "757769"
            name: name,
            profileUrl: profileUrl,
            team: $(element).find('td:nth-child(2)').text().trim(),
            league: $(element).find('td:nth-child(3)').text().trim(),
            nationality: $(element).find('td:nth-child(4)').text().trim(),
            age: $(element).find('td:nth-child(5)').text().trim(),
            height: $(element).find('td:nth-child(6)').text().trim(),
            position: $(element).find('td:nth-child(7)').text().trim(),
        };
        players.push(player);
    });
    return players;
}

// Helper function to get page content using Puppeteer - optimized wait
async function getPageContent(page: any): Promise<string> {
    // Wait only for the table, prioritize the specific ID if possible
    await page.waitForSelector('table#players.dataTable, table.authorstable', { timeout: 15000 });
    return await page.content();
}

export async function GET(request: NextRequest) {
    // Verify API key for external requests
    // Skip verification for internal requests from the web app
    const referer = request.headers.get('Referer') || '';
    const isInternalRequest = referer.includes(process.env.NEXT_PUBLIC_SITE_URL || '');
    
    if (!isInternalRequest) {
      const apiKeyVerification = await verifyApiKey(request);
      
      if (!apiKeyVerification.valid) {
        return NextResponse.json(
          { error: apiKeyVerification.error },
          { status: apiKeyVerification.status, headers: apiKeyVerification.headers }
        );
      }
    }

    // --- Check Cache ---
    const now = Date.now();
    if (cachedData && (now - cachedData.timestamp < CACHE_DURATION_MS)) {
        console.log(`Cache hit! Returning cached data from ${new Date(cachedData.timestamp).toISOString()}`);
        return NextResponse.json({
            players: cachedData.players,
            partial: cachedData.partial,
            expected: cachedData.expected,
            source: 'cache' // Indicate data is from cache
        });
    }
    console.log('Cache miss or expired. Proceeding with scraping...');
    // -------------------

    const baseUrl = 'https://www.asia-basket.com/Mongolia/basketball-Players.aspx';
    const allPlayers: Player[] = [];
    let totalPlayers = 0;
    const playersPerPage = 15;
    let paginationErrorOccurred = false; // Define here for broader scope

    console.log('Starting Puppeteer scraping process (Optimized v2 + Cache)...');

    try {
        // Try to get browser from service with retries
        console.log('Getting browser from service...');
        let browser;
        let retryCount = 3;
        
        while (retryCount > 0) {
            try {
                browser = await browserService.getBrowser();
                break; // Exit the loop if successful
            } catch (browserError) {
                retryCount--;
                if (retryCount <= 0) {
                    console.error('Failed to launch browser after retries:', browserError);
                    
                    // Return cached data if available
                    if (cachedData && cachedData.players.length > 0) {
                        return NextResponse.json({
                            players: cachedData.players,
                            partial: true,
                            expected: cachedData.expected,
                            source: 'cache',
                            browserError: 'Browser launch failed, using cached data'
                        });
                    }
                    
                    throw browserError;
                }
                
                console.warn(`Browser launch failed, retrying (${retryCount} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
            }
        }

        // Ensure browser is defined after the loop (should always be due to throw in catch)
        if (!browser) {
            console.error('Browser instance is unexpectedly undefined after retry loop.');
            throw new Error('Failed to initialize browser instance.');
        }

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'); 

        // *** Optimization: Block unnecessary resources ***
        await page.setRequestInterception(true);
        page.on('request', (req: HTTPRequest) => {
            if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        // --- Step 1: Navigate to the initial page and scrape ---
        console.log(`Navigating to ${baseUrl}...`);
        // Use 'domcontentloaded' initially, then wait specifically for the table
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        console.log('Initial DOM loaded.');

        let currentPageHtml = await getPageContent(page); // Wait for table
        console.log('Initial table content loaded.');
        let $ = cheerio.load(currentPageHtml);

        const firstPagePlayers = scrapePlayersFromHtml(currentPageHtml);
        allPlayers.push(...firstPagePlayers);
        console.log(`Scraped ${firstPagePlayers.length} players from page 1`);
        if (firstPagePlayers.length === 0) {
            console.warn('No players found on page 1 after waiting. Check selectors or page load state.');
            // Log snippet for debugging
            console.log('Page 1 HTML snippet (first 500):', currentPageHtml.substring(0, 500));
        }

        // Extract total players count
        const showingText = $('td[width="34%"]').first().text();
        console.log(`Extracted showing text: "${showingText}"`);
        const match = showingText.match(/of (\d+) Players/);
        if (match && match[1]) {
            totalPlayers = parseInt(match[1], 10);
            console.log(`Total players found: ${totalPlayers}`);
        } else {
            console.warn('Could not determine total number of players. Returning first page data only.');
            if (allPlayers.length === 0) {
                throw new Error('Failed to scrape initial data or determine total players.');
            }
            return NextResponse.json({ players: allPlayers });
        }

        const totalPages = Math.ceil(totalPlayers / playersPerPage);
        console.log(`Total pages to scrape: ${totalPages}`);
        if (totalPages <= 1) {
            console.log('Only one page detected, returning results.');
            return NextResponse.json({ players: allPlayers });
        }

        // --- Step 2: Loop through subsequent pages using Puppeteer's evaluate ---
        for (let currentPageNum = 2; currentPageNum <= totalPages; currentPageNum++) {
            const offset = (currentPageNum - 1) * playersPerPage;
            console.log(`Triggering update for page ${currentPageNum} (offset ${offset})...`);

            try {
                // Get the current "Showing..." text before triggering the update
                const currentShowingText = await page.$eval('td[width="34%"]', el => el.textContent?.trim() || '').catch(() => '');
                console.log(`Current showing text (before update): "${currentShowingText}"`);

                // Execute the JavaScript function directly in the page context
                await page.evaluate((off) => {
                    if (typeof (window as any).xSUBMITPage === 'function') {
                        (window as any).xSUBMITPage(off);
                    } else {
                        console.error('xSUBMITPage function not found on the page!');
                        const nextLink = document.querySelector('a[onclick*="xSUBMITPage"]');
                        if (nextLink) (nextLink as HTMLElement).click();
                        else throw new Error('Pagination mechanism not found'); // Throw if no method works
                    }
                }, offset);

                // *** Wait for content update instead of navigation ***
                console.log(`Waiting for content update for page ${currentPageNum}...`);
                await page.waitForFunction(
                    (selector, previousText) => {
                        const element = document.querySelector(selector);
                        // Wait until the text exists and is different from the previous text
                        return element && element.textContent?.trim() && element.textContent.trim() !== previousText;
                    },
                    { timeout: 20000 }, // Timeout for the update
                    'td[width="34%"]', // Selector for the "Showing..." text element
                    currentShowingText // Pass the previous text to the function
                );
                console.log(`Content update detected for page ${currentPageNum}.`);

                // Get updated HTML after content update
                currentPageHtml = await getPageContent(page); // Wait for table again
                const pagePlayers = scrapePlayersFromHtml(currentPageHtml);

                if (pagePlayers.length === 0) {
                    console.warn(`No players found on page ${currentPageNum}.`);
                    // Optionally break or continue
                }
                allPlayers.push(...pagePlayers);
                console.log(`Scraped ${pagePlayers.length} players from page ${currentPageNum}. Total now: ${allPlayers.length}`);

            } catch (pageError) {
                paginationErrorOccurred = true;
                console.error(`Error waiting for update or scraping page ${currentPageNum}:`, pageError);
                // Log current showing text if timeout occurred
                if (pageError instanceof Error && pageError.name === 'TimeoutError') {
                     const postTimeoutShowingText = await page.$eval('td[width="34%"]', el => el.textContent?.trim() || '').catch(() => 'N/A');
                     console.error(`Showing text after timeout: "${postTimeoutShowingText}"`);
                }
                console.warn(`Stopping pagination due to error on page ${currentPageNum}.`);
                break;
            }
        }

        // --- Update Cache on Success ---
        if (allPlayers.length > 0) { // Only cache if we got some data
            console.log(`Updating cache with ${allPlayers.length} players.`);
            cachedData = {
                players: allPlayers,
                timestamp: Date.now(),
                expected: totalPlayers,
                partial: paginationErrorOccurred
            };
        }

        // Close the page but not the browser
        await page.close();

        console.log(`Finished scraping. Total players scraped: ${allPlayers.length}`);
        return NextResponse.json({
            players: allPlayers,
            partial: paginationErrorOccurred,
            expected: totalPlayers,
            source: 'scrape' // Indicate data is freshly scraped
        });

    } catch (error) {
        console.error('Unhandled error during Puppeteer scraping process:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error during scraping';
        // Do not update cache on error
        return NextResponse.json(
            { error: 'Failed to complete scraping process. Please try again later.' },
            { status: 500 }
        );
    }
}
