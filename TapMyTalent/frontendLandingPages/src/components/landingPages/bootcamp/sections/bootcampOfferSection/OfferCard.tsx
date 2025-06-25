import React from 'react';
import './BootcampOfferSection.css';
import PaperClipIcon from "../../../../../assets/icons/paperclip.png";

interface OfferCardProps {
  title: string;
  description: string;
  color: string;
  index: number;
  column?: number; // Column position (0 for left side, 1 for right side)
  isVisible?: boolean; // Whether the section is visible in the viewport
}

const OfferCard: React.FC<OfferCardProps> = ({ title, description, color, index, column, isVisible = false }) => {
  // Determine animation class based on column position
  // If column is not provided, we'll calculate it based on the grid layout
  // For a 4-column grid: columns 0,1 are on the left, columns 2,3 are on the right
  const animationClass = column !== undefined ? 
    (column === 0 ? 'bootcamp-offer-card-left' : 'bootcamp-offer-card-right') :
    (index % 2 === 0 ? 'bootcamp-offer-card-left' : 'bootcamp-offer-card-right');
  
  // Determine if the background is dark to set appropriate text color
  const isDarkBackground = color === '#111' || color === '#000000';
  const textColor = isDarkBackground ? '#FFFFFF' : '#000000';
  const descriptionColor = isDarkBackground ? '#FFFFFF' : '#060C0E';
  
  return (
    <div 
      className={`bootcamp-offer-card ${animationClass} ${isVisible ? 'animate' : ''} ${isDarkBackground ? 'dark-card' : ''}`} 
      style={{ backgroundColor: color }}
    >
      <div className="bootcamp-offer-card-icon">
        <img 
          src={PaperClipIcon} 
          alt="paperclip icon" 
          style={isDarkBackground ? { filter: 'brightness(0) invert(1)' } : {}}
        />
      </div>
      <h3 className="bootcamp-offer-card-title" style={{ color: textColor }}>{title}</h3>
      <p className="bootcamp-offer-card-description" style={{ color: descriptionColor }}>{description}</p>
    </div>
  );
};

export default OfferCard;
