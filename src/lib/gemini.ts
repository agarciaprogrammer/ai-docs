import { GoogleGenerativeAI } from '@google/generative-ai';

const key = process.env.GEMINI_API_KEY;
if (!key && process.env.NODE_ENV === 'production') {
  throw new Error('GEMINI_API_KEY is required in production');
}

const genAI: GoogleGenerativeAI | null = key ? new GoogleGenerativeAI(key) : null;

export async function askGemini(prompt: string): Promise<string> {
  if (!genAI) return 'Gemini is not configured.';
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  return (await model.generateContent(prompt)).response.text();
}