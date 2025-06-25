import React from 'react';
import './BootcampOfferSection.css';
import PaperClipIcon from "../../../../../assets/icons/paperclip.png";

interface OfferCardProps {
  title: string;
  description: string;
  color: string;
  index: number;
  column?: number; // Column position (0 for left side, 1 for right side)
}

const OfferCard: React.FC<OfferCardProps> = ({ title, description, color, index, column }) => {
  // Determine animation class based on column position
  // If column is not provided, we'll calculate it based on the grid layout
  // For a 4-column grid: columns 0,1 are on the left, columns 2,3 are on the right
  const animationClass = column !== undefined ? 
    (column === 0 ? 'bootcamp-offer-card-left' : 'bootcamp-offer-card-right') :
    (index % 2 === 0 ? 'bootcamp-offer-card-left' : 'bootcamp-offer-card-right');
  
  return (
    <div 
      className={`bootcamp-offer-card ${animationClass}`} 
      style={{ backgroundColor: color }}
    >
      <div className="bootcamp-offer-card-icon">
        <img src={PaperClipIcon} alt="paperclip icon" />
      </div>
      <h3 className="bootcamp-offer-card-title">{title}</h3>
      <p className="bootcamp-offer-card-description">{description}</p>
    </div>
  );
};

export default OfferCard;
