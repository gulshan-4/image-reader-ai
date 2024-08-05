import type { Metadata } from "next";
import { Karla } from "next/font/google";
import './components/component-styles.css'
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const karla = Karla({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "PicScribe | AI Powered Image to Text and Text to Image Solutions",
  description: "Welcome to PicScribe! Transform your images into editable text with our AI-powered OCR tool. Perfect for SEO of image, Explore image-to-text conversions, AI-generated descriptions, and multilingual translations. Perfect for document digitization and advanced text processing.",
  keywords: "AI image to text, Free AI OCR tool, AI OCR tool, text extraction from images, AI text recognition, document digitization, image description generator, image text translation, translate text in images",
  robots: "index, follow",
  authors: [
    { name: "PicScribe Team", url: `/` }
  ],
  openGraph: {
    title: "PicScribe - AI-Powered Image to Text Solutions",
    description: "PicScribe offers advanced AI-powered tools to extract, translate, and manage text from images. Discover our OCR technology, image-to-text converters, and multilingual capabilities.",
    type: "website",
    url: `/`,
    images: ["/logo.svg"],  // Adjust path to the actual logo image
    siteName: "PicScribe",
  },
  alternates: {
    canonical: `/`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
