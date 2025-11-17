import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CV - Aditya Ranjan",
  description: "Professional resume of Aditya Ranjan, a Full Stack Developer with experience in React, Node.js, and modern web technologies.",
  openGraph: {
    title: "CV - Aditya Ranjan",
    description: "Professional resume of Aditya Ranjan, Full Stack Developer",
    url: "https://iamadityaranjan.com/cv",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV - Aditya Ranjan",
    description: "Professional resume of Aditya Ranjan, Full Stack Developer",
  },
};

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}