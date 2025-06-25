// No imports needed for React with modern JSX transform
import { useNavigate } from 'react-router-dom';
import './ComingSoon.css';
import TopBar from '../TopBar/TopBar';
import Header from '../LandingHeader/LandingHeader';

const ComingSoon = () => {
  const navigate = useNavigate();
  // Removed unused state and effect

  const goToHome = () => {
    navigate('/');
  };

  return (
    <>
      <TopBar />
      <Header />
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <h1 className="coming-soon-title">Coming Soon!</h1>
          <h2 className="coming-soon-subtitle">Our Sign-In Portal is Under Construction</h2>
          <p className="coming-soon-text">
            We're working hard to bring you an amazing user experience. 
            Our sign-in portal will be available soon with exciting features to help you manage your career journey.
          </p>
{/*           
          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-number">{countdown.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{countdown.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{countdown.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{countdown.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
          
          <form className="notification-form" onSubmit={handleSubmit}>
            <h3>Get notified when we launch</h3>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="notification-button">
              Notify Me
            </button>
          </form> */}
          
          <div className="back-to-home" onClick={goToHome}>
            ← Back to Home Page
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
