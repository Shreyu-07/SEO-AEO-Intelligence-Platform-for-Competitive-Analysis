import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeContent(scrapedData, retryCount = 0) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a Senior Strategic SEO/AEO Auditor. Calculate the SEO and AEO scores with extreme technical accuracy.
      
      SCORING RULES (Start at 100):
      1. SEO Score: 
         - Deduct 30 if Meta Description is missing.
         - Deduct 15 if H1 is missing.
         - Deduct 15 if more than 50% of images lack ALT text (Total: ${scrapedData.imageAudit.total}, Missing: ${scrapedData.imageAudit.missingAlt}).
         - Deduct 10 if Canonical link is missing (${scrapedData.canonical ? 'Present' : 'Missing'}).
         - Deduct 10 if OpenGraph metadata is incomplete (${scrapedData.ogType ? 'Present' : 'Missing'}).
      2. AEO Score: Based on the answerability of the content snippet for direct AI/LLM queries.

      Website Data:
      Title: ${scrapedData.title}
      Description: ${scrapedData.description}
      Canonical: ${scrapedData.canonical}
      Headings: ${JSON.stringify(scrapedData.headings)}
      Image Audit: ${JSON.stringify(scrapedData.imageAudit)}
      Content Snippet: ${scrapedData.bodyText}

      Please provide a rigorous analysis in the following JSON format:
      {
        "seoScore": (Technical 0-100),
        "aeoScore": (Answerability 0-100),
        "strengths": ["string"],
        "weaknesses": ["string"],
        "recommendations": ["string"],
        "competitorComparison": "A professional 2-sentence executive audit summary.",
        "aeoInsights": {
          "answerability": "string",
          "structuredData": "string",
          "intentAlignment": "string"
        },
        "keywordOpportunities": ["string"]
      }
      
      Return ONLY the JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response if Gemini wraps it in markdown code blocks
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    // If we hit a rate limit (429) and haven't retried too many times
    if ((error.status === 429 || error.status === 503) && retryCount < 5) {
      const waitTime = Math.pow(2, retryCount) * 5000; // Start with 5s, then 10s, 20s...
      console.log(`Model busy or rate limited. Retrying in ${waitTime/1000}s... (Attempt ${retryCount + 1}/5)`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return analyzeContent(scrapedData, retryCount + 1);
    }
    console.error('AI Analysis error:', error);
    throw new Error(`Failed to analyze content: ${error.message}`);
  }
}
