import React from 'react';
import TestimonialCard from './TestimonialCard';
import './BootcampTestimonialSection.css';

const BootcampTestimonialSection: React.FC = () => {
  // Sample testimonial data
  const testimonials = [
    {
      name: 'John Smith',
      role: 'Software Developer',
      testimonial: 'The bootcamp was incredibly helpful. I learned practical skills that helped me land my dream job within weeks of completion.'
    },
    {
      name: 'Sarah Johnson',
      role: 'UX Designer',
      testimonial: 'The mentors were amazing and the curriculum was perfectly structured. I gained confidence in my abilities and expanded my professional network.'
    },
    {
      name: 'Michael Chen',
      role: 'Data Analyst',
      testimonial: 'This program transformed my career. The hands-on projects gave me real-world experience that I showcase in my portfolio.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Frontend Developer',
      testimonial: 'I was skeptical at first, but this bootcamp exceeded all my expectations. The community support was invaluable.'
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      testimonial: 'The skills I learned helped me transition into tech from a completely different industry. Worth every penny!'
    },
    {
      name: 'Priya Patel',
      role: 'Full Stack Developer',
      testimonial: 'The instructors were knowledgeable and supportive. The curriculum was challenging but rewarding.'
    }
  ];

  return (
    <section className="bootcamp-testimonial-section">
      <div className="bootcamp-testimonial-container">
        <h2 className="bootcamp-testimonial-heading">
          Hear it from our <span className="bootcamp-testimonial-highlight">Students</span>
        </h2>
        <div className="bootcamp-testimonial-cards-container">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BootcampTestimonialSection;
