import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Bell, FolderOpen, TrendingUp, Calendar } from 'lucide-react';
import WelcomeCard from '../components/WelcomeCard';
import StatCard from '../components/StatCard';
import AnnouncementCard from '../components/AnnouncementCard';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../contexts/AuthContext';
import { announcementsApi, projectsApi, wishlistApi } from '../services/api';
import { Announcement, Project } from '../types';

const Dashboard = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch announcements
        const announcementsResponse = await announcementsApi.getAll();
        setAnnouncements(announcementsResponse.data.slice(0, 3));
        
        // Fetch projects
        const projectsResponse = await projectsApi.getAll();
        setProjects(projectsResponse.data.slice(0, 4));
        
        // Fetch user's wishlist if student
        if (user?.role === 'student') {
          const wishlistResponse = await wishlistApi.getByStudent(user.id);
          setWishlist(wishlistResponse.data.map(item => item.project.id));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleAddToWishlist = async (projectId: number) => {
    if (!user || user.role !== 'student') return;

    try {
      if (wishlist.includes(projectId)) {
        await wishlistApi.remove(user.id, projectId);
        setWishlist(prev => prev.filter(id => id !== projectId));
      } else {
        await wishlistApi.add(user.id, projectId);
        setWishlist(prev => [...prev, projectId]);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeCard />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Enrolled Courses"
          value="6"
          icon={BookOpen}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend={{ value: "2 new", isPositive: true }}
        />
        <StatCard
          title="Wishlist Projects"
          value={wishlist.length}
          icon={FolderOpen}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard
          title="Announcements"
          value={announcements.length}
          icon={Bell}
          color="bg-gradient-to-r from-green-500 to-green-600"
          trend={{ value: "3 unread", isPositive: true }}
        />
        <StatCard
          title="GPA"
          value="3.8"
          icon={TrendingUp}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          trend={{ value: "0.2 up", isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Announcements */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Announcements</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              See all
            </button>
          </div>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Project Proposal - Due in 3 days</p>
                <p>• Mid-term Exam - Due in 1 week</p>
                <p>• Assignment #3 - Due in 2 weeks</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-white/80 mb-3">
                Contact student support for any questions or assistance.
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Get Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View all projects
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onAddToWishlist={handleAddToWishlist}
              isInWishlist={wishlist.includes(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;