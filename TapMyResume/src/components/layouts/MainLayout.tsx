import React from 'react';
import Topbar from '../common/Topbar';
import Footer from '../common/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Topbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
