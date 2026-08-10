"use client";

import React, { useEffect, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaJs,
  FaDocker,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiPostgresql,
  SiVercel,
  SiOpenai,
} from "react-icons/si";
import { IconType } from "react-icons";
import { TbBrandAws } from "react-icons/tb";
import { BiLogoGoogleCloud } from "react-icons/bi";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
  bg: string;
}

interface SkillGroup {
  category: string;
  emoji: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    emoji: "🎨",
    skills: [
      { name: "React", icon: FaReact, color: "text-cyan-400", bg: "bg-cyan-400/10 hover:bg-cyan-400/20 border-cyan-400/30" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-gray-300", bg: "bg-gray-300/10 hover:bg-gray-300/20 border-gray-500/30" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-400", bg: "bg-blue-400/10 hover:bg-blue-400/20 border-blue-400/30" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-400", bg: "bg-yellow-400/10 hover:bg-yellow-400/20 border-yellow-400/30" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400", bg: "bg-teal-400/10 hover:bg-teal-400/20 border-teal-400/30" },
    ],
  },
  {
    category: "Backend",
    emoji: "⚙️",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-400", bg: "bg-green-400/10 hover:bg-green-400/20 border-green-400/30" },
      { name: "Express.js", icon: SiExpress, color: "text-gray-300", bg: "bg-gray-300/10 hover:bg-gray-300/20 border-gray-500/30" },
      { name: "Python", icon: FaPython, color: "text-blue-300", bg: "bg-blue-300/10 hover:bg-blue-300/20 border-blue-300/30" },
      { name: "REST APIs", icon: FaNodeJs, color: "text-emerald-400", bg: "bg-emerald-400/10 hover:bg-emerald-400/20 border-emerald-400/30" },
    ],
  },
  {
    category: "Database",
    emoji: "🗄️",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500", bg: "bg-green-500/10 hover:bg-green-500/20 border-green-500/30" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400", bg: "bg-blue-400/10 hover:bg-blue-400/20 border-blue-400/30" },
    ],
  },
  {
    category: "DevOps & Tools",
    emoji: "🛠️",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-orange-400", bg: "bg-orange-400/10 hover:bg-orange-400/20 border-orange-400/30" },
      { name: "Docker", icon: FaDocker, color: "text-blue-400", bg: "bg-blue-400/10 hover:bg-blue-400/20 border-blue-400/30" },
      { name: "Vercel", icon: SiVercel, color: "text-gray-300", bg: "bg-gray-300/10 hover:bg-gray-300/20 border-gray-500/30" },
      { name: "AWS", icon: TbBrandAws, color: "text-orange-300", bg: "bg-orange-300/10 hover:bg-orange-300/20 border-orange-300/30" },
    ],
  },
  {
    category: "AI / ML",
    emoji: "🤖",
    skills: [
      { name: "Gemini API", icon: BiLogoGoogleCloud, color: "text-blue-300", bg: "bg-blue-300/10 hover:bg-blue-300/20 border-blue-300/30" },
      { name: "OpenAI", icon: SiOpenai, color: "text-emerald-300", bg: "bg-emerald-300/10 hover:bg-emerald-300/20 border-emerald-300/30" },
      { name: "Prompt Eng.", icon: SiOpenai, color: "text-purple-300", bg: "bg-purple-300/10 hover:bg-purple-300/20 border-purple-300/30" },
    ],
  },
];

const SkillBadge = ({
  skill,
  delay,
  visible,
}: {
  skill: Skill;
  delay: number;
  visible: boolean;
}) => {
  const Icon = skill.icon;
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 cursor-default ${skill.bg} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      title={skill.name}
    >
      <Icon className={`text-xl ${skill.color} group-hover:scale-110 transition-transform duration-300`} />
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
};

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById("skills");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  let globalDelay = 0;

  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-gray-900 relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-3">
            Technical Arsenal
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-16 h-0.5 bg-gray-600 mx-auto"></div>
        </div>

        {/* Skill Groups */}
        <div className="space-y-12">
          {SKILL_GROUPS.map((group, gi) => {
            return (
              <div
                key={group.category}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${gi * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{group.emoji}</span>
                  <h3 className="text-lg font-semibold text-gray-300 uppercase tracking-wider">
                    {group.category}
                  </h3>
                  <div className="flex-1 h-px bg-gray-800"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, si) => {
                    const delay = 200 + (globalDelay++ * 60);
                    return (
                      <SkillBadge
                        key={skill.name}
                        skill={skill}
                        delay={delay}
                        visible={isVisible}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
