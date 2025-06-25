import React, { useState } from 'react';
import './OrganizationAuthForm.css';
import ForgotPasswordPopup from '../forgotPasswordPopup/ForgotPasswordPopup';
import TapMyTalentLogo from '../../../assets/logos/Tap My Talent Logo.svg';

// Define the form data interface
interface FormData {
  email: string;
  password: string;
  role: string;
}

// Main OrganizationAuthForm component
const OrganizationAuthForm: React.FC = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: 'Manager'
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (for demo purposes, just log the data)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Organization login form submitted:', formData);
    // Add your authentication logic here
  };

  // Handle Google sign-in
  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked for organization');
    // Implement Google sign-in logic
  };

  return (
    <div className="org-auth-container">
      <div className="org-auth-card">
        {/* Logo */}
        <div className="org-logo-container">
          <img src={TapMyTalentLogo} alt="Logo" className="org-logo" />
        </div>
        
        <h1>Sign in</h1>
        <p className="org-welcome-text">Welcome Back! Please sign in to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Select your role:</label>
            <div className="select-wrapper">
              <select 
                id="role" 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="org-select"
              >
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          
          <button 
            type="button" 
            className="google-btn" 
            onClick={handleGoogleSignIn}
          >
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" width="20" />
            Continue with Google
          </button>
          
          <div className="org-divider">
            <span>or</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="org-forgot-password">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowForgotPassword(true);
              }}
            >
              Forgot Password?
            </a>
          </div>
          
          <button type="submit" className="org-submit-btn">
            Sign in
          </button>
        </form>
      </div>
      
      {/* Forgot Password Popup */}
      {showForgotPassword && (
        <ForgotPasswordPopup 
          email={formData.email}
          onClose={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  );
};

export default OrganizationAuthForm;
