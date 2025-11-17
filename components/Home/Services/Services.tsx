"use client";

import React, { useState, useEffect } from "react";
import { 
  FaCode, 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaGitAlt, 
  FaGithub, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaBootstrap,
  FaTools,
  FaMobile,
  FaServer,
  FaMobileAlt
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiMongodb, 
  SiExpress, 
  SiDjango, 
  SiPostman,
  SiTailwindcss,
  SiMysql,
  SiCplusplus
} from "react-icons/si";
import { IconType } from "react-icons";
// import SEO from "../../SEO";

// Type definitions
interface Skill {
  name: string;
  icon: IconType;
  level: number;
  color: string;
}

interface SkillsData {
  languages: Skill[];
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

interface Category {
  id: CategoryId;
  name: string;
  icon: IconType;
}

type CategoryId = 'all' | 'languages' | 'frontend' | 'backend' | 'tools';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

interface CategoryCardProps {
  category: Category;
  skills: Skill[];
}

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const skillsData: SkillsData = {
    languages: [
      { name: "C", icon: FaCode, level: 75, color: "from-blue-500 to-blue-600" },
      { name: "C++", icon: SiCplusplus, level: 80, color: "from-blue-600 to-indigo-600" },
      { name: "Python", icon: FaPython, level: 85, color: "from-yellow-500 to-green-500" },
      { name: "JavaScript", icon: FaJs, level: 90, color: "from-yellow-400 to-yellow-500" },
      { name: "TypeScript", icon: SiTypescript, level: 75, color: "from-blue-500 to-blue-700" },
    ],
    frontend: [
      { name: "HTML", icon: FaHtml5, level: 95, color: "from-orange-500 to-red-500" },
      { name: "CSS", icon: FaCss3Alt, level: 90, color: "from-blue-400 to-blue-600" },
      { name: "React.js", icon: FaReact, level: 90, color: "from-cyan-400 to-cyan-600" },
      { name: "Next.js", icon: SiNextdotjs, level: 80, color: "from-gray-700 to-gray-900" },
      { name: "Bootstrap", icon: FaBootstrap, level: 85, color: "from-purple-500 to-purple-700" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 88, color: "from-teal-400 to-cyan-500" },
      { name: "React Native", icon: FaMobileAlt, level: 70, color: "from-blue-500 to-cyan-500" },
    ],
    backend: [
      { name: "Node.js", icon: FaNodeJs, level: 85, color: "from-green-500 to-green-600" },
      { name: "Express.js", icon: SiExpress, level: 80, color: "from-gray-600 to-gray-800" },
      { name: "MongoDB", icon: SiMongodb, level: 85, color: "from-green-400 to-green-600" },
      { name: "MySQL", icon: SiMysql, level: 75, color: "from-blue-500 to-blue-700" },
      { name: "Django", icon: SiDjango, level: 70, color: "from-green-600 to-green-800" },
    ],
    tools: [
      { name: "Git", icon: FaGitAlt, level: 90, color: "from-orange-500 to-red-500" },
      { name: "GitHub", icon: FaGithub, level: 95, color: "from-gray-700 to-gray-900" },
      { name: "Postman", icon: SiPostman, level: 85, color: "from-orange-400 to-orange-600" },
    ]
  };

  const categories: Category[] = [
    { id: 'all', name: 'All Skills', icon: FaCode },
    { id: 'languages', name: 'Languages', icon: FaCode },
    { id: 'frontend', name: 'Frontend', icon: FaMobile },
    { id: 'backend', name: 'Backend', icon: FaServer },
    { id: 'tools', name: 'Tools', icon: FaTools },
  ];

  const getFilteredSkills = (): Skill[] => {
    if (activeCategory === 'all') {
      return [
        ...skillsData.languages,
        ...skillsData.frontend,
        ...skillsData.backend,
        ...skillsData.tools
      ];
    }
    return skillsData[activeCategory] || [];
  };

  const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
    const Icon = skill.icon;
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setProgress(skill.level);
        }, index * 100);
        return () => clearTimeout(timer);
      }
    }, [skill.level, index, isVisible]);

    return (
      <div className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${index * 100}ms` }}>
        {/* Skill Icon and Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${skill.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="text-white text-xl" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
              {skill.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {skill.level}% Proficiency
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className={`bg-linear-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Skill Level Badge */}
        <div className="mt-4 flex justify-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            skill.level >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            skill.level >= 80 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
            skill.level >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
          }`}>
            {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Intermediate' : 'Beginner'}
          </span>
        </div>
      </div>
    );
  };

  const CategoryCard: React.FC<CategoryCardProps> = ({ category, skills }) => {
    const Icon = category.icon;
    
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Icon className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {category.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {skills.length} Skills
            </p>
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          {skills.map((skill, index) => {
            const SkillIcon = skill.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                <div className={`w-8 h-8 rounded-lg bg-linear-to-r ${skill.color} flex items-center justify-center`}>
                  <SkillIcon className="text-white text-sm" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                    <div 
                      className={`bg-linear-to-r ${skill.color} h-1 rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                    {skill.level}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <SEO
        title="Aditya Ranjan | Skills and Expertise"
        description="Explore the skills and expertise of Aditya Ranjan in languages, frontend, and backend technologies including React, Node.js, MongoDB, and more."
        keywords="Aditya Ranjan, Full Stack Developer, Web Developer, Skills, Languages, Tools, React, Node.js, MongoDB, Express"
      /> */}
      
      <section id="services" className="py-12 md:py-20 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h5 className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-light mb-2">
              What Skills I Have
            </h5>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
              Technical Expertise
            </h2>
            <div className="w-16 md:w-24 h-1 bg-linear-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === category.id
                      ? 'bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
                  }`}
                >
                  <Icon className="text-sm md:text-base" />
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Skills Grid View */}
          <div className="block md:hidden">
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {getFilteredSkills().map((skill, index) => (
                <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Desktop Category View */}
          <div className="hidden md:block">
            {activeCategory === 'all' ? (
              <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {Object.entries(skillsData).map(([key, skills]) => {
                  const category = categories.find(cat => cat.id === key);
                  return category ? (
                    <CategoryCard key={key} category={category} skills={skills} />
                  ) : null;
                })}
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {getFilteredSkills().map((skill, index) => (
                  <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Stats Summary */}
          <div className={`mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaCode className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
                {skillsData.languages.length}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Languages</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaMobile className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
                {skillsData.frontend.length}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Frontend</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaServer className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
                {skillsData.backend.length}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Backend</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaTools className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
                {skillsData.tools.length}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Tools</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;