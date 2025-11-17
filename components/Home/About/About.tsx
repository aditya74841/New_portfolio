"use client"

import React, { useEffect, useState } from "react";
// import CV from "../../../assets/aditya_resume.pdf";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { FiUsers, FiMessageCircle } from "react-icons/fi";
import { BiGitRepoForked } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { Briefcase, Rocket, Globe, BookOpen } from "lucide-react";
// import SEO from "../../SEO";
// import { Link } from "react-router-dom";

interface githubStatsType {
  followers: number;
  public_repos: number;
  stargazers: number;
}

const About = () => {
  const [githubStats, setGithubStats] = useState<githubStatsType>({
    followers: 0,
    public_repos: 0,
    stargazers: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

//   useEffect(() => {
//     const fetchGithubStats = async () => {
//       const token = process.env.REACT_APP_GITHUB_TOKEN!;
//       const headers: object = token ? { Authorization: `Bearer ${token}` } : {};

//       try {
//         const response = await fetch(
//           "https://api.github.com/users/aditya74841",
//           { headers }
//         );
//         if (!response.ok) {
//           throw new Error(`GitHub API error: ${response.status}`);
//         }
//         const data = await response.json();

//         const reposResponse = await fetch(
//           "https://api.github.com/users/aditya74841/repos",
//           { headers }
//         );
//         if (!reposResponse.ok) {
//           throw new Error(`GitHub Repos API error: ${reposResponse.status}`);
//         }
//         const repos = await reposResponse.json();
//         const totalStars = repos.reduce(
//           (acc, repo) => acc + repo.stargazers_count,
//           0
//         );

//         setGithubStats({
//           followers: data.followers,
//           public_repos: data.public_repos,
//           stargazers: totalStars,
//         });
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching GitHub stats:", err);
//       }
//     };

//     fetchGithubStats();
//   }, []);


useEffect(() => {
    const fetchGithubStats = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Note: Use NEXT_PUBLIC_ prefix for client-side
      
      // Fix: Use proper HeadersInit type or Record<string, string>
      const headers: HeadersInit = token 
        ? { Authorization: `Bearer ${token}` } 
        : {};
  
      try {
        const response = await fetch(
          "https://api.github.com/users/aditya74841",
          { headers }
        );
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
  
        const reposResponse = await fetch(
          "https://api.github.com/users/aditya74841/repos",
          { headers }
        );
        
        if (!reposResponse.ok) {
          throw new Error(`GitHub Repos API error: ${reposResponse.status}`);
        }
        
        const repos = await reposResponse.json();
        const totalStars = repos.reduce(
          (acc: number, repo: any) => acc + repo.stargazers_count,
          0
        );
  
        setGithubStats({
          followers: data.followers,
          public_repos: data.public_repos,
          stargazers: totalStars,
        });
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching GitHub stats:", err);
      }
    };
  
    fetchGithubStats();
  }, []);


  // ✅ Replaced About Cards with Quick Facts
  const quickFacts = [
    {
      icon: <Briefcase className="w-7 h-7 text-indigo-500" />,
      title: "2+ Years",
      desc: "Development Experience",
    },
    {
      icon: <Rocket className="w-7 h-7 text-indigo-500" />,
      title: "10+ Projects",
      desc: "Completed Successfully",
    },
    {
      icon: <Globe className="w-7 h-7 text-indigo-500" />,
      title: "Based in India",
      desc: "Working Remotely Worldwide",
    },
    {
      icon: <BookOpen className="w-7 h-7 text-indigo-500" />,
      title: "Currently Learning",
      desc: "AI + System Design",
    },
  ];

  return (
    <>
      {/* <SEO
        title="About Aditya Ranjan | Full Stack Developer"
        description="Learn more about Aditya Ranjan, a passionate Full Stack Web Developer with experience in building dynamic applications using modern technologies."
        keywords="Aditya Ranjan, Full Stack Developer, Web Developer, React Developer, Node.js, Web Development"
      /> */}

      <section
        id="about"
        className="py-20 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h5 className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light mb-2">
              Get to Know
            </h5>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* ✅ Quick Facts Section */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {quickFacts.map((fact, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-3">{fact.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {fact.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 text-center">
                  {fact.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">👋</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                  Hello, I'm Aditya!
                </h3>
              </div>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                I am a passionate
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {" "}
                  full stack developer
                </span>{" "}
                with over two years of experience building fast, reliable, and
                scalable web applications. My expertise spans modern front-end
                technologies like
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {" "}
                  HTML, CSS, JavaScript, React, and Next.js
                </span>
                , while on the back-end I work with
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {" "}
                  Node.js and Python
                </span>{" "}
                to create robust APIs, manage databases, and deliver smooth
                deployment pipelines. I focus on writing clean, maintainable
                code and building user-centric solutions that perform at scale.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#contact"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <FiMessageCircle className="group-hover:rotate-12 transition-transform duration-300" />
                  Let's Talk
                </a>
                <a
                  href="/aditya_resume.pdf"
                  download
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600"
                >
                  <FaDownload className="group-hover:bounce transition-transform duration-300" />
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* GitHub Stats */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🐙</span>
                </div>
                <h3 className="text-2xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-gray-200 dark:to-gray-400">
                  GitHub Stats
                </h3>
              </div>

              {error ? (
                <p className="text-red-500 text-center py-8">
                  Error fetching GitHub stats: {error}
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiUsers className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {githubStats.followers}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Followers
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BiGitRepoForked className="text-green-600 dark:text-green-400 text-xl" />
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {githubStats.public_repos}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Repositories
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AiOutlineStar className="text-yellow-600 dark:text-yellow-400 text-xl" />
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {githubStats.stargazers}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Stars
                    </p>
                  </div>
                </div>
              )}

              <a
                // to="/aditya-github"
                className="group/btn flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-gray-800 to-gray-600 text-white rounded-full hover:from-gray-700 hover:to-gray-500 transition-all duration-300 transform hover:scale-105"
                href="https://github.com/aditya74841"
                target="_blank"
                rel="noopener noreferrer"
              >
                View More on GitHub
                <FaExternalLinkAlt className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* LeetCode Stats */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🏆</span>
                </div>
                <h3 className="text-2xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  LeetCode Stats
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 dark:text-green-400 text-xl">
                      ✅
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {githubStats.followers}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Solved
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">
                      🏅
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    770,314
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ranking
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-400 text-xl">
                      🎯
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    15
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Contests
                  </p>
                </div>
              </div>

              <a
                href="https://leetcode.com/aditya7884"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
              >
                View More on LeetCode
                <FaExternalLinkAlt className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
