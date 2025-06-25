import React from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard';

const StudentDashboard: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Hide sidebar on the services page
  const hideSidebar = currentPath.includes('/dashboard/services/resume-builder/edit/');

  return <Dashboard userType="student" hideSidebar={hideSidebar} />;
};

export default StudentDashboard;
