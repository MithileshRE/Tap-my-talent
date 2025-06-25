import React from 'react';
import './AIvsHuman.css';

const AIvsHuman: React.FC = () => {
  return (
    <div className="ai-vs-human-section">
      <div className="ai-vs-human-container">
        <h2 className="ai-vs-human-heading">Choose Your Path: AI or Human Assistance</h2>
        <p className="ai-vs-human-description">
          At Tap My Talent, we offer two ways to get closer to your dream job. Whether you choose
          the speed and automation of AI or the personalized touch of our Human Assistance
          service, we've got you covered. Let's help you decide which path works best for you!
        </p>

        <div className="ai-vs-human-comparison">
          <div className="ai-vs-human-column">
            <h3 className="ai-vs-human-topic">Smart AI</h3>
            <ul className="ai-vs-human-features">
              <li className="ai-vs-human-feature">
                <strong>AI-Powered Resume Builder:</strong> Create a professional, ATS-friendly resume in minutes using multiple templates.
              </li>
              <li className="ai-vs-human-feature">
                <strong>Customizable Formats:</strong> Personalize your resume details and download it in PDF, Word, or ATS format.
              </li>
              <li className="ai-vs-human-feature">
                <strong>Tailored Cover Letters:</strong> Automatically generate a custom cover letter for each job application.
              </li>
              <li className="ai-vs-human-feature">
                <strong>Job Suggestions & Auto-Applications:</strong> Our system fetches relevant job listings based on your profile and applies to them automatically.
              </li>
            </ul>
          </div>

          <div className="ai-vs-human-column">
            <h3 className="ai-vs-human-topic">Human Assistance</h3>
            <ul className="ai-vs-human-features">
              <li className="ai-vs-human-feature">
                <strong>Personalized Support:</strong> Career specialists collaborate with you to create a tailored resume and cover letter for each job role.
              </li>
              <li className="ai-vs-human-feature">
                <strong>Expert Guidance:</strong> Receive advice on resume formatting, structure, and content to ensure your documents stand out.
              </li>
              <li className="ai-vs-human-feature">
                <strong>Dedicated Recruiter:</strong> A recruiter will manage your job applications, customizing your resume and cover letter for each position.
              </li>
              <li className="ai-vs-human-feature">
                <strong>Real-Time Application Tracking:</strong> Track all your applications through the Application Tracker, with real-time updates so you stay informed.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIvsHuman;
