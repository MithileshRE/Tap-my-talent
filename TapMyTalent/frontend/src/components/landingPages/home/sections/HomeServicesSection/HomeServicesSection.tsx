import React from 'react';
import './HomeServicesSection.css';
import ServiceCard from './ServiceCard';

// Import icons (you'll need to replace these with actual icon paths)
import briefcaseIcon from '../../../../../assets/icons/jobs.svg';
import linkArrow from '../../../../../assets/icons/link-arrow.svg';

const HomeServicesSection: React.FC = () => {
  return (
    <div className="home-services-section">
      <div className="home-services-container">
        <h2 className="home-services-heading">
          One Platform, Many <span className="highlight">Solutions</span>
        </h2>
        
        <p className="home-services-description">
          At Tap My Talent, we offer a complete suite of job search services in one platform—tailored
          to help you land your dream job quickly and effectively. Whether you choose AI-powered
          automation or personalized human support, we provide everything you need to succeed.
        </p>

        <div className="home-services-cards">
          <div className="home-services-card-row">
            <ServiceCard 
              icon={briefcaseIcon}
              title="Auto Job Application:"
              description="Automatically apply to multiple jobs with customized resumes and cover letters tailored for each opportunity."
              arrowIcon={linkArrow}
              altText="Auto Job Application"
            />

            <ServiceCard 
              icon={briefcaseIcon}
              title="Custom Resume Building:"
              description="Create professional, ATS-friendly resumes that stand out to recruiters, tailored to your unique experience & career goals."
              arrowIcon={linkArrow}
              altText="Custom Resume Building"
            />
          </div>

          <div className="home-services-card-row">
            <ServiceCard 
              icon={briefcaseIcon}
              title="Unique Cover Letters:"
              description="Get custom cover letters for each job application, written to highlight your strengths and fit with the role."
              arrowIcon={linkArrow}
              altText="Unique Cover Letters"
            />

            <ServiceCard 
              icon={briefcaseIcon}
              title="Job Tracker:"
              description="Stay organized and updated with real-time tracking of all your job applications, ensuring you're always in the loop."
              arrowIcon={linkArrow}
              altText="Job Tracker"
            />            
          </div>
        </div>

        <div className="home-services-cta">
          <button className="home-services-cta-button">Explore Services</button>
        </div>
      </div>
    </div>
  );
};

export default HomeServicesSection;
