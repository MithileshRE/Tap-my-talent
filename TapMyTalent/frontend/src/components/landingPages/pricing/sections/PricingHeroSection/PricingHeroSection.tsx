import React from 'react';
import './PricingHeroSection.css';

// Import hero image
import pricingHeroImage from '../../../../../assets/images/pricingHeroImage.webp';

const PricingHeroSection: React.FC = () => {
  return (
    <section className="pricing-hero-section">
      <div className="pricing-hero-container">
        <div className="pricing-hero-content">
          <h1 className="pricing-hero-title">
            Invest in Your <span className="pricing-hero-highlight">Future</span>, Not in
            <br />Endless Applications
          </h1>
          <p className="pricing-hero-description">
            Choose the right plan for your job search and let us handle the
            rest—your career success starts here.
          </p>
        </div>
        <div className="pricing-hero-image">
          <img src={pricingHeroImage} alt="Pricing Hero" />
        </div>
      </div>
    </section>
  );
};

export default PricingHeroSection;
