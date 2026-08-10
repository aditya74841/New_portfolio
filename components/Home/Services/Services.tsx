"use client";

import React, { useEffect, useState } from "react";
import { Code2, Cpu, Database, Layout } from "lucide-react";

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "End-to-end web applications built with Next.js, React, Node.js, and MongoDB. Clean architecture focused on speed, maintainability, and scalability.",
    deliverables: ["Custom Web Apps", "RESTful APIs", "Database Modeling", "Responsive UI"],
  },
  {
    icon: Cpu,
    title: "AI & LLM Integration",
    description:
      "Integrating cutting-edge AI capabilities into web platforms — prompt engineering, Gemini/OpenAI API integration, automated transcriptions, and smart workflows.",
    deliverables: ["AI Summarizers & Bots", "LLM Workflows", "Gemini & OpenAI API", "Context-Aware Features"],
  },
  {
    icon: Database,
    title: "Backend & API Engineering",
    description:
      "Designing robust, secure backend services and API architectures. Experienced with authentication, third-party integrations, and performance optimization.",
    deliverables: ["REST & Express APIs", "JWT Auth Systems", "Database Optimization", "Serverless Functions"],
  },
  {
    icon: Layout,
    title: "Frontend & UI Performance",
    description:
      "Crafting pixel-perfect, accessible user interfaces with modern CSS and Tailwind. Focused on Core Web Vitals, dynamic micro-interactions, and fast TTI.",
    deliverables: ["Next.js & React UI", "Performance Audits", "SEO Optimization", "Cross-Browser Compatibility"],
  },
];

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById("services");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gray-800/20 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-3">
            Core Competencies
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What I Do
          </h2>
          <div className="w-16 h-0.5 bg-gray-600 mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:border-gray-500 transition-all duration-300">
                  <Icon className="w-6 h-6 text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/80">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full border border-gray-700/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;