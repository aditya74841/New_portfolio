import React, { Suspense } from "react";
import { Metadata } from "next";
import AiHome from "./components/Home";
import LoadingScreen from "./components/LoadingScreen";

// SEO Metadata
export const metadata: Metadata = {
  title: "AI Chat Assistant | Your Intelligent Conversation Partner",
  description:
    "Experience our advanced AI Chat Assistant. Get instant help with coding, writing, analysis, and problem-solving. Start a conversation and discover intelligent responses powered by cutting-edge AI technology.",
  keywords: [
    "AI chat",
    "AI assistant",
    "chatbot",
    "artificial intelligence",
    "coding help",
    "writing assistant",
    "AI conversation",
    "smart chat",
    "virtual assistant",
  ],
  authors: [{ name: "Aditya" }],
  creator: "Aditya",
  publisher: "Aditya Portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AI Chat Assistant | Intelligent Conversations",
    description:
      "Chat with our AI assistant for help with coding, writing, analysis, and more. Get instant, intelligent responses.",
    siteName: "AI Chat Assistant",
    images: [
      {
        url: "/og-ai-chat.png",
        width: 1200,
        height: 630,
        alt: "AI Chat Assistant Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chat Assistant | Your Smart Conversation Partner",
    description:
      "Experience intelligent conversations with our AI chat assistant. Get help with coding, writing, and more.",
    images: ["/og-ai-chat.png"],
  },
  alternates: {
    canonical: "/ai",
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Chat Assistant",
  description:
    "An intelligent AI chat assistant that helps users with coding, writing, analysis, and problem-solving.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "AI-powered conversations",
    "Coding assistance",
    "Writing help",
    "Problem-solving",
    "Instant responses",
  ],
};

const AiChatPage = () => {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Application with Suspense for useSearchParams */}
      <Suspense fallback={<LoadingScreen />}>
        <AiHome />
      </Suspense>
    </>
  );
};

export default AiChatPage;
