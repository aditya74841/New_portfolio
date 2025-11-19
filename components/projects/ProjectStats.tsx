import React from 'react';
import { TrendingUp, Code, Globe, Star, Clock, Users, Github, ExternalLink } from 'lucide-react';
import type { Project } from './projectData';

type Props = {
  completedProjects: Project[];
  currentProjects: Project[];
};

const ProjectStats: React.FC<Props> = ({ completedProjects, currentProjects }) => {
  const totalProjects = completedProjects.length + currentProjects.length;
  const liveProjects = completedProjects.filter((p) => p.liveDemoLink).length;
  const totalTechnologies = new Set([...completedProjects, ...currentProjects].flatMap((p) => p.techStack || [])).size;
  const totalViews = completedProjects.reduce((sum, p) => sum + parseInt(String(p.views || '0').replace('k', '000') || '0'), 0);
  const totalStars = completedProjects.reduce((sum, p) => sum + Number(p.stars || 0), 0);
  const avgProgress =
    currentProjects.length > 0 ? Math.round(currentProjects.reduce((sum, p) => sum + (p.progress || 0), 0) / currentProjects.length) : 0;

  const stats = [
    {
      id: 'total',
      label: 'Total Projects',
      value: totalProjects,
      icon: Code,
      color: 'from-blue-500 to-indigo-500',
      description: 'Completed & In Progress',
    },
    {
      id: 'live',
      label: 'Live Projects',
      value: liveProjects,
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      description: 'Currently deployed',
    },
    {
      id: 'tech',
      label: 'Technologies',
      value: totalTechnologies,
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      description: 'Different tools used',
    },
    {
      id: 'progress',
      label: 'Avg Progress',
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      description: 'Current projects',
    },
  ];

  return (
    <div className="bg-linear-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Development Statistics</h3>
        <p className="text-gray-600">A comprehensive overview of my development journey and achievements</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon as any;
          return (
            <div key={stat.id} className="group relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-linear-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800">Total Views</h4>
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}</div>
          <p className="text-sm text-gray-600">Across all projects</p>
        </div>

        <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <Github className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800">GitHub Stars</h4>
          </div>
          <div className="text-2xl font-bold text-gray-800">{totalStars}</div>
          <p className="text-sm text-gray-600">Total repository stars</p>
        </div>

        <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-purple-200 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800">Development Time</h4>
          </div>
          <div className="text-2xl font-bold text-purple-600">500+ hrs</div>
          <p className="text-sm text-gray-600">Coding & learning</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Most Used Technologies</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {getMostUsedTech(completedProjects, currentProjects).map((tech, index) => (
            <div key={index} className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-3 text-center border border-blue-200 hover:shadow-md transition-shadow duration-200">
              <div className="text-sm font-medium text-gray-800">{tech.name}</div>
              <div className="text-xs text-gray-500 mt-1">{tech.count} projects</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Project Categories</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {getProjectCategories(completedProjects).map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              <span className="text-sm text-gray-500">{category.count} projects</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://github.com/aditya74841" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200">
          <Github className="w-5 h-5" />
          View All on GitHub
        </a>
        <a href="https://iamadityaranjan.com/#contact" className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
          <ExternalLink className="w-5 h-5" />
          Get In Touch
        </a>
      </div>
    </div>
  );
};

const getMostUsedTech = (completedProjects: Project[], currentProjects: Project[]) => {
  const techCount: Record<string, number> = {};
  [...completedProjects, ...currentProjects].forEach((project) => {
    (project.techStack || []).forEach((tech) => {
      techCount[tech] = (techCount[tech] || 0) + 1;
    });
  });

  return Object.entries(techCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
};

const getProjectCategories = (projects: Project[]) => {
  const categoryCount: Record<string, number> = {};
  projects.forEach((project) => {
    const category = project.category || 'Other';
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  return Object.entries(categoryCount)
    .map(([name, count]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), count }))
    .sort((a, b) => b.count - a.count);
};

export default ProjectStats;
