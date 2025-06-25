import React, { useState } from 'react';
import './Forms.css';

interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  subject: string;
  year: string;
  currentlyEnrolled?: boolean;
}

interface EducationFormProps {
  initialData: {
    education?: EducationItem[];
  };
  onContinue: (data: { education: EducationItem[] }) => void;
  onChange: (data: { education: EducationItem[] }) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ initialData, onContinue, onChange }) => {
  const [educations, setEducations] = useState<EducationItem[]>(
    initialData.education || []
  );
  const [currentEducation, setCurrentEducation] = useState<EducationItem>({
    institution: '',
    location: '',
    degree: '',
    subject: '',
    year: '',
    currentlyEnrolled: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(educations.length === 0);
  
  // Update educations when initialData changes (e.g., when uploaded resume data is loaded)
  React.useEffect(() => {
    if (initialData.education && initialData.education.length > 0) {
      console.log('Updating education form with new data:', initialData.education);
      setEducations(initialData.education);
      setShowForm(false); // Hide form when we have pre-filled educations
    }
  }, [initialData]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedEducation = {
      ...currentEducation,
      [name]: value
    };
    
    setCurrentEducation(updatedEducation);

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // For real-time preview updates
    if (editIndex !== null) {
      const updatedEducations = [...educations];
      updatedEducations[editIndex] = updatedEducation;
      onChange({ education: updatedEducations });
    } else {
      // Show preview of what will be added
      onChange({ education: [...educations, updatedEducation] });
    }
  };

  // Handle checkbox change for "Currently Enrolled"
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedEducation = {
      ...currentEducation,
      currentlyEnrolled: checked,
      year: checked ? 'Present' : ''
    };
    
    setCurrentEducation(updatedEducation);
    
    // For real-time preview updates
    if (editIndex !== null) {
      const updatedEducations = [...educations];
      updatedEducations[editIndex] = updatedEducation;
      onChange({ education: updatedEducations });
    } else {
      // Show preview of what will be added
      onChange({ education: [...educations, updatedEducation] });
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentEducation.institution.trim()) {
      newErrors.institution = 'Institution name is required';
    }
    
    if (!currentEducation.degree.trim()) {
      newErrors.degree = 'Degree is required';
    }
    
    if (!currentEducation.subject.trim()) {
      newErrors.subject = 'Field of study is required';
    }
    
    if (!currentEducation.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!currentEducation.currentlyEnrolled && !currentEducation.year.trim()) {
      newErrors.year = 'Year of completion is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add or update education
  const handleAddEducation = () => {
    if (!validateForm()) return;
    
    let updatedEducations;
    
    if (editIndex !== null) {
      // Update existing education
      updatedEducations = [...educations];
      updatedEducations[editIndex] = currentEducation;
    } else {
      // Add new education
      updatedEducations = [...educations, currentEducation];
    }
    
    setEducations(updatedEducations);
    onChange({ education: updatedEducations });
    
    // Reset form
    setCurrentEducation({
      institution: '',
      location: '',
      degree: '',
      subject: '',
      year: '',
      currentlyEnrolled: false
    });
    setEditIndex(null);
    setShowForm(false);
  };

  // Edit an existing education
  const handleEditEducation = (index: number) => {
    setCurrentEducation(educations[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Delete an education
  const handleDeleteEducation = (index: number) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
    onChange({ education: updatedEducations });
  };

  // Handle continue button
  const handleContinue = () => {
    if (showForm && validateForm()) {
      // If the form is open and valid, add the current education first
      const updatedEducations = editIndex !== null 
        ? educations.map((edu, i) => i === editIndex ? currentEducation : edu)
        : [...educations, currentEducation];
      
      onContinue({ education: updatedEducations });
    } else if (educations.length > 0) {
      // If there are educations and the form is not open, continue
      onContinue({ education: educations });
    } else {
      // No educations and form is not open or not valid
      setShowForm(true);
      setErrors({ general: 'Please add at least one education' });
    }
  };

  return (
    <div className="resume-form">
      {!showForm && educations.length > 0 ? (
        <div className="educations-list">
          <h3>Education Summary</h3>
          
          {educations.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <h4>{edu.degree} | {edu.subject}</h4>
                <p className="education-subheader">
                  {edu.institution}<br />
                  {edu.location} | {edu.year}
                </p>
              </div>
              
              <div className="education-actions">
                <button 
                  type="button" 
                  className="edit-button"
                  onClick={() => handleEditEducation(index)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  type="button" 
                  className="delete-button"
                  onClick={() => handleDeleteEducation(index)}
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
            + Add new Education
          </button>
        </div>
      ) : (
        <div className="form-fields">
          <p className="form-subtitle">Add your schools, colleges, vocational programs, or training courses.</p>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="institution">School/College/University Name</label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={currentEducation.institution}
                onChange={handleInputChange}
                className={`form-control ${errors.institution ? 'error' : ''}`}
              />
              {errors.institution && <span className="error-message">{errors.institution}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={currentEducation.location}
                onChange={handleInputChange}
                className={`form-control ${errors.location ? 'error' : ''}`}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={currentEducation.subject}
                onChange={handleInputChange}
                className={`form-control ${errors.subject ? 'error' : ''}`}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={currentEducation.degree}
                onChange={handleInputChange}
                className={`form-control ${errors.degree ? 'error' : ''}`}
              />
              {errors.degree && <span className="error-message">{errors.degree}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Year of Completion</label>
              <input
                type="text"
                id="year"
                name="year"
                value={currentEducation.year}
                onChange={handleInputChange}
                disabled={currentEducation.currentlyEnrolled}
                className={`form-control ${errors.year ? 'error' : ''}`}
              />
              {errors.year && <span className="error-message">{errors.year}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="currentlyEnrolled"
                name="currentlyEnrolled"
                checked={currentEducation.currentlyEnrolled}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="currentlyEnrolled">I'm still enrolled</label>
            </div>
          </div>
          
          <div className="form-actions">
            {educations.length > 0 && (
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setShowForm(false);
                  setEditIndex(null);
                  setCurrentEducation({
                    institution: '',
                    location: '',
                    degree: '',
                    subject: '',
                    year: '',
                    currentlyEnrolled: false
                  });
                }}
              >
                Cancel
              </button>
            )}
            
            <button 
              type="button" 
              className="save-button"
              onClick={handleAddEducation}
            >
              {editIndex !== null ? 'Update Education' : 'Save Education'}
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

export default EducationForm;
