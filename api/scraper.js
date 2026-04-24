import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export async function scrapeWebsite(url) {
  let browser;
  try {
    const isProd = process.env.NODE_ENV === 'production';
    
    browser = await puppeteer.launch({
      args: isProd ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: isProd 
        ? await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar') 
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', 
      headless: isProd ? chromium.headless : true,
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
    
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });

    const data = await page.evaluate(() => {
      const getMeta = (name) => {
        const element = document.querySelector(`meta[name="${name}"], meta[property="${name}"], meta[property="og:${name}"]`);
        return element ? element.getAttribute('content') : null;
      };

      const headings = {
        h1: Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()).filter(t => t),
        h2: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()).filter(t => t),
        h3: Array.from(document.querySelectorAll('h3')).map(h => h.innerText.trim()).filter(t => t),
      };

      const images = Array.from(document.querySelectorAll('img'));
      const imagesWithAlt = images.filter(img => img.alt && img.alt.trim().length > 0).length;
      
      const title = document.title;
      const description = getMeta('description') || getMeta('og:description');
      const keywords = getMeta('keywords');
      const canonical = document.querySelector('link[rel="canonical"]')?.href || null;
      const ogType = getMeta('og:type');

      // Extract high-quality body text (ignoring nav/footer)
      const mainContent = document.querySelector('main, article, #content, .content') || document.body;
      const bodyText = mainContent.innerText.split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 30)
        .slice(0, 80)
        .join('\n');

      return {
        title,
        description,
        keywords,
        headings,
        canonical,
        ogType,
        imageAudit: {
          total: images.length,
          withAlt: imagesWithAlt,
          missingAlt: images.length - imagesWithAlt
        },
        bodyText: bodyText.substring(0, 6000),
      };
    });

    return data;
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error(`Failed to scrape ${url}: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
}
