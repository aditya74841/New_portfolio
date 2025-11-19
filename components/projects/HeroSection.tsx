"use client"

import React, { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

type Props = {
  isVisible?: boolean;
};

const HeroSection: React.FC<Props> = ({ isVisible }) => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" ref={heroRef}>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse" />
        <div className="absolute top-1/2 -left-8 w-32 h-32 bg-white opacity-5 rounded-full animate-bounce" />
        <div className="absolute bottom-4 right-1/4 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Portfolio Showcase
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">My Creative Journey</h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">Discover a collection of innovative web applications, tools, and experiments crafted with passion and modern technologies</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
