import React, { useState, useEffect } from 'react';
import './ServicesOurServicesSection.css';

// Import images
import jobApplicationImage from '../../../../../assets/images/job-application.webp';
import resumeBuilderImage from '../../../../../assets/images/resume-builder.webp';
import coverLetterImage from '../../../../../assets/images/cover-letter.webp';
import linkedinOptimizationImage from '../../../../../assets/images/linkedin-optimization.webp';

const ServicesOurServicesSection: React.FC = () => {
  // No need for section ref as we're observing individual items
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the service item's index from the data-index attribute
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index) && !visibleItems.includes(index)) {
              setVisibleItems(prev => [...prev, index]);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all service items
    const serviceItems = document.querySelectorAll('.services-our-services-item');
    serviceItems.forEach(item => {
      observer.observe(item);
    });

    return () => {
      serviceItems.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, [visibleItems]);
  const services = [
    {
      id: 1,
      title: 'Auto Job Application',
      description: (
        <>
          <i>
          <p><strong>Efficiency and Speed with AI or Personalized Assistance</strong></p>
          <p>Our Auto Job Application service makes your job search simple and fast. Whether using AI or Human Assistance, we apply for jobs on your behalf, ensuring each application is tailored to your unique profile.</p>
          <ul>
            <li><strong>AI Mode:</strong> Let AI handle your applications by matching your profile to the best job opportunities, creating custom resumes and cover letters, and submitting them automatically.</li>
            <li><strong>Human Assistance Mode:</strong> A dedicated recruiter will manually apply to jobs for you, tailoring your application and making sure every job is a perfect fit.</li>
          </ul>
          </i>
        </>
      ),
      image: jobApplicationImage,
      imagePosition: 'right'
    },
    {
      id: 2,
      title: 'AI Resume Builder',
      description: (
        <>
          <i>
          <p><strong>Generate Custom, ATS-Friendly Resumes in Minutes</strong></p>
          <p>With our AI-powered Resume Builder, you can create a professional, ATS-friendly resume in minutes. Whether you prefer AI automation or human guidance, we ensure your resume is tailored to highlight your best skills and experience.</p>
          <ul>
            <li><strong>AI Mode:</strong> Automatically generate a custom resume using AI, designed to meet the standards of applicant tracking systems (ATS) and tailored to the job descriptions you're applying to.</li>
            <li><strong>Human Assistance Mode:</strong> Work with a Career Specialist who will guide you through creating a polished, professional resume that aligns with your career goals and job target.</li>
          </ul>
          </i>
        </>
      ),
      image: resumeBuilderImage,
      imagePosition: 'left'
    },
    {
      id: 3,
      title: 'Custom Cover Letter',
      description: (
        <>
          <i>
          <p><strong>Personalized Cover Letters for Every Job Application</strong></p>
          <p>Our Custom Cover Letter service ensures that each application stands out. Whether you need AI-generated content or personalized assistance, we make sure your cover letter speaks to the employer.</p>
          <ul>
            <li><strong>AI Mode:</strong> Automatically generate custom cover letters based on the job description, highlighting your skills and experience for a perfect fit.</li>
            <li><strong>Human Assistance Mode:</strong> A Career Specialist will write a personalized cover letter for each job you're applying to, ensuring it's tailored to the role and reflects your unique value.</li>
          </ul>
          </i>
        </>
      ),
      image: coverLetterImage,
      imagePosition: 'right'
    },
    {
      id: 4,
      title: 'LinkedIn Optimization',
      description: (
        <>
          <i>
          <p><strong>Optimize Your LinkedIn Profile for Maximum Visibility</strong></p>
          <p>Your LinkedIn profile is one of your most important job search tools. Whether you use AI or work with a Career Specialist, we help you optimize your profile to attract the attention of recruiters and hiring managers.</p>
          <ul>
            <li><strong>AI Mode:</strong> Enhance your LinkedIn profile by aligning it with key resume keywords and optimizing your summary and experience sections to match your job search.</li>
            <li><strong>Human Assistance Mode:</strong> A Career Specialist will work with you to create a fully optimized LinkedIn profile that improves your visibility and showcases your skills effectively to potential employers.</li>
          </ul>
          </i>
        </>
      ),
      image: linkedinOptimizationImage,
      imagePosition: 'left'
    }
  ];

  return (
    <section className="services-our-services-section">
      <div className="services-our-services-container">
        <h2 className="services-our-services-heading">Our Services</h2>
        
        <div className="services-our-services-list">
          {services.map((service) => (
            <div 
              key={service.id} 
              data-index={service.id}
              className={`services-our-services-item ${service.imagePosition === 'right' ? 'content-image' : 'image-content'} ${visibleItems.includes(service.id) ? 'animate' : ''}`}
            >
              <div className="services-our-services-content">
                <h3 className="services-our-services-item-title">{service.id}. {service.title}</h3>
                <div className="services-our-services-item-description">
                  {service.description}
                </div>
              </div>
              <div className="services-our-services-image">
                <img src={service.image} alt={service.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOurServicesSection;
