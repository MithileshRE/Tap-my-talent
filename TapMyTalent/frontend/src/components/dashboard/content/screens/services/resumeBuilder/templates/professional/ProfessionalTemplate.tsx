import React from 'react';
import './ProfessionalTemplate.css';
// We'll use FontAwesome classes but add the CSS link in index.html instead of importing directly

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
  certifications?: string[];
  awards?: string[];
  projects?: Array<{
    name: string;
    description: string;
  }>;
  volunteer?: Array<{
    role: string;
    organization: string;
    duration: string;
    description: string;
  }>;
}

interface ProfessionalTemplateProps {
  data: ResumeData;
  scale?: number;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, scale = 1 }) => {
  const fullName = `${data.firstName || 'Firstname'} ${data.lastName || 'Lastname'}`;
  
  return (
    <div className="tmt-professional-resume-preview-container" style={{ 
      transform: `scale(${scale})`,
      transformOrigin: 'top center',
      display: 'inline-block',
      marginBottom: '-650px' /* Adjusted margin to maintain A4 proportions */
    }}>
      <div className="tmt-professional-resume-container">
        {/* Header Section */}
        <header className="tmt-professional-header">
          <div className="tmt-professional-profile">
            <h1>{fullName}</h1>
            <p className="tmt-professional-title">{data.title || 'Professional Title'}</p>
          </div>
          <div className="tmt-professional-contact-info">
            <div className="tmt-professional-contact-item">
              <i className="fas fa-envelope"></i>
              <span>{data.email || 'email@example.com'}</span>
            </div>
            <div className="tmt-professional-contact-item">
              <i className="fas fa-phone"></i>
              <span>{data.phone || '+1 (123) 456-7890'}</span>
            </div>
            <div className="tmt-professional-contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{data.city && data.country ? `${data.city}, ${data.country}` : 'City, Country'}</span>
            </div>
            <div className="tmt-professional-contact-item">
              <i className="fab fa-linkedin"></i>
              <span>{data.linkedin || 'linkedin.com/in/yourprofile'}</span>
            </div>
            {data.portfolio && (
              <div className="tmt-professional-contact-item">
                <i className="fas fa-globe"></i>
                <span>{data.portfolio}</span>
              </div>
            )}
          </div>
        </header>

        {/* About Section */}
        <section className="tmt-professional-section tmt-professional-about-section">
          <h2>About</h2>
          <div className="tmt-professional-section-content">
            <p>{data.about || 'Dedicated and results-driven Frontend Developer with 3+ years of experience in building responsive web applications. Proven track record of delivering high-quality code and optimizing application performance. Skilled in React.js, TypeScript, and modern frontend frameworks with a strong focus on user experience and accessibility. Seeking to leverage my expertise to create innovative digital solutions that enhance user engagement and business growth.'}</p>
          </div>
        </section>

        {/* Experience Section */}
        <section className="tmt-professional-section tmt-professional-experience-section">
          <h2>Experience</h2>
          <div className="tmt-professional-section-content">
            {data.experience && data.experience.length > 0 ? (
              data.experience.map((exp, index) => (
                <div key={index} className="tmt-professional-experience-item">
                  <div className="tmt-professional-experience-header">
                    <h3>{exp.jobTitle || 'Job Title'}</h3>
                    <span className="tmt-professional-company">{exp.company || 'Company Name'}</span>
                  </div>
                  <div>
                    <span className="tmt-professional-date">{exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : 'Jan 2020 - Present'}</span>
                    <span className="tmt-professional-location">{exp.location || 'Location'}</span>
                  </div>
                  <div className="tmt-professional-experience-description">
                    <ul>
                      {exp.description && exp.description.length > 0 ? (
                        exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))
                      ) : (
                        <>
                          <li>Developed responsive web applications using React.js, improving user engagement by 35%.</li>
                          <li>Collaborated with UX/UI designers to implement modern interface designs and animations.</li>
                          <li>Optimized application performance, reducing load time by 40% and improving SEO rankings.</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="tmt-professional-experience-item">
                <div className="tmt-professional-experience-header">
                  <h3>Frontend Developer</h3>
                  <p className="tmt-professional-company">Tech Solutions Inc.</p>
                  <p className="tmt-professional-date">Jan 2022 - Present</p>
                  <p className="tmt-professional-location">Bangalore, India</p>
                </div>
                <div className="tmt-professional-experience-description">
                  <ul>
                    <li>Developed responsive web applications using React.js, improving user engagement by 35%.</li>
                    <li>Collaborated with UX/UI designers to implement modern interface designs and animations.</li>
                    <li>Optimized application performance, reducing load time by 40% and improving SEO rankings.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Education Section */}
        <section className="tmt-professional-section tmt-professional-education-section">
          <h2>Education</h2>
          <div className="tmt-professional-section-content">
            {data.education && data.education.length > 0 ? (
              data.education.map((edu, index) => (
                <div className="tmt-professional-education-item" key={index}>
                  <h3>{edu.degree}</h3>
                  <p className="tmt-professional-institution">{edu.institution}</p>
                  <p className="tmt-professional-date">{edu.year}</p>
                  <p className="tmt-professional-location">{edu.location}</p>
                  <p className="tmt-professional-subject">{edu.subject}</p>
                </div>
              ))
            ) : (
              <div className="tmt-professional-education-item">
                <h3>Bachelor of Technology</h3>
                <p className="tmt-professional-institution">Indian Institute of Technology</p>
                <p className="tmt-professional-date">2018 - 2022</p>
                <p className="tmt-professional-location">Delhi</p>
                <p className="tmt-professional-subject">Computer Science & Engineering</p>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="tmt-professional-section tmt-professional-skills-section">
          <h2>Skills</h2>
          <div className="tmt-professional-section-content">
            <div className="tmt-professional-skills-category">
              <h3>Technical Skills</h3>
              <ul className="tmt-professional-skills-list">
                {data.skills && data.skills.technical ? (
                  data.skills.technical.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))
                ) : (
                  <>
                    <li>JavaScript/TypeScript</li>
                    <li>React.js</li>
                    <li>Node.js</li>
                    <li>HTML5/CSS3</li>
                    <li>RESTful APIs</li>
                    <li>Git/GitHub</li>
                  </>
                )}
              </ul>
            </div>

            <div className="tmt-professional-skills-category">
              <h3>Soft Skills</h3>
              <ul className="tmt-professional-skills-list">
                {data.skills && data.skills.soft ? (
                  data.skills.soft.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))
                ) : (
                  <>
                    <li>Communication</li>
                    <li>Leadership</li>
                    <li>Problem Solving</li>
                    <li>Teamwork</li>
                    <li>Time Management</li>
                    <li>Adaptability</li>
                  </>
                )}
              </ul>
            </div>

            <div className="tmt-professional-skills-category">
              <h3>Languages</h3>
              <ul className="tmt-professional-skills-list">
                {data.skills && data.skills.languages ? (
                  data.skills.languages.map((lang, index) => (
                    <li key={index}>{lang}</li>
                  ))
                ) : (
                  <>
                    <li>English (Native/Fluent)</li>
                    <li>Hindi (Proficient)</li>
                    <li>French (Basic)</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* More Details Section */}
        <section className="tmt-professional-section tmt-professional-more-details-section">
          <h2>More Details</h2>
          <div className="tmt-professional-section-content">
            {(data.certifications && data.certifications.length > 0) && (
              <div className="tmt-professional-details-category">
                <h3>Certifications</h3>
                <ul>
                  {data.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {(data.awards && data.awards.length > 0) && (
              <div className="tmt-professional-details-category">
                <h3>Awards & Achievements</h3>
                <ul>
                  {data.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}

            {(data.projects && data.projects.length > 0) && (
              <div className="tmt-professional-details-category">
                <h3>Projects</h3>
                <ul>
                  {data.projects.map((project, index) => (
                    <li key={index}><strong>{project.name}:</strong> {project.description}</li>
                  ))}
                </ul>
              </div>
            )}

            {(data.volunteer && data.volunteer.length > 0) && (
              <div className="tmt-professional-details-category">
                <h3>Volunteer Experience</h3>
                <ul>
                  {data.volunteer.map((vol, index) => (
                    <li key={index}><strong>{vol.role}:</strong> {vol.organization}, {vol.duration} - {vol.description}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
