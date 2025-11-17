

"use client"
import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaBriefcase, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdWorkOutline, MdSchool } from "react-icons/md";
import { IconType } from "react-icons";

// Type definitions
interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  location: string;
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
  link: string;
  description: string;
  technologies: string[];
  icon: IconType;
  color: string;
  status?: string;
}

interface TimelineItemProps {
  item: EducationItem | WorkItem;
  index: number;
  isWork?: boolean;
}

type TabType = 'education' | 'work';

const Experience: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('education');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('experience');
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
      institution: "Amritsar College of Engineering and Technology",
      degree: "Bachelor in Technology – Computer Science and Engineering",
      duration: "2019 - 2023",
      grade: "CGPA: 7.4",
      location: "Amritsar, Punjab",
      description: "Focused on computer science fundamentals, software engineering, and modern web technologies.",
      icon: FaGraduationCap,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      institution: "Deochand College",
      degree: "12th Standard",
      duration: "2017 - 2019",
      grade: "Percentage: 70%",
      location: "Bihar, India",
      description: "Completed higher secondary education with focus on Science stream.",
      icon: MdSchool,
      color: "from-green-500 to-emerald-600"
    }
  ];

  const workData: WorkItem[] = [
    {
      id: 1,
      company: "CodenCreative",
      position: "Full Stack Developer",
      duration: "Feb 2024 - Present",
      location: "Remote",
      type: "Full-time",
      link: "https://codencreative.com/",
      description: "Building full-stack development projects, building scalable web applications.",
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "Next.js"],
      icon: MdWorkOutline,
      color: "from-purple-500 to-pink-600",
      status: "current"
    },
    {
      id: 2,
      company: "Black Water Coffee Pvt Ltd.",
      position: "Full Stack Developer",
      duration: "Nov 2022 - Jan 2024",
      location: "Hybrid",
      type: "Full-time",
      link: "https://www.linkedin.com/company/black-water-coffee-company-limited/about/",
      description: "Created  the Pos system and also created the protoype App",
      technologies: ["React", "Nodejs","MongoDB", "Express.js", "Next.js","React Native",],
      icon: FaBriefcase,
      color: "from-orange-500 to-red-600"
    },
    // {
    //   id: 3,
    //   company: "CodenCreative",
    //   position: "Frontend Developer Intern",
    //   duration: "July 2022 - Sept 2022",
    //   location: "Remote",
    //   type: "Internship",
    //   link: "https://codencreative.com/",
    //   description: "Worked on responsive web design, implemented UI components, and collaborated with the development team.",
    //   technologies: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
    //   icon: MdWorkOutline,
    //   color: "from-cyan-500 to-blue-600"
    // }
  ];

  const isWorkItem = (item: EducationItem | WorkItem): item is WorkItem => {
    return 'company' in item;
  };

  const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isWork = false }) => {
    const Icon = item.icon;
    const animationDelay = `delay-${(index + 1) * 200}`;

    return (
      <div className="relative flex items-start mb-8 md:mb-12 group">
        {/* Mobile Timeline (Vertical) */}
        <div className="md:hidden">
          <div className="flex items-start gap-4">
            {/* Timeline dot */}
            <div className={`shrink-0 w-12 h-12 rounded-full bg-linear-to-r ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="text-white text-lg" />
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${animationDelay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Header */}
                <div className="mb-3">
                  {isWork && isWorkItem(item) ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="group/link flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {item.company}
                      </h3>
                      <FaExternalLinkAlt className="text-xs opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                    </a>
                  ) : (
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {!isWorkItem(item) && item.institution}
                    </h3>
                  )}
                  
                  <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    {isWork && isWorkItem(item) ? item.position : !isWorkItem(item) && item.degree}
                  </p>
                  
                  {'grade' in item && item.grade && (
                    <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                      {item.grade}
                    </p>
                  )}
                  
                  {isWork && isWorkItem(item) && item.status === 'current' && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-full mb-2">
                      Current
                    </span>
                  )}
                </div>

                {/* Duration and location */}
                <div className="flex flex-col gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-indigo-500 text-xs" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500 text-xs" />
                    <span>{item.location}</span>
                    {isWork && isWorkItem(item) && (
                      <span className="ml-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                        {item.type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Technologies */}
                {isWork && isWorkItem(item) && item.technologies && (
                  <div className="flex flex-wrap gap-1">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-linear-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Connection line for mobile */}
          {index < (isWork ? workData.length - 1 : educationData.length - 1) && (
            <div className="ml-6 w-0.5 h-8 bg-linear-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 mt-2"></div>
          )}
        </div>

        {/* Desktop Timeline (Horizontal) */}
        <div className="hidden md:block w-full">
          <div className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
            
            {/* Timeline dot */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-linear-to-r ${item.color} flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="text-white text-xl" />
            </div>

            {/* Content card */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ${animationDelay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {isWork && isWorkItem(item) ? (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group/link flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                      >
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                          {item.company}
                        </h3>
                        <FaExternalLinkAlt className="text-sm opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                      </a>
                    ) : (
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        {!isWorkItem(item) && item.institution}
                      </h3>
                    )}
                    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      {isWork && isWorkItem(item) ? item.position : !isWorkItem(item) && item.degree}
                    </p>
                    {'grade' in item && item.grade && (
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        {item.grade}
                      </p>
                    )}
                  </div>
                  {isWork && isWorkItem(item) && item.status === 'current' && (
                    <span className="px-3 py-1 text-xs font-medium bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-full">
                      Current
                    </span>
                  )}
                </div>

                {/* Duration and location */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-indigo-500" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{item.location}</span>
                  </div>
                  {isWork && isWorkItem(item) && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                      {item.type}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Technologies */}
                {isWork && isWorkItem(item) && item.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-linear-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
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

  return (
    <>
      <section id="experience" className="py-12 md:py-20 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-linear-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h5 className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-light mb-2">
              My Journey
            </h5>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
              Experience & Education
            </h2>
            <div className="w-16 md:w-24 h-1 bg-linear-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Tab Navigation */}
          <div className={`flex justify-center mb-8 md:mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 md:p-2 shadow-lg border border-white/20 w-full max-w-md">
              <div className="flex gap-1 md:gap-2">
                <button
                  onClick={() => setActiveTab('education')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                    activeTab === 'education'
                      ? 'bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <FaGraduationCap className="text-sm md:text-base" />
                  <span className="hidden sm:inline">Education</span>
                </button>
                <button
                  onClick={() => setActiveTab('work')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                    activeTab === 'work'
                      ? 'bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <FaBriefcase className="text-sm md:text-base" />
                  <span className="hidden sm:inline">Work Experience</span>
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="relative max-w-6xl mx-auto">
            {activeTab === 'education' && (
              <div className="relative">
                {educationData.map((item, index) => (
                  <TimelineItem key={item.id} item={item} index={index} isWork={false} />
                ))}
              </div>
            )}
            
            {activeTab === 'work' && (
              <div className="relative">
                {workData.map((item, index) => (
                  <TimelineItem key={item.id} item={item} index={index} isWork={true} />
                ))}
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className={`mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaBriefcase className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">2+</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Years Experience</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <MdWorkOutline className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">2</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Companies Worked</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaGraduationCap className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">B.Tech</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Computer Science</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;