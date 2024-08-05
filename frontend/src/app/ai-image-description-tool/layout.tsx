import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "AI Image Description Generator | Scan and Describe Images | PicScribe",
  description: "Effortlessly generate detailed descriptions for your images using our AI-powered tool. Upload images or paste URLs to get accurate descriptions, enhancing accessibility and SEO. Ideal for content creators, marketers, and accessibility advocates.",
  keywords: "Image SEO, AI image description, generate image alt text, image caption generator, image description tool, AI image analysis, image description for accessibility, SEO image descriptions",
  robots: "index, follow",
  authors: [
    { name: "PicScribe Team", url: `/` }
  ],
  openGraph: {
    title: "AI Image Description Generator | Scan and Describe Images | PicScribe",
    description: "Effortlessly generate detailed descriptions for your images using our AI-powered tool. Upload images or paste URLs to get accurate descriptions, enhancing accessibility and SEO. Ideal for content creators, marketers, and accessibility advocates.",
    type: "website",
    url: `/ai-image-description-tool`,
    images: ["/logo.svg"],
    siteName: "PicScribe",
  },
  alternates: {
    canonical: `/ai-image-description-tool`,
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