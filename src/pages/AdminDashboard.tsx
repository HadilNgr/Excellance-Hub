import React from 'react';
import { Users, Bell, FolderOpen, TrendingUp, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { mockAnnouncements, mockProjects } from '../data/mockData';

const AdminDashboard = () => {
  const totalAnnouncements = mockAnnouncements.length;
  const totalProjects = mockProjects.length;
  const recentAnnouncements = mockAnnouncements.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-white/80">
          Manage announcements, projects, and monitor student activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="1,234"
          icon={Users}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend={{ value: "12 new", isPositive: true }}
        />
        <StatCard
          title="Announcements"
          value={totalAnnouncements}
          icon={Bell}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard
          title="Projects"
          value={totalProjects}
          icon={FolderOpen}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard
          title="Active Wishlists"
          value="89"
          icon={TrendingUp}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          trend={{ value: "15 new", isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              to="/admin/announcements"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-3 rounded-xl group-hover:bg-primary-200 transition-colors duration-200">
                  <Plus className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Create Announcement</h3>
                  <p className="text-gray-600 text-sm">Post new announcements</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/projects"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors duration-200">
                  <FolderOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Projects</h3>
                  <p className="text-gray-600 text-sm">Add or edit projects</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/wishlists"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-colors duration-200">
                  <Eye className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">View Wishlists</h3>
                  <p className="text-gray-600 text-sm">Monitor student preferences</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Announcements</h2>
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {announcement.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(announcement.datetime).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {announcement.content.substring(0, 150)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium capitalize">
                    {announcement.display}
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;