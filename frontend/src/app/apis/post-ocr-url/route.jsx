import { NextResponse } from 'next/server';

export async function POST(req) {
  const { url } = await req.json();;
  
  if (!url) {
    return NextResponse.json({ error: 'Url is Required' }, { status: 400 });
  }

  const response = await fetch(`https://picscribe.vercel.app/api/generate-ocr-withurl`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "your-valid-api-key-1",
    },
    body: JSON.stringify({
        url
      }),
  });

  const data = await response.json();
  
  return NextResponse.json(data);
}