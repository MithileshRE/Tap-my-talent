import React, { useState, useEffect } from 'react';
import './AuthForm.css';
import ForgotPasswordPopup from '../forgotPasswordPopup/ForgotPasswordPopup';
import TapMyTalentLogo from '../../../assets/logos/Tap My Talent Logo.svg'
import TogglerBg from '../../../assets/images/sign-up-in-bg.png'

// Define the form data interface
interface FormData {
  email: string;
  password: string;
  fullName?: string; // Optional for Sign Up
  confirmPassword?: string; // Optional for Sign Up
}

// Main AuthForm component
const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (for demo purposes, just log the data)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your authentication logic here
  };

  // Toggle between Sign In and Sign Up
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    // Reset form fields when switching
    setFormData((prev) => ({
      ...prev,
      fullName: isSignUp ? '' : prev.fullName,
      confirmPassword: isSignUp ? '' : prev.confirmPassword
    }));
  };

  return (
    <div className="auth-form-wrapper">
      <div className={`auth-form-container ${isSignUp ? 'auth-form-active' : ''}`}>
      {/* Mobile Tabs - Only visible on small screens */}
      {isMobile && (
        <div className="auth-form-mobile-tabs">
          <div
            className={`auth-form-mobile-tab ${!isSignUp ? 'auth-form-active' : ''}`}
            onClick={() => {
              setIsSignUp(false);
            }}
          >
            Sign In
          </div>
          <div
            className={`auth-form-mobile-tab ${isSignUp ? 'auth-form-active' : ''}`}
            onClick={() => {
              setIsSignUp(true);
            }}
          >
            Sign Up
          </div>
        </div>
      )}

      {/* Sign In Form */}
      <div className={`auth-form-form-container auth-form-sign-in ${isSignUp && isMobile ? 'auth-form-hidden' : ''}`}>
        <form onSubmit={handleSubmit}>
          {/* Logo */}
          <div className="auth-form-logo-container">
            <img src={TapMyTalentLogo} alt="Logo" className="auth-form-logo" />
          </div>

          <h1 style={{ fontSize: 32 }}>Sign in</h1>
          <p className="auth-form-welcome-text" style={{ fontSize: 16 }}>Welcome Back! Please sign in to continue</p>

          <div className="auth-form-social-icons">
            <a href="#" className="auth-form-icon">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
              Sign in with Google
            </a>
            <a href="#" className="auth-form-icon">
              <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" />
              Sign in with LinkedIn
            </a>
          </div>

          <span style={{ fontSize: 14 }}>or use your email and password</span>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="auth-form-forgot-password">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setShowForgotPassword(true);
            }}>Forgot your password?</a>
          </div>

          <button type="submit" style={{ fontSize: 16 }}>Sign In</button>

          {/* Mobile Toggle - Only visible on small screens */}
          {isMobile && (
            <div className="auth-form-mobile-toggle">
              <span onClick={toggleForm} style={{ fontSize: 14 }}>New here? Create an account</span>
            </div>
          )}
        </form>
      </div>

      {/* Sign Up Form */}
      <div className={`auth-form-form-container auth-form-sign-up ${!isSignUp && isMobile ? 'auth-form-hidden' : ''}`}>
        <form onSubmit={handleSubmit}>
          {/* Logo */}
          <div className="auth-form-logo-container">
            <img src={TapMyTalentLogo} alt="Logo" className="auth-form-logo" />
          </div>

          <h1 style={{ fontSize: 24 }}>Create your account</h1>
          <p className="auth-form-welcome-text" style={{ fontSize: 16 }}>Welcome! Please fill in the details to get started.</p>

          <div className="auth-form-social-icons">
            <a href="#" className="auth-form-icon">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
              Sign up with Google
            </a>
            <a href="#" className="auth-form-icon">
              <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" />
              Sign up with LinkedIn
            </a>
          </div>

          <span style={{ fontSize: 14 }}>or use your email for registration</span>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" style={{ fontSize: 16 }}>Get Started</button>

          {isMobile ? (
            <div className="auth-form-terms" style={{ fontSize: 12 }}>
              By signing up, I agree to the Terms & Privacy Policy
            </div>
          ) : (
            <div className="auth-form-terms" style={{ fontSize: 14 }}>
              By signing up, I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
            </div>
          )}

          {/* Mobile Toggle - Only visible on small screens */}
          {isMobile && (
            <div className="auth-form-mobile-toggle">
              <span onClick={toggleForm} style={{ fontSize: 14 }}>Already have an account? Sign in</span>
            </div>
          )}
        </form>
      </div>

      {/* Toggle Container - Only visible on larger screens */}
      <div className="auth-form-toggle-container">
        <div className="auth-form-toggle" style={{"--toggle-bg-image": `url(${TogglerBg})`} as React.CSSProperties}>
          <div className="auth-form-toggle-panel auth-form-toggle-left">
            <h1 style={{ fontSize: 32 }}>Already have an account?</h1>
            <p style={{ fontSize: 24 }}>Welcome Back! Sign in to access your account.</p>
            <button onClick={toggleForm} style={{ fontSize: 22 }}>Sign in</button>
          </div>
          <div className="auth-form-toggle-panel auth-form-toggle-right">
            <h1 style={{ fontSize: 32 }}>New Here?</h1>
            <p style={{ fontSize: 24 }}>Welcome! Create your account to get started.</p>
            <button onClick={toggleForm} style={{ fontSize: 22 }}>Sign up</button>
          </div>
        </div>
      </div>

      {/* Forgot Password Popup */}
      {showForgotPassword && (
        <ForgotPasswordPopup
          email={formData.email}
          onClose={() => setShowForgotPassword(false)}
        />
      )}
      </div>
    </div>
  );
};

export default AuthForm;
