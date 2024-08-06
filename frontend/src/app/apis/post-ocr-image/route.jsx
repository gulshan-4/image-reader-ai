import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  
  const response = await fetch(`https://picscribe.vercel.app/api/generate-ocr-withfile`, {
    method: "POST",
    headers: {
      "x-api-key": "your-valid-api-key-1",
    },
    body: formData,
  });

  const data = await response.json();
  
  return NextResponse.json(data);
}