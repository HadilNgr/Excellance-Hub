import React from 'react';
import { Calendar, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const WelcomeCard = () => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-4 right-4 text-white/60 flex items-center space-x-2">
        <Calendar className="h-5 w-5" />
        <span className="text-sm">{currentDate}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-white/80 text-lg">
            Always stay updated in your student portal
          </p>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="animate-bounce-gentle">
            <GraduationCap className="h-16 w-16 text-white/40" />
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse delay-75"></div>
            <div className="w-6 h-6 bg-white/40 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/10 rounded-full"></div>
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/5 rounded-full"></div>
    </div>
  );
};

export default WelcomeCard;