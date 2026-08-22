"use client"

import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { IconType } from "react-icons";

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  grade?: string;
  description: string;
  icon: IconType;
  color: string;
}

interface WorkItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  type: string;
  link?: string;
  description: string;
  technologies?: string[];
  icon: IconType;
  color: string;
  status?: string;
}

const TimelineItem: React.FC<{
  item: EducationItem | WorkItem;
  index: number;
  isWork: boolean;
}> = ({ item, index, isWork }) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = item.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`timeline-item-${item.id}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [item.id]);

  const isWorkItem = (i: EducationItem | WorkItem): i is WorkItem => {
    return isWork;
  };

  return (
    <div
      id={`timeline-item-${item.id}`}
      className="relative flex flex-col md:flex-row gap-6 md:gap-0 mb-12 last:mb-0"
    >
      {/* Mobile Timeline */}
      <div className="md:hidden flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white shrink-0">
            <Icon className="text-sm text-gray-200" />
          </div>
          <div className="w-0.5 h-full bg-gray-800 mt-2"></div>
        </div>

        <div className="flex-1 bg-gray-900/80 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-start justify-between mb-2">
            <div>
              {isWork && isWorkItem(item) && item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-white text-lg hover:underline flex items-center gap-2"
                >
                  {item.company}
                  <FaExternalLinkAlt className="text-xs text-gray-400" />
                </a>
              ) : (
                <h3 className="font-bold text-white text-lg">
                  {isWork && isWorkItem(item) ? item.company : !isWorkItem(item) ? item.institution : ""}
                </h3>
              )}
              <p className="text-gray-300 text-sm font-semibold">
                {isWork && isWorkItem(item) ? item.position : !isWorkItem(item) ? item.degree : ""}
              </p>
            </div>
            {isWork && isWorkItem(item) && item.status === "current" && (
              <span className="px-2.5 py-1 text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                Current
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-500" /> {item.duration}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-500" /> {item.location}
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {isWork && isWorkItem(item) && item.technologies && (
            <div className="flex flex-wrap gap-1.5">
              {item.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-gray-800 text-gray-300 rounded-md text-xs font-mono border border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Timeline (Alternating) */}
      <div className="hidden md:block w-full">
        <div className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-800"></div>

          {/* Center Icon */}
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center z-10">
            <Icon className="text-white text-lg" />
          </div>

          {/* Content Card */}
          <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
            <div
              className={`bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  {isWork && isWorkItem(item) && item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-white text-xl hover:underline inline-flex items-center gap-2"
                    >
                      {item.company}
                      <FaExternalLinkAlt className="text-xs text-gray-400" />
                    </a>
                  ) : (
                    <h3 className="font-bold text-white text-xl">
                      {isWork && isWorkItem(item) ? item.company : !isWorkItem(item) ? item.institution : ""}
                    </h3>
                  )}
                  <p className="text-gray-300 font-semibold text-base mt-0.5">
                    {isWork && isWorkItem(item) ? item.position : !isWorkItem(item) ? item.degree : ""}
                  </p>
                </div>
                {isWork && isWorkItem(item) && item.status === "current" && (
                  <span className="px-3 py-1 text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-gray-500" /> {item.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-gray-500" /> {item.location}
                </span>
                {isWork && isWorkItem(item) && (
                  <span className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">
                    {item.type}
                  </span>
                )}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              {isWork && isWorkItem(item) && item.technologies && (
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2.5 py-1 bg-gray-800 text-gray-300 rounded-md text-xs font-mono border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector("#experience");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const educationData: EducationItem[] = [
    {
      id: 1,
      institution: "Amritsar College of Engineering & Technology",
      degree: "Bachelor of Technology in Computer Science",
      duration: "2019 - 2023",
      location: "Punjab, India",
      grade: "CGPA: 7.4",
      description: "Focused on Software Engineering, Data Structures, Algorithms, Database Management Systems, and Web Technologies.",
      icon: FaGraduationCap,
      color: "from-blue-500 to-indigo-600"
    }
  ];

  const workData: WorkItem[] = [
    {
      id: 1,
      company: "CodenCreative",
      position: "Full Stack Developer",
      duration: "Feb 2024 - Dec 2025",
      location: "Remote",
      type: "Full-time",
      link: "https://codencreative.com/",
      description: "Improved e-commerce application performance through backend query optimization, code splitting, and CDN integration. Developed secure REST APIs using Node.js, Express, MongoDB, and JWT-based authentication/RBAC.",
      technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Redux", "TailwindCSS"],
      icon: MdWorkOutline,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 2,
      company: "BlackWater Coffee Pvt Ltd.",
      position: "Full Stack Developer",
      duration: "Dec 2022 - Jan 2024",
      location: "Hybrid",
      type: "Full-time",
      link: "https://www.linkedin.com/company/black-water-coffee-company-limited/about/",
      description: "Developed a full-stack POS and inventory management system with real-time stock tracking, automated low-stock alerts, and multi-user authentication. Integrated a Socket.io-based Kitchen Display System (KDS) for order synchronization between POS and kitchen.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "WebSockets"],
      icon: FaBriefcase,
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-28 bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-3">
            My Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience &amp; Education
          </h2>
          <div className="w-16 h-0.5 bg-gray-700 mx-auto"></div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-gray-900 rounded-full border border-gray-800">
            <button
              onClick={() => setActiveTab("work")}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === "work"
                  ? "bg-white text-gray-950 shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaBriefcase className="text-xs" />
              <span>Work Experience</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === "education"
                  ? "bg-white text-gray-950 shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaGraduationCap className="text-xs" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "work" ? (
            <div>
              {workData.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} isWork={true} />
              ))}
            </div>
          ) : (
            <div>
              {educationData.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} isWork={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;