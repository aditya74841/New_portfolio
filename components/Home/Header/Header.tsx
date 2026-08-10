"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CTA from "./CTA";
import HeaderSocials from "./HeaderSocials";
import ME from "../../../assets/me.jpg";

const ROLES = [
  "Full Stack Developer",
  "AI Integration Engineer",
  "Open Source Contributor",
  "React & Next.js Expert",
];

const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];

    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <>
      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dark clean background */}
        <div className="absolute inset-0 bg-gray-950">
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-950 to-black"></div>
        </div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Floating Orbs — very subtle */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-gray-700/20 to-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-linear-to-r from-gray-600/20 to-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-linear-to-r from-gray-700/15 to-gray-800/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div
            className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="space-y-6">

                {/* Open to Work badge */}
                <div className="flex justify-center lg:justify-start animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-gray-800/80 border border-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    Open to Work
                  </div>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in delay-200">
                  Aditya
                  <br />
                  <span className="text-gray-400">Ranjan</span>
                </h1>

                {/* Typewriter subtitle */}
                <div className="h-10 flex items-center justify-center lg:justify-start animate-fade-in delay-300">
                  <span className="text-xl md:text-2xl font-mono font-semibold text-gray-300">
                    {displayed}
                    <span className="inline-block w-0.5 h-6 bg-gray-400 ml-1 animate-pulse align-middle"></span>
                  </span>
                </div>

                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl animate-fade-in delay-400">
                  A Full Stack Web Developer skilled in React, Node.js, Express,
                  and MongoDB — with a growing focus on AI integration. I build
                  reliable, high-performance applications and leverage LLMs,
                  AI-powered APIs, and prompt engineering to deliver real-world
                  impact.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in delay-500">
                  <a
                    href="#contact"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Let&apos;s Talk 💬
                  </a>
                  <Link
                    href="/cv"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-gray-600 text-gray-300 rounded-full font-semibold hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    View CV / Resume 📄
                  </Link>
                </div>

                <div className="animate-fade-in delay-600">
                  <CTA />
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="shrink-0 animate-fade-in delay-700">
              <div className="relative">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-gray-700 scale-110 animate-pulse"></div>

                {/* Image Container */}
                <div className="relative w-60 h-60 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px]">
                  <div className="absolute inset-0 rounded-full p-1 bg-linear-to-br from-gray-600 via-gray-700 to-gray-800">
                    <div className="w-full h-full bg-gray-900 rounded-full p-1">
                      <img
                        src={ME.src}
                        alt="Aditya Ranjan"
                        className="w-full h-full object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-white font-bold animate-bounce shadow-lg">
                    ⚡
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-white font-bold animate-bounce delay-500 shadow-lg">
                    🚀
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <HeaderSocials />

        {/* Scroll Down Indicator */}
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-300 flex flex-col items-center gap-2 animate-bounce"
        >
          <span className="text-sm font-medium tracking-wider">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </a>
      </header>
    </>
  );
};

export default Header;
