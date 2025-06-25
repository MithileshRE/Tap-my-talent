import React from 'react';
import OfferCard from './OfferCard';
import './BootcampOfferSection.css';

const BootcampOfferSection: React.FC = () => {
  // Data for the offer cards
  const offerCards = [
    {
      title: 'Online Course',
      description: 'Access structured, industry-relevant courses designed to build practical skills and knowledge.',
      color: '#FFFFFF'
    },
    {
      title: 'Expert Trainer',
      description: 'Learn from experienced professionals who provide real-world insights, guidance, and mentorship.',
      color: '#8DD7BF'
    },
    {
      title: 'Get Certificate',
      description: 'Earn a recognized certification that enhances your resume and helps you stand out to employers.',
      color: '#E66868'
    },
    {
      title: 'Life Time Access',
      description: 'Revisit course materials anytime, stay updated, and keep improving your skills at your own pace.',
      color: '#FFFFFF'
    },
    {
      title: 'Flexible Learning',
      description: 'Choose between live sessions and recorded courses to fit your schedule & learning style.',
      color: '#FFFFFF'
    },
    {
      title: 'Hands-on Projects',
      description: 'Work on real-world projects to build your portfolio and apply your learning in practical scenarios.',
      color: '#E66868'
    },
    {
      title: 'Affordable Pricing',
      description: 'Get high-quality training at competitive prices, with easy payment options and discounts on bundled services.',
      color: '#8DD7BF'
    },
    {
      title: 'Community Support',
      description: 'Join an exclusive network of learners, trainers, & professionals to collaborate, learn, & grow.',
      color: '#FFFFFF'
    }
  ];

  return (
    <section className="bootcamp-offer-section">
      <div className="bootcamp-offer-container">
        <h2 className="bootcamp-offer-heading">What We Offer</h2>
        <div className="bootcamp-offer-cards-container">
          {offerCards.map((card, index) => {
            // Determine if the card is on the left or right side of the grid
            // In a 4-column grid: columns 0,1 are on the left, columns 2,3 are on the right
            // For responsive layouts, we'll use index % 2 to determine left/right
            const column = index % 4 < 2 ? 0 : 1; // 0 = left side, 1 = right side
            
            return (
              <OfferCard
                key={index}
                title={card.title}
                description={card.description}
                color={card.color}
                index={index}
                column={column}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BootcampOfferSection;
