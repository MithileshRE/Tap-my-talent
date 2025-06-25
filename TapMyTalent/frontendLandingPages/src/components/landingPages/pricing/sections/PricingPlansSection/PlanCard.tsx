import React from 'react';
import './PricingPlansSection.css';
import { Link } from 'react-router-dom';
type PlanFeature = {
  text: string;
  included: boolean;
};

type PlanProps = {
  plan: {
    title: string;
    price: number;
    oldPrice?: number;
    features: PlanFeature[];
    buttonText: string;
  };
};

const PlanCard: React.FC<PlanProps> = ({ plan }) => {
  return (
    <div className="pricing-plan-card">
      <h3 className="pricing-plan-title">{plan.title}</h3>
      <div className="pricing-plan-price">
        <span className="price-currency">$</span>
        <span className="price-amount">{plan.price}</span>
        {plan.oldPrice && (
          <span className="price-old">${plan.oldPrice}</span>
        )}
      </div>
      <ul className="pricing-plan-features">
        {plan.features.map((feature, index) => (
          <li 
            key={index} 
            className={`pricing-plan-feature ${feature.included ? 'included' : 'not-included'}`}
          >
            <span className="feature-icon">
              {feature.included ? '✓' : '✗'}
            </span>
            <span className="feature-text">{feature.text}</span>
          </li>
        ))}
      </ul>
      <Link to='/contact'><button className="pricing-plan-button">{plan.buttonText}</button></Link>
    </div>
  );
};

export default PlanCard;
