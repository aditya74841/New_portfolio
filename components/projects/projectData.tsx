import React from "react";
import { Zap } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  techStack?: string[];
  githubLink?: string;
  liveDemoLink?: string;
  apiDocsLink?: string;
  features?: string[];
  longDescription?: string;
  technicalDetails?: string;
  challenges?: Array<{
    problem: string;
    solution: string;
  }>;
  completedDate?: string;
  gradient?: string;
  views?: string | number;
  stars?: number | string;
  difficulty?: string;
  duration?: string;
  status?: string;
  progress?: number;
  expectedCompletion?: string;
  priority?: string;
  complexity?: string;

  icon?: React.ReactNode;
  // priority: 'high' | 'medium' | 'low';
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon?: string;
}

// // projectData.ts (Updated Type)
// export type Project = {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   priority: 'high' | 'medium' | 'low';
//   status: string;
//   progress: number;
//   techStack: string[];
//   expectedCompletion: string;
//   githubUrl?: string;
//   liveUrl?: string;
//   longDescription?: string;
//   features?: string[];
//   technicalDetails?: string;
//   challenges?: Array<{
//     problem: string;
//     solution: string;
//   }>;
// };

export const projectsData: {
  currentProjects: Project[];
  completedProjects: Project[];
  categories: Category[];
} = {
  currentProjects: [
    {
      id: "current-1",
      title: "Audit Pro",
      description: "Used to help companies for auditing",
      status: "In Improvement",
      progress: 85,
      techStack: ["React", "Node.js", "ESLint", "Express", "MongoDB", "Nextjs"],
      expectedCompletion: "August 2025",
      priority: "high",
      icon: <Zap className="w-6 h-6" />,
    },
  ],
  completedProjects: [
    {
      id: "proj-1",
      title: "Url Shortner",
      description:
        "A lightning-fast URL shortening service with custom aliases, comprehensive analytics, and QR code generation. Features real-time click tracking and user dashboard.",
      longDescription: "A powerful URL shortener built for performance and scalability. It allows users to create custom short links, track real-time analytics like click location and device type, and generate QR codes for offline sharing. The dashboard provides a comprehensive view of link performance.",
      image: "/api/placeholder/400/300",
      category: "web-app",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Chart.js"],
      githubLink: "https://github.com/aditya74841/Url_Shortner",
      liveDemoLink: "https://p1.iamadityaranjan.com/",
      features: [
        "Custom URL aliases",
        "Analytics dashboard",
        "QR code generation",
        "Link expiration",
        "Bulk operations",
      ],
      challenges: [
        {
          problem: "High concurrency link redirection",
          solution: "Implemented Redis caching to store frequently accessed links, reducing database load and response time."
        },
        {
          problem: "Tracking unique visitors without cookies",
          solution: "Used fingerprinting techniques and IP hashing to estimate unique visitors while respecting privacy."
        }
      ],
      completedDate: "March 2025",
      complexity: "Low",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
    },
    {
      id: "proj-2",
      title: "Cura - Lifestyle E-commerce Platform",
      description:
        "A premium e-commerce platform with stunning UI/UX, advanced filtering, wishlist functionality, and seamless checkout experience.",
      image: "/api/placeholder/400/300",
      category: "e-commerce",
      techStack: ["React", "Tailwind CSS", "Redux", "Stripe API", "Firebase"],
      githubLink: "https://github.com/aditya74841/Ecommerce_Frontend.github.io",
      liveDemoLink: "https://p2.iamadityaranjan.com/",
      features: [
        "Product catalog",
        "Shopping cart",
        "Payment integration",
        "Wishlist",
        "Order tracking",
      ],
      completedDate: "February 2025",
      complexity: "Low",
      gradient: "from-green-500 via-teal-500 to-blue-500",
    },
    {
      id: "proj-3",
      title: "Google Keep Clone Pro",
      description:
        "An enhanced note-taking app with advanced features like collaborative editing, rich text formatting, and smart categorization.",
      image: "/api/placeholder/400/300",
      category: "productivity",
      techStack: ["React", "Firebase", "Material-UI", "Rich Text Editor"],
      githubLink: "https://github.com/aditya74841/React_TODO_frontend",
      liveDemoLink: "https://p3.iamadityaranjan.com/",
      features: [
        "Rich text editing",
        "Collaborative notes",
        "Smart search",
        "Color coding",
        "Export options",
      ],
      completedDate: "January 2025",
      complexity: "Low",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
    },
    {
      id: "proj-4",
      title: "Harmonic Music Portfolio",
      description:
        "An immersive music portfolio with 3D visualizations, interactive audio player, and dynamic waveform displays.",
      image: "/api/placeholder/400/300",
      category: "portfolio",
      techStack: ["React", "Three.js", "Web Audio API", "GSAP", "Tailwind"],
      githubLink: "https://github.com/aditya74841/music_portfolio",
      liveDemoLink: "https://p4.iamadityaranjan.com/",
      features: [
        "3D visualizations",
        "Interactive audio player",
        "Waveform display",
        "Track analytics",
      ],
      completedDate: "December 2024",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
    },
    {
      id: "proj-5",
      title: "TaskMaster Pro",
      description:
        "A comprehensive task management solution with team collaboration, time tracking, and advanced analytics.",
      image: "/api/placeholder/400/300",
      category: "productivity",
      techStack: ["React", "Node.js", "JWT", "MongoDB", "Socket.io"],
      githubLink: "https://github.com",
      liveDemoLink: "https://p5.iamadityaranjan.com/login",
      features: [
        "Team collaboration",
        "Time tracking",
        "Analytics",
        "Project templates",
        "Mobile app",
      ],
      completedDate: "November 2024",
      complexity: "Low",
      gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    },
    {
      id: "proj-6",
      title: "NewsFlow - Inshorts Clone",
      description:
        "A modern news aggregation platform with AI-powered summarization, personalized feeds, and offline reading.",
      image: "/api/placeholder/400/300",
      category: "news",
      techStack: ["React", "News API", "PWA", "IndexedDB", "AI Integration"],
      githubLink: "https://github.com/aditya74841/",
      features: [
        "AI summarization",
        "Personalized feeds",
        "Offline reading",
        "Social sharing",
        "Dark mode",
      ],
      completedDate: "October 2024",
      complexity: "Low",
      gradient: "from-slate-500 via-gray-600 to-zinc-600",
    },
    {
      id: "proj-7",
      title: "WhatsApp Clone Plus",
      description:
        "A feature-rich messaging app with end-to-end encryption, voice/video calls, and advanced group management.",
      image: "/api/placeholder/400/300",
      category: "messaging",
      techStack: ["React", "Socket.io", "WebRTC", "Node.js", "MongoDB"],
      githubLink: "https://github.com/aditya74841/whatsapp-Clone",
      features: [
        "End-to-end encryption",
        "Voice/video calls",
        "Group management",
        "File sharing",
        "Status updates",
      ],
      completedDate: "September 2024",
      complexity: "Low",
      gradient: "from-emerald-500 via-green-500 to-teal-500",
    },
    {
      id: "proj-8",
      title: "QuoteVerse API",
      description:
        "A comprehensive quotes API with advanced filtering, user-generated content, and machine learning recommendations.",
      image: "/api/placeholder/400/300",
      category: "api",
      techStack: ["Node.js", "Express", "MongoDB", "Swagger", "ML Integration"],
      githubLink: "https://github.com/aditya74841/Quote-Backend",
      liveDemoLink: "https://quote-backend-xqfm.onrender.com/api-docs/",
      apiDocsLink: "https://quote-backend-xqfm.onrender.com/api-docs/",
      features: [
        "ML recommendations",
        "User-generated content",
        "Advanced filtering",
        "Rate limiting",
        "Caching",
      ],
      completedDate: "August 2024",
      complexity: "Low",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    },
    {
      id: "proj-9",
      title: "Docs Hub - Technical Documentation Platform",
      description:
        "A comprehensive technical documentation platform designed to centralize development resources, API references, and project guides for developers and teams.",
      longDescription: "Docs Hub is a centralized platform for managing and viewing technical documentation. It provides a seamless experience for developers to write, organize, and share API references and project guides. With support for MDX, it allows for rich content creation including live code snippets and interactive components.",
      image: "/api/placeholder/400/300",
      category: "documentation",
      techStack: ["React", "Next.js", "Tailwind CSS", "MDX", "Vercel"],
      githubLink: "https://github.com/aditya74841/LiveDocEditor",
      liveDemoLink: "https://docs.iamadityaranjan.com",
      features: [
        "Interactive API documentation",
        "Search functionality",
        "Code examples",
        "Version control",
        "Dark/light mode",
      ],
      challenges: [
        {
          problem: "Managing large MDX content efficiently",
          solution: "Implemented incremental static regeneration (ISR) to handle content updates without rebuilding the entire site."
        },
        {
          problem: "Real-time search across documentation",
          solution: "Integrated Algolia search for instant and relevant search results."
        }
      ],
      completedDate: "November 2024",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      views: "",
      stars: "",
      difficulty: "Intermediate",
      complexity: "Low",
      duration: "4 months",
    },
    {
      id: "proj-10",
      title: "TodoMaster - Advanced Task Manager",
      description:
        "A modern React-based todo application featuring offline support with IndexedDB, elegant UI design, and comprehensive task management capabilities for enhanced productivity.",
      image: "/api/placeholder/400/300",
      category: "productivity",
      techStack: ["React", "IndexedDB", "Tailwind CSS", "PWA", "LocalStorage"],
      githubLink: "https://github.com/aditya74841/todomaster-react-indexeddb",
      liveDemoLink: "https://todo.iamadityaranjan.com",
      features: [
        "Offline functionality",
        "Dark/light theme toggle",
        "Real-time updates",
        "Data persistence",
        "Responsive design",
      ],
      completedDate: "February 2025",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      views: "",
      stars: "",
      difficulty: "Intermediate",
      complexity: "Low",
      duration: "3 months",
    },
    {
      id: "proj-11",
      title: "MetaForge Pro - Meta Tag Generator Suite",
      description:
        "A comprehensive meta tag generation platform featuring 17+ specialized generators for Open Graph and Twitter Cards, with real-time validation and live social media previews.",
      image: "/api/placeholder/400/300",
      category: "seo-tools",
  
      techStack: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Open Graph",
        "Twitter API",
      ],
      githubLink: "https://github.com/aditya74841/Meta_tag_generator",
      liveDemoLink: "https://metaforge.allaboutcse.com",
      features: [
        "17+ meta tag generators",
        "Real-time validation",
        "Live social previews",
        "Copy-paste ready code",
        "Mobile responsive",
      ],
      completedDate: "July 2025",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      views: "",
      stars: "",
      difficulty: "Advanced",
      complexity: "Low",
      duration: "6 months",
    },
  ],
  categories: [
    { id: "all", name: "All Projects", count: 11, icon: "🚀" },
    { id: "web-app", name: "Web Apps", count: 1, icon: "💻" },
    { id: "e-commerce", name: "E-commerce", count: 1, icon: "🛒" },
    { id: "productivity", name: "Productivity", count: 3, icon: "📊" },
    { id: "api", name: "APIs", count: 1, icon: "🔗" },
  ],
};

export default projectsData;
