"use client"

import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaUser,
  FaClipboard,
  FaExternalLinkAlt,
  FaCode,
  FaTools,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { toast } from "react-hot-toast";

// Type definitions
interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
  download?: boolean;
}

interface ResumeSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface ExperienceItemProps {
  company: string;
  role: string;
  duration: string;
  location: string;
  points: string[];
}

interface ProjectLink {
  text: string;
  url: string;
  type: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  links: ProjectLink[];
}

interface SkillCategoryProps {
  title: string;
  items: string[];
}

interface EducationItemProps {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  cgpa?: string;
  percentage?: string;
  subjects?: string[];
}

const Resume: React.FC = () => {
  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50 text-gray-800 font-inter py-10 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-white shadow-2xl rounded-3xl p-8 border border-slate-200 lg:sticky lg:top-6 h-fit">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img src="/letter-a.png" alt="A" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Aditya Ranjan
            </h1>
            <p className="text-indigo-600 font-medium text-lg">
              Full Stack  Developer
            </p>
            <p className="text-sm text-gray-500 mt-1">2+ Years Experience</p>
          </div>

          <div className="space-y-4 text-sm">
            <ContactItem icon={<FaPhoneAlt />} text="+91 74810 92465" />
            <ContactItem
              icon={<FaEnvelope />}
              text="aditya@iamadityaranjan.com"
              href="mailto:aditya@iamadityaranjan.com"
            />
            <ContactItem
              icon={<FaLinkedin />}
              text="LinkedIn Profile"
              href="https://www.linkedin.com/in/iamadityaranjan/"
            />
            <ContactItem
              icon={<FaGithub />}
              text="GitHub Profile"
              href="https://github.com/aditya74841"
            />
            <ContactItem
              icon={<FaGlobe />}
              text="Portfolio Website"
              href="/"
            />

            <div className="pt-4 border-t border-gray-200">
              <ContactItem
                icon={<FaUser />}
                text="Download Resume"
                href="/aditya_resume.pdf"
                download
              />
              <div
                className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700 transition-colors mt-3 p-2 rounded-lg hover:bg-indigo-50"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                      toast.success("CV link copied to clipboard!");
                    })
                    .catch(() => {
                      toast.error("Failed to copy link. Please try again.");
                    });
                }}
              >
                <FaClipboard className="mr-3" /> Copy CV Link
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3 space-y-10">
          <ResumeSection title="Professional Summary" icon={<FaUser />}>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <p className="text-gray-700 leading-relaxed">
                I am a Full Stack Developer with more than two years of
                experience in building web applications and improving system
                performance. Skilled in building scalable, high-performance
                applications that improve reliability, user experience, and
                business outcomes. I have strong skills in modern JavaScript
                frameworks, databases, and agile methods. I also use
                artificial intelligence in my daily work to make tasks easier
                and more efficient.
              </p>
            </div>
          </ResumeSection>

          <ResumeSection title="Professional Experience" icon={<FaCode />}>
            <div className="space-y-6">
              <ExperienceItem
                company="CodenCreative"
                role="Full Stack Developer"
                duration="Feb 2024 – Present"
                location="On-Site"
                points={[
                  "Optimized e-commerce platform performance, achieving 30% faster load times and 20% higher user engagement through code optimization and caching strategies",
                  "Led frontend development for research applications, improving data visualization efficiency by 25%",
                  "Leveraged AI tools (ChatGPT, Claude, Cursor, etc.) for coding assistance, debugging, and automating repetitive tasks, improving overall productivity and code quality"
                ]}
              />
              <ExperienceItem
                company="BlackWater Coffee Pvt Ltd."
                role="Full Stack Developer"
                duration="Dec 2022 – Jan 2024"
                location="On-Site"
                points={[
                  "Designed and deployed a POS system handling 500+ daily transactions, reducing average checkout time by 40% (3.5 → 2.1 minutes)",
                  "Developed an inventory management module, decreasing stock discrepancies by 30% and improving accuracy from 75% to 95%",
                  "Integrated Kitchen Display System accelerating order fulfillment by 25%"
                ]}
              />
            </div>
          </ResumeSection>

          <ResumeSection title="Key Projects" icon={<FaTools />}>
            <div className="grid gap-6">
              <ProjectCard
                title="Audit Management System"
                description="Built an end-to-end audit management system for companies to audit multiple store locations with standardized question sets and structured response collection."
                highlights={[
                  "Multimedia support (photo, video, file, text)",
                  "Standardized question sets",
                  "Structured response collection",
                  "Multi-location audit management"
                ]}
                technologies={[
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "JWT",
                  "Socket.io",
                  "Next.js",
                  "ShadCN UI",
                  "Tailwind CSS",
                  "Cloudinary"
                ]}
                links={[
                  {
                    text: "Live Demo",
                    url: "https://audit.iamadityaranjan.com",
                    type: "demo",
                  }
                ]}
              />

              <ProjectCard
                title="MetaForge Pro - Meta Tag Generator Suite"
                description="Developed a full-stack meta tag generator platform with 17+ specialized generators for optimizing content across social media platforms and search engines."
                highlights={[
                  "17+ specialized generators",
                  "Real-time validation",
                  "Live preview functionality",
                  "Enterprise-grade Open Graph & Twitter Cards"
                ]}
                technologies={[
                  "JavaScript",
                  "Next.js",
                  "HTML5",
                  "CSS3",
                  "Responsive Design"
                ]}
                links={[
                  {
                    text: "Live Demo",
                    url: "https://metaforge.allaboutcse.com",
                    type: "demo",
                  }
                ]}
              />

              <ProjectCard
                title="View More Projects"
                description="Explore additional projects showcasing technical capabilities and innovative solutions."
                highlights={[
                  "Full project portfolio",
                  "Live demonstrations",
                  "Source code access",
                  "Technical documentation"
                ]}
                technologies={[
                  "Various Technologies"
                ]}
                links={[
                  {
                    text: "Portfolio",
                    url: "https://iamadityaranjan.com/projects",
                    type: "demo",
                  }
                ]}
              />
            </div>
          </ResumeSection>

          <ResumeSection title="Technical Skills" icon={<FaTools />}>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkillCategory
                  title="Frontend"
                  items={[
                    "JavaScript (ES6+)",
                    "React.js",
                    "Next.js",
                    "TypeScript",
                    "Redux",
                    "TailwindCSS"
                  ]}
                />
                <SkillCategory
                  title="Backend"
                  items={[
                    "Node.js",
                    "Express.js",
                    "RESTful APIs",
                    "JWT Authentication"
                  ]}
                />
                <SkillCategory
                  title="Database"
                  items={[
                    "MongoDB"
                  ]}
                />
                <SkillCategory
                  title="Development Tools"
                  items={[
                    "Git/GitHub",
                    "Postman",
                    "Socket.io",
                    "Cloudinary",
                    "Vite"
                  ]}
                />
                <SkillCategory
                  title="Methodologies"
                  items={[
                    "Agile Development",
                    "Test-Driven Development",
                    "Responsive Design"
                  ]}
                />
                <SkillCategory
                  title="AI Tools & Technologies"
                  items={[
                    "ChatGPT",
                    "Claude",
                    "Perplexity",
                    "Quodogen",
                    "Cursor",
                    "Prompt Engineering"
                  ]}
                />
              </div>
            </div>
          </ResumeSection>

          <ResumeSection title="Education" icon={<FaUser />}>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="space-y-6">
                <EducationItem
                  degree="Bachelor of Technology"
                  field="Computer Science"
                  institution="Amritsar College of Engineering & Technology"
                  duration="2019 – 2023"
                  cgpa="7.4"
                />
              </div>
            </div>
          </ResumeSection>
        </main>
      </div>
    </div>
  );
};

const ContactItem: React.FC<ContactItemProps> = ({ icon, text, href, download = false }) => (
  <div className="flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
    <span className="mr-3 text-indigo-500 text-lg">{icon}</span>
    {href ? (
      <a
        href={href}
        download={download}
        target="_blank"
        rel="noreferrer"
        className="text-gray-700 hover:text-indigo-600 transition-colors text-sm font-medium"
      >
        {text}
      </a>
    ) : (
      <span className="text-gray-700 text-sm">{text}</span>
    )}
  </div>
);

const ResumeSection: React.FC<ResumeSectionProps> = ({ title, icon, children }) => (
  <section>
    <div className="flex items-center mb-6">
      <span className="text-indigo-500 text-xl mr-3">{icon}</span>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </section>
);

const ExperienceItem: React.FC<ExperienceItemProps> = ({ company, role, duration, location, points }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{company}</h3>
        <p className="text-indigo-600 font-medium">{role}</p>
      </div>
      <div className="text-right text-sm text-gray-500">
        <p>{duration}</p>
        <p>{location}</p>
      </div>
    </div>
    <ul className="space-y-2">
      {points.map((point, idx) => (
        <li key={idx} className="flex items-start">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 shrink-0"></span>
          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  highlights,
  technologies,
  links,
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>

    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">
        Key Features:
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-center text-sm text-gray-600">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
            {highlight}
          </div>
        ))}
      </div>
    </div>

    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">
        Technologies:
      </h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    <div className="flex flex-wrap gap-3 pt-2">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          {link.text}
          <FaExternalLinkAlt className="ml-1 text-xs" />
        </a>
      ))}
    </div>
  </div>
);

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, items }) => (
  <div>
    <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
          <span className="text-sm text-gray-700">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const EducationItem: React.FC<EducationItemProps> = ({
  degree,
  field,
  institution,
  duration,
  cgpa,
  percentage,
  subjects,
}) => (
  <div>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
      <div>
        <h4 className="font-bold text-gray-900">{degree}</h4>
        <p className="text-indigo-600 font-medium">{field}</p>
        <p className="text-gray-600 text-sm">{institution}</p>
      </div>
      <div className="text-right text-sm text-gray-500">
        <p>{duration}</p>
        {cgpa && <p>CGPA: {cgpa}</p>}
        {percentage && <p>{percentage}</p>}
      </div>
    </div>
    {subjects && (
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          <strong>Key Subjects:</strong> {subjects.join(", ")}
        </p>
      </div>
    )}
  </div>
);

export default Resume;
