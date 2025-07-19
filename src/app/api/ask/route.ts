import { NextRequest, NextResponse } from 'next/server';
import { askGemini } from '@/lib/gemini';
import Section from '@/models/Section';

export async function POST(req: NextRequest) {
  try {
    const { question, sectionId } = await req.json();

    // 1. fetch the section content
    const section = await Section.findByPk(sectionId);
    if (!section) return NextResponse.json({ error: 'Section not found' }, { status: 404 });

    // 2. build prompt
    const prompt = `You are a helpful assistant. Answer the user's question using ONLY the following text. If the answer is not in the text, say "I don't know".\n\nText:\n${section.content}\n\nQuestion: ${question}`;

    // 3. ask Gemini
    const answer = await askGemini(prompt);

    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to get answer' }, { status: 500 });
  }
}