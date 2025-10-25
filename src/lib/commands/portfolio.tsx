import React from 'react';
import { registerCommand } from './registry';
import portfolioData from '@/data/portfolio.json';
import type { Portfolio } from '@/types/portfolio';

const portfolio: Portfolio = portfolioData;

const validatePortfolio = (data: any): data is Portfolio => {
  return (
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    data.email.includes('@') &&
    Array.isArray(data.projects)
  );
};

if (!validatePortfolio(portfolioData)) {
  console.error('Invalid portfolio data structure');
}

// WHOAMI command - Shows full About Me content
registerCommand({
  name: 'whoami',
  description: 'Learn more about my journey',
  usage: 'whoami',
  handler: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Name Header */}
        <div style={{ 
          color: '#50fa7b', 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          {portfolioData.name}
        </div>
        
        {/* Title */}
        <div style={{ 
          color: '#f1fa8c', 
          fontSize: '16px',
          marginBottom: '8px'
        }}>
          {portfolioData.title}
        </div>

        {/* Education */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
          <span style={{ color: '#ff79c6' }}>🎓</span>
          <span>{portfolioData.education[0].degree} @ {portfolioData.education[0].school}</span>
        </div>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9, marginBottom: '16px' }}>
          <span style={{ color: '#ff79c6' }}>📍</span>
          <span>Based in {portfolioData.location}</span>
        </div>

        {/* Divider */}
        <div style={{ 
          borderTop: '1px solid #6272a4', 
          margin: '8px 0 16px 0' 
        }} />

        {/* About section header */}
        <div style={{ 
          color: '#8be9fd', 
          fontSize: '18px', 
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          About Me
        </div>
        
        {/* About paragraphs from portfolio.json */}
        {portfolioData.about.map((paragraph, index) => (
          <p key={index} style={{ lineHeight: '1.6', opacity: 0.9 }}>
            {paragraph}
          </p>
        ))}

        {/* Quick navigation tips */}
        <div style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>
          Type <span style={{ color: '#8be9fd', fontWeight: 'bold' }}>experience</span> to see my work history
          <br />
          Type <span style={{ color: '#8be9fd', fontWeight: 'bold' }}>projects</span> to explore my work
        </div>
      </div>
    );
  },
});

// EXPERIENCE command
registerCommand({
  name: 'experience',
  description: 'View my work experience',
  usage: 'experience',
  aliases: ['work', 'jobs'],
  handler: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ color: '#50fa7b', fontSize: '18px', marginBottom: '8px' }}>
          💼 Work Experience
        </div>

        {portfolioData.experience.map((job, index) => (
          <div key={index} style={{ borderLeft: '2px solid #8be9fd', paddingLeft: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <div style={{ color: '#f1fa8c', fontSize: '16px', fontWeight: 'bold' }}>
                {job.title}
              </div>
              <div style={{ color: '#6272a4', fontSize: '14px' }}>
                {job.period}
              </div>
            </div>
            
            <div style={{ color: '#8be9fd', marginTop: '4px', marginBottom: '8px' }}>
              {job.company}
            </div>

            <ul style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {job.description.map((item, i) => (
                <li key={i} style={{ opacity: 0.9 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  },
});

// EDUCATION command
registerCommand({
  name: 'education',
  description: 'View my educational background',
  usage: 'education',
  aliases: ['edu', 'school'],
  handler: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ color: '#50fa7b', fontSize: '18px', marginBottom: '8px' }}>
          🎓 Education
        </div>

        {portfolioData.education.map((edu, index) => (
          <div key={index} style={{ borderLeft: '2px solid #ff79c6', paddingLeft: '16px' }}>
            <div style={{ color: '#f1fa8c', fontSize: '16px', fontWeight: 'bold' }}>
              {edu.degree}
            </div>
            
            <div style={{ color: '#8be9fd', marginTop: '4px' }}>
              {edu.school} • {edu.location}
            </div>

            <div style={{ color: '#6272a4', marginTop: '4px', marginBottom: '8px' }}>
              {edu.year}
            </div>

            {edu.highlights && edu.highlights.length > 0 && (
              <ul style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {edu.highlights.map((item, i) => (
                  <li key={i} style={{ opacity: 0.9 }}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  },
});

// SKILLS command
registerCommand({
  name: 'skills',
  description: 'View my technical skills',
  usage: 'skills',
  aliases: ['tech', 'stack'],
  handler: () => {
    const skillCategories = [
      { name: 'Languages', key: 'languages', color: '#f1fa8c' },
      { name: 'ML/AI', key: 'ml_ai', color: '#50fa7b' },
      { name: 'Cloud & DevOps', key: 'cloud', color: '#8be9fd' },
      { name: 'DevOps Tools', key: 'devops', color: '#ff79c6' },
      { name: 'Web Development', key: 'web', color: '#bd93f9' },
      { name: 'Databases', key: 'databases', color: '#ffb86c' },
      { name: 'Tools', key: 'tools', color: '#6272a4' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ color: '#50fa7b', fontSize: '18px', marginBottom: '8px' }}>
          🛠️ Technical Skills
        </div>

        {skillCategories.map((category) => {
          const skills = portfolioData.skills[category.key as keyof typeof portfolioData.skills];
          if (!skills || skills.length === 0) return null;

          return (
            <div key={category.key}>
              <div style={{ color: category.color, fontWeight: 'bold', marginBottom: '8px' }}>
                {category.name}:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingLeft: '16px' }}>
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: category.color + '22',
                      color: category.color,
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});

// PROJECTS command
registerCommand({
  name: 'projects',
  description: 'Explore my projects',
  usage: 'projects',
  aliases: ['work', 'portfolio'],
  handler: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ color: '#50fa7b', fontSize: '18px', marginBottom: '8px' }}>
          🚀 Featured Projects
        </div>

        {portfolioData.projects.map((project, index) => (
          <div key={index} style={{ borderLeft: '2px solid #bd93f9', paddingLeft: '16px' }}>
            <div style={{ color: '#f1fa8c', fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
              {project.name}
            </div>

            <p style={{ opacity: 0.9, marginBottom: '12px' }}>
              {project.description}
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#8be9fd22',
                    color: '#8be9fd',
                    padding: '2px 8px',
                    borderRadius: '3px',
                    fontSize: '12px',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <ul style={{ marginLeft: '20px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {project.highlights.map((highlight, i) => (
                  <li key={i} style={{ opacity: 0.85, fontSize: '14px' }}>{highlight}</li>
                ))}
              </ul>
            )}

            {/* Links */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8be9fd', textDecoration: 'underline' }}
                >
                  📂 GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ff79c6', textDecoration: 'underline' }}
                >
                  🎥 Demo Video
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
});

// CONTACT command
registerCommand({
  name: 'contact',
  description: 'Get in touch with me',
  usage: 'contact',
  handler: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ color: '#50fa7b', fontSize: '18px', marginBottom: '8px' }}>
          📬 Let's Connect!
        </div>

        <p style={{ opacity: 0.9 }}>
          I'm always open to interesting conversations and opportunities.
          Feel free to reach out!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: '#8be9fd', minWidth: '100px' }}>📧 Email:</span>
            <a
              href={`mailto:${portfolioData.email}`}
              style={{ color: '#f1fa8c', textDecoration: 'underline' }}
            >
              {portfolioData.email}
            </a>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: '#8be9fd', minWidth: '100px' }}>💼 LinkedIn:</span>
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#f1fa8c', textDecoration: 'underline' }}
            >
              {portfolioData.linkedin}
            </a>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: '#8be9fd', minWidth: '100px' }}>🐙 GitHub:</span>
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#f1fa8c', textDecoration: 'underline' }}
            >
              {portfolioData.github}
            </a>
          </div>
        </div>
      </div>
    );
  },
});

// RESUME command
registerCommand({
  name: 'resume',
  description: 'Download my resume',
  usage: 'resume',
  aliases: ['cv'],
  handler: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ color: '#50fa7b', fontSize: '18px', marginBottom: '8px' }}>
          📄 Resume
        </div>

        <p style={{ opacity: 0.9 }}>
          Download my resume to learn more about my experience and qualifications.
        </p>

        <a
          href={portfolioData.resume}
          download
          style={{
            display: 'inline-block',
            backgroundColor: '#50fa7b',
            color: '#282a36',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: 'bold',
            textDecoration: 'none',
            width: 'fit-content',
            marginTop: '8px',
          }}
        >
          ⬇️ Download Resume (PDF)
        </a>

        <p style={{ opacity: 0.7, fontSize: '14px', marginTop: '8px' }}>
        </p>
      </div>
    );
  },
});
