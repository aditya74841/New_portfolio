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
    jobTitle: "Full Stack Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "CodenCreative",
      url: "https://codencreative.com"
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Amritsar College of Engineering & Technology"
    },
    knowsAbout: [
      "Full Stack Development",
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Redux",
      "TailwindCSS",
      "Express.js",
      "MongoDB",
      "Vector Databases",
      "Embeddings",
      "Semantic Search",
      "RESTful APIs",
      "JWT Authentication",
      "Socket.io",
      "WebSockets",
      "OpenRouter API",
      "Tavily API",
      "RAG",
      "LLM Integration",
      "Prompt Engineering"
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Software Developer",
      description: "Full Stack Developer building production web applications using React, Next.js, Node.js, Express, MongoDB with AI integrations (LLMs, RAG, embeddings, semantic search)."
    },
    description: "Full Stack Developer with 2.5+ years building production apps using React, Next.js, Node.js, Express, MongoDB. Skilled in REST APIs, real-time systems, optimization, and AI integrations with LLMs, RAG, embeddings, and semantic search.",
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