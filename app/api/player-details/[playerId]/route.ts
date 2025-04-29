import { NextResponse, NextRequest } from 'next/server';
import { HTTPRequest } from 'puppeteer';
import { Player } from '../../../types';
import { scrapePlayerDetails, SELECTORS } from './../scraperUtils';
import { browserService } from '../../puppeteer-service';
import { verifyApiKey } from '../../../middleware/api-auth';

// --- Cache Configuration (Specific to Player Details) ---
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // Cache details for 6 hours
const playerDetailCache = new Map<string, { data: Partial<Player>, timestamp: number }>();
// -------------------------------------------------------

// Updated route handler with proper parameter handling
export async function GET(
  request: NextRequest, 
  { params }: { params: { playerId: string } }
) {
  try {
    // Fixed: directly destructure playerId from params to avoid the await issue
    const { playerId } = params;
    console.log(`Processing API request for player ID: ${playerId}`);

    // Check API authorization
    const apiKeyVerification = await verifyApiKey(request);
        
    if (!apiKeyVerification.valid) {
      console.error('API authorization failed:', apiKeyVerification.error);
      return NextResponse.json(
        { error: apiKeyVerification.error },
        { status: apiKeyVerification.status, headers: apiKeyVerification.headers }
      );
    }

    if (!playerId) {
      return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
    }

    // Check cache
    const now = Date.now();
    const cached = playerDetailCache.get(playerId);
    
    if (cached && (now - cached.timestamp < CACHE_DURATION_MS)) {
      console.log(`Returning cached data for player ID: ${playerId}`);
      return NextResponse.json({ ...cached.data, source: 'cache' });
    }

    console.log(`Cache miss for player ID: ${playerId}, proceeding with scraping...`);

    // Not in cache, perform scraping
    try {
      const browser = await browserService.getBrowser();
      console.log("Browser service initialized");
      
      const page = await browser.newPage();
      console.log("New page created");
      
      // Setup page
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      await page.setRequestInterception(true);
      
      page.on('request', (req: HTTPRequest) => {
        if (['document', 'script', 'xhr', 'fetch'].includes(req.resourceType())) {
          req.continue();
        } else {
          req.abort();
        }
      });

      // Navigate to player page
      const profileUrl = `https://www.asia-basket.com/player/_/${playerId}`;
      console.log(`Navigating to: ${profileUrl}`);
      await page.goto(profileUrl, { waitUntil: 'domcontentloaded' });
      
      try {
        await page.waitForSelector(SELECTORS.STATS_CONTAINER, { timeout: 20000 });
        console.log("Stats container found");
      } catch (waitError) {
        console.warn('Stats container not found, proceeding with available data');
      }

      // Scrape player details
      const html = await page.content();
      console.log("Page content retrieved, starting scraping");
      
      const scrapedDetails = scrapePlayerDetails(html, playerId);
      console.log(`Scraping complete for player ID: ${playerId}`);
      
      // Update cache
      if (Object.keys(scrapedDetails).length > 1) {
        playerDetailCache.set(playerId, { 
          data: scrapedDetails, 
          timestamp: now 
        });
        console.log("Cache updated with new data");
      }
      
      await page.close();
      console.log("Page closed");
      
      return NextResponse.json({ 
        ...scrapedDetails,
        source: 'scrape'
      });

    } catch (error) {
      console.error(`Error during scraping for player ${playerId}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Return a fallback response with basic player data
      const fallbackResponse = {
        id: playerId,
        name: `Player ${playerId}`,
        error: `Failed to fetch complete details: ${errorMessage}`,
        source: 'error-fallback'
      };
      
      return NextResponse.json(fallbackResponse, { status: 200 });
    }
  } catch (outerError) {
    console.error("Unhandled exception in API route:", outerError);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'An unexpected error occurred',
        details: outerError instanceof Error ? outerError.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
