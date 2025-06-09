import React from 'react';
import { Calendar, Tag } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDepartmentColor = (display: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      computer_science: 'bg-purple-100 text-purple-800',
      math: 'bg-green-100 text-green-800',
      physics: 'bg-orange-100 text-orange-800',
      chemistry: 'bg-red-100 text-red-800',
    };
    return colors[display as keyof typeof colors] || colors.general;
  };

  const getDepartmentLabel = (display: string) => {
    const labels = {
      general: 'General',
      computer_science: 'Computer Science',
      math: 'Mathematics',
      physics: 'Physics',
      chemistry: 'Chemistry',
    };
    return labels[display as keyof typeof labels] || 'General';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4 text-gray-400" />
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDepartmentColor(announcement.display)}`}>
            {getDepartmentLabel(announcement.display)}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(announcement.datetime)}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {announcement.title}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {announcement.content}
      </p>
    </div>
  );
};

export default AnnouncementCard;