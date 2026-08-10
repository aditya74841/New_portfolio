"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import CurrentProjectsSection from "./CurrentProjectSection";
import ProjectFilters from "./ProjectFilters";
import CompletedProjectsSection from "./CompletedProjectSection";
import { projectsData } from "./projectData";
import SearchBar from "./SearchBar";

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProjects = projectsData.completedProjects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HeroSection isVisible={isVisible} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* <CurrentProjectsSection projects={projectsData.currentProjects} isVisible={isVisible} /> */}

        <div className="mb-8 sm:mb-12">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProjectFilters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            categories={projectsData.categories}
          />
        </div>

        <CompletedProjectsSection projects={filteredProjects} isVisible={isVisible} />
      </div>
    </div>
  );
};

export default ProjectsPage;


// Suppose if i have to add a new Project in my project section what i have to give you to add does the overview of project is enough ---

// ## 🔍 Project: AI Search Assistant (`implement_browser_search`)
// A full-stack AI-powered chat application that combines **real-time web search** with **LLM reasoning** — essentially a mini-Perplexity clone.

// ---

// ### 🏗️ Architecture

// ```
// implement_browser_search/├── backend/          → Node.js / Express API server│   └── server.js     → Core logic: AI + tool-calling pipeline└── frontend/         → React + Vite + Tailwind UI    └── src/App.jsx   → Single-page chat interface
// ```

// ---

// ### ⚙️ How It Works
// The system uses a **2-step LLM tool-calling pipeline**:

// 1. **User sends a message** → frontend POSTs to `/api/chat`
// 2. **Groq LLM** (Llama 3.1 8B Instant) receives the message + tool definitions
// 3. **If the LLM decides to search**, it calls the `webSearch` tool → **Tavily API** fetches live web results
// 4. **Results are injected back** into the conversation → LLM produces a final grounded response
// 5. **Frontend displays** the response + source links

// ---

// ### 🛠️ Tech Stack
// LayerTechnologyFrontendReact 18, Vite, Tailwind CSSBackendNode.js, Express.jsAI ModelGroq SDK → Llama 3.1 8B InstantWeb SearchTavily APIRate Limiting`express-rate-limit` (2 req/sec/IP)

// ---

// ### 🔌 Available Tools (exposed to the LLM)
// ToolDescription`webSearch(query)`Fetches live internet results via Tavily`totalExpenses()`Hardcoded stub returning "5000 INR" (placeholder)

// ---

// ### 📍 Current State

// - **Frontend** is running locally at `http://localhost:5173` (Vite dev server active)
// - **API_URL** in `App.jsx` points to `http://localhost:5000` (local dev mode)
// - There's a **commented-out production URL** (`web-browsing-ai-agents.onrender.com`) suggesting it's been deployed to Render before
// - The `totalExpenses` tool is a **demo stub** — likely added to prototype the tool-calling pattern with custom/non-search tools

// ---

// ### 🚀 Deployment Config

// - `render.yaml` → configured for **Render** deployment
// - `netlify.toml` → configured for **Netlify** deployment
// - Production build: Express backend serves the compiled `frontend/dist/` as static files this is the overview of one of the project also The aim to create the project While learning the tool calling And i learn the tool calling by creating the project This project is deploy on render and netlify also this is my github Url also all the thing i tell is my personal language i want you tell creating the wording such that it will attract the recuriter and also the  persson Who visit  my portfolio can get to kanow about me that this peson know the skills