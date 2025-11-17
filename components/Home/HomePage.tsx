import React, { Suspense } from "react";
import dynamic from 'next/dynamic';
import Header from "./Header/Header";
import ErrorBoundary from "../ErrorBoundary";
import JsonLd from "../JsonLd";
import ScrollToTop from "../ScrollToTop";

// Dynamic imports for better performance
const About = dynamic(() => import("./About/About"), {
  loading: () => <SectionLoader text="Loading About..." />
});

const Experience = dynamic(() => import("./Experience/Experience"), {
  loading: () => <SectionLoader text="Loading Experience..." />
});

const Services = dynamic(() => import("./Services/Services"), {
  loading: () => <SectionLoader text="Loading Services..." />
});

const Portfolio = dynamic(() => import("./Portfolio/Portfolio"), {
  loading: () => <SectionLoader text="Loading Portfolio..." />
});

const Contact = dynamic(() => import("./Contact/Contact"), {
  loading: () => <SectionLoader text="Loading Contact..." />
});

const Footer = dynamic(() => import("./Footer/Footer"), {
  loading: () => <SectionLoader text="Loading Footer..." />
});

// Loader component for sections
const SectionLoader = ({ text }: { text: string }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <ErrorBoundary>
      <main className="relative">
        <JsonLd />
        
        {/* Header is not lazy loaded as it's above the fold */}
        <Header />

        {/* Progressive loading for below-the-fold content */}
        <Suspense fallback={<SectionLoader text="Loading About..." />}>
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader text="Loading Experience..." />}>
          <ErrorBoundary>
            <Experience/>
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader text="Loading Services..." />}>
          <ErrorBoundary>
            <Services/>
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader text="Loading Portfolio..." />}>
          <ErrorBoundary>
            <Portfolio/>
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader text="Loading Contact..." />}>
          <ErrorBoundary>
            <Contact/>
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader text="Loading Footer..." />}>
          <ErrorBoundary>
            <Footer/>
          </ErrorBoundary>
        </Suspense>

        {/* Scroll to top button */}
        <ScrollToTop />
      </main>
    </ErrorBoundary>
  );
};

export default HomePage;
