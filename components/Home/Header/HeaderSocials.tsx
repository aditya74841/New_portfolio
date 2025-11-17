import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";

const HeaderSocials = () => {
  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
      <div className="flex flex-col gap-4">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/iamadityaranjan/"
          target="_blank"
          rel="noreferrer"
          className="group relative p-3 
            bg-gray-100/70 dark:bg-white/10 
            backdrop-blur-sm rounded-full 
            border border-gray-300 dark:border-white/20 
            shadow-lg hover:shadow-xl 
            transition-all duration-300 
            hover:bg-blue-500 hover:border-blue-500"
        >
          <BsLinkedin className="text-gray-900 dark:text-white text-xl group-hover:scale-110 group-hover:text-white transition-all duration-300" />
          <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 
            bg-gray-900 dark:bg-gray-700 
            text-white px-2 py-1 rounded text-sm 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 
            pointer-events-none whitespace-nowrap">
            LinkedIn
          </span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/aditya74841"
          target="_blank"
          rel="noreferrer"
          className="group relative p-3 
            bg-gray-100/70 dark:bg-white/10 
            backdrop-blur-sm rounded-full 
            border border-gray-300 dark:border-white/20 
            shadow-lg hover:shadow-xl 
            transition-all duration-300 
            hover:bg-gray-800 hover:border-gray-800"
        >
          <FaGithub className="text-gray-900 dark:text-white text-xl group-hover:scale-110 group-hover:text-white transition-all duration-300" />
          <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 
            bg-gray-900 dark:bg-gray-700 
            text-white px-2 py-1 rounded text-sm 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 
            pointer-events-none whitespace-nowrap">
            GitHub
          </span>
        </a>

        {/* Twitter */}
        <a
          href="https://x.com/adixranjan08"
          target="_blank"
          rel="noreferrer"
          className="group relative p-3 
            bg-gray-100/70 dark:bg-white/10 
            backdrop-blur-sm rounded-full 
            border border-gray-300 dark:border-white/20 
            shadow-lg hover:shadow-xl 
            transition-all duration-300 
            hover:bg-black hover:border-black"
        >
          <FaSquareXTwitter className="text-gray-900 dark:text-white text-xl group-hover:scale-110 group-hover:text-white transition-all duration-300" />
          <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 
            bg-gray-900 dark:bg-gray-700 
            text-white px-2 py-1 rounded text-sm 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 
            pointer-events-none whitespace-nowrap">
            Twitter
          </span>
        </a>
      </div>
    </div>
  );
};

export default HeaderSocials;

