import React from 'react';
import './PricingWhyChooseUSSection.css';

// Import icons
import resultsIcon from '../../../../../assets/icons/results-icon.png';
import missionIcon from '../../../../../assets/icons/mission-icon.png';
import marketIcon from '../../../../../assets/icons/market-icon.png';

const PricingWhyChooseUSSection: React.FC = () => {
  const reasons = [
    {
      icon: resultsIcon,
      title: 'Results-Driven Approach:',
      description: 'Our platform is built to deliver real outcomes — better applications, stronger profiles, and faster job offers.'
    },
    {
      icon: missionIcon,
      title: 'Your Success, Our Mission:',
      description: "We are passionate about helping you stand out, get noticed, and land the job you deserve — not just filling applications, but building careers."
    },
    {
      icon: marketIcon,
      title: 'Built for Today\'s Market:',
      description: 'We understand what employers want and design every tool and feature to help you meet those expectations.'
    }
  ];

  return (
    <section className="pricing-why-choose-section">
      <div className="pricing-why-choose-container">
        <h2 className="pricing-why-choose-heading">Why Choose Us?</h2>
        <p className="pricing-why-choose-description">
          Tap My Talent is built for international students and early-career professionals who want 
          more than just job listings. We offer smart, end-to-end solutions that make your job hunt 
          faster, easier, and more effective.
        </p>
        
        <div className="pricing-why-choose-reasons">
          {reasons.map((reason, index) => (
            <div key={index} className="pricing-why-choose-reason">
              <div className="pricing-why-choose-icon">
                <img src={reason.icon} alt={reason.title} />
              </div>
              <h3 className="pricing-why-choose-reason-title">{reason.title}</h3>
              <p className="pricing-why-choose-reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingWhyChooseUSSection;
