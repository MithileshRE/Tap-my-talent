import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Content from './content/Content';
import './Dashboard.css';

interface DashboardProps {
  userType: 'student' | 'organization' | 'admin';
  hideSidebar?: boolean;
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ userType, hideSidebar = false, children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(!hideSidebar);
  
  // Extract the current tab from the URL path
  const pathParts = location.pathname.split('/');
  let currentTab;
  
  // Handle the new dashboard route structure
  if (pathParts[1] === 'dashboard' && pathParts[2]) {
    // For routes like /dashboard/jobs, extract 'jobs'
    currentTab = pathParts[2];
  } else if (pathParts[1] === 'dashboard') {
    // For /dashboard, use 'home'
    currentTab = 'home';
  } else {
    // Fallback to the first path segment
    currentTab = pathParts[1] || 'dashboard';
  }
  
  const tabTitle = currentTab.charAt(0).toUpperCase() + currentTab.slice(1);

  // Check if screen is mobile size and update state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(!hideSidebar);
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [hideSidebar]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Header userType={userType} onMenuToggle={toggleSidebar} isMobile={isMobile} />
      <div className="dashboard-body">
        <Sidebar userType={userType} showMenu={sidebarOpen} />
        <div className={`dashboard-content ${!sidebarOpen || isMobile ? 'content-expanded' : ''} ${isMobile ? 'mobile-view' : ''}`}>
          {children || <Content userType={userType} selectedTab={tabTitle} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
