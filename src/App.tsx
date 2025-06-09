import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import AdminDashboard from './pages/AdminDashboard';
import DepartmentPage from './pages/DepartmentPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard\" replace />;
  }

  return <>{children}</>;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/department/:departmentId" element={<DepartmentPage />} />
            
            {/* Protected Student Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Placeholder routes for other admin pages */}
            <Route 
              path="/admin/announcements" 
              element={
                <ProtectedRoute adminOnly>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Announcement Management</h2>
                    <p className="text-gray-600">Feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/projects" 
              element={
                <ProtectedRoute adminOnly>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
                    <p className="text-gray-600">Feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/wishlists" 
              element={
                <ProtectedRoute adminOnly>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Student Wishlists</h2>
                    <p className="text-gray-600">Feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/announcements" 
              element={
                <ProtectedRoute>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">All Announcements</h2>
                    <p className="text-gray-600">Feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/departments" 
              element={
                <ProtectedRoute>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
                    <p className="text-gray-600">Feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                    <p className="text-gray-600">Feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;