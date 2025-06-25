import React from 'react';
import TickVector from '../../../../../assets/icons/tickVector.svg'
import homeHeroImage from '../../../../../assets/images/homeHeroImage.webp'
import dottedWorldMap from '../../../../../assets/images/dottedWorldMap.webp'
import './HomeHeroSection.css';
import { Link } from 'react-router-dom';

const HomeHeroSection: React.FC = () => {
  return (
    <div className="home-hero-section">
      <div className="home-hero-content" style={{
    backgroundImage: `url(${dottedWorldMap})`,
    backgroundSize: 'cover',       // or 'contain', depending on your need
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }}>
        <h1>
          Secure Your Dream Job <span>Faster</span> with <span>Personalized</span> Support
        </h1>
        <p>
          We take care of your job applications with tailored resumes and custom
          cover letters, so you can focus on networking and interview preparation.
        </p>
        <div className="home-hero-section-features">
          <span className="home-hero-section-feature"> <span><img src={TickVector} alt="Tick Vector" /></span> Resume Optimization</span>
          <span className="home-hero-section-feature"> <span><img src={TickVector} alt="Tick Vector" /></span> Auto Job Apply</span>
          <span className="home-hero-section-feature"> <span><img src={TickVector} alt="Tick Vector" /></span> Custom Cover Letters</span>
        </div>
        <Link to="/sign-in"><button className="home-hero-section-cta-button">Sign Up for Free</button></Link>
      </div>
      <div className="home-hero-section-image">
        {/* Replace with an actual image or SVG */}
        <img src={homeHeroImage} alt="Person working on laptop" />
      </div>
    </div>
  );
};

export default HomeHeroSection;