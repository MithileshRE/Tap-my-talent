import React, { useState } from 'react';
import './Forms.css';

interface BasicInfoFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    title?: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    linkedin: string;
    portfolio: string;
  };
  onContinue: (data: any) => void;
  onChange?: (data: any) => void; // Optional prop for live updates
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ initialData, onContinue, onChange }) => {
  // Initialize form data from props and ensure all fields are present
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    title: initialData.title || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    city: initialData.city || '',
    country: initialData.country || '',
    linkedin: initialData.linkedin || '',
    portfolio: initialData.portfolio || ''
  });
  
  // Update form data when initialData changes (e.g., when uploaded resume data is loaded)
  React.useEffect(() => {
    setFormData({
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      title: initialData.title || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      city: initialData.city || '',
      country: initialData.country || '',
      linkedin: initialData.linkedin || '',
      portfolio: initialData.portfolio || ''
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    
    setFormData(updatedData);
    
    // Call onChange prop if provided for live preview updates
    if (onChange) {
      onChange(updatedData);
    }
  };



  const handleContinueClick = () => {
    onContinue(formData);
  };

  return (
    <div className="resume-form">


      <div className="form-fields">
        {/* First Name and Last Name */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        
        {/* Email and Phone */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        
        {/* City and Country */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        
        {/* LinkedIn and Portfolio */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="form-control"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="form-group">
            <label htmlFor="portfolio">Portfolio/Work</label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="form-control"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" className="continue-button" onClick={handleContinueClick}>Continue</button>
      </div>
    </div>
  );
};

export default BasicInfoForm;
