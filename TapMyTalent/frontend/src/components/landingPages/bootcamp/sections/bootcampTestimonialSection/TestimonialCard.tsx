import React from 'react';
import './BootcampTestimonialSection.css';
import PinIcon from '../../../../../assets/icons/pin.png';

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, testimonial }) => {
  return (
    <div className="bootcamp-testimonial-card">
      <div className="bootcamp-testimonial-pin">
        <img src={PinIcon} alt="Pin icon" />
      </div>
      <div className="bootcamp-testimonial-content">
        <h3 className="bootcamp-testimonial-name">{name}</h3>
        <p className="bootcamp-testimonial-role">{role}</p>
        <p className="bootcamp-testimonial-text">{testimonial}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
