

const CTA = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-12">
      <a
        href="#contact"
        className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-linear-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
      >
        <span className="relative z-10 flex items-center gap-2">
          Let's Talk
          <span className="text-lg">💬</span>
        </span>
        <div className="absolute inset-0 w-full h-full bg-linear-to-r from-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      </a>

      <a
        href="/cv"
        className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-gray-800 bg-white border-2 border-gray-200 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out hover:border-indigo-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="relative z-10 flex items-center gap-2">
          View Resume
          <span className="text-lg">📄</span>
        </span>
      </a>

      {/* <Link 
                to="/daily-update" 
                className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
            >
                <span className="relative z-10 flex items-center gap-2">
                    Daily Update
                    <span className="text-lg">📱</span>
                </span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </Link> */}
    </div>
  );
};

export default CTA;
