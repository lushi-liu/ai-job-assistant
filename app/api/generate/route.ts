import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { mode, profile, job, language } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Missing OPENAI_API_KEY on server' },
        { status: 500 }
      );
    }

    const prompt = `Summarize this profile in ${language}:\n${profile}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    const result = completion.choices[0].message.content ?? '';

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: unknown) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong in the API route' },
      { status: 500 }
    );
  }
}
