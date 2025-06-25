import React, { useState } from 'react';
import './ResumeBuilder.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AxiosProgressEvent } from 'axios';

const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleCreateNew = () => {
    navigate('/dashboard/services/resume-builder/templates');
  };

  // Function to map API response to our resume data format
  const mapApiResponseToResumeData = (apiData: any) => {
    const personalInfo = apiData.data['Personal Information'] || {};
    const workExperience = apiData.data['Work Experience'] || [];
    const education = apiData.data['Education'] || [];
    const skills = apiData.data['Skills'] || [];
    const projects = apiData.data['Projects'] || [];
    const certifications = apiData.data['Certifications'] || [];
    const other = apiData.data['Other'] || {};
    
    // Map to our resume data structure
    const resumeData = {
      firstName: personalInfo.Name ? personalInfo.Name.split(' ')[0] : '',
      lastName: personalInfo.Name ? personalInfo.Name.split(' ').slice(1).join(' ') : '',
      email: personalInfo['Email'] || '',
      phone: personalInfo['Phone number'] || '',
      city: '', // Not directly provided in API
      country: '', // Not directly provided in API
      title: apiData.data['Most_Match_ROLE'] || '',
      linkedin: personalInfo['LinkedIn'] || '',
      github: personalInfo['GitHub/portfolio'] || '',
      about: apiData.data['Professional Summary'] || '',
      
      // Map experience
      experience: workExperience.map((exp: any) => ({
        jobTitle: exp.Title || '',
        company: exp.Company || '',
        location: '', // Not directly provided in API
        startDate: exp.Dates ? exp.Dates.split(' - ')[0] : '',
        endDate: exp.Dates ? exp.Dates.split(' - ')[1] : '',
        description: exp.Descriptions || []
      })),
      
      // Map education
      education: education.map((edu: any) => ({
        degree: edu.Degree || '',
        institution: edu.Institution || '',
        location: '', // Not directly provided in API
        year: edu.Dates || ''
      })),
      
      // Map skills
      skills: {
        technical: skills.filter((skill: string) => {
          const techSkills = ['Python', 'JavaScript', 'HTML', 'CSS', 'React', 'Node', 'SQL', 'Git', 
                              'Java', 'C++', 'PHP', 'Bootstrap', 'Flask', 'Selenium', 'PostgreSQL', 
                              'MySQL', 'WordPress', 'Scikit', 'Pandas', 'Numpy', 'Linux', 'Web', 'Windows'];
          return techSkills.some(tech => skill.toLowerCase().includes(tech.toLowerCase()));
        }),
        soft: other.Strengths || [],
        languages: other.Languages || []
      },
      
      // Map projects
      projects: projects.map((proj: any) => ({
        name: proj.Title || '',
        description: proj.Description || ''
      })),
      
      // Map certifications
      certifications: certifications
    };
    
    return resumeData;
  };

  // Function to poll for results
  const pollForResults = async (taskId: string, maxAttempts = 30, interval = 3000) => {
    let attempts = 0;
    
    const poll = async () => {
      try {
        attempts++;
        console.log(`Polling attempt ${attempts} for task ${taskId}`);
        
        const response = await axios.get(`https://sample.jobathor.com/result/dev/${taskId}`, {
          headers: {
            'accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        console.log('Poll response:', response.data);
        
        if (response.data.status === 'Completed' && response.data.data) {
          // Process completed data
          console.log('Resume parsing completed:', response.data);
          
          // Map API response to our format
          const resumeData = mapApiResponseToResumeData(response.data);
          
          // Store in localStorage for use in the editor
          localStorage.setItem('uploadedResumeData', JSON.stringify(resumeData));
          
          // Navigate to templates page
          setIsUploading(false);
          navigate('/dashboard/services/resume-builder/templates');
          return;
        } else if (
          response.data.status === 'Processing' || 
          response.data.status === 'Pending' || 
          !response.data.status
        ) {
          // Still processing, pending, or no status yet
          if (attempts < maxAttempts) {
            console.log(`Still processing: ${response.data.status}. Attempt ${attempts} of ${maxAttempts}`);
            setUploadProgress(Math.min(90, 40 + (attempts * 3))); // Increment progress
            setTimeout(poll, interval);
          } else {
            console.error('Resume processing timed out after', attempts, 'attempts');
            setUploadError('Resume processing timed out. Please try again later.');
            setIsUploading(false);
          }
        } else if (response.data.status === 'Failed') {
          console.error('Resume processing failed:', response.data);
          setUploadError('Resume processing failed. Please try a different PDF file.');
          setIsUploading(false);
        } else {
          // Error or unknown status
          console.error('Unknown status in response:', response.data);
          setUploadError(`Unexpected status: ${response.data.status || 'Unknown'}. Please try again later.`);
          setIsUploading(false);
        }
      } catch (error: any) {
        console.error('Error polling for results:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
        setUploadError(`Error processing resume: ${errorMessage}. Please try again.`);
        setIsUploading(false);
      }
    };
    
    await poll();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size exceeds 10MB limit. Please upload a smaller file.');
        return;
      }
      
      // Check file type
      if (file.type !== 'application/pdf') {
        setUploadError('Only PDF files are supported. Please upload a PDF file.');
        return;
      }
      
      setIsUploading(true);
      setUploadProgress(10);
      setUploadError(null);
      
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload to API
      console.log('Sending upload request to API...');
      const response = await axios.post('https://sample.jobathor.com/upload/dev', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          setUploadProgress(Math.min(40, percentCompleted)); // Cap at 40% for upload phase
        }
      });
      
      console.log('Upload response:', response.data);
      
      if (response.data && response.data.task_id) {
        console.log('Received task ID:', response.data.task_id);
        setUploadProgress(40); // Upload complete, now processing
        // Poll for results
        await pollForResults(response.data.task_id);
      } else {
        console.error('No task_id in response:', response.data);
        setUploadError('Error uploading resume: No task ID received. Please try again.');
        setIsUploading(false);
      }
    } catch (error: any) {
      console.error('Error uploading resume:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      setUploadError(`Error uploading resume: ${errorMessage}. Please try again.`);
      setIsUploading(false);
    }
  };

  return (
    <div className="resume-builder-container">
      <h1 className="resume-builder-title">How would you like to build your resume?</h1>
      
      <div className="resume-options-container">
        <div className="resume-option">
          <h2>Start with a new resume</h2>
          <p>Get step-by-step support with expert content suggestions at your fingertips!</p>
          <button 
            className="resume-button create-new"
            onClick={handleCreateNew}
            disabled={isUploading}
          >
            Create New
          </button>
        </div>

        <div className="resume-option-divider">
          <span>OR</span>
        </div>

        <div className="resume-option">
          <h2>Upload an existing resume</h2>
          <p>Edit your resume using expertly generated content in a fresh, new design.</p>
          {isUploading ? (
            <div className="upload-progress-container">
              <div className="upload-progress-bar">
                <div 
                  className="upload-progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="upload-status">
                {uploadProgress < 40 ? 'Uploading resume...' : 
                 uploadProgress < 90 ? 'Analyzing resume content...' : 
                 'Preparing your resume data...'}
                ({uploadProgress}%)
              </p>
            </div>
          ) : (
            <>
              <label htmlFor="resume-file" className="resume-button upload-file">
                <span className="upload-icon">↑</span> Choose File
              </label>
              <input 
                type="file" 
                id="resume-file" 
                accept=".pdf" 
                onChange={handleUpload}
                style={{ display: 'none' }} 
              />
            </>
          )}
          {uploadError && <p className="upload-error">{uploadError}</p>}
          <p className="file-format-note">Supported format: PDF</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
