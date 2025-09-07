import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import BlogManagement from './admin/BlogManagement';
import BlogPostForm from './admin/BlogPostForm';
import VideoManagement from './admin/VideoManagement';
import VideoForm from './admin/VideoForm';
import MessageManagement from './admin/MessageManagement';
import UserManagement from './admin/UserManagement';
import AnalyticsPage from './admin/AnalyticsPage';
import SettingsPage from './admin/SettingsPage';

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      
      {/* Blog Routes */}
      <Route path="/blogs" element={<BlogManagement />} />
      <Route path="/blogs/new" element={<BlogPostForm />} />
      <Route path="/blogs/edit/:id" element={<BlogPostForm />} />
      
      {/* Video Routes */}
      <Route path="/videos" element={<VideoManagement />} />
      <Route path="/videos/new" element={<VideoForm />} />
      <Route path="/videos/edit/:id" element={<VideoForm />} />

      {/* Message Routes */}
      <Route path="/messages" element={<MessageManagement />} />
      
      {/* User Management Route */}
      <Route path="/users" element={<UserManagement />} />
      
      {/* Analytics Route */}
      <Route path="/analytics" element={<AnalyticsPage />} />

      {/* Settings Route */}
      <Route path="/settings" element={<SettingsPage />} />

      {/* Fallback Route to Dashboard */}
      <Route path="/*" element={<AdminDashboard />} />
    </Routes>
  );
};

export default Admin;