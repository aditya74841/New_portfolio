"use client"
import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import CurrentProjectsSection from './CurrentProjectSection';
import ProjectFilters from './ProjectFilters';
import CompletedProjectsSection from './CompletedProjectSection';
import { projectsData } from './projectData';
import SearchBar from './SearchBar';

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProjects = projectsData.completedProjects.filter((project) => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      <HeroSection isVisible={isVisible} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <CurrentProjectsSection projects={projectsData.currentProjects} isVisible={isVisible} />

        <div className="mb-8 sm:mb-12">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProjectFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} categories={projectsData.categories} />
        </div>

        <CompletedProjectsSection projects={filteredProjects} isVisible={isVisible} />
      </div>
    </div>
  );
};

export default ProjectsPage;
