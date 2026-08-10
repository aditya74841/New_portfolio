import React, { Suspense } from "react";
import dynamic from 'next/dynamic';
import Header from "./Header/Header";
import ErrorBoundary from "../ErrorBoundary";
import JsonLd from "../JsonLd";
import ScrollToTop from "../ScrollToTop";

// Dynamic imports for better performance
const Stats = dynamic(() => import("./Stats/Stats"), {
  loading: () => <SectionLoader text="Loading..." />,
});

const About = dynamic(() => import("./About/About"), {
  loading: () => <SectionLoader text="Loading About..." />,
});

const Skills = dynamic(() => import("./Skills/Skills"), {
  loading: () => <SectionLoader text="Loading Skills..." />,
});

const Experience = dynamic(() => import("./Experience/Experience"), {
  loading: () => <SectionLoader text="Loading Experience..." />,
});

const Portfolio = dynamic(() => import("./Portfolio/Portfolio"), {
  loading: () => <SectionLoader text="Loading Portfolio..." />,
});

const Services = dynamic(() => import("./Services/Services"), {
  loading: () => <SectionLoader text="Loading Skills..." />,
});

const Contact = dynamic(() => import("./Contact/Contact"), {
  loading: () => <SectionLoader text="Loading Contact..." />,
});

const Footer = dynamic(() => import("./Footer/Footer"), {
  loading: () => <SectionLoader text="Loading Footer..." />,
});

// Loader component for sections
const SectionLoader = ({ text }: { text: string }) => (
  <div className="min-h-[400px] flex items-center justify-center bg-gray-900">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <ErrorBoundary>
      <main className="relative bg-gray-950">
        <JsonLd />

        {/* 1. Hero */}
        <Header />

        {/* 2. Stats strip */}
        <Suspense fallback={<SectionLoader text="Loading..." />}>
          <ErrorBoundary>
            <Stats />
          </ErrorBoundary>
        </Suspense>

        {/* 3. About */}
        <Suspense fallback={<SectionLoader text="Loading About..." />}>
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        </Suspense>

        {/* 4. Skills */}
        <Suspense fallback={<SectionLoader text="Loading Skills..." />}>
          <ErrorBoundary>
            <Skills />
          </ErrorBoundary>
        </Suspense>

        {/* 5. Experience */}
        <Suspense fallback={<SectionLoader text="Loading Experience..." />}>
          <ErrorBoundary>
            <Experience />
          </ErrorBoundary>
        </Suspense>

        {/* 6. Portfolio */}
        <Suspense fallback={<SectionLoader text="Loading Portfolio..." />}>
          <ErrorBoundary>
            <Portfolio />
          </ErrorBoundary>
        </Suspense>

        {/* 7. Services / What I Do */}
        <Suspense fallback={<SectionLoader text="Loading Services..." />}>
          <ErrorBoundary>
            <Services />
          </ErrorBoundary>
        </Suspense>

        {/* 8. Contact */}
        <Suspense fallback={<SectionLoader text="Loading Contact..." />}>
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </Suspense>

        {/* 9. Footer */}
        <Suspense fallback={<SectionLoader text="Loading Footer..." />}>
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </Suspense>

        {/* Scroll to top button */}
        <ScrollToTop />
      </main>
    </ErrorBoundary>
  );
};

export default HomePage;
