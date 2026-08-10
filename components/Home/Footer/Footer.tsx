"use client"

import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaHeart, FaCode } from "react-icons/fa";
import { FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { MdRocketLaunch } from "react-icons/md";
import { IconType } from "react-icons";

// Type definitions
interface NavigationLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  icon: IconType;
  label: string;
  color: string;
}

interface QuickInfoItem {
  icon: IconType;
  text: string;
  href: string;
}

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  const navigationLinks: NavigationLink[] = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#services", label: "Skills" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" }
  ];

  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/aditya74841",
      icon: FaGithub,
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      href: "https://www.linkedin.com/in/iamadityaranjan/",
      icon: FaLinkedin,
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      href: "https://www.instagram.com/aditya___ranjan_/",
      icon: FiInstagram,
      label: "Instagram",
      color: "hover:text-pink-400"
    },
    {
      href: "https://x.com/adixranjan08",
      icon: BsTwitter,
      label: "Twitter",
      color: "hover:text-blue-400"
    }
  ];

  const quickInfo: QuickInfoItem[] = [
    {
      icon: FiMail,
      text: "aditya@iamadityaranjan.com",
      href: "mailto:aditya@iamadityaranjan.com"
    },
    {
      icon: FiPhone,
      text: "+91 7481092465",
      href: "tel:+917481092465"
    },
    {
      icon: FiMapPin,
      text: "India",
      href: "#"
    }
  ];

  return (
    <footer className="relative bg-linear-to-br from-gray-900 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-r from-gray-700/10 to-gray-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-linear-to-r from-gray-600/10 to-gray-700/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <a 
                href="#home" 
                className="inline-block text-3xl md:text-4xl font-bold text-white hover:text-gray-300 transition-all duration-300 mb-4"
              >
                Aditya Ranjan
              </a>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                Full Stack Developer passionate about creating innovative web solutions 
                and building exceptional user experiences.
              </p>
              
              {/* Quick Contact Info */}
              <div className="space-y-3">
                {quickInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                    >
                      <Icon className="text-lg group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm">{item.text}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Navigation</h3>
              <ul className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-2 h-2 bg-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & CTA */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Let's Connect</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white ${social.color} hover:scale-110 hover:bg-white/20 transition-all duration-300 group`}
                      aria-label={social.label}
                    >
                      <Icon className="text-lg group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
              
              {/* CTA Button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <MdRocketLaunch className="text-lg" />
                <span>Start a Project</span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                <span suppressHydrationWarning>&copy; {currentYear} Aditya Ranjan. Made with</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>in India</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                All rights reserved. Built with Next.js & Tailwind CSS
              </p>
            </div>

            {/* Tech Stack Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-400">
              <FaCode className="text-gray-500" />
              <span>Built with Next.js, TypeScript & ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
