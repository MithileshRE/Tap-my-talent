import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeTemplates.css';
import backIcon from '../../../../../../../assets/icons/Back.svg';

// Template configuration for the Resume Builder
const templates = [
  {
    id: 1,
    name: 'Professional',
    thumbnail: 'https://via.placeholder.com/300x400/e0e0e0/333333?text=Professional+Template',
  },
  {
    id: 2,
    name: 'Classic',
    thumbnail: 'https://via.placeholder.com/300x400/f5f5f5/333333?text=Classic+Template',
  }
];

const ResumeTemplates: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/dashboard/services/resume-builder');
  };
  
  const handleTemplateSelect = (templateId: number) => {
    // Navigate to the edit page with the selected template ID
    console.log(`Selected template ID: ${templateId}`);
    const editUrl = `/dashboard/services/resume-builder/edit/${templateId}`;
    console.log(`Navigating to: ${editUrl}`);
    navigate(editUrl);
  };
  
  return (
    <div className="resume-templates-container">
      <div className="resume-templates-header">
        <button className="back-button" onClick={handleBackClick}>
          <img src={backIcon} alt="Back" className="back-icon" />
        </button>
        <h1 className="resume-templates-title">Choose your Template</h1>
      </div>
      
      <div className="templates-grid">
        {templates.map(template => (
          <div 
            key={template.id} 
            className="template-card"
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="template-thumbnail">
              <img src={template.thumbnail} alt={`Template ${template.name}`} />
            </div>
            <div className="template-name">{template.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
