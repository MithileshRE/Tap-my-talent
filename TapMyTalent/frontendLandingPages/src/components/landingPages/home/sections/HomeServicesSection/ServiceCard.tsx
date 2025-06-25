import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/services" className="home-services-card-link">
        <img src={arrowIcon} alt="Learn more" />
      </Link>
    </div>
  );
};

export default ServiceCard;
