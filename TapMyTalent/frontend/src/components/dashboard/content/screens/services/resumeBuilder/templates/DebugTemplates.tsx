import React from 'react';
import ClassicTemplate from './classic/ClassicTemplate';
import ProfessionalTemplate from './professional/ProfessionalTemplate';
import './ResumeTemplates.css';

const DebugTemplates: React.FC = () => {
  return (
    <div className="resume-templates-debug-container">
      <h1>Debug: Resume Templates</h1>
      <div className="templates-debug-grid">
        <div className="template-debug-card">
          <h2>Classic Template</h2>
          <ClassicTemplate data={{}} />
        </div>
        <div className="template-debug-card">
          <h2>Professional Template</h2>
          <ProfessionalTemplate data={{}} />
        </div>
      </div>
    </div>
  );
};

export default DebugTemplates;
