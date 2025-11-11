import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { mode, profile, job, language } = await req.json();
  const prompt = `You are a helpful assistant. Summarize this profile in ${language}.`;

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  return NextResponse.json({
    result: completion.choices[0].message.content,
  });
}
