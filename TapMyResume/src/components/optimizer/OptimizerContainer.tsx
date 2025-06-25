import React, { useState, useEffect } from 'react';
import './OptimizerContainer.css';
import './common/SharedStyles.css';
// Components
import StepIndicator from './common/StepIndicator';
import JobDescriptionStep1 from './jobDescription/JobDescriptionStep1';
import JobDescriptionStep2 from './jobDescription/JobDescriptionStep2';
import JobDescriptionStep2_5 from './jobDescription/JobDescriptionStep2_5';
import JobDescriptionStep3 from './jobDescription/JobDescriptionStep3';
// Keyword Flow
import KeywordsFlow from './keywords/KeywordsFlow';
// Auth Context
import { useAuth } from '../../context/AuthContext';
// Services
import { getMasterData, getDetails, putMasterEdu, putMasterData } from '../../services/userDetailsService';
import { uploadResume } from '../../services/resumeOptimizerService';
import { pollTaskStatus, pollTaskResult } from '../../utils/polling';
// Popup Form
import PopupForm from '../common/PopupForm';
// Types
export type ResumeData = {
  file?: File | null;
  jobDescription?: string;
  keywords?: string;
  selectedKeywords?: string[];
  customKeywords?: string[];
  isPaidUser?: boolean;
  existingResume?: string;
  useExistingResume?: boolean;
  // API response fields
  task_id?: string;
  match_score_task_id?: string;
  match_rate?: number;
  expected_rate?: number;
  missing_keywords?: string[];
  resume_data?: any;
  download_url?: string;
};

export type FlowType = 'jobDescription' | 'keywords';
export type StepType = 1 | 2 | 2.5 | 3;

const OptimizerContainer: React.FC = () => {
  const { isAuthenticated, userEmail } = useAuth();
  const [activeFlow, setActiveFlow] = useState<FlowType>('jobDescription');
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [resumeData, setResumeData] = useState<ResumeData>({
    isPaidUser: false // Default to unpaid user
  });
  const [hasExistingResume, setHasExistingResume] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if user has previously uploaded a resume
  React.useEffect(() => {
    // Mock API call to check for existing resume
    const checkExistingResume = async () => {
      // This would be an actual API call in production
      setTimeout(() => {
        setHasExistingResume(true); // Mock response
      }, 500);
    };

    checkExistingResume();
  }, []);

  // Check if user has master data, if not show popup
  useEffect(() => {
    const checkUserData = async () => {
      if (isAuthenticated && userEmail) {
        try {
          await getMasterData(userEmail);
          // User exists with master data, no need to show popup
        } catch (error: any) {
          if (error.message === 'User not found') {
            // User not found, show popup
            try {
              // Pre-fill form with available user details
              const details = await getDetails(userEmail);
              setUserDetails(details);
              setShowPopup(true);
            } catch (detailsError) {
              console.error('Error fetching user details:', detailsError);
              // Still show popup but with no pre-filled data
              setShowPopup(true);
            }
          } else {
            console.error('Error checking master data:', error);
            setErrorMessage('Error checking user data. Please try again.');
          }
        }
      }
    };

    if (isAuthenticated && userEmail) {
      checkUserData();
    }
  }, [isAuthenticated, userEmail]);

  // Handle flow toggle
  const toggleFlow = (flow: FlowType) => {
    // Only allow switching flows if at step 1
    if (flow !== activeFlow && currentStep === 1) {
      setActiveFlow(flow);
      setCurrentStep(1);
    }
  };

  // Determine if flow toggle buttons should be disabled
  const isFlowToggleDisabled = currentStep > 1;

  const nextStep = () => {
    if (currentStep === 2 && !resumeData.isPaidUser) {
      // If user is at step 2 and is not a paid user, go to step 2.5
      setCurrentStep(2.5);
    } else if (currentStep < 3) {
      setCurrentStep(prev => {
        if (prev === 2.5) return 3;
        return (prev + 1) as StepType;
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => {
        if (prev === 2.5) return 2;
        return (prev - 1) as StepType;
      });
    }
  };

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };
  
  // Handle form submission from popup
  const handleFormSubmit = async (formData: any) => {
    if (!userEmail) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Step 1: Update education and certification data
      const eduData = {
        Education: formData.educations.map((edu: any) => ({
          institution: edu.institution,
          location: edu.location,
          degree: edu.degree,
          startDate: edu.startDate,
          endDate: edu.endDate
        })),
        Certifications: formData.certifications.map((cert: any) => ({
          Title: cert.title,
          Desc: cert.description
        }))
      };
      
      await putMasterEdu(userEmail, eduData);
      
      // Step 2: Upload resume and process it
      if (formData.resume) {
        const taskId = await uploadResume(formData.resume);
        
        // Poll for task completion
        await pollTaskStatus(taskId);
        
        // Get result once task is completed
        const result = await pollTaskResult(taskId);
        
        // Step 3: Update master data with results
        if (result && result.work_experiences) {
          const success = await putMasterData(userEmail, result);
          
          if (success && success.status) {
            // Close popup on success
            setShowPopup(false);
          } else {
            setErrorMessage('Failed to update user data');
          }
        } else {
          setErrorMessage('Failed to process resume');
        }
      } else {
        setErrorMessage('Resume is required');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setErrorMessage('An error occurred during submission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="optimizer-container">
      <div className="flow-toggle-buttons">
        <button 
          className={`toggle-button ${activeFlow === 'jobDescription' ? 'active' : ''} ${isFlowToggleDisabled && activeFlow !== 'jobDescription' ? 'disabled' : ''}`}
          onClick={() => toggleFlow('jobDescription')}
          disabled={isFlowToggleDisabled && activeFlow !== 'jobDescription'}
        >
          Job Description
        </button>
        <button 
          className={`toggle-button ${activeFlow === 'keywords' ? 'active' : ''} ${isFlowToggleDisabled && activeFlow !== 'keywords' ? 'disabled' : ''}`}
          onClick={() => toggleFlow('keywords')}
          disabled={isFlowToggleDisabled && activeFlow !== 'keywords'}
        >
          Keywords
        </button>
      </div>
      
      <StepIndicator currentStep={currentStep} totalSteps={3} />
      
      <div className="flow-content">
        {activeFlow === 'jobDescription' && (
          <div className="job-description-flow">
            {currentStep === 1 && (
              <JobDescriptionStep1 
                resumeData={resumeData}
                updateResumeData={updateResumeData}
                nextStep={nextStep}
                hasExistingResume={hasExistingResume}
              />
            )}
            
            {currentStep === 2 && (
              <JobDescriptionStep2 
                resumeData={resumeData}
                updateResumeData={updateResumeData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {currentStep === 2.5 && (
              <JobDescriptionStep2_5 
                resumeData={resumeData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {currentStep === 3 && (
              <JobDescriptionStep3 
                resumeData={resumeData}
                updateResumeData={updateResumeData}
                prevStep={prevStep}
                resetFlow={() => setCurrentStep(1)}
              />
            )}
          </div>
        )}
        {activeFlow === 'keywords' && (
          <KeywordsFlow
            resumeData={resumeData}
            updateResumeData={updateResumeData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            hasExistingResume={hasExistingResume}
          />
        )}
      </div>
      
      {showPopup && (
        <PopupForm
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={handleFormSubmit}
          initialData={userDetails ? {
            name: userDetails.name || '',
            email: userDetails.email || userEmail || '',
            phone: userDetails.phone_number || '',
          } : undefined}
          isLoading={isLoading}
          error={errorMessage}
        />
      )}
    </div>
  );
};

export default OptimizerContainer;
