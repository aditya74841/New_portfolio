"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiMenuAlt3,
  HiX,
  HiDownload,
  HiDocumentText,
} from "react-icons/hi";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (!isHomePage) return;

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (isHomePage) {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
        setActiveSection(targetId);
      } else {
        // If on another page, navigate home with hash
        window.location.href = `/${href}`;
      }
    }
    setMobileMenuOpen(false);
  };

  if (pathname === "/cv") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-950/85 backdrop-blur-md border-b border-gray-800/80 shadow-2xl py-3"
          : "bg-gray-950/50 backdrop-blur-sm border-b border-gray-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-white font-mono font-bold text-base group-hover:border-gray-700 transition-colors">
            AR
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm tracking-tight flex items-center gap-1.5">
              Aditya Ranjan
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              Full Stack Dev
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-900/60 p-1.5 rounded-full border border-gray-800/80">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = isHomePage && activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-gray-950 font-bold shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/projects"
            className="text-xs font-mono text-gray-400 hover:text-white px-2.5 py-1.5 transition-colors"
          >
            Projects
          </Link>

          {/* CV Button (Redirects to /cv) */}
          <Link
            href="/cv"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-gray-950 text-xs font-bold rounded-full hover:bg-gray-200 transition-colors shadow-sm"
          >
            <HiDocumentText className="text-sm" />
            <span>View CV</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenuAlt3 className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 border-b border-gray-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-fadeIn">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = isHomePage && activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-gray-950 font-bold"
                    : "text-gray-300 hover:bg-gray-900 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-gray-900 flex items-center justify-between gap-2">
            <Link
              href="/cv"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white text-gray-950 font-bold rounded-xl text-xs"
            >
              <HiDocumentText />
              <span>View CV</span>
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-mono text-gray-300"
            >
              All Projects
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
