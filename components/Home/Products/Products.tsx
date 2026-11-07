"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FaGithub } from "react-icons/fa";
import {
  ExternalLink,
  Search,
  Video,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  Tag,
  ChevronDown,
  Lock,
  Play,
  Layers,
  Calendar,
  Globe,
  ShieldCheck,
  Pin,
} from "lucide-react";

import dailyDiaryImg from "../../../assets/daily_diarymainpage.png";
import clearLearnImg from "../../../assets/clearlearn_workspace-preview.png";
import reasonBlockerImg from "../../../assets/reason_blocker.png";
import webPinImg from "../../../assets/webpin_notes.png";
import metaForgeImg from "../../../assets/metaforge_image.png";
import aiBrowsingImg from "../../../assets/ai_browsing.png";
import aiVideoImg from "../../../assets/ai_video_summary.png";
import auditImg from "../../../assets/auditImage.png";

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  technologies: string[];
  liveUrl: string;
  landingUrl?: string;
  githubUrl?: string;
  displayUrl: string;
  status: "live" | "in-progress";
  statusText: string;
  image: StaticImageData;
  videoUrl?: string;
  gradient: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  Icon: React.ElementType;
}

const PRODUCTS: Product[] = [
  {
    id: "daily-diary",
    name: "Daily Diary",
    category: "LOCAL-FIRST APP",
    tagline: "Date-driven daily personal journal",
    description:
      "A minimalist, date-driven personal diary and journaling platform with zero organizational friction. Every date has its own dedicated page with local-first IndexedDB persistence, auto-save, and background cloud sync.",
    features: [
      "Date-as-identity journaling",
      "Zero-latency IndexedDB storage",
      "Background cloud sync & auto-save",
    ],
    technologies: [
      "React",
      "ReactQuill",
      "Zustand",
      "IndexedDB",
      "Node.js",
      "MongoDB",
    ],
    liveUrl: "https://diary.iamadityaranjan.com/",
    // landingUrl: "https://diary.iamadityaranjan.com/",
    displayUrl: "dailydiary.iamadityaranjan.com",
    status: "live",
    statusText: "Live Production",
    image: dailyDiaryImg,
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    iconBg: "from-indigo-500/30 to-purple-500/30",
    iconBorder: "border-indigo-500/20",
    iconColor: "text-indigo-400",
    Icon: Calendar,
  },
  {
    id: "clear-learn",
    name: "Clear Learn",
    category: "AI WORKSPACE",
    tagline: "AI-powered learning workspace",
    description:
      "A production-ready AI learning platform built to solve context fragmentation. Features side-panel subchat branching, vector-searched rich text notes, and live web research.",
    features: [
      "Subchat branching",
      "1,536-dim vector search",
      "SSE & Tavily live search",
    ],
    technologies: [
      "Next.js",
      "React",
      "MongoDB",
      "Zustand",
      "OpenRouter",
      "Tavily Search",
    ],
    liveUrl: "https://clearlearn.iamadityaranjan.com/",
    githubUrl: "https://github.com/aditya74841/Clear_Learn",
    displayUrl: "clearlearn.iamadityaranjan.com",
    status: "live",
    statusText: "Live Production",
    image: clearLearnImg,
    videoUrl: "https://www.youtube.com/embed/5svTYvXA5Jw?si=9naCh0agHGExAtVT",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    iconBg: "from-blue-500/30 to-indigo-500/30",
    iconBorder: "border-blue-500/20",
    iconColor: "text-blue-400",
    Icon: BookOpen,
  },
  {
    id: "reason-blocker",
    name: "Reason Blocker",
    category: "CHROME EXTENSION",
    tagline: "Mindful & intentional website blocker",
    description:
      "A Manifest V3 productivity extension that blocks distracting websites and requires conscious reflection before unlocking. Features timed unblock sessions, focus streak tracking, and 100% local privacy.",
    features: [
      "Reason-based intentional unblocking",
      "Custom session timers & hard locks",
      "100% local storage & privacy-first",
    ],
    technologies: [
      "Manifest V3",
      "Chrome API",
      "JavaScript",
      "Tailwind CSS",
      "Local Storage",
    ],
    liveUrl:
      "https://chromewebstore.google.com/detail/opcckbdjoaighfcpohkbniikhpahkeca?utm_source=item-share-cb",
    githubUrl: "https://github.com/aditya74841/reason_blocker_extension",
    displayUrl: "chromewebstore.google.com/detail/reason-blocker",
    status: "live",
    statusText: "Chrome Web Store",
    image: reasonBlockerImg,
    gradient: "from-red-500/20 via-rose-500/10 to-transparent",
    iconBg: "from-red-500/30 to-rose-500/30",
    iconBorder: "border-red-500/20",
    iconColor: "text-red-400",
    Icon: ShieldCheck,
  },
  {
    id: "webpin-notes",
    name: "WebPin Notes",
    category: "CHROME EXTENSION",
    tagline: "Contextual URL & domain-anchored notes",
    description:
      "A local-first Chrome companion that anchors context-aware notes, text highlights, and quotes directly to specific URLs and domains in the Side Panel with 0ms IndexedDB auto-save.",
    features: [
      "URL & sticky domain note pinning",
      "0ms auto-save via IndexedDB",
      "100% offline & local-first privacy",
    ],
    technologies: [
      "Manifest V3",
      "Side Panel API",
      "IndexedDB",
      "JavaScript",
      "Tailwind CSS",
    ],
    liveUrl:
      "https://webpinnotes.iamadityaranjan.com/",
    // landingUrl: "https://webpinnotes.iamadityaranjan.com/",
    displayUrl: "webpinnotes.iamadityaranjan.com",
    status: "live",
    statusText: "Chrome Web Store",
    image: webPinImg,
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    iconBg: "from-sky-500/30 to-blue-500/30",
    iconBorder: "border-sky-500/20",
    iconColor: "text-sky-400",
    Icon: Pin,
  },
  {
    id: "metaforge",
    name: "MetaForge Pro",
    category: "SEO TOOL",
    tagline: "Generate optimized meta tags with AI",
    description:
      "A comprehensive meta tag generation platform featuring 17+ specialized generators for Open Graph and Twitter Cards, with real-time validation and live social media previews.",
    features: [
      "17+ specialized meta generators",
      "Live social card previews",
      "Instant copy-paste code snippets",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Open Graph", "Twitter API"],
    liveUrl: "https://metaforge.allaboutcse.com",
    githubUrl: "https://github.com/aditya74841/Meta_tag_generator",
    displayUrl: "metaforge.allaboutcse.com",
    status: "live",
    statusText: "Live Production",
    image: metaForgeImg,
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    iconBg: "from-orange-500/30 to-red-500/30",
    iconBorder: "border-orange-500/20",
    iconColor: "text-orange-400",
    Icon: Tag,
  },

];
  // {
  //   id: "ai-search",
  //   name: "AI Search Assistant",
  //   category: "AI TOOL",
  //   tagline: "Search the web with AI intelligence",
  //   description:
  //     "A mini Perplexity-style experience that combines live web retrieval with LLM reasoning. Routes user queries through Groq-powered LLMs and Tavily live search for grounded, verified answers.",
  //   features: [
  //     "Perplexity-style web grounding",
  //     "Groq LLM tool calling",
  //     "Sub-second response streaming",
  //   ],
  //   technologies: ["React", "Node.js", "Express.js", "Groq", "Tavily API"],
  //   liveUrl: "https://aibrowsing.iamadityaranjan.com",
  //   githubUrl: "https://github.com/aditya74841/Web-browsing-AI-agents",
  //   displayUrl: "aibrowsing.iamadityaranjan.com",
  //   status: "live",
  //   statusText: "Live Production",
  //   image: aiBrowsingImg,
  //   gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  //   iconBg: "from-cyan-500/30 to-blue-500/30",
  //   iconBorder: "border-cyan-500/20",
  //   iconColor: "text-cyan-400",
  //   Icon: Search,
  // },
  // {
  //   id: "video-summarizer",
  //   name: "AI Video Summarizer",
  //   category: "AI TOOL",
  //   tagline: "Turn any video into key insights",
  //   description:
  //     "A full-stack video intelligence platform that converts YouTube links or video files into executive summaries, key takeaways, and editable transcripts using Groq Whisper.",
  //   features: [
  //     "Whisper audio-to-text pipeline",
  //     "Short & deep analysis modes",
  //     "Real-time SSE progress updates",
  //   ],
  //   technologies: ["Next.js", "TypeScript", "MongoDB", "FFmpeg", "Groq API", "SSE"],
  //   liveUrl: "https://videosummary.iamadityaranjan.com",
  //   githubUrl: "https://github.com/aditya74841/Ai_Video_Summarizer",
  //   displayUrl: "videosummary.iamadityaranjan.com",
  //   status: "live",
  //   statusText: "Live Production",
  //   image: aiVideoImg,
  //   gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
  //   iconBg: "from-violet-500/30 to-fuchsia-500/30",
  //   iconBorder: "border-violet-500/20",
  //   iconColor: "text-violet-400",
  //   Icon: Video,
  // },
/* ─── Browser Mockup Frame ─── */
const BrowserMockup: React.FC<{
  product: Product;
  showVideo: boolean;
  onToggleVideo?: (val: boolean) => void;
}> = ({ product, showVideo, onToggleVideo }) => {
  return (
    <div className="w-full max-w-[460px] mx-auto rounded-xl overflow-hidden border border-gray-800 bg-gray-950/80 shadow-2xl">
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2 bg-gray-900/90 border-b border-gray-800/80">
        {/* Traffic Dots */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 sm:w-20">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500/80"></div>
        </div>

        {/* Address Bar */}
        <div className="flex-1 flex justify-center px-1 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 rounded-md bg-gray-950/80 border border-gray-800/60 text-[9px] sm:text-[10px] text-gray-400 font-mono max-w-[150px] sm:max-w-[210px] truncate">
            <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span className="truncate">{product.displayUrl}</span>
          </div>
        </div>

        {/* Desktop Video / UI Toggle (cleanly integrated into browser header on sm+) */}
        <div className="hidden sm:flex sm:w-20 sm:justify-end shrink-0">
          {product.videoUrl && onToggleVideo ? (
            <div className="flex items-center gap-0.5 bg-gray-950 p-0.5 rounded-md border border-gray-800/80 text-[10px]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVideo(false);
                }}
                className={`px-2 py-0.5 rounded transition-all ${
                  !showVideo
                    ? "bg-gray-800 text-white font-medium"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                UI
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVideo(true);
                }}
                className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all ${
                  showVideo
                    ? "bg-violet-600 text-white font-medium shadow"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Demo</span>
              </button>
            </div>
          ) : null}
        </div>

        {/* Mobile Spacer to keep address bar centered */}
        <div className="w-6 sm:hidden shrink-0"></div>
      </div>

      {/* Screen Body */}
      <div className="relative aspect-video w-full bg-gray-950 overflow-hidden group/screen">
        {product.videoUrl && showVideo ? (
          <div className="relative w-full h-full">
            <iframe
              src={product.videoUrl}
              title={product.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
            {/* Mobile Switch Back Pill */}
            {onToggleVideo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVideo(false);
                }}
                className="sm:hidden absolute top-2 right-2 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-950/90 text-white text-[10px] font-medium border border-gray-700 shadow-lg backdrop-blur-sm active:scale-95 transition-all"
              >
                <span>✕ Close Video</span>
              </button>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover object-top transition-transform duration-500 group-hover/screen:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Mobile Floating "Watch Demo" Pill */}
            {product.videoUrl && onToggleVideo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVideo(true);
                }}
                className="sm:hidden absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-600/95 active:bg-violet-700 text-white text-xs font-medium shadow-xl shadow-violet-950/50 backdrop-blur-sm border border-violet-400/30 active:scale-95 transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Demo</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Accordion Item (Mobile) ─── */
const AccordionItem: React.FC<{
  product: Product;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isVisible: boolean;
}> = ({ product, isOpen, onToggle, index, isVisible }) => {
  const TabIcon = product.Icon;
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all duration-500 ${
        isOpen
          ? "bg-gray-900/80 border-gray-700 shadow-lg"
          : "bg-transparent border-gray-800/60 hover:border-gray-700/60"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
      >
        <div
          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${product.iconBg} ${product.iconBorder} border flex items-center justify-center shrink-0`}
        >
          <TabIcon className={`w-4 h-4 ${product.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`font-semibold text-sm truncate ${isOpen ? "text-white" : "text-gray-300"}`}>
              {product.name}
            </p>
            {product.status === "live" ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
            )}
          </div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
            {product.category}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`grid transition-all duration-400 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 space-y-3.5">
            {/* Status Badge & Mobile UI / Demo Switcher */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                  product.status === "live"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    product.status === "live"
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-amber-400"
                  }`}
                ></span>
                {product.statusText}
              </span>

              {/* Dedicated Mobile UI / Demo Switcher */}
              {product.videoUrl && (
                <div className="inline-flex items-center p-0.5 bg-gray-950 rounded-lg border border-gray-800 shadow-inner">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVideo(false);
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      !showVideo
                        ? "bg-gray-800 text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <span>UI</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVideo(true);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      showVideo
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Demo</span>
                  </button>
                </div>
              )}
            </div>

            {/* Browser Mockup */}
            <BrowserMockup
              product={product}
              showVideo={showVideo}
              onToggleVideo={setShowVideo}
            />

            {/* Description */}
            <p className="text-gray-400 text-xs leading-relaxed">
              {product.description}
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap gap-1.5">
              {product.features.map((feat) => (
                <span
                  key={feat}
                  className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-gray-950/80 border border-gray-800 text-gray-300"
                >
                  <span className="text-emerald-400">✦</span>
                  {feat}
                </span>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 pt-1">
              {product.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 bg-gray-800/50 text-gray-400 rounded border border-gray-700/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs transition-colors duration-300 ${
                  product.liveUrl === "#"
                    ? "bg-gray-800 text-gray-500 cursor-default"
                    : "bg-white text-gray-950 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  if (product.liveUrl === "#") e.preventDefault();
                }}
              >
                <span>
                  {product.id === "reason-blocker" || product.id === "webpin-notes"
                    ? "Add to Chrome"
                    : product.id === "daily-diary"
                    ? "Open App"
                    : product.liveUrl === "#"
                    ? "Coming Soon"
                    : "Live Demo"}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {product.landingUrl && (
                <a
                  href={product.landingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium text-xs text-gray-300 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors duration-300"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Landing Page</span>
                </a>
              )}

              {product.githubUrl && (
                <a
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium text-xs text-gray-300 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors duration-300"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const Products: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById("products");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selected = PRODUCTS[activeProduct];

  const toggleMobile = (index: number) => {
    setExpandedMobile((prev) => (prev === index ? -1 : index));
  };

  const handleSelectDesktop = (index: number) => {
    setActiveProduct(index);
    setShowVideo(false);
  };

  return (
    <section
      id="products"
      className="py-20 md:py-28 bg-gray-950 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-3">
            My Products
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tools I&apos;ve Built
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Each one started as a problem I faced while building. Free to try,
            built to be useful.
          </p>
          <div className="w-16 h-0.5 bg-gray-700 mx-auto mt-4"></div>
        </div>

        {/* ═══ Mobile: Accordion ═══ */}
        <div className="lg:hidden max-w-lg mx-auto flex flex-col gap-3">
          {PRODUCTS.map((product, index) => (
            <AccordionItem
              key={product.id}
              product={product}
              isOpen={expandedMobile === index}
              onToggle={() => toggleMobile(index)}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* ═══ Desktop: Sidebar + Detail Panel ═══ */}
        <div
          className={`hidden lg:block max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex gap-5 items-start">
            {/* Left Sidebar - Product Tabs */}
            <div className="w-[260px] flex flex-col gap-1.5 shrink-0">
              {PRODUCTS.map((product, index) => {
                const TabIcon = product.Icon;
                const isActive = activeProduct === index;
                return (
                  <button
                    key={product.id}
                    onMouseEnter={() => handleSelectDesktop(index)}
                    onClick={() => handleSelectDesktop(index)}
                    className={`relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all duration-300 w-full group ${
                      isActive
                        ? "bg-gray-900/90 border border-gray-700 shadow-lg shadow-gray-900/50"
                        : "bg-transparent border border-transparent hover:bg-gray-900/40 hover:border-gray-800"
                    }`}
                  >
                    {/* Active Left Glow Accent */}
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r"></div>
                    )}

                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${product.iconBg} ${product.iconBorder} border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isActive ? "scale-105" : "group-hover:scale-105"
                      }`}
                    >
                      <TabIcon className={`w-4 h-4 ${product.iconColor}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p
                          className={`font-semibold text-xs truncate transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-200"
                          }`}
                        >
                          {product.name}
                        </p>
                        {product.status === "live" ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                        )}
                      </div>
                      <p className="text-[9px] uppercase tracking-wider text-gray-600 font-medium">
                        {product.category}
                      </p>
                    </div>

                    <ArrowRight
                      className={`w-3.5 h-3.5 text-gray-500 transition-all duration-300 ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Detail Panel - Fixed Height Container for Zero Layout Shifts */}
            <div className="flex-1 min-w-0">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden transition-colors duration-300 hover:border-gray-700 min-h-[555px] flex flex-col justify-between">
                <div key={selected.id} className="animate-fadeContent flex flex-col justify-between h-full min-h-[555px]">
                  {/* Top Block: Header + Browser Mockup */}
                  <div>
                    {/* Card Header with Status Badge */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-1">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {selected.name}
                        </h3>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {selected.tagline}
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                          selected.status === "live"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            selected.status === "live"
                              ? "bg-emerald-400 animate-pulse"
                              : "bg-amber-400"
                          }`}
                        ></span>
                        {selected.statusText}
                      </span>
                    </div>

                    {/* Browser Mockup Preview Area */}
                    <div className="px-6 pt-3.5">
                      <BrowserMockup
                        product={selected}
                        showVideo={showVideo}
                        onToggleVideo={setShowVideo}
                      />
                    </div>
                  </div>

                  {/* Middle Block: Description & Feature Highlights */}
                  <div className="px-6 pt-3 space-y-2">
                    <p className="text-gray-300 text-xs leading-relaxed min-h-[34px] flex items-center">
                      {selected.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 min-h-[28px] items-center">
                      {selected.features.map((feat) => (
                        <span
                          key={feat}
                          className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-md bg-gray-950/80 border border-gray-800 text-gray-300 font-medium"
                        >
                          <span className="text-emerald-400 text-[10px]">✦</span>
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 min-h-[26px] items-center pt-1">
                      {selected.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 bg-gray-800/40 text-gray-400 rounded border border-gray-700/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Bar: Dual CTAs + Category */}
                  <div className="px-6 py-4 mt-2 flex items-center justify-between border-t border-gray-800/70">
                    <div className="flex items-center gap-2.5">
                      {/* Live Demo / Open App Button */}
                      <a
                        href={selected.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs md:text-sm transition-all duration-300 ${
                          selected.liveUrl === "#"
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/40"
                            : "bg-white text-gray-950 hover:bg-gray-200 shadow-md hover:shadow-white/10"
                        }`}
                        onClick={(e) => {
                          if (selected.liveUrl === "#") e.preventDefault();
                        }}
                      >
                        <span>
                          {selected.id === "reason-blocker" || selected.id === "webpin-notes"
                            ? "Add to Chrome"
                            : selected.id === "daily-diary"
                            ? "Open App"
                            : selected.liveUrl === "#"
                            ? "Coming Soon"
                            : "Live Demo"}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {/* Landing Page Button (for Daily Diary) */}
                      {selected.landingUrl && (
                        <a
                          href={selected.landingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium text-xs md:text-sm text-gray-300 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800/80 transition-all duration-300"
                        >
                          <Globe className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Landing Page</span>
                        </a>
                      )}

                      {/* GitHub Source Button */}
                      {selected.githubUrl && (
                        <a
                          href={selected.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium text-xs md:text-sm text-gray-300 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800/80 transition-all duration-300"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      )}
                    </div>

                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 hidden sm:block">
                      {selected.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Opacity Transitions */}
      <style jsx>{`
        @keyframes fadeContent {
          from {
            opacity: 0.2;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeContent {
          animation: fadeContent 0.22s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Products;
