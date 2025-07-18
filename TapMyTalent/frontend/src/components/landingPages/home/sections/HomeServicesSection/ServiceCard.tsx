import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  arrowIcon: string;
  altText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  arrowIcon,
  altText 
}) => {
  return (
    <div className="home-services-card">
      <div className="home-services-card-icon">
        <img src={icon} alt={altText || title} />
      </div>
      <h3 className="home-services-card-title">{title}</h3>
      <p className="home-services-card-description">
        {description}
      </p>
      <a href="#" className="home-services-card-link">
        <img src={arrowIcon} alt="Learn more" />
      </a>
    </div>
  );
};

export default ServiceCard;
