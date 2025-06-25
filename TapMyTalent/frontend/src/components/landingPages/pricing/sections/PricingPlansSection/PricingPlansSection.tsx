import React, { useState } from 'react';
import './PricingPlansSection.css';
import PlanCard from './PlanCard';

// Define plan types
type PlanFeature = {
  text: string;
  included: boolean;
};

type Plan = {
  title: string;
  price: number;
  oldPrice?: number;
  features: PlanFeature[];
  buttonText: string;
};

const PricingPlansSection: React.FC = () => {
  const [isAIMode, setIsAIMode] = useState(true);

  // AI Mode Plans
  const aiPlans: Plan[] = [
    {
      title: 'Starter Plan',
      price: 199,
      oldPrice: 249,
      features: [
        { text: 'Auto job applications (up to 20 jobs/month)', included: true },
        { text: 'AI-powered resume builder', included: true },
        { text: 'Custom cover letters for each application', included: true },
        { text: 'Application tracking', included: true },
        { text: 'Job alerts and recommendations', included: false },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Get Started'
    },
    {
      title: 'Pro Plan',
      price: 299,
      oldPrice: 349,
      features: [
        { text: 'Auto job applications (up to 50 jobs/month)', included: true },
        { text: 'AI-powered resume builder', included: true },
        { text: 'Custom cover letters for each application', included: true },
        { text: 'Application tracking', included: true },
        { text: 'Job alerts and recommendations', included: true },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Get Started'
    },
    {
      title: 'Elite Plan',
      price: 399,
      oldPrice: 499,
      features: [
        { text: 'Auto job applications (up to 100 jobs/month)', included: true },
        { text: 'AI-powered resume builder', included: true },
        { text: 'Custom cover letters for each application', included: true },
        { text: 'Advanced application tracking and analytics', included: true },
        { text: 'Job alerts and personalized recommendations', included: true },
        { text: 'Priority support', included: true },
      ],
      buttonText: 'Get Started'
    }
  ];

  // Human Assistance Mode Plans
  const haPlans: Plan[] = [
    {
      title: 'Starter Plan',
      price: 299,
      oldPrice: 349,
      features: [
        { text: '1-on-1 career specialist support for resume creation', included: true },
        { text: 'Personalized cover letters', included: true },
        { text: 'Up to 10 job applications per month with tailored applications', included: true },
        { text: 'Basic application tracking', included: true },
        { text: 'Job alerts', included: false },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Get Started'
    },
    {
      title: 'Pro Plan',
      price: 499,
      oldPrice: 599,
      features: [
        { text: 'Resume building and cover letter writing', included: true },
        { text: 'Up to 25 job applications per month', included: true },
        { text: 'Ongoing support from a dedicated recruiter', included: true },
        { text: 'Personalized job search strategy', included: true },
        { text: 'Application tracking and analytics', included: true },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Get Started'
    },
    {
      title: 'Elite Plan',
      price: 799,
      oldPrice: 999,
      features: [
        { text: 'Full resume rewrite and personalized cover letters', included: true },
        { text: 'Up to 50 job applications per month', included: true },
        { text: 'Ongoing support from a dedicated recruiter', included: true },
        { text: 'Personal job search strategy and weekly check-ins', included: true },
        { text: 'Interview coaching and feedback', included: true },
        { text: 'Priority support', included: true },
      ],
      buttonText: 'Get Started'
    }
  ];

  const toggleMode = () => {
    setIsAIMode(!isAIMode);
  };

  const currentPlans = isAIMode ? aiPlans : haPlans;

  return (
    <section className="pricing-plans-section">
      <div className="pricing-plans-container">
        <h2 className="pricing-plans-heading">Plans made for you.</h2>
        <p className="pricing-plans-subheading">Choose your mode</p>
        <div className="pricing-mode-toggle">
          <span className={`toggle-label ${isAIMode ? 'active' : ''}`}>AI</span>
          <div 
            className={`toggle-switch ${isAIMode ? '' : 'ha-active'}`}
            onClick={toggleMode}
          >
            <div className="toggle-slider"></div>
          </div>
          <span className={`toggle-label ${!isAIMode ? 'active' : ''}`}>HA</span>
        </div>
        
        <div className="pricing-plans-grid">
          {currentPlans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlansSection;
