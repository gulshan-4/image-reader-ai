import type { Metadata } from "next";
import { headers } from 'next/headers';

function canonical (){
    const headersList = headers();

    return headersList.get('host')
}

export const metadata: Metadata = {
  title: "Extract Text from Images with AI | Free OCR Tool | PicScribe",
  description: "Easily extract and translate text from images using our AI-powered OCR tool. Upload images or use URLs to convert photos into editable text, translate it into various languages, and copy the text with ease. Ideal for digitizing documents and multilingual text processing.",
  keywords: "Image SEO, AI text extraction, OCR tool, extract text from images, image to text converter, AI OCR, text recognition, translate text from images, document digitization, multilingual text processing, image text extraction, translate text in images",
  robots: "index, follow",
  authors: [
    { name: "PicScribe Team", url: `${canonical()}` }
  ],
  openGraph: {
    title: "Extract Text from Images with AI | Free OCR Tool | PicScribe",
    description: "Easily extract and translate text from images using our AI-powered OCR tool. Upload images or use URLs to convert photos into editable text, translate it into various languages, and copy the text with ease. Ideal for digitizing documents and multilingual text processing.",
    type: "website",
    url: `${canonical()}/extract-text-from-images`,
    images: ["/logo.svg"],
    siteName: "PicScribe",
  },
  alternates: {
    canonical: `${canonical()}/extract-text-from-images`,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
    other: {
      rel: '/favicon.png',
      url: '/favicon.png',
    },
  },
};

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {children}
    </>       
  );
}