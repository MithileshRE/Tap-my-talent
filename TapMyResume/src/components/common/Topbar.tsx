import React, { useState, useRef, useEffect } from 'react';
import './Topbar.css';
import logo from '../../assets/logo/TapMyTalentLogo.webp';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import EditProfileComponent from '../profile/EditProfileComponent';

const Topbar: React.FC = () => {
  const { isAuthenticated, userEmail, credits, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Control body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return (
    <div className="topbar">
      <div className="container topbar-container">
        <div className="topbar-logo"  onClick={() => { window.open('https://tapmytalent.com/', '_blank'); }}>
          <img src={logo} alt="Tap My Talent" />
          <span>Tap My Talent</span>
        </div>
        
        {/* Hamburger Menu Button */}
        <div className="hamburger-icon" onClick={toggleMenu}>
          <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Menu Overlay - Darkens background when menu is open */}
        <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>

        {/* Mobile Menu - Shows when hamburger is clicked */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <ul>
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><a href="https://tapmytalent.com/services" onClick={toggleMenu}>Services</a></li>
              <li><Link to="/subscription" onClick={toggleMenu}>Subscription</Link></li>
            </ul>
          </nav>
          <div className="mobile-buttons">
            <button className="btn btn-outline" onClick={() => { toggleMenu(); window.open('https://tapmytalent.com/pricing', '_blank'); }}>Go Premium</button>
            {isAuthenticated ? (
              <button className="btn btn-solid" onClick={() => { toggleMenu(); logout(); }}>Logout</button>
            ) : (
              <button className="btn btn-solid" onClick={() => { toggleMenu(); navigate('/auth'); }}>Sign up/Login</button>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="topbar-nav desktop-only">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="https://tapmytalent.com/services">Services</a></li>
            <li><Link to="/subscription">Subscription</Link></li>
          </ul>
        </nav>
        <div className="topbar-buttons desktop-only">
          <button className="btn btn-outline" onClick={() => window.open('https://tapmytalent.com/pricing', '_blank')}>Go Premium</button>
          {isAuthenticated ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <button className="email-button" onClick={toggleDropdown}>
                {userEmail}
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-item credits">Credits: {credits}</div>
                  <button className="dropdown-item" onClick={() => { setIsEditProfileOpen(true); setIsDropdownOpen(false); }}>Edit Profile</button>
                  <button className="dropdown-item logout" onClick={logout}>Logout</button>
                </div>
              )}
              
              {/* Edit Profile Component */}
              <EditProfileComponent 
                isOpen={isEditProfileOpen} 
                onClose={() => setIsEditProfileOpen(false)} 
              />
            </div>
          ) : (
            <button className="btn btn-solid" onClick={() => navigate('/auth')}>Sign up/Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
