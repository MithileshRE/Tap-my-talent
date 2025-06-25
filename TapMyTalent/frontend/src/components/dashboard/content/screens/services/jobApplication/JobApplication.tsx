import React, { useState } from 'react';
import './JobApplication.css';

const JobApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    qualifications: '',
    experience: '',
    jobRoles: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call to submit form data
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file);
      // Add file upload logic
    }
  };

  return (
    <div className="job-application-container">
      <h1>Job Applications</h1>
      
      <div className="job-application-content">
        <div className="form-section">
          <h2>Fill out the form below to proceed:</h2>
          
          <form onSubmit={handleSubmit}>
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
                />
              </div>
            </div>
            
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
            
            <div className="form-group full-width">
              <label htmlFor="linkedin">LinkedIn Profile</label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="qualifications">Qualifications</label>
              <input
                type="text"
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="experience">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="jobRoles">Job Roles Applying For</label>
              <input
                type="text"
                id="jobRoles"
                name="jobRoles"
                value={formData.jobRoles}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="location">Job Location Preference</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <div className="upload-section">
          <h2>Upload your Resume to proceed</h2>
          
          <label htmlFor="resume-upload" className="upload-button">
            <span className="upload-icon">↑</span>
            Drop/Upload
          </label>
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
