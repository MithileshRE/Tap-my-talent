import React from 'react';
import './ServicesHeroSection.css';

// Import icons from assets
import jobsIcon from '../../../../../assets/icons/jobs.svg';
import resumeScoreIcon from '../../../../../assets/icons/resume-score.svg';
import messageIcon from '../../../../../assets/icons/message.svg';
import networkIcon from '../../../../../assets/icons/network.svg';

import servicesHeroImage from '../../../../../assets/images/servicesHeroImage.webp'

// Card component for services
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="landing-services-card">
      <img src={icon} alt={title} className="landing-services-card-icon" />
      <h3 className="landing-services-card-title">{title}</h3>
      <p className="landing-services-card-description">{description}</p>
    </div>
  );
};

const ServicesHeroSection: React.FC = () => {
  const services = [
    {
      icon: jobsIcon,
      title: 'Auto Job Application',
      description: 'Apply and Manage job applications'
    },
    {
      icon: resumeScoreIcon,
      title: 'AI Resume Builder',
      description: 'Generate custom & ATS-friendly resume'
    },
    {
      icon: messageIcon,
      title: 'Custom Cover Letter',
      description: 'Edit Cover Letters as per Job Descriptions'
    },
    {
      icon: networkIcon,
      title: 'LinkedIn Optimization',
      description: 'Optimize LinkedIn as per Resume Key Words'
    }
  ];

  return (
    <section className="landing-services-hero-section">
      <div className="landing-services-hero-top">
        <div className="landing-services-hero-container">
          <div className="landing-services-hero-content">
            <h1 className="landing-services-hero-title">
              Personalized <span className="landing-services-hero-subtitle">Solutions</span> to<br />
              Accelerate Your <span className="landing-services-hero-subtitle">Career Success</span>
            </h1>
            <p className="landing-services-hero-description">
              At Tap My Talent, we offer a comprehensive suite of services designed to accelerate your job search and help you land your dream role. Whether you're looking for a streamlined process with AI automation or prefer the personalized touch of human experts, we have the right solution for you. Our services are tailored to meet your unique needs at every stage of the job application journey.
            </p>
          </div>
          <div className="landing-services-hero-image">
            <img src={servicesHeroImage} alt="Services Hero" />
          </div>
        </div>
      </div>
      
      <div className="landing-services-cards-container">
        {services.map((service, index) => (
          <ServiceCard 
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesHeroSection;
