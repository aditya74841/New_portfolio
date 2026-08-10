"use client";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aditya Ranjan",
    url: "https://iamadityaranjan.com",
    image: "https://iamadityaranjan.com/me.jpg",
    sameAs: [
      "https://github.com/aditya74841",
      "https://www.linkedin.com/in/iamadityaranjan/",
      "https://x.com/adixranjan08",
      "https://leetcode.com/aditya7884"
    ],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "CodenCreative",
      url: "https://codencreative.com"
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Amritsar College of Engineering and Technology"
    },
    knowsAbout: [
      "Full Stack Development",
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Express.js",
      "Python",
      "AI Integration",
      "Gemini API",
      "Docker",
      "REST APIs"
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      description: "Builds full-stack web applications using React, Next.js, Node.js, and MongoDB with AI integration capabilities."
    },
    description: "Full Stack Developer with 2+ years of experience in React, Next.js, Node.js, and AI integration. Building high-performance web applications and open source tools.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <link rel="icon" href="/logo.png" type="image/png" />
      <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
      <meta name="application-name" content="Aditya Ranjan Portfolio" />
      <meta name="dc:creator" content="Aditya Ranjan" />
    </>
  );
}