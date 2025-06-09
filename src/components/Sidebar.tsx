import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Users,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
  User,
  FolderOpen,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const studentMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Departments', path: '/departments' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: Bell, label: 'Announcements', path: '/announcements' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Bell, label: 'Manage Announcements', path: '/admin/announcements' },
    { icon: FolderOpen, label: 'Manage Projects', path: '/admin/projects' },
    { icon: Users, label: 'Student Wishlists', path: '/admin/wishlists' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : studentMenuItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-gradient-to-b from-primary-600 to-primary-800 text-white w-64 min-h-screen p-6 shadow-2xl">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
          <GraduationCap className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Student Portal</h1>
          <p className="text-primary-200 text-sm">
            {user?.role === 'admin' ? 'Admin Panel' : 'Student Dashboard'}
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-white/20 shadow-lg backdrop-blur-sm'
                : 'hover:bg-white/10'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-primary-200 text-sm capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-200 w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;