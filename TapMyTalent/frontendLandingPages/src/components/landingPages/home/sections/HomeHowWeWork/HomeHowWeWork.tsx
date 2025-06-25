import React from 'react';
import './HomeHowWeWork.css';

// Import icons (you'll need to replace these with actual icon paths)
import userIcon from '../../../../../assets/icons/user-icon.svg';
import detailsIcon from '../../../../../assets/icons/details-icon.svg';
import placedIcon from '../../../../../assets/icons/placed-icon.svg';

const HomeHowWeWork: React.FC = () => {
  return (
    <div className="how-we-work-section">
      <div className="how-we-work-container">
        {/* Process Steps */}
        <div className="how-we-work-process">
          <div className="process-step">
            <div className="process-icon">
              <img src={userIcon} alt="Join Us" />
            </div>
            <p className="process-text">Join Us</p>
          </div>
          
          <div className="process-connector"></div>
          
          <div className="process-step">
            <div className="process-icon">
              <img src={detailsIcon} alt="Add your Details & Preferences" />
            </div>
            <p className="process-text">Add Details & Preferences</p>
          </div>
          
          <div className="process-connector"></div>
          
          <div className="process-step">
            <div className="process-icon">
              <img src={placedIcon} alt="Get Placed!" />
            </div>
            <p className="process-text">Get Placed!</p>
          </div>
        </div>

        {/* Main Content */}
        <h2 className="how-we-work-heading">How We Work</h2>
        
        <p className="how-we-work-description">
          At Tap My Talent, we make your job search process seamless and stress-free. Whether
          you choose our AI-powered solutions or prefer personalized human assistance, we've got
          the right approach for you. Here's how it works:
        </p>

        <div className="how-we-work-steps">
          <div className="how-we-work-row">
            <div className="how-we-work-step">
              <h3 className="step-number">1. Choose Your Plan:</h3>
              <p className="step-description">
                Pick the plan that suits your needs, whether you're looking for quick job applications or detailed personalized support.
              </p>
            </div>
            
            <div className="how-we-work-step">
              <h3 className="step-number">2. Tell Us About You:</h3>
              <p className="step-description">
                Share your career goals, experience, and preferences. This helps us create a tailored strategy for you.
              </p>
            </div>
          </div>
          
          <div className="how-we-work-row">
            <div className="how-we-work-step">
              <h3 className="step-number">3. Resume & Cover Letter Creation:</h3>
              <p className="step-description">
                We'll help you create a professional, tailored resume and cover letter, designed to stand out to employers.
              </p>
            </div>
            
            <div className="how-we-work-step">
              <h3 className="step-number">4. Job Applications:</h3>
              <p className="step-description">
                We'll apply for jobs on your behalf, ensuring your resume and cover letter are customized for each position.
              </p>
            </div>
          </div>
          
          <div className="how-we-work-row">
            <div className="how-we-work-step">
              <h3 className="step-number">5. Track Your Progress:</h3>
              <p className="step-description">
                Keep track of all your applications with our easy-to-use application tracker. You'll receive real-time updates as your applications move forward.
              </p>
            </div>
            
            <div className="how-we-work-step">
              <h3 className="step-number">6. Get Hired:</h3>
              <p className="step-description">
                Focus on preparing for interviews while we handle the job applications. Our service helps you land the right job, faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHowWeWork;
