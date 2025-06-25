import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import PopupForm from '../common/PopupForm';
import { getDetails, getMasterEdu, putMasterEdu, putMasterData } from '../../services/userDetailsService';
import { uploadResume } from '../../services/resumeOptimizerService';
import { pollTaskStatus, pollTaskResult } from '../../utils/polling';
import type { EducationCertificationData } from '../../services/userDetailsService';

interface EditProfileComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileComponent: React.FC<EditProfileComponentProps> = ({ isOpen, onClose }) => {
  const { userEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedinUrl: ''
  });
  const [educationData, setEducationData] = useState<EducationCertificationData>({
    Education: [],
    Certifications: []
  });

  // Fetch user details and education data when component mounts
  useEffect(() => {
    if (isOpen && userEmail) {
      fetchUserData();
    }
  }, [isOpen, userEmail]);

  const fetchUserData = async () => {
    if (!userEmail) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch user details
      const userDetails = await getDetails(userEmail);
      
      // Fetch education and certification data
      let eduData: EducationCertificationData = {
        Education: [],
        Certifications: []
      };
      
      try {
        eduData = await getMasterEdu(userEmail);
      } catch (eduError) {
        console.warn('Could not fetch education data:', eduError);
        // Continue without education data if it fails
      }
      
      setUserData({
        name: userDetails.name || '',
        email: userEmail,
        phone: userDetails.phone_number || '',
        linkedinUrl: userDetails.linkedinUrl || ''
      });
      
      setEducationData(eduData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    if (!userEmail) {
      setError('User email not found. Please log in again.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Handle resume upload if a new resume is provided
      if (formData.resume) {
        try {
          // Upload the resume file directly
          const taskId = await uploadResume(formData.resume);
          
          // Poll for task completion
          await pollTaskStatus(taskId);
          
          // Get result once task is completed
          const result = await pollTaskResult(taskId);
          
          // Step 3: Update master data with results
          if (result && result.work_experiences) {
            const success = await putMasterData(userEmail, result);
            
            if (!success || !success.status) {
              console.error('Failed to update master data with resume results');
              setError('Resume processed but failed to update profile data');
            }
          } else {
            console.error('Failed to process resume properly');
            setError('Failed to process resume properly');
          }
        } catch (uploadError) {
          console.error('Error uploading or processing resume:', uploadError);
          setError('Error processing resume. Education data will still be updated.');
          // Continue with education update even if resume upload fails
        }
      }
      
      // 2. Update education and certification data
      const educationCertificationData: EducationCertificationData = {
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
      
      await putMasterEdu(userEmail, educationCertificationData);
      
      // Close the popup on successful submission
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Convert education data to the format expected by PopupForm
  const initialFormData = {
    ...userData,
    educations: educationData.Education?.map(edu => ({
      id: Math.random().toString(),
      institution: edu.institution || '',
      location: edu.location || '',
      degree: edu.degree || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || ''
    })) || [],
    certifications: educationData.Certifications?.map(cert => ({
      id: Math.random().toString(),
      title: cert.Title || '',
      description: cert.Desc || ''
    })) || []
  };

  return (
    <PopupForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      initialData={initialFormData}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default EditProfileComponent;
