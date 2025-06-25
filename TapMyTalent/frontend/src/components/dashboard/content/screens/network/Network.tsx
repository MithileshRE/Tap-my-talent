import React from 'react';
import './Network.css';
import { ScreenProps } from '../ScreenProps';

const Network: React.FC<ScreenProps> = ({ userType }) => {
  return (
    <div className="network-screen">
      <div className="coming-soon-container">
        <div className="coming-soon-icon">
          <span className="material-icons">construction</span>
        </div>
        <h1>Network Feature Coming Soon</h1>
        <p className="coming-soon-message">
          We're working hard to build a powerful networking platform for TapMyTalent users. 
          Soon you'll be able to connect with other professionals, recruiters, and organizations 
          to expand your career opportunities.
        </p>
        <div className="coming-soon-features">
          <div className="feature">
            <span className="material-icons">people</span>
            <h3>Connect with Professionals</h3>
          </div>
          <div className="feature">
            <span className="material-icons">business</span>
            <h3>Discover Organizations</h3>
          </div>
          <div className="feature">
            <span className="material-icons">event</span>
            <h3>Join Networking Events</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
