import React from 'react';
import './Header.css';
import questionIcon from '../../../assets/icons/question.svg';
import messageIcon from '../../../assets/icons/message.svg';
import settingsIcon from '../../../assets/icons/settings.svg';
import notificationIcon from '../../../assets/icons/Notification.svg';
import menuIcon from '../../../assets/icons/menu.svg';

interface HeaderProps {
  userType: 'student' | 'organization' | 'admin';
  onMenuToggle?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ userType, onMenuToggle, isMobile = false }) => {
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-section-left">
        <div className="dashboard-header-brand">
          <img src="/src/assets/logos/Tap My Talent Logo.svg" alt="Tap My Talent" className="dashboard-header-logo" />
          {!isMobile && <span className="dashboard-header-title">Tap My Talent</span>}
        </div>
      </div>

      <div className="dashboard-header-section-right">
        <div className="dashboard-header-search">
          <i className="material-icons">search</i>
          <input type="text" placeholder={`Search ${userType} dashboard...`} />
        </div>

        <div className="dashboard-header-actions">
          {!isMobile && (
            <>
              <div className="dashboard-header-action-item">
                <img src={questionIcon} alt="Help" />
              </div>
              <div className="dashboard-header-action-item">
                <img src={messageIcon} alt="Messages" />
                <span className="dashboard-header-badge"></span>
              </div>
              <div className="dashboard-header-action-item">
                <img src={settingsIcon} alt="Settings" />
              </div>
              <div className="dashboard-header-action-item">
                <img src={notificationIcon} alt="Notifications" />
                <span className="dashboard-header-badge"></span>
              </div>
            </>
          )}
          <div className="dashboard-header-profile">
            <div className="dashboard-header-profile-avatar"></div>
          </div>
          {isMobile && (
            <div className="dashboard-header-menu-toggle" onClick={onMenuToggle}>
              <img src={menuIcon} alt="Menu" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
