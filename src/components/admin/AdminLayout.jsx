import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './sidebar/AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminContent from './AdminContent';
import ManageStudents from './ManageStudents';
import UploadPastQuestions from './UploadPastQuestions';
import ViewUploads from './ViewUploads';

const AdminLayout = () => {
  return (
    <div className="relative flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/admin-dashboard" element={<AdminContent />} />
            <Route path="/student-management" element={<ManageStudents />} />
            <Route path="/upload-past-questions" element={<UploadPastQuestions />} />
            <Route path="/view-uploads" element={<ViewUploads />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
