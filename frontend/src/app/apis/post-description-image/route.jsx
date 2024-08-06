import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  
  const response = await fetch(`${baseUrl}/api/generate-description-withfile`, {
    method: "POST",
    headers: {
      "x-api-key": "your-valid-api-key-1",
    },
    body: formData,
  });

  const data = await response.json();
  
  return NextResponse.json(data);
}