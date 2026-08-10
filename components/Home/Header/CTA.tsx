import React from "react";
import Link from "next/link";
import { HiDocumentText, HiCode } from "react-icons/hi";

const CTA = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6 mb-4">
      {/* View CV Button -> /cv */}
      <Link
        href="/cv"
        className="px-6 py-3 bg-white text-gray-950 font-bold rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md flex items-center gap-2 text-sm"
      >
        <HiDocumentText className="text-lg" />
        <span>View CV</span>
      </Link>

      {/* View All Projects */}
      <Link
        href="/projects"
        className="px-6 py-3 bg-gray-900/60 border border-gray-800 text-gray-300 font-medium rounded-full hover:border-gray-600 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm"
      >
        <HiCode className="text-lg text-gray-400" />
        <span>All Projects</span>
      </Link>
    </div>
  );
};

export default CTA;
