import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeEditor.css';
import { 
  BasicInfoForm, 
  ExperienceForm, 
  EducationForm, 
  SkillsForm, 
  AboutForm,
  MoreDetailsForm,
  DownloadForm
} from './forms';
import backIcon from '../../../../../../../assets/icons/Back.svg';
import { ProfessionalTemplate, ClassicTemplate } from '../templates';

// Define the steps in the resume building process
const STEPS = [
  { id: 'header', label: 'Header' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'more', label: 'More Details' },
  { id: 'download', label: 'Finish' }
];

const ResumeEditor: React.FC = () => {
  const [showZoomModal, setShowZoomModal] = useState(false);
  // Create two completely separate states - one for preview and one for actual data
  // This ensures typing only affects preview and not the actual navigation
  
  // Extract template ID directly from the URL path
  const urlPath = window.location.pathname;
  const urlParts = urlPath.split('/');
  const rawTemplateId = urlParts[urlParts.length - 1];
  
  // Template configuration - centralized for easy addition of new templates
  const templateConfig: Record<string, {
    type: string;
    name: string;
    component: React.ComponentType<any>;
  }> = {
    '1': { type: 'professional', name: 'Professional', component: ProfessionalTemplate },
    '2': { type: 'classic', name: 'Classic', component: ClassicTemplate }
    // Add new templates here in the future, e.g.:
    // '3': { type: 'modern', name: 'Modern', component: ModernTemplate }
  };
  
  // Ensure we have a valid template ID (default to '1' if not found)
  const templateId = templateConfig[rawTemplateId] ? rawTemplateId : '1';
  const selectedTemplate = templateConfig[templateId];
  
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  // Default empty resume data structure
  const defaultResumeData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    linkedin: '',
    portfolio: '',
    title: '',
    about: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    certifications: [],
    awards: [],
    projects: [],
    volunteer: []
  };
  
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [previewData, setPreviewData] = useState(defaultResumeData);
  
  // Check for uploaded resume data when component mounts
  useEffect(() => {
    try {
      // Check if we have uploaded resume data in localStorage
      const uploadedData = localStorage.getItem('uploadedResumeData');
      if (uploadedData) {
        const parsedData = JSON.parse(uploadedData);
        console.log('Loaded uploaded resume data:', parsedData);
        setResumeData(parsedData);
        setPreviewData(parsedData);
        
        // Clear the localStorage after loading to prevent reloading on refresh
        localStorage.removeItem('uploadedResumeData');
      }
    } catch (error) {
      console.error('Error loading uploaded resume data:', error);
    }
  }, []);

  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/dashboard/services/resume-builder/templates');
    }
  };

  // This function will be called whenever form data changes
  const handleFormChange = (formData: any) => {
    // Only update the preview data, not the actual resumeData
    // This completely separates preview updates from form navigation
    setPreviewData({ ...previewData, ...formData });
  };

  const handleContinue = (formData: any) => {
    // First update the actual resume data with the current form data
    const updatedResumeData = { ...resumeData, ...formData };
    setResumeData(updatedResumeData);
    
    // Also update the preview data to match
    setPreviewData(updatedResumeData);
    
    // Move to the next step if not at the last step
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle resume download
  const handleDownload = () => {
    console.log('Downloading resume...');
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups for this website to download your resume');
      return;
    }
    
    // Store all stylesheets and link them in the new window
    const stylesheets = Array.from(document.styleSheets);
    let styleLinks = '';
    let inlineStyles = '';
    
    // Get all the linked stylesheets and inline styles
    try {
      // Add all external stylesheets
      document.querySelectorAll('link[rel="stylesheet"]').forEach(stylesheet => {
        styleLinks += `<link rel="stylesheet" href="${stylesheet.getAttribute('href')}">`;
      });
      
      // Try to extract CSS rules from same-origin stylesheets
      stylesheets.forEach(sheet => {
        try {
          if (sheet.cssRules) {
            const rules = Array.from(sheet.cssRules);
            rules.forEach(rule => {
              inlineStyles += rule.cssText + '\n';
            });
          }
        } catch (e) {
          // Skip cross-origin sheets
          console.log('Could not access stylesheet rules');
        }
      });
    } catch (e) {
      console.error('Error extracting CSS:', e);
    }
    
    // Find the template element to get its content
    const templateElement = document.querySelector('.template-container');
    if (!templateElement) {
      alert('Template not found. Please try again.');
      printWindow.close();
      return;
    }
    
    // Get exact styles being applied to the template in preview
    const computedStyles = window.getComputedStyle(templateElement);
    let templateStyles = '';
    for (let prop of computedStyles) {
      templateStyles += `${prop}: ${computedStyles.getPropertyValue(prop)};`;
    }
    
    // We'll use the template's HTML directly to preserve exact structure
    
    // Create a snapshot of the current preview template
    const resumeHTML = templateElement.outerHTML;
    
    // Create HTML doctype and structure
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resumeData.firstName || 'Firstname'} ${resumeData.lastName || 'Lastname'} - Resume</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- Include FontAwesome for icons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        
        <!-- Include all original stylesheets -->
        ${styleLinks}
        
        <style>
          /* Inline all CSS rules from original page */
          ${inlineStyles}
          
          /* Essential styling for the print view */
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background: white;
            overflow-x: hidden;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          /* This container enforces A4 sizing */
          .resume-for-print {
            width: 210mm;
            height: auto;
            max-width: 100%;
            margin: 0 auto;
            padding: 0;
            overflow: visible;
            position: relative;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            page-break-after: avoid;
            transform-origin: top center;
            transform: scale(0.9);
          }
          
          @media screen and (max-width: 800px) {
            .resume-for-print {
              transform: scale(0.8);
            }
          }
          
          @media screen and (max-width: 600px) {
            .resume-for-print {
              transform: scale(0.7);
            }
          }
          
          /* Clear any scaling transforms from template */
          .template-container, 
          .tmt-professional-resume-preview-container,
          .tmt-classic-resume-preview-container,
          .tmt-professional-resume-container,
          .tmt-classic-resume-container {
            transform: none !important;
            transform-origin: unset !important;
            transform-style: flat !important;
            scale: 1 !important;
            zoom: 1 !important;
            margin: 0 !important;
            width: 210mm !important;
            max-width: 210mm !important;
            height: auto !important;
            min-height: initial !important;
            box-shadow: none !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            overflow: visible !important;
          }
          
          /* Professional template specifics */
          .tmt-professional-resume-container {
            padding: 10mm !important;
          }
          
          /* Classic template specifics */
          .tmt-classic-resume-container {
            padding: 10mm !important;
          }
          
          /* Print settings */
          @media print {
            @page {
              size: A4 portrait;
              margin: 0;
            }
            
            html, body {
              width: 210mm;
              height: auto;
              margin: 0 !important;
              padding: 0 !important;
              background: white;
            }
            
            .resume-for-print {
              box-shadow: none;
              margin: 0;
              height: auto;
              page-break-after: avoid;
            }
            
            .print-controls {
              display: none !important;
            }
          }
          
          /* Print controls */
          .print-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
            z-index: 9999;
          }
          
          .print-button, .cancel-button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .print-button {
            background: #E66868;
            color: white;
          }
          
          .print-button:hover {
            background: #d45858;
          }
          
          .cancel-button {
            background: white;
            color: #333;
          }
          
          .cancel-button:hover {
            background: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="resume-for-print">
          ${resumeHTML}
        </div>
        
        <div class="print-controls">
          <button class="print-button" onclick="window.print(); setTimeout(() => window.close(), 500);">
            Print / Save as PDF
          </button>
          <button class="cancel-button" onclick="window.close();">
            Cancel
          </button>
        </div>
        
        <script>
          // Fix any display issues and ensure perfect fidelity
          document.addEventListener('DOMContentLoaded', function() {
            // Get the template and apply exact sizing
            const template = document.querySelector('.template-container');
            if (template) {
              // Fix template sizing for print
              template.style.transform = 'none';
              template.style.transformOrigin = 'unset';
              template.style.scale = '1';
              template.style.width = '210mm';
              template.style.maxWidth = '100%';
              template.style.pageBreakAfter = 'avoid';
              template.style.pageBreakInside = 'avoid';
              template.style.height = 'auto';
              template.style.minHeight = 'initial';
              
              // Set explicit dimensions and fix all children
              const allSections = document.querySelectorAll('*');
              allSections.forEach(el => {
                if (el.style) {
                  // Remove transforms and scaling
                  el.style.transform = 'none';
                  el.style.transformOrigin = 'unset';
                  el.style.scale = '1';
                  
                  // Remove page breaks that might cause empty pages
                  el.style.pageBreakAfter = 'avoid';
                  el.style.pageBreakBefore = 'avoid';
                  el.style.pageBreakInside = 'avoid';
                }
              });
              
              // Scale to fit viewport if needed
              const resumeContainer = document.querySelector('.resume-for-print');
              if (resumeContainer) {
                const viewportWidth = window.innerWidth;
                const containerWidth = resumeContainer.offsetWidth;
                
                if (containerWidth > viewportWidth) {
                  const scaleRatio = (viewportWidth - 40) / containerWidth;
                  resumeContainer.style.transform = 'scale(' + scaleRatio + ')';
                  resumeContainer.style.transformOrigin = 'top center';
                }
              }
              
              // Force redraw for better rendering
              document.body.offsetHeight;
            }
          });
          
          // Responsive scaling for different viewport sizes
          window.addEventListener('resize', function() {
            const resumeContainer = document.querySelector('.resume-for-print');
            if (resumeContainer) {
              const viewportWidth = window.innerWidth;
              const containerWidth = resumeContainer.offsetWidth;
              
              if (containerWidth > viewportWidth) {
                const scaleRatio = (viewportWidth - 40) / containerWidth;
                resumeContainer.style.transform = 'scale(' + scaleRatio + ')';
                resumeContainer.style.transformOrigin = 'top center';
              } else {
                resumeContainer.style.transform = 'scale(0.9)';
              }
            }
          });
          
          // Adjust layout when printing - remove any scaling
          window.onbeforeprint = function() {
            const resumeContainer = document.querySelector('.resume-for-print');
            if (resumeContainer) {
              resumeContainer.style.transform = 'none';
            }
            document.body.style.width = '210mm';
            document.body.style.height = 'auto';
          };
        </script>
      </body>
      </html>
    `);
    
    // Close the document and focus window for printing
    printWindow.document.close();
    printWindow.focus();
  };

  // Handle resume sharing
  const handleShare = () => {
    console.log('Sharing resume...');
    // Implement actual sharing functionality here
    alert('Resume sharing feature will be implemented in the next phase');
  };

  // Handle save and next action
  const handleSaveAndNext = () => {
    console.log('Saving resume and proceeding...');
    // Navigate to dashboard or next step
    navigate('/dashboard/services');
  };

  // Handle direct navigation to a specific section
  const handleSectionClick = (sectionIndex: number) => {
    setCurrentStep(sectionIndex);
  };

  // Render the current form based on the current step
  const renderCurrentForm = () => {
    switch (STEPS[currentStep].id) {
      case 'header':
        return (
          <BasicInfoForm 
            initialData={resumeData} 
            onContinue={handleContinue}
            onChange={handleFormChange}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            initialData={resumeData}
            onContinue={handleContinue}
            onChange={handleFormChange}
          />
        );
      case 'education':
        return (
          <EducationForm
            initialData={resumeData}
            onContinue={handleContinue}
            onChange={handleFormChange}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            initialData={resumeData}
            onContinue={handleContinue}
            onChange={handleFormChange}
          />
        );
      case 'about':
        return (
          <AboutForm
            initialData={resumeData}
            onContinue={handleContinue}
            onChange={handleFormChange}
          />
        );
      case 'more':
        return (
          <MoreDetailsForm
            initialData={resumeData}
            onContinue={handleContinue}
            onChange={handleFormChange}
          />
        );
      case 'download':
        return (
          <DownloadForm
            onSectionClick={handleSectionClick}
            onDownload={handleDownload}
            onShare={handleShare}
            onSaveAndNext={handleSaveAndNext}
          />
        );
      default:
        return (
          <div className="coming-soon">
            {STEPS[currentStep].label} form coming soon
          </div>
        );
    }
  };

  return (
    <div className="resume-editor-container">
      <div className="resume-editor-content">
        <div className="resume-editor-header-bar">
          <button className="editor-back-button" onClick={handleBackClick}>
            <img src={backIcon} alt="Back" className="editor-back-icon" />
          </button>
        </div>
        
        <div className="resume-editor-main-wrapper">
          <div className="resume-editor-left-panel">
            <div className="resume-editor-steps">
              {/* Add an actual element for the step line */}
              <div className="step-line"></div>
              
              {STEPS.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''} ${index === STEPS.length - 1 ? 'last-step' : index === 0 ? 'first-step' : ''}`}
                  title={step.label} /* Show label as tooltip */
                >
                  <div className="step-dot"></div>
                </div>
              ))}
            </div>
          </div>

        <div className="resume-editor-main-content">
          <div className="resume-editor-form-container">
            <div className="resume-editor-header">
              <h2 className="resume-editor-title">
                {currentStep === 0 ? "Let's start with your header" : 
                 currentStep === STEPS.length - 1 ? "" : 
                 `Add your ${STEPS[currentStep].label}`}
              </h2>
            </div>
            <div className="resume-editor-form">
              {renderCurrentForm()}
            </div>
          </div>

          <div className="resume-preview">
            <div className="resume-template-preview">
              <div className="resume-preview-header">
                <div className="template-info">
                  Template: {selectedTemplate.name}
                </div>
                <button 
                  className="zoom-button" 
                  onClick={() => setShowZoomModal(true)}
                  title="Zoom Resume"
                >
                  <i className="fas fa-search-plus"></i>
                </button>
              </div>
              <div className="template-container">
                {/* Dynamic template rendering based on template configuration */}
                {React.createElement(selectedTemplate.component, {
                  key: `${selectedTemplate.type}-${templateId}`,
                  data: previewData, // Use previewData for the live preview
                  scale: 0.33
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Zoom Modal */}
      {showZoomModal && (
        <div className="zoom-modal-overlay" onClick={() => setShowZoomModal(false)}>
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-modal-close" onClick={() => setShowZoomModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="zoom-modal-body">
              {/* Dynamic template rendering based on template configuration */}
              {React.createElement(selectedTemplate.component, {
                key: `${selectedTemplate.type}-zoom-${templateId}`,
                data: previewData, // Use previewData for the zoom view too
                scale: 0.8
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeEditor;
