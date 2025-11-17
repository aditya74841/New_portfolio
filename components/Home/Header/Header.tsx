"use client";

import React, { useEffect, useState } from "react";
import CTA from "./CTA";
import HeaderSocials from "./HeaderSocials";
import ME from "../../../assets/me.jpg";
// import { Helmet } from 'react-helmet';

const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <Helmet>
                <title>Aditya Ranjan | Full Stack Web Developer Portfolio</title>
                <meta
                    name="description"
                    content="I'm Aditya Ranjan, a Full Stack Web Developer skilled in the MERN stack. Explore my projects, experience, and services on my personal portfolio site."
                />
                <meta
                    name="keywords"
                    content="Aditya Ranjan, Full Stack Developer, MERN Developer, React Developer, Node.js, iamadityaranjan, Web Portfolio"
                />
                <meta name="author" content="Aditya Ranjan" />
                <meta property="og:title" content="Aditya Ranjan | Full Stack Developer" />
                <meta
                    property="og:description"
                    content="Explore the work and skills of Aditya Ranjan, a MERN Stack Developer based in India."
                />
                <meta property="og:image" content="https://iamadityaranjan.com/me.jpg" />
                <meta property="og:url" content="https://iamadityaranjan.com/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Aditya Ranjan | Full Stack Developer" />
                <meta
                    name="twitter:description"
                    content="Explore the portfolio and projects of Aditya Ranjan, Full Stack Web Developer (React, Node, MongoDB)."
                />
                <meta name="twitter:image" content="https://iamadityaranjan.com/me.jpg" />
            </Helmet> */}

      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-linear-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-linear-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
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
                <h5 className="text-lg md:text-xl text-gray-300 font-light tracking-wide animate-fade-in">
                  Hello, I'm
                </h5>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in delay-200">
                  <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Aditya
                  </span>
                  <br />
                  <span className="text-white">Ranjan</span>
                </h1>

                <div className="space-y-2 animate-fade-in delay-300">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200">
                    <span className="text-cyan-400">Full Stack</span>{" "}
                    <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Developer
                    </span>
                  </h2>
                </div>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in delay-400">
                  {/* With a Bachelor's Degree in Tech, experienced developer in
                                    creating web applications and applying current level of knowledge
                                    and skills in producing quality work. */}
                  A Full Stack Web Developer skilled in React, Node.js, Express,
                  and MongoDB. I focus on building reliable, high-performance
                  applications that deliver real-world impact.
                </p>

                <div className="animate-fade-in delay-500">
                  <CTA />
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="shrink-0 animate-fade-in delay-600">
              <div className="relative">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>

                {/* Image Container */}
                <div className="relative w-60 h-60 md:w-96 md:h-96 lg:w-[350px] lg:h-[350px]">
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full p-1 animate-spin-slow">
                    <div className="w-full h-full bg-gray-900 rounded-full p-2">
                      <img
                        src={ME.src}
                        alt="Aditya Ranjan"
                        className="w-full h-full object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
                    ⚡
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-linear-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce delay-500">
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
          href="#contact"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors duration-300 flex flex-col items-center gap-2 animate-bounce"
        >
          <span className="text-sm font-medium tracking-wider">
            Scroll Down
          </span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </a>
      </header>
    </>
  );
};

export default Header;
