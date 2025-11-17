"use client"

import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaHeart, FaCode, FaServer } from "react-icons/fa";
import { FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { MdRocketLaunch } from "react-icons/md";
import { IconType } from "react-icons";
import useHealthCheck from "../../../hooks/useHealthCheck";
import { SERVER_URL } from "../../../app/constant";

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

  const { 
    serverMessage, 
  } = useHealthCheck(`${SERVER_URL}/health-check`);

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
    { href: "#testimonials", label: "Testimonials" },
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
    <footer className="relative bg-linear-to-br from-gray-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                className="inline-block text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-400 hover:to-pink-400 transition-all duration-300 mb-4"
              >
                Aditya Ranjan
              </a>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
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
                      className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors duration-300 group"
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
                      className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <MdRocketLaunch className="text-lg" />
                <span>Start a Project</span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-300 flex items-center gap-2 justify-center md:justify-start">
                <span>&copy; {currentYear} Aditya Ranjan. Made with</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>in India</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                All rights reserved. Built with React & Tailwind CSS
              </p>
            </div>

            {/* Server Status */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex items-center gap-2">
                <FaServer className="text-indigo-400" />
                <span className="text-sm text-gray-300">Server Status:</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    serverMessage && serverMessage !== "Server offline" 
                      ? "bg-green-400" 
                      : "bg-red-400"
                  } animate-pulse`}
                ></span>
                <span className={`text-sm font-medium ${
                  serverMessage && serverMessage !== "Server offline"
                    ? "text-green-400"
                    : "text-red-400"
                }`}>
                  {serverMessage || "Checking..."}
                </span>
              </div>
            </div>
          </div>

          {/* Tech Stack Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-400">
              <FaCode className="text-indigo-400" />
              <span>Built with React, Tailwind CSS, EmailJS & lots of ☕</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
