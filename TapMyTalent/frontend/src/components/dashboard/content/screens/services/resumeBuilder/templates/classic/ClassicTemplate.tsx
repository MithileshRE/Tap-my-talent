import React from 'react';
import './ClassicTemplate.css';

interface DetailItem {
  title: string;
  description: string;
}

interface ResumeData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  linkedin?: string;
  portfolio?: string;
  title?: string;
  about?: string;
  experience?: Array<{
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
    location: string;
    subject: string;
  }>;
  skills?: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  certifications?: DetailItem[];
  awards?: DetailItem[];
  projects?: DetailItem[];
  volunteer?: DetailItem[];
  additionalDetails?: DetailItem[];
}

interface ClassicTemplateProps {
  data: ResumeData;
  scale?: number;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, scale = 1 }) => {
  const fullName = `${data.firstName || 'FIRSTNAME'} ${data.lastName || 'LASTNAME'}`;
  
  return (
    <div className="tmt-classic-resume-preview-container" style={{ 
      transform: `scale(${scale})`,
      transformOrigin: 'top center',
      display: 'inline-block',
      marginBottom: '-600px' /* Increased negative margin to eliminate more white space */
    }}>
      <div className="tmt-classic-resume-container">
        {/* Header Section */}
        <header className="tmt-classic-header">
          <h1 className="tmt-classic-name">{fullName}</h1>
          <div className="tmt-classic-contact-info">
            <div className="tmt-classic-contact-row">
              <span>{data.phone || '+1(123) 456-7890'}</span>
              {(data.city || data.country) && (
                <>
                  <span className="tmt-classic-separator">•</span>
                  <span>
                    {data.city && data.country ? `${data.city}, ${data.country}` : 
                     data.city ? data.city : data.country}
                  </span>
                </>
              )}
            </div>
            <div className="tmt-classic-contact-row">
              <span className="tmt-classic-highlight">{data.email || 'contact@faangpath.com'}</span>
              
              {data.linkedin && data.linkedin.trim() !== '' && (
                <>
                  <span className="tmt-classic-separator">•</span>
                  <span className="tmt-classic-highlight">{data.linkedin}</span>
                </>
              )}
              
              {data.portfolio && data.portfolio.trim() !== '' && (
                <>
                  <span className="tmt-classic-separator">•</span>
                  <span className="tmt-classic-highlight">{data.portfolio}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Objective Section */}
        <section className="tmt-classic-section tmt-classic-objective-section">
          <h2 className="tmt-classic-section-title">OBJECTIVE</h2>
          <div className="tmt-classic-section-content">
            <p className="tmt-classic-objective-text">
              {data.about || 'Software Engineer with 2+ years of experience in XXX, seeking full-time XXX roles.'}
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="tmt-classic-section tmt-classic-education-section">
          <h2 className="tmt-classic-section-title">EDUCATION</h2>
          <div className="tmt-classic-section-content">
            {data.education && data.education.length > 0 ? (
              data.education.map((edu, index) => (
                <div key={index} className="tmt-classic-education-item">
                  <div className="tmt-classic-education-header">
                    <div className="tmt-classic-education-degree">
                      <span className="tmt-classic-degree-title">{edu.degree || 'Master of Computer Science'}</span>
                      <span className="tmt-classic-institution">, {edu.institution || 'Stanford University'}</span>
                    </div>
                    <div className="tmt-classic-education-year">
                      {edu.year || 'Expected 2020'}
                    </div>
                  </div>
                  <div className="tmt-classic-education-details">
                    <p>Relevant Coursework: {edu.subject || 'A, B, C, and D.'}</p>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="tmt-classic-education-item">
                  <div className="tmt-classic-education-header">
                    <div className="tmt-classic-education-degree">
                      <span className="tmt-classic-degree-title">Master of Computer Science</span>
                      <span className="tmt-classic-institution">, Stanford University</span>
                    </div>
                    <div className="tmt-classic-education-year">
                      Expected 2020
                    </div>
                  </div>
                  <div className="tmt-classic-education-details">
                    <p>Relevant Coursework: A, B, C, and D.</p>
                  </div>
                </div>
                <div className="tmt-classic-education-item">
                  <div className="tmt-classic-education-header">
                    <div className="tmt-classic-education-degree">
                      <span className="tmt-classic-degree-title">Bachelor of Computer Science</span>
                      <span className="tmt-classic-institution">, Stanford University</span>
                    </div>
                    <div className="tmt-classic-education-year">
                      2014 - 2017
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="tmt-classic-section tmt-classic-skills-section">
          <h2 className="tmt-classic-section-title">SKILLS</h2>
          <div className="tmt-classic-section-content">
            <div className="tmt-classic-skills-grid">
              {/* Technical Skills - Only show if there are technical skills */}
              {data.skills && data.skills.technical && data.skills.technical.length > 0 && (
                <>
                  <div className="tmt-classic-skills-category">
                    Technical Skills
                  </div>
                  <div className="tmt-classic-skills-list">
                    {data.skills.technical.join(', ')}
                  </div>
                </>
              )}
              
              {/* Soft Skills - Only show if there are soft skills */}
              {data.skills && data.skills.soft && data.skills.soft.length > 0 && (
                <>
                  <div className="tmt-classic-skills-category">
                    Soft Skills
                  </div>
                  <div className="tmt-classic-skills-list">
                    {data.skills.soft.join(', ')}
                  </div>
                </>
              )}
              
              {/* Languages - Only show if there are languages */}
              {data.skills && data.skills.languages && data.skills.languages.length > 0 && (
                <>
                  <div className="tmt-classic-skills-category">
                    Languages
                  </div>
                  <div className="tmt-classic-skills-list">
                    {data.skills.languages.join(', ')}
                  </div>
                </>
              )}
              
              {/* If no skills at all, show a placeholder message */}
              {(!data.skills || 
                (!data.skills.technical || data.skills.technical.length === 0) && 
                (!data.skills.soft || data.skills.soft.length === 0) && 
                (!data.skills.languages || data.skills.languages.length === 0)) && (
                <div className="tmt-classic-skills-list" style={{ gridColumn: '1 / span 2' }}>
                  Add your skills in the Skills section
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="tmt-classic-section tmt-classic-experience-section">
          <h2 className="tmt-classic-section-title">EXPERIENCE</h2>
          <div className="tmt-classic-section-content">
            {data.experience && data.experience.length > 0 ? (
              data.experience.map((exp, index) => (
                <div key={index} className="tmt-classic-experience-item">
                  <div className="tmt-classic-experience-header">
                    <div className="tmt-classic-experience-title">{exp.jobTitle || 'Role Name'}</div>
                    <div className="tmt-classic-experience-date-location">
                      {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : 'Jan 2017 - Jan 2019'}
                    </div>
                  </div>
                  <div className="tmt-classic-experience-company">
                    {exp.company || 'Company Name'}
                    {exp.location && exp.location.trim() !== '' && (
                      <span className="tmt-classic-experience-location"> | {exp.location}</span>
                    )}
                  </div>
                  <div className="tmt-classic-experience-description">
                    <ul>
                      {exp.description && exp.description.length > 0 ? (
                        exp.description.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))
                      ) : (
                        <>
                          <li>Achieved X% growth for XYZ using A, B, and C skills.</li>
                          <li>Led XYZ which led to X% of improvement in ABC</li>
                          <li>Developed XYZ that did A, B, and C using X, Y, and Z.</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="tmt-classic-experience-item">
                  <div className="tmt-classic-experience-header">
                    <div className="tmt-classic-experience-title">Role Name</div>
                    <div className="tmt-classic-experience-date-location">Jan 2017 - Jan 2019</div>
                  </div>
                  <div className="tmt-classic-experience-company">Company Name</div>
                  <div className="tmt-classic-experience-description">
                    <ul>
                      <li>Achieved X% growth for XYZ using A, B, and C skills.</li>
                      <li>Led XYZ which led to X% of improvement in ABC</li>
                      <li>Developed XYZ that did A, B, and C using X, Y, and Z.</li>
                    </ul>
                  </div>
                </div>
                <div className="tmt-classic-experience-item">
                  <div className="tmt-classic-experience-header">
                    <div className="tmt-classic-experience-title">Role Name</div>
                    <div className="tmt-classic-experience-date-location">Jan 2017 - Jan 2019</div>
                  </div>
                  <div className="tmt-classic-experience-company">Company Name</div>
                  <div className="tmt-classic-experience-date-location tmt-classic-experience-location">San Francisco, CA</div>
                  <div className="tmt-classic-experience-description">
                    <ul>
                      <li>Achieved X% growth for XYZ using A, B, and C skills.</li>
                      <li>Led XYZ which led to X% of improvement in ABC</li>
                      <li>Developed XYZ that did A, B, and C using X, Y, and Z.</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* More Details Section */}
        <section className="tmt-classic-section tmt-classic-more-details-section">
          <h2 className="tmt-classic-section-title">MORE DETAILS</h2>
          <div className="tmt-classic-section-content">
            {/* Projects Subsection */}
            {data.projects && data.projects.length > 0 && (
              <div className="tmt-classic-details-category">
                <h3 className="tmt-classic-subsection-title">Projects</h3>
                <div className="tmt-classic-experience-description">
                  <ul>
                    {data.projects.map((project, index) => (
                      <li key={index}>
                        <span className="tmt-classic-project-title">{project.title}</span>
                        {project.description && (
                          <span className="tmt-classic-project-description">{project.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Certifications Subsection */}
            {data.certifications && data.certifications.length > 0 && (
              <div className="tmt-classic-details-category">
                <h3 className="tmt-classic-subsection-title">Certifications</h3>
                <div className="tmt-classic-experience-description">
                  <ul>
                    {data.certifications.map((cert, index) => (
                      <li key={index}>
                        <span className="tmt-classic-cert-title">{cert.title}</span>
                        {cert.description && (
                          <span className="tmt-classic-cert-description"> - {cert.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Awards Subsection */}
            {data.awards && data.awards.length > 0 && (
              <div className="tmt-classic-details-category">
                <h3 className="tmt-classic-subsection-title">Awards & Achievements</h3>
                <div className="tmt-classic-experience-description">
                  <ul>
                    {data.awards.map((award, index) => (
                      <li key={index}>
                        <span className="tmt-classic-award-title">{award.title}</span>
                        {award.description && (
                          <span className="tmt-classic-award-description"> - {award.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Volunteer Experience Subsection */}
            {data.volunteer && data.volunteer.length > 0 && (
              <div className="tmt-classic-details-category">
                <h3 className="tmt-classic-subsection-title">Volunteer Experience</h3>
                <div className="tmt-classic-experience-description">
                  <ul>
                    {data.volunteer.map((vol, index) => (
                      <li key={index}>
                        <span className="tmt-classic-volunteer-title">{vol.title}</span>
                        {vol.description && (
                          <span className="tmt-classic-volunteer-description"> - {vol.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Additional Details Subsection */}
            {data.additionalDetails && data.additionalDetails.length > 0 && (
              <div className="tmt-classic-details-category">
                <h3 className="tmt-classic-subsection-title">Additional Details</h3>
                <ul className="tmt-classic-additional-list">
                  {data.additionalDetails.map((detail, index) => (
                    <li key={index}>
                      <span className="tmt-classic-detail-title">{detail.title}</span>
                      {detail.description && (
                        <span className="tmt-classic-detail-description"> - {detail.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fallback content when no details are available */}
            {(!data.projects || data.projects.length === 0) && 
             (!data.certifications || data.certifications.length === 0) && 
             (!data.awards || data.awards.length === 0) && 
             (!data.volunteer || data.volunteer.length === 0) && 
             (!data.additionalDetails || data.additionalDetails.length === 0) && (
              <div className="tmt-classic-details-fallback">
                <div className="tmt-classic-project-item">
                  <div className="tmt-classic-project-title">Hiring Search Tool.</div>
                  <div className="tmt-classic-project-description">
                    Built a tool to search for Hiring Managers and Recruiters by using ReactJS, NodeJS, Firebase and boolean queries.
                  </div>
                </div>
                <ul className="tmt-classic-certifications-list">
                  <li>
                    <span className="tmt-classic-cert-title">AWS Certified Solutions Architect</span>
                    <span className="tmt-classic-cert-description"> - Amazon Web Services, 2023</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClassicTemplate;
