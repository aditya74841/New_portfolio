"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";

type Props = {
  isVisible?: boolean;
};

const HeroSection: React.FC<Props> = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-gray-900 border-b border-gray-800 text-white py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" ref={heroRef}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gray-800/30 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-full px-4 py-1.5 mb-6 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-gray-400" />
          <span>Project Showcase</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
          All Projects &amp; Work
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Explore full-stack web applications, AI integrations, utilities, and open source tools built with React, Next.js, Node.js, and MongoDB.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
