import React from 'react';
import { useLocation } from 'react-router-dom';
import './Content.css';

// Import all screens
import DashboardHome from './screens/dashboardHome/DashboardHome';
import Jobs from './screens/jobs/Jobs';
import Services from './screens/services/Services';
import Network from './screens/network/Network';
import Messages from './screens/messages/Messages';
import Settings from './screens/settings/Settings';

interface ContentProps {
  selectedTab: string;
  userType: 'student' | 'organization' | 'admin';
}

const Content: React.FC<ContentProps> = ({ selectedTab, userType }) => {
  // Use selectedTab if provided, otherwise get it from the URL
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  
  // Get the actual route from the URL path
  // For /dashboard/jobs, this will extract 'jobs'
  // For /dashboard/home or just /dashboard, this will default to 'home'
  let path;
  
  if (selectedTab && selectedTab.toLowerCase() !== 'dashboard') {
    // If a specific tab is selected via props, use that
    path = selectedTab.toLowerCase();
  } else if (pathParts[1] === 'dashboard') {
    // If we're on a dashboard route, extract the section (jobs, services, etc.)
    path = pathParts[2] || 'home';
  } else {
    // Fallback to the first path segment or 'home'
    path = pathParts[1] || 'home';
  }
  
  console.log('Current path:', path);

  // Render the appropriate screen based on the current path
  const renderScreen = () => {
    console.log('Rendering screen for path:', path, 'with userType:', userType);
    
    switch (path) {
      case 'home':
        return <DashboardHome userType={userType} />;
      case 'jobs':
        return <Jobs userType={userType} />;
      case 'services':
        return <Services userType={userType} />;
      case 'network':
        return <Network userType={userType} />;
      case 'messages':
        return <Messages userType={userType} />;
      case 'settings':
        return <Settings userType={userType} />;
      default:
        console.log('No matching path, defaulting to DashboardHome');
        return <DashboardHome userType={userType} />;
    }
  };

  return (
    <div className="main-dashboard-content">
      {renderScreen()}
    </div>
  );
};

export default Content;
