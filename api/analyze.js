import { scrapeWebsite } from './scraper.js';
import { analyzeContent } from './analyzer.js';

export default async function handler(req, res) {
  // Add CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log(`Starting Vercel analysis for: ${url}`);
    
    // 1. Scrape the website
    const scrapedData = await scrapeWebsite(url);
    
    // 2. Analyze with AI
    const analysis = await analyzeContent(scrapedData);

    // 3. Return results
    res.status(200).json({
      url,
      scrapedData,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Vercel API Error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      message: error.message 
    });
  }
}
