import React, { useState, useEffect } from 'react';
import './Forms.css';

interface AboutFormProps {
  initialData: {
    about?: string;
    title?: string;
  };
  onContinue: (data: { about: string; title: string }) => void;
  onChange: (data: { about: string; title: string }) => void;
}

// Sample prompts for the about section
const ABOUT_PROMPTS = [
  "Experienced professional with a proven track record in...",
  "Results-driven individual with expertise in...",
  "Passionate [profession] with X years of experience in...",
  "Detail-oriented professional skilled in...",
  "Creative problem-solver with a background in...",
  "Innovative leader with a focus on...",
  "Dedicated professional with a strong foundation in..."
];

const AboutForm: React.FC<AboutFormProps> = ({ initialData, onContinue, onChange }) => {
  const [about, setAbout] = useState(initialData.about || '');
  const [title, setTitle] = useState(initialData.title || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrompts, setFilteredPrompts] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  // Filter prompts based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPrompts(ABOUT_PROMPTS);
      return;
    }

    const filtered = ABOUT_PROMPTS.filter(prompt => 
      prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrompts(filtered);
  }, [searchTerm]);

  // Update parent component when about or title changes
  useEffect(() => {
    onChange({ about, title });
  }, [about, title, onChange]);

  // Handle selecting a prompt
  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  // Handle using the selected prompt
  const handleUsePrompt = () => {
    if (selectedPrompt) {
      setAbout(selectedPrompt);
      setSelectedPrompt(null);
    }
  };

  // Handle continue button
  const handleContinue = () => {
    onContinue({ about, title });
  };

  // Handle AI enhance
  const handleAIEnhance = () => {
    // This would connect to an AI service in a real implementation
    // For now, let's just enhance the text with some professional language
    if (about.trim() === '') return;
    
    const enhancedAbout = `${about} 
    
With a strong commitment to excellence and continuous improvement, I leverage my skills to deliver exceptional results. I thrive in collaborative environments and am dedicated to contributing to organizational success.`;
    
    setAbout(enhancedAbout);
  };

  return (
    <div className="resume-form">
      <p className="form-subtitle">Finish strong with a clear summary of 2-4 sentences that showcase your abilities</p>
      
      <div className="about-container">
        <div className="about-left-section">
          <h4>Personalized & generated summary based on your experience and skills</h4>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input"
            />
          </div>
          
          <div className="prompts-list">
            {filteredPrompts.map((prompt, index) => (
              <div 
                key={index} 
                className={`prompt-item ${selectedPrompt === prompt ? 'selected' : ''}`}
                onClick={() => handleSelectPrompt(prompt)}
              >
                {prompt}
              </div>
            ))}
          </div>
          
          {selectedPrompt && (
            <button 
              type="button"
              className="use-prompt-button"
              onClick={handleUsePrompt}
            >
              Use This Prompt
            </button>
          )}
        </div>
        
        <div className="about-right-section">
          <h4>Write your own, or select from the prompts:</h4>
          
          <div className="about-textarea-container">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write a brief summary of your professional background, skills, and career objectives..."
              className="about-textarea"
              rows={10}
            />
            
            <button 
              type="button"
              className="ai-enhance-button"
              onClick={handleAIEnhance}
              disabled={about.trim() === ''}
            >
              AI Enhance
            </button>
          </div>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Professional Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Software Engineer, Marketing Specialist, Project Manager"
            className="form-control"
          />
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

export default AboutForm;
