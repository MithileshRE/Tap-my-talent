import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import dashboardIcon from '../../../assets/icons/dashboardHome.svg';
import jobsIcon from '../../../assets/icons/jobs.svg';
import servicesIcon from '../../../assets/icons/services.svg';
import networkIcon from '../../../assets/icons/network.svg';
import messageIcon from '../../../assets/icons/mesage-sidebar.svg';
import settingsIcon from '../../../assets/icons/settingSidebar.svg';

interface SidebarProps {
  userType: 'student' | 'organization' | 'admin';
  showMenu: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ userType, showMenu }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Different navigation items based on user type
  const getNavItems = () => {
    // Base items for all user types in the specified order
    const baseItems = [
      { to: "/dashboard/home", icon: dashboardIcon, label: "Dashboard" }
    ];
    
    if (userType === 'student') {
      return [
        ...baseItems,
        { to: "/dashboard/jobs", icon: jobsIcon, label: "Jobs" },
        { to: "/dashboard/services", icon: servicesIcon, label: "Services" },
        { to: "/dashboard/network", icon: networkIcon, label: "Network" },
        { to: "/dashboard/messages", icon: messageIcon, label: "Messages" },
        { to: "/dashboard/settings", icon: settingsIcon, label: "Settings" }
      ];
    } else if (userType === 'organization') {
      return [
        ...baseItems,
        { to: "/dashboard/candidates", icon: jobsIcon, label: "Candidates" },
        { to: "/dashboard/postings", icon: servicesIcon, label: "Postings" },
        { to: "/dashboard/analytics", icon: networkIcon, label: "Analytics" },
        { to: "/dashboard/messages", icon: messageIcon, label: "Messages" },
        { to: "/dashboard/settings", icon: settingsIcon, label: "Settings" }
      ];
    } else {
      // Admin navigation
      return [
        ...baseItems,
        { to: "/dashboard/users", icon: jobsIcon, label: "Users" },
        { to: "/dashboard/reports", icon: servicesIcon, label: "Reports" },
        { to: "/dashboard/configuration", icon: networkIcon, label: "Configuration" },
        { to: "/dashboard/messages", icon: messageIcon, label: "Messages" },
        { to: "/dashboard/settings", icon: settingsIcon, label: "Settings" }
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className={`dashboard-sidebar ${!showMenu ? 'dashboard-sidebar-menu-hidden' : ''}`}>
      <nav className="dashboard-sidebar-nav">
        {navItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.to} 
            className={`dashboard-sidebar-nav-item ${currentPath === item.to ? 'active' : ''}`}
          >
            <img src={item.icon} alt={item.label} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
