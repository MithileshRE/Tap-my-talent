import React from 'react';
import './Card.css';
import arrowIcon from '../../../assets/icons/link-arrow.svg';

interface CardProps {
  title: string;
  value: string | number;
  icon?: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, link }) => {
  return (
    <div className={`dashboard-stat-card ${link ? 'with-link' : ''}`}>
      <div className="dashboard-stat-card-content">
        <h3 className="dashboard-stat-card-title">{title}</h3>
        <p className="dashboard-stat-card-value">{value}</p>
      </div>
      {icon && (
        <div className="dashboard-stat-card-icon">
          {typeof icon === 'string' && icon.startsWith('http') ? (
            <img src={icon} alt={title} />
          ) : typeof icon === 'string' && icon.includes('/') ? (
            <img src={icon} alt={title} />
          ) : typeof icon === 'string' ? (
            <i className="material-icons">{icon}</i>
          ) : null}
        </div>
      )}
      {link && (
        <div className="dashboard-stat-card-arrow">
          <img src={arrowIcon} alt="View more" />
        </div>
      )}
    </div>
  );
};

export default Card;
