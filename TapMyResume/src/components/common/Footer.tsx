import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="social-icons">
            <a href="https://www.linkedin.com/company/tap-my-talent/posts/?feedView=all" aria-label="LinkedIn">
              <i className="social-icon linkedin"></i>
            </a>
            <a href="https://www.instagram.com/tapmytalent/" aria-label="Instagram">
              <i className="social-icon instagram"></i>
            </a>
            {/* <a href="https://facebook.com/" aria-label="Facebook">
              <i className="social-icon facebook"></i>
            </a>
            <a href="https://twitter.com/" aria-label="Twitter">
              <i className="social-icon twitter"></i>
            </a> */}
          </div>
          <div className="footer-menu">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="https://tapmytalent.com/services">Services</a></li>
              <li><a href="https://tapmytalent.com/contact#faq-section">FAQs</a></li>
              <li><a href="https://tapmytalent.com/privacy-policy">Privacy Policies</a></li>
              <li><a href="https://tapmytalent.com/contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© Copyright 2025. Powered by Tap My Talent</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
