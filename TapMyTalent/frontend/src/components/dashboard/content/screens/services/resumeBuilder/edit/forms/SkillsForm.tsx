import React, { useState, useEffect } from 'react';
import './Forms.css';

interface SkillsFormProps {
  initialData: {
    skills?: {
      technical: string[];
      soft: string[];
      languages: string[];
    };
  };
  onContinue: (data: { skills: { technical: string[]; soft: string[]; languages: string[] } }) => void;
  onChange: (data: { skills: { technical: string[]; soft: string[]; languages: string[] } }) => void;
}

// Sample skill suggestions
const SKILL_SUGGESTIONS = {
  technical: [
    'JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML', 'CSS', 'Python', 'Java', 'C++', 
    'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'REST API', 'GraphQL', 'Redux', 'Express'
  ],
  soft: [
    'Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Leadership', 
    'Adaptability', 'Critical Thinking', 'Creativity', 'Attention to Detail', 'Project Management'
  ],
  languages: [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic', 
    'Portuguese', 'Hindi', 'Italian'
  ]
};

const SkillsForm: React.FC<SkillsFormProps> = ({ initialData, onContinue, onChange }) => {
  const [skills, setSkills] = useState({
    technical: initialData.skills?.technical || [],
    soft: initialData.skills?.soft || [],
    languages: initialData.skills?.languages || []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ category: string; skill: string }[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState<'technical' | 'soft' | 'languages'>('technical');

  // Search for skills when the search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results: { category: string; skill: string }[] = [];
    
    Object.entries(SKILL_SUGGESTIONS).forEach(([category, categorySkills]) => {
      categorySkills.forEach(skill => {
        if (skill.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ category, skill });
        }
      });
    });
    
    setSearchResults(results);
  }, [searchTerm]);

  // Update the parent component when skills change
  useEffect(() => {
    onChange({ skills });
  }, [skills, onChange]);
  
  // Update skills when initialData changes (e.g., when uploaded resume data is loaded)
  useEffect(() => {
    if (initialData.skills) {
      console.log('Updating skills form with new data:', initialData.skills);
      setSkills({
        technical: initialData.skills.technical || [],
        soft: initialData.skills.soft || [],
        languages: initialData.skills.languages || []
      });
    }
  }, [initialData]);

  // Add a skill from search results
  const addSkillFromSearch = (category: string, skill: string) => {
    if (category === 'technical' || category === 'soft' || category === 'languages') {
      if (!skills[category].includes(skill)) {
        const updatedSkills = {
          ...skills,
          [category]: [...skills[category], skill]
        };
        setSkills(updatedSkills);
        setSearchTerm('');
      }
    }
  };

  // Add a custom skill
  const addCustomSkill = () => {
    if (newSkill.trim() !== '') {
      if (!skills[activeCategory].includes(newSkill.trim())) {
        const updatedSkills = {
          ...skills,
          [activeCategory]: [...skills[activeCategory], newSkill.trim()]
        };
        setSkills(updatedSkills);
        setNewSkill('');
      }
    }
  };

  // Remove a skill
  const removeSkill = (category: 'technical' | 'soft' | 'languages', skill: string) => {
    const updatedSkills = {
      ...skills,
      [category]: skills[category].filter(s => s !== skill)
    };
    setSkills(updatedSkills);
  };

  // Handle continue button
  const handleContinue = () => {
    onContinue({ skills });
  };

  // Handle key press for adding custom skills
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomSkill();
    }
  };

  return (
    <div className="resume-form">
      <p className="form-subtitle">Choose skills that align with the job requirements.</p>
      
      <div className="skills-container">
        <div className="skills-search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input"
            />
          </div>
          
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div 
                  key={index} 
                  className="search-result-item"
                  onClick={() => addSkillFromSearch(result.category, result.skill)}
                >
                  <span>{result.skill}</span>
                  <span className="skill-category">{result.category}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="skills-list">
            {skills.technical.length > 0 && (
              <div className="skills-category">
                <h4>Technical Skills</h4>
                <div className="skill-tags">
                  {skills.technical.map((skill, index) => (
                    <div key={index} className="skill-tag">
                      {skill}
                      <button 
                        type="button" 
                        className="remove-skill"
                        onClick={() => removeSkill('technical', skill)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {skills.soft.length > 0 && (
              <div className="skills-category">
                <h4>Soft Skills</h4>
                <div className="skill-tags">
                  {skills.soft.map((skill, index) => (
                    <div key={index} className="skill-tag">
                      {skill}
                      <button 
                        type="button" 
                        className="remove-skill"
                        onClick={() => removeSkill('soft', skill)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {skills.languages.length > 0 && (
              <div className="skills-category">
                <h4>Languages</h4>
                <div className="skill-tags">
                  {skills.languages.map((skill, index) => (
                    <div key={index} className="skill-tag">
                      {skill}
                      <button 
                        type="button" 
                        className="remove-skill"
                        onClick={() => removeSkill('languages', skill)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="skills-custom-section">
          <h4>Add skills or write your own:</h4>
          
          <div className="category-selector">
            <button 
              type="button"
              className={`category-button ${activeCategory === 'technical' ? 'active' : ''}`}
              onClick={() => setActiveCategory('technical')}
            >
              Technical
            </button>
            <button 
              type="button"
              className={`category-button ${activeCategory === 'soft' ? 'active' : ''}`}
              onClick={() => setActiveCategory('soft')}
            >
              Soft Skills
            </button>
            <button 
              type="button"
              className={`category-button ${activeCategory === 'languages' ? 'active' : ''}`}
              onClick={() => setActiveCategory('languages')}
            >
              Languages
            </button>
          </div>
          
          <div className="custom-skill-input">
            <input
              type="text"
              placeholder={`Add a ${activeCategory} skill...`}
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-control"
            />
            <button 
              type="button"
              className="add-enhance-button"
              onClick={addCustomSkill}
            >
              Add Skill
            </button>
          </div>
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

export default SkillsForm;
