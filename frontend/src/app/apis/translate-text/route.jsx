import { NextResponse } from 'next/server';

export async function POST(req) {
  const { text, targetLang } = await req.json();;
  
  if (!text || !targetLang) {
    return NextResponse.json({ error: 'Text and targetLan are required' }, { status: 400 });
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/translate-text`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      "x-api-key": "your-valid-api-key-1",
    },
    body: JSON.stringify({
        text,
        targetLang,
      }),
  });

  const data = await response.json();
  
  return NextResponse.json(data);
}