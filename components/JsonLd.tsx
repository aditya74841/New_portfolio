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
      "https://x.com/adixranjan08"
    ],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "CodenCreative"
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Amritsar College of Engineering and Technology"
    },
    knowsAbout: [
      "Full Stack Development",
      "React.js",
      "Node.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "MongoDB"
    ],
    description: "Full Stack Developer with expertise in React, Node.js, and modern web technologies."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <meta name="application-name" content="Aditya Ranjan Portfolio" />
      <meta name="dc:creator" content="Aditya Ranjan" />
    </>
  );
}