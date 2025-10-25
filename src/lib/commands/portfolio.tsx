import React from 'react';
import { registerCommand } from './registry';
import { useTheme } from '@/contexts/ThemeContext';
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

// ✅ Theme helper component
const ThemeWrapper = ({ children }: { children: (colors: any) => React.ReactNode }) => {
  const { currentTheme } = useTheme();
  return <>{children(currentTheme.colors)}</>;
};

// WHOAMI command - Shows full About Me content
registerCommand({
  name: 'whoami',
  description: 'Learn more about my journey',
  usage: 'whoami',
  category: 'info',
  handler: () => {
    return (
      <ThemeWrapper>
        {(colors) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name Header */}
            <div style={{ 
              color: colors.accent, 
              fontSize: '24px', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              {portfolioData.name}
            </div>
            
            {/* Title */}
            <div style={{ 
              color: colors.prompt, 
              fontSize: '16px',
              marginBottom: '8px'
            }}>
              {portfolioData.title}
            </div>

            {/* Education */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9, color: colors.text }}>
              <span style={{ color: colors.accent }}>🎓</span>
              <span>{portfolioData.education[0].degree} @ {portfolioData.education[0].school}</span>
            </div>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9, marginBottom: '16px', color: colors.text }}>
              <span style={{ color: colors.accent }}>📍</span>
              <span>Based in {portfolioData.location}</span>
            </div>

            {/* Divider */}
            <div style={{ 
              borderTop: `1px solid ${colors.text}`, 
              opacity: 0.3,
              margin: '8px 0 16px 0' 
            }} />

            {/* About section header */}
            <div style={{ 
              color: colors.accent, 
              fontSize: '18px', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              About Me
            </div>
            
            {/* About paragraphs from portfolio.json */}
            {portfolioData.about.map((paragraph, index) => (
              <p key={index} style={{ lineHeight: '1.6', opacity: 0.9, color: colors.text }}>
                {paragraph}
              </p>
            ))}

            {/* Quick navigation tips */}
            <div style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px', color: colors.text }}>
              Type <span style={{ color: colors.accent, fontWeight: 'bold' }}>experience</span> to see my work history
              <br />
              Type <span style={{ color: colors.accent, fontWeight: 'bold' }}>projects</span> to explore my work
            </div>
          </div>
        )}
      </ThemeWrapper>
    );
  },
});

// EXPERIENCE command
registerCommand({
  name: 'experience',
  description: 'View my work experience',
  usage: 'experience',
  aliases: ['work', 'jobs'],
  category: 'info',
  handler: () => {
    return (
      <ThemeWrapper>
        {(colors) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ color: colors.accent, fontSize: '18px', marginBottom: '8px' }}>
              💼 Work Experience
            </div>

            {portfolioData.experience.map((job, index) => (
              <div key={index} style={{ borderLeft: `2px solid ${colors.accent}`, paddingLeft: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <div style={{ color: colors.prompt, fontSize: '16px', fontWeight: 'bold' }}>
                    {job.title}
                  </div>
                  <div style={{ color: colors.text, opacity: 0.6, fontSize: '14px' }}>
                    {job.period}
                  </div>
                </div>
                
                <div style={{ color: colors.accent, marginTop: '4px', marginBottom: '8px' }}>
                  {job.company}
                </div>

                <ul style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', color: colors.text }}>
                  {job.description.map((item, i) => (
                    <li key={i} style={{ opacity: 0.9 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </ThemeWrapper>
    );
  },
});

// EDUCATION command
registerCommand({
  name: 'education',
  description: 'View my educational background',
  usage: 'education',
  aliases: ['edu', 'school'],
  category: 'info',
  handler: () => {
    return (
      <ThemeWrapper>
        {(colors) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ color: colors.accent, fontSize: '18px', marginBottom: '8px' }}>
              🎓 Education
            </div>

            {portfolioData.education.map((edu, index) => (
              <div key={index} style={{ borderLeft: `2px solid ${colors.prompt}`, paddingLeft: '16px' }}>
                <div style={{ color: colors.prompt, fontSize: '16px', fontWeight: 'bold' }}>
                  {edu.degree}
                </div>
                
                <div style={{ color: colors.accent, marginTop: '4px' }}>
                  {edu.school} • {edu.location}
                </div>

                <div style={{ color: colors.text, opacity: 0.6, marginTop: '4px', marginBottom: '8px' }}>
                  {edu.year}
                </div>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', color: colors.text }}>
                    {edu.highlights.map((item, i) => (
                      <li key={i} style={{ opacity: 0.9 }}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </ThemeWrapper>
    );
  },
});

// SKILLS command
registerCommand({
  name: 'skills',
  description: 'View my technical skills',
  usage: 'skills',
  aliases: ['tech', 'stack'],
  category: 'info',
  handler: () => {
    return (
      <ThemeWrapper>
        {(colors) => {
          const skillCategories = [
            { name: 'Languages', key: 'languages', color: colors.prompt },
            { name: 'ML/AI', key: 'ml_ai', color: colors.accent },
            { name: 'Cloud & DevOps', key: 'cloud', color: colors.accent },
            { name: 'DevOps Tools', key: 'devops', color: colors.prompt },
            { name: 'Databases', key: 'databases', color: colors.accent },
            { name: 'Tools', key: 'tools', color: colors.text },
          ];

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: colors.accent, fontSize: '18px', marginBottom: '8px' }}>
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
                            backgroundColor: `${category.color}22`,
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
        }}
      </ThemeWrapper>
    );
  },
});

// PROJECTS command
registerCommand({
  name: 'projects',
  description: 'Explore my projects',
  usage: 'projects',
  aliases: ['proj', 'portfolio'],
  category: 'info',
  handler: () => {
    return (
      <ThemeWrapper>
        {(colors) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ color: colors.accent, fontSize: '18px', marginBottom: '8px' }}>
              🚀 Featured Projects
            </div>

            {portfolioData.projects.map((project, index) => (
              <div key={index} style={{ borderLeft: `2px solid ${colors.accent}`, paddingLeft: '16px' }}>
                <div style={{ color: colors.prompt, fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {project.name}
                </div>

                <p style={{ opacity: 0.9, marginBottom: '12px', color: colors.text }}>
                  {project.description}
                </p>

                {/* Tech stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: `${colors.accent}22`,
                        color: colors.accent,
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
                  <ul style={{ marginLeft: '20px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: colors.text }}>
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
                      style={{ color: colors.accent, textDecoration: 'underline' }}
                    >
                      📂 GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: colors.prompt, textDecoration: 'underline' }}
                    >
                      🎥 Demo Video
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ThemeWrapper>
    );
  },
});

// CONTACT command
registerCommand({
  name: 'contact',
  description: 'Get in touch with me',
  usage: 'contact',
  category: 'social',
  handler: () => {
    return (
      <ThemeWrapper>
        {(colors) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ color: colors.accent, fontSize: '18px', marginBottom: '8px' }}>
              📬 Let's Connect!
            </div>

            <p style={{ opacity: 0.9, color: colors.text }}>
              I'm always open to interesting conversations and opportunities.
              Feel free to reach out!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: colors.accent, minWidth: '100px' }}>📧 Email:</span>
                <a
                  href={`mailto:${portfolioData.email}`}
                  style={{ color: colors.prompt, textDecoration: 'underline' }}
                >
                  {portfolioData.email}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: colors.accent, minWidth: '100px' }}>💼 LinkedIn:</span>
                <a
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.prompt, textDecoration: 'underline' }}
                >
                  {portfolioData.linkedin}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: colors.accent, minWidth: '100px' }}>🐙 GitHub:</span>
                <a
                  href={portfolioData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.prompt, textDecoration: 'underline' }}
                >
                  {portfolioData.github}
                </a>
              </div>
            </div>
          </div>
        )}
      </ThemeWrapper>
    );
  },
});

// RESUME command
registerCommand({
  name: 'resume',
  description: 'Download my resume',
  usage: 'resume',
  aliases: ['cv'],
  category: 'social',
  handler: () => {
    return (
      <ThemeWrapper>
        {(colors) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ color: colors.accent, fontSize: '18px', marginBottom: '8px' }}>
              📄 Resume
            </div>

            <p style={{ opacity: 0.9, color: colors.text }}>
              Download my resume to learn more about my experience and qualifications.
            </p>

            <a
              href={portfolioData.resume}
              download
              style={{
                display: 'inline-block',
                backgroundColor: colors.accent,
                color: colors.bg,
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
          </div>
        )}
      </ThemeWrapper>
    );
  },
});
