import React, { useState } from 'react';
import { Heart, BookOpen, Plus } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onAddToWishlist?: (projectId: number) => void;
  isInWishlist?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onAddToWishlist, 
  isInWishlist = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-100 p-2 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary-600" />
          </div>
          <span className="text-sm font-medium text-gray-500">Project #{project.id}</span>
        </div>
        
        {onAddToWishlist && (
          <button
            onClick={() => onAddToWishlist(project.id)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isInWishlist
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-400 hover:bg-primary-100 hover:text-primary-600'
            }`}
          >
            {isInWishlist ? <Heart className="h-5 w-5 fill-current" /> : <Plus className="h-5 w-5" />}
          </button>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
        {project.title}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {project.description}
      </p>
      
      <div className={`mt-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProjectCard;