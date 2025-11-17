import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iamadityaranjan.com'),
  title: {
    default: "Aditya Ranjan - Full Stack Developer",
    template: "%s | Aditya Ranjan"
  },
  description: "Full Stack Developer with expertise in React, Node.js, and modern web technologies. View my portfolio, projects, and professional experience.",
  keywords: ["Full Stack Developer", "React Developer", "Node.js Developer", "Web Developer", "Software Engineer", "Aditya Ranjan", "Portfolio"],
  authors: [{ name: "Aditya Ranjan" }],
  creator: "Aditya Ranjan",
  publisher: "Aditya Ranjan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamadityaranjan.com",
    title: "Aditya Ranjan - Full Stack Developer",
    description: "Full Stack Developer with expertise in React, Node.js, and modern web technologies. View my portfolio, projects, and professional experience.",
    siteName: "Aditya Ranjan Portfolio",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Aditya Ranjan - Full Stack Developer"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Ranjan - Full Stack Developer',
    description: 'Full Stack Developer with expertise in React, Node.js, and modern web technologies.',
    creator: '@adixranjan08',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
