import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './sidebar/AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminContent from './AdminContent';
import ManageStudents from './ManageStudents';
import UploadPastQuestions from './UploadPastQuestions';
import ViewUploads from './ViewUploads';
import ViewMessages from './ViewMessages';
import AdminProfilePage from '../../pages/AdminProfilePage';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/admin-dashboard" element={<AdminContent />} />
            <Route path="/student-management" element={<ManageStudents />} />
            <Route path="/upload-past-questions" element={<UploadPastQuestions />} />
            <Route path="/view-uploads" element={<ViewUploads />} />
            <Route path="/messages" element={<ViewMessages />} />
            <Route path="/admin-profile" element={<AdminProfilePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
