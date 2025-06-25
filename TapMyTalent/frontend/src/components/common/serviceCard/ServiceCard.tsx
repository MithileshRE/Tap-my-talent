import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceCard.css';
import arrowIcon from '../../../assets/icons/link-arrow.svg';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link }) => {
  const cardContent = (
    <>
      {icon && (
        <div className="service-card-icon">
          {typeof icon === 'string' && icon.startsWith('http') ? (
            <img src={icon} alt={title} />
          ) : typeof icon === 'string' && icon.includes('/') ? (
            <img src={icon} alt={title} />
          ) : typeof icon === 'string' ? (
            <i className="material-icons">{icon}</i>
          ) : null}
        </div>
      )}
      <div className="service-card-content">
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-description">{description}</p>
      </div>
      {link && (
        <div className="service-card-arrow">
          <img src={arrowIcon} alt="Learn more" />
        </div>
      )}
    </>
  );

  return link ? (
    <Link to={link} className="service-card-link">
      <div className={`service-card with-link`}>
        {cardContent}
      </div>
    </Link>
  ) : (
    <div className="service-card">
      {cardContent}
    </div>
  );
};

export default ServiceCard;
