import React, { useState } from 'react';
import './Forms.css';

interface ExperienceItem {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  currentlyWorking?: boolean;
}

interface ExperienceFormProps {
  initialData: {
    experience?: ExperienceItem[];
  };
  onContinue: (data: { experience: ExperienceItem[] }) => void;
  onChange: (data: { experience: ExperienceItem[] }) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ initialData, onContinue, onChange }) => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(
    initialData.experience || []
  );
  const [currentExperience, setCurrentExperience] = useState<ExperienceItem>({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    location: '',
    description: [''],
    currentlyWorking: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(experiences.length === 0);
  
  // Update experiences when initialData changes (e.g., when uploaded resume data is loaded)
  React.useEffect(() => {
    if (initialData.experience && initialData.experience.length > 0) {
      console.log('Updating experience form with new data:', initialData.experience);
      setExperiences(initialData.experience);
      setShowForm(false); // Hide form when we have pre-filled experiences
    }
  }, [initialData]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Stop the event from propagating to parent components
    e.stopPropagation();
    
    const { name, value } = e.target;
    const updatedExperience = {
      ...currentExperience,
      [name]: value
    };
    
    setCurrentExperience(updatedExperience);

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // For real-time preview updates
    if (editIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = updatedExperience;
      onChange({ experience: updatedExperiences });
    } else {
      // Show preview of what will be added
      onChange({ experience: [...experiences, updatedExperience] });
    }
  };

  // Handle checkbox change for "Currently Working Here"
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedExperience = {
      ...currentExperience,
      currentlyWorking: checked,
      endDate: checked ? 'Present' : ''
    };
    
    setCurrentExperience(updatedExperience);
    
    // For real-time preview updates
    if (editIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = updatedExperience;
      onChange({ experience: updatedExperiences });
    } else {
      // Show preview of what will be added
      onChange({ experience: [...experiences, updatedExperience] });
    }
  };

  // Handle description bullet points
  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDescription = [...currentExperience.description];
    updatedDescription[index] = value;
    
    const updatedExperience = {
      ...currentExperience,
      description: updatedDescription
    };
    
    setCurrentExperience(updatedExperience);
    
    // For real-time preview updates
    if (editIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = updatedExperience;
      onChange({ experience: updatedExperiences });
    } else {
      // Show preview of what will be added
      onChange({ experience: [...experiences, updatedExperience] });
    }
  };

  const addDescriptionPoint = () => {
    const updatedExperience = {
      ...currentExperience,
      description: [...currentExperience.description, '']
    };
    
    setCurrentExperience(updatedExperience);
    
    // For real-time preview updates
    if (editIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = updatedExperience;
      onChange({ experience: updatedExperiences });
    } else {
      // Show preview of what will be added
      onChange({ experience: [...experiences, updatedExperience] });
    }
  };

  const removeDescriptionPoint = (index: number) => {
    const updatedDescription = [...currentExperience.description];
    updatedDescription.splice(index, 1);
    
    const updatedExperience = {
      ...currentExperience,
      description: updatedDescription.length ? updatedDescription : ['']
    };
    
    setCurrentExperience(updatedExperience);
    
    // For real-time preview updates
    if (editIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = updatedExperience;
      onChange({ experience: updatedExperiences });
    } else {
      // Show preview of what will be added
      onChange({ experience: [...experiences, updatedExperience] });
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentExperience.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    
    if (!currentExperience.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!currentExperience.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!currentExperience.currentlyWorking && !currentExperience.endDate.trim()) {
      newErrors.endDate = 'End date is required';
    }
    
    if (!currentExperience.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add or update experience
  const handleAddExperience = () => {
    if (!validateForm()) return;
    
    let updatedExperiences;
    
    if (editIndex !== null) {
      // Update existing experience
      updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = currentExperience;
    } else {
      // Add new experience
      updatedExperiences = [...experiences, currentExperience];
    }
    
    setExperiences(updatedExperiences);
    onChange({ experience: updatedExperiences });
    
    // Reset form
    setCurrentExperience({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      description: [''],
      currentlyWorking: false
    });
    setEditIndex(null);
    setShowForm(false);
  };

  // Edit an existing experience
  const handleEditExperience = (index: number) => {
    setCurrentExperience(experiences[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Delete an experience
  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
    onChange({ experience: updatedExperiences });
  };

  // Handle continue button
  const handleContinue = () => {
    if (showForm && validateForm()) {
      // If the form is open and valid, add the current experience first
      const updatedExperiences = editIndex !== null 
        ? experiences.map((exp, i) => i === editIndex ? currentExperience : exp)
        : [...experiences, currentExperience];
      
      onContinue({ experience: updatedExperiences });
    } else if (experiences.length > 0) {
      // If there are experiences and the form is not open, continue
      onContinue({ experience: experiences });
    } else {
      // No experiences and form is not open or not valid
      setShowForm(true);
      setErrors({ general: 'Please add at least one experience' });
    }
  };

  return (
    <div className="resume-form">
      {!showForm && experiences.length > 0 ? (
        <div className="experiences-list">
          <h3>Review your Experience</h3>
          
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h4>{exp.jobTitle} | {exp.company}</h4>
                <p className="experience-subheader">
                  {exp.location} | {exp.startDate} - {exp.endDate}
                </p>
              </div>
              
              <ul className="experience-description-list">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              
              <div className="experience-actions">
                <button 
                  type="button" 
                  className="edit-button"
                  onClick={() => handleEditExperience(index)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  type="button" 
                  className="delete-button"
                  onClick={() => handleDeleteExperience(index)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
          
          <button 
            type="button" 
            className="add-more-button"
            onClick={() => setShowForm(true)}
          >
            + Add more Experience
          </button>
        </div>
      ) : (
        <div className="form-fields">
          <p className="form-subtitle">Start with your most recent job first.</p>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={currentExperience.jobTitle}
                onChange={handleInputChange}
                className={`form-control ${errors.jobTitle ? 'error' : ''}`}
              />
              {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={currentExperience.company}
                onChange={handleInputChange}
                className={`form-control ${errors.company ? 'error' : ''}`}
              />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">City</label>
              <input
                type="text"
                id="location"
                name="location"
                value={currentExperience.location}
                onChange={handleInputChange}
                className={`form-control ${errors.location ? 'error' : ''}`}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Optional"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="text"
                id="startDate"
                name="startDate"
                placeholder="e.g., Jan 2020"
                value={currentExperience.startDate}
                onChange={handleInputChange}
                className={`form-control ${errors.startDate ? 'error' : ''}`}
              />
              {errors.startDate && <span className="error-message">{errors.startDate}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="text"
                id="endDate"
                name="endDate"
                placeholder="e.g., Dec 2022"
                value={currentExperience.endDate}
                onChange={handleInputChange}
                disabled={currentExperience.currentlyWorking}
                className={`form-control ${errors.endDate ? 'error' : ''}`}
              />
              {errors.endDate && <span className="error-message">{errors.endDate}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <div className="description-container">
              <div className="description-section">
                <div className="description-list left-description">
                  {/* Suggested points (left side) */}
                  <div className="description-point">
                    <input
                      type="checkbox"
                      id="suggestion-1"
                      className="description-checkbox"
                      onChange={() => handleDescriptionChange(0, "Sample text related to job entered")}
                    />
                    <label htmlFor="suggestion-1">Sample text related to job entered</label>
                  </div>
                  <div className="description-point">
                    <input
                      type="checkbox"
                      id="suggestion-2"
                      className="description-checkbox"
                      onChange={() => handleDescriptionChange(0, "Sample text related to job entered")}
                    />
                    <label htmlFor="suggestion-2">Sample text related to job entered</label>
                  </div>
                  <div className="description-point">
                    <input
                      type="checkbox"
                      id="suggestion-3"
                      className="description-checkbox"
                      onChange={() => handleDescriptionChange(0, "Sample text related to job entered")}
                    />
                    <label htmlFor="suggestion-3">Sample text related to job entered</label>
                  </div>
                  <div className="description-point">
                    <input
                      type="checkbox"
                      id="suggestion-4"
                      className="description-checkbox"
                      onChange={() => handleDescriptionChange(0, "Sample text related to job entered")}
                    />
                    <label htmlFor="suggestion-4">Sample text related to job entered</label>
                  </div>
                  <div className="description-point">
                    <input
                      type="checkbox"
                      id="suggestion-5"
                      className="description-checkbox"
                      onChange={() => handleDescriptionChange(0, "Sample text related to job entered")}
                    />
                    <label htmlFor="suggestion-5">Sample text related to job entered</label>
                  </div>
                </div>

                <div className="description-list right-description">
                  {/* User entered points (right side) */}
                  {currentExperience.description.map((point, index) => (
                    <div key={index} className="description-point">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        placeholder="Add points or write your own"
                        className="form-control"
                      />
                      {currentExperience.description.length > 1 && (
                        <button 
                          type="button" 
                          className="remove-point-button"
                          onClick={() => removeDescriptionPoint(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-point-button"
                    onClick={addDescriptionPoint}
                  >
                    Add points or write your own
                  </button>
                </div>
              </div>
              
              <div className="description-actions">
                <button className="ai-enhance-button" type="button">
                  <i className="fas fa-magic"></i> AI Enhance
                </button>
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="currentlyWorking"
                name="currentlyWorking"
                checked={currentExperience.currentlyWorking}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="currentlyWorking">I Currently Work Here</label>
            </div>
          </div>
          
          <div className="form-actions">
            {experiences.length > 0 && (
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setShowForm(false);
                  setEditIndex(null);
                  setCurrentExperience({
                    jobTitle: '',
                    company: '',
                    startDate: '',
                    endDate: '',
                    location: '',
                    description: [''],
                    currentlyWorking: false
                  });
                }}
              >
                Cancel
              </button>
            )}
            
            <button 
              type="button" 
              className="save-button"
              onClick={handleAddExperience}
            >
              {editIndex !== null ? 'Update Experience' : 'Save Experience'}
            </button>
          </div>
        </div>
      )}
      
      {errors.general && <span className="error-message general-error">{errors.general}</span>}
      
      <div className="form-actions">
        <button 
          type="button" 
          className="continue-button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;
