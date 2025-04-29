import puppeteer, { Browser, LaunchOptions } from 'puppeteer';

// Singleton browser servicefdsafdsa
class BrowserService {
  private browser: Browser | null = null;
  private isInitializing = false;
  private initPromise: Promise<Browser> | null = null;

  async getBrowser(options: LaunchOptions = {}): Promise<Browser> {
    // Return existing browser if available
    if (this.browser) {
      return this.browser;
    }

    // Return the initialization promise if already initializingdsafdsa
    if (this.isInitializing && this.initPromise) {
      return this.initPromise;
    }

    // Initialize new browser
    this.isInitializing = true;
    try {
      this.initPromise = puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ...options
      });
      this.browser = await this.initPromise;
      
      // Handle disconnection
      this.browser.on('disconnected', () => {
        console.log('Browser disconnected, will create new instance on next request');
        this.browser = null;
        this.isInitializing = false;
      });
      
      return this.browser;
    } catch (error) {
      this.isInitializing = false;
      console.error('Failed to launch browser:', error);
      throw error;
    }
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    this.isInitializing = false;
  }
}

// Export a singleton instance
export const browserService = new BrowserService();
