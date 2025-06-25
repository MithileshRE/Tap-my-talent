import React from 'react';
import './Forms.css';

interface DownloadFormProps {
  onSectionClick: (sectionIndex: number) => void;
  onDownload: () => void;
  onShare: () => void;
  onSaveAndNext: () => void;
}

const DownloadForm: React.FC<DownloadFormProps> = ({ 
  onSectionClick, 
  onDownload, 
  onShare, 
  onSaveAndNext 
}) => {
  const sections = [
    { id: 'header', label: 'Heading', index: 0 },
    { id: 'about', label: 'Summary', index: 4 },
    { id: 'skills', label: 'Skills', index: 3 },
    { id: 'experience', label: 'Experience', index: 1 },
    { id: 'education', label: 'Education', index: 2 },
    { id: 'more', label: 'Other Details', index: 5 }
  ];

  return (
    <div className="resume-download-form">
      <h1 className="download-heading">Your Resume is Ready!</h1>
      
      <div className="download-buttons">
        <button 
          className="download-button"
          onClick={onDownload}
          title="Download your resume as a PDF file that preserves all formatting and design"
        >
          <div className="download-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L12 8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13L12 16L15 13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 21H8C4.6863 21 2 18.3137 2 15V9C2 5.6863 4.6863 3 8 3H16C19.3137 3 22 5.6863 22 9V15C22 18.3137 19.3137 21 16 21Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Download</span>
        </button>
        
        <button 
          className="share-button"
          onClick={onShare}
        >
          <div className="share-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L15 6M15 6H10.5M15 6V10.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14C20 15.1046 19.1046 16 18 16H16" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 14C9 16.2091 10.7909 18 13 18C15.2091 18 17 16.2091 17 14C17 11.7909 15.2091 10 13 10C10.7909 10 9 11.7909 9 14Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Share</span>
        </button>
      </div>
      
      <button 
        className="save-next-button"
        onClick={onSaveAndNext}
      >
        Save & Next
      </button>
      
      <div className="resume-sections">
        <h2 className="sections-heading">Resume Sections</h2>
        <ul className="sections-list">
          {sections.map((section) => (
            <li key={section.id} className="section-item">
              <button 
                className="section-button"
                onClick={() => onSectionClick(section.index)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{section.label}</span>
                {section.id === 'about' && (
                  <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4L14 6L18 10L20 8L16 4Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 6L4 16V20H8L18 10L14 6Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DownloadForm;
