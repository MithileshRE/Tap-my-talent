import React from 'react';
import './Services.css';
import { ScreenProps } from '../ScreenProps';
import ServiceCard from '../../../../common/serviceCard/ServiceCard';
import JobApplication from './jobApplication';
import ResumeBuilder from './resumeBuilder';
import ResumeTemplates from './resumeBuilder/templates';
import DebugTemplates from './resumeBuilder/templates/DebugTemplates';
import ResumeEditor from './resumeBuilder/edit';

import jobsIcon from '../../../../../assets/icons/jobs.svg';
import resumeIcon from '../../../../../assets/icons/resume-score.svg';
import userIcon from '../../../../../assets/icons/jobs.svg';
import certificateIcon from '../../../../../assets/icons/network.svg';

const ServicesHome: React.FC<ScreenProps> = ({ userType }) => {
  return (
    <div className="services-screen">
      <div className="services-section">
        <h2>Your Services</h2>
        <div className="services-grid">
          <ServiceCard
            title="Job Applications"
            description="Apply and Manage job applications"
            icon={jobsIcon}
            link="/dashboard/services/job-application"
          />
          <ServiceCard
            title="Resume Builder"
            description="Generate custom & ATS-friendly resume"
            icon={resumeIcon}
            link="/dashboard/services/resume-builder"
          />
        </div>
      </div>

      <div className="services-section">
        <h2>More Services</h2>
        <div className="services-grid">
          <ServiceCard
            title="Cover Letter"
            description="Edit Cover Letters as per Job Descriptions"
            icon={certificateIcon}
            link="/dashboard/services/cover-letter"
          />
          <ServiceCard
            title="Expert Advice"
            description="Get Advice from our Career Specialists"
            icon={userIcon}
            link="/dashboard/services/expert-advice"
          />
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<ScreenProps> = ({ userType }) => {
  // Get the current path to determine which service to show
  const currentPath = window.location.pathname;
  
  // Temporary Debug route for viewing all templates
  if (currentPath.includes('/debug-templates')) {
    return <DebugTemplates />;
  }
  // Resume Builder routes
  if (currentPath.includes('/resume-builder/edit/')) {
    // Extract the template ID from the URL
    const urlParts = currentPath.split('/');
    const templateId = urlParts[urlParts.length - 1];
    console.log('Services component - Template ID:', templateId);
    
    // Pass the extracted template ID as a prop
    return <ResumeEditor />;
  } else if (currentPath.includes('/resume-builder/templates')) {
    return <ResumeTemplates />;
  } else if (currentPath.includes('/resume-builder')) {
    return <ResumeBuilder />;
  }
  
  // Other service routes
  if (currentPath.includes('/job-application')) {
    return <JobApplication />;
  } else if (currentPath.includes('/cover-letter')) {
    return <div className="coming-soon">Cover Letter Service Coming Soon</div>;
  } else if (currentPath.includes('/expert-advice')) {
    return <div className="coming-soon">Expert Advice Service Coming Soon</div>;
  }
  
  // Default to showing the services home
  return <ServicesHome userType={userType} />;
};

export default Services;
