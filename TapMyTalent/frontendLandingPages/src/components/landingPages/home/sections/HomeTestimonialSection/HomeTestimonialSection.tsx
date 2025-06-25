import React, { useEffect, useRef, useState } from 'react';
import './HomeTestimonialSection.css';

// Placeholder for testimonial images - replace with actual images
import testimonialImage1 from '../../../../../assets/images/sarah.webp';
import testimonialImage2 from '../../../../../assets/images/michael.webp';
import testimonialImage3 from '../../../../../assets/images/emily.webp';
import testimonialImage4 from '../../../../../assets/images/david.webp';

interface TestimonialCardProps {
  image: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  image, 
  name, 
  position, 
  company, 
  testimonial 
}) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-image-container">
        <img src={image} alt={`${name} - ${position}`} className="testimonial-image" />
      </div>
      <div className="testimonial-content">
        <p className="testimonial-text">{testimonial}</p>
        <div className="testimonial-author">
          <h4 className="testimonial-name">{name}</h4>
          <p className="testimonial-position">{position}, {company}</p>
        </div>
      </div>
    </div>
  );
};

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  description: string;
}

const Counter: React.FC<CounterProps> = ({ 
  end, 
  duration, 
  suffix = '', 
  prefix = '', 
  description 
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, isVisible]);

  return (
    <div className="testimonial-stat" ref={counterRef}>
      <div className="testimonial-stat-number">
        {prefix}{count}{suffix}
      </div>
      <div className="testimonial-stat-description">
        {description}
      </div>
    </div>
  );
};

const HomeTestimonialSection: React.FC = () => {
  const testimonials = [
    {
      image: testimonialImage1,
      name: "Sarah Johnson",
      position: "Software Engineer",
      company: "Tech Solutions Inc.",
      testimonial: "TapMyTalent transformed my job search. Their personalized approach and AI tools helped me land my dream job in just three weeks!"
    },
    {
      image: testimonialImage2,
      name: "Michael Chen",
      position: "Marketing Director",
      company: "Global Brands",
      testimonial: "The resume they created for me was exceptional. I received more interview calls in one week than I had in months of searching on my own."
    },
    {
      image: testimonialImage3,
      name: "Emily Rodriguez",
      position: "Financial Analyst",
      company: "Capital Investments",
      testimonial: "Their job application service saved me countless hours. I could focus on preparing for interviews while they handled all the applications."
    },
    {
      image: testimonialImage4,
      name: "David Williams",
      position: "Project Manager",
      company: "Construction Experts",
      testimonial: "The personalized support I received was outstanding. They understood my career goals and helped me navigate a challenging industry transition."
    }
  ];

  return (
    <div className="home-testimonial-section">
      <div className="home-testimonial-container">
        {/* Stats Section */}
        <div className="testimonial-stats">
          <Counter 
            end={500} 
            duration={2000} 
            suffix="+" 
            description="Successful Job Placements" 
          />
          <Counter 
            end={85} 
            duration={2000} 
            suffix="%" 
            description="Success within the first month" 
          />
          <Counter 
            end={92} 
            duration={2000} 
            suffix="%" 
            description="customer satisfaction rate" 
          />
        </div>

        {/* Testimonials Section */}
        <h2 className="testimonial-heading">Hear it from Our Clients</h2>
        
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              image={testimonial.image}
              name={testimonial.name}
              position={testimonial.position}
              company={testimonial.company}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonialSection;
