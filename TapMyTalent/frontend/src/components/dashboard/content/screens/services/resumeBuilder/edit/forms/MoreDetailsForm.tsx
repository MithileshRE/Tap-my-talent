import React, { useState, useEffect } from 'react';
import './Forms.css';

interface DetailItem {
  title: string;
  description: string;
}

interface MoreDetailsFormProps {
  initialData: {
    certifications?: DetailItem[];
    awards?: DetailItem[];
    projects?: DetailItem[];
    volunteer?: DetailItem[];
    additionalDetails?: DetailItem[];
  };
  onContinue: (data: {
    certifications: DetailItem[];
    awards: DetailItem[];
    projects: DetailItem[];
    volunteer: DetailItem[];
    additionalDetails: DetailItem[];
  }) => void;
  onChange: (data: {
    certifications: DetailItem[];
    awards: DetailItem[];
    projects: DetailItem[];
    volunteer: DetailItem[];
    additionalDetails: DetailItem[];
  }) => void;
}

const MoreDetailsForm: React.FC<MoreDetailsFormProps> = ({ initialData, onContinue, onChange }) => {
  const [details, setDetails] = useState({
    certifications: initialData.certifications || [],
    awards: initialData.awards || [],
    projects: initialData.projects || [],
    volunteer: initialData.volunteer || [],
    additionalDetails: initialData.additionalDetails || []
  });
  
  const [currentSection, setCurrentSection] = useState<keyof typeof details>('additionalDetails');
  const [currentDetail, setCurrentDetail] = useState<DetailItem>({ title: '', description: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(true);

  // Update parent component when details change
  useEffect(() => {
    onChange(details);
  }, [details, onChange]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentDetail({
      ...currentDetail,
      [name]: value
    });
  };

  // Add or update a detail
  const handleAddDetail = () => {
    if (!currentDetail.title.trim()) return;
    
    const updatedDetails = { ...details };
    
    if (editIndex !== null) {
      // Update existing detail
      updatedDetails[currentSection][editIndex] = currentDetail;
    } else {
      // Add new detail
      updatedDetails[currentSection] = [...updatedDetails[currentSection], currentDetail];
    }
    
    setDetails(updatedDetails);
    setCurrentDetail({ title: '', description: '' });
    setEditIndex(null);
  };

  // Add another section
  const handleAddAnother = () => {
    setCurrentDetail({ title: '', description: '' });
    setEditIndex(null);
    setShowForm(true);
  };

  // Edit a detail
  const handleEditDetail = (index: number) => {
    setCurrentDetail(details[currentSection][index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Delete a detail
  const handleDeleteDetail = (index: number) => {
    const updatedDetails = { ...details };
    updatedDetails[currentSection] = updatedDetails[currentSection].filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  // Handle continue button
  const handleContinue = () => {
    // If there's an unsaved detail with a title, save it first
    if (currentDetail.title.trim() && showForm) {
      handleAddDetail();
    }
    
    onContinue(details);
  };

  // Change the current section
  const handleSectionChange = (section: keyof typeof details) => {
    setCurrentSection(section);
    setCurrentDetail({ title: '', description: '' });
    setEditIndex(null);
    setShowForm(true);
  };

  // Render the details list for the current section
  const renderDetailsList = () => {
    const currentDetails = details[currentSection];
    
    if (currentDetails.length === 0 && !showForm) {
      return (
        <div className="no-details-message">
          No {currentSection} added yet. Click "Add Another" to add one.
        </div>
      );
    }
    
    return (
      <div className="details-list">
        {currentDetails.map((detail, index) => (
          <div key={index} className="detail-item">
            <div className="detail-content">
              <h4>{detail.title}</h4>
              <p>{detail.description}</p>
            </div>
            <div className="detail-actions">
              <button 
                type="button" 
                className="edit-button"
                onClick={() => handleEditDetail(index)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                type="button" 
                className="delete-button"
                onClick={() => handleDeleteDetail(index)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Get section label
  const getSectionLabel = (section: string): string => {
    switch (section) {
      case 'certifications': return 'Certifications';
      case 'awards': return 'Awards';
      case 'projects': return 'Projects';
      case 'volunteer': return 'Volunteer Experience';
      case 'additionalDetails': return 'Additional Details';
      default: return section;
    }
  };

  return (
    <div className="resume-form">
      <p className="form-subtitle">Add details like Awards, Certificates or Other details</p>
      
      <div className="section-tabs">
        {Object.keys(details).map((section) => (
          <button
            key={section}
            type="button"
            className={`section-tab ${section === currentSection ? 'active' : ''}`}
            onClick={() => handleSectionChange(section as keyof typeof details)}
          >
            {getSectionLabel(section)}
          </button>
        ))}
      </div>
      
      <div className="more-details-container">
        {showForm && (
          <div className="detail-form">
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={currentDetail.title}
                onChange={handleInputChange}
                placeholder="Heading/Title"
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="description"
                value={currentDetail.description}
                onChange={handleInputChange}
                placeholder={`Write about your awards, certificates, your long-term portfolio link, etc.`}
                className="form-control detail-textarea"
                rows={5}
              />
            </div>
            
            <div className="detail-form-actions">
              <button 
                type="button" 
                className="save-button"
                onClick={handleAddDetail}
                disabled={!currentDetail.title.trim()}
              >
                {editIndex !== null ? 'Update' : 'Save'}
              </button>
              
              {editIndex !== null && (
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => {
                    setCurrentDetail({ title: '', description: '' });
                    setEditIndex(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
        
        {renderDetailsList()}
        
        <div className="add-another-container">
          <button 
            type="button" 
            className="add-another-button"
            onClick={handleAddAnother}
          >
            + Add Another
          </button>
        </div>
      </div>
      
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

export default MoreDetailsForm;
