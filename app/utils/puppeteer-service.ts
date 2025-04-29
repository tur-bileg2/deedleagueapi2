import { Browser as PuppeteerBrowser } from 'puppeteer';
import { Browser as CoreBrowser } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

class PuppeteerService {
  private browser: CoreBrowser | null = null;

  async getBrowser(): Promise<CoreBrowser> {
    if (this.browser) {
      return this.browser;
    }

    try {
      const isDevelopment = process.env.NODE_ENV === 'development';
      console.log(`Running in ${isDevelopment ? 'development' : 'production'} environment`);

      if (isDevelopment) {
        // For local development, use regular puppeteer
        console.log('Using standard puppeteer for local development');
        const puppeteer = await import('puppeteer');
        this.browser = await puppeteer.default.launch({
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
          ]
        }) as unknown as CoreBrowser; // Cast to CoreBrowser to satisfy the type
      } else {
        // For Vercel production, use @sparticuz/chromium with puppeteer-core
        console.log('Using @sparticuz/chromium for serverless environment');
        const puppeteerCore = await import('puppeteer-core');
        
        this.browser = await puppeteerCore.default.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
        });
      }
      
      console.log('Browser launched successfully');
      return this.browser;
    } catch (error) {
      console.error('Failed to launch browser:', error);
      throw new Error(`Failed to launch browser: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  async closeBrowser(): Promise<void> {
    if (this.browser) { 
      await this.browser.close();
      this.browser = null;
    }
  }
}

export const browserService = new PuppeteerService();
