import React from 'react';
import { Project } from '@/types';

interface AcademicProjectsProps {
  projects: Project[];
}

const AcademicProjects: React.FC<AcademicProjectsProps> = ({ projects }) => {
  const academicProjects = projects.filter(project => project.category === 'academic');

  return (
    <section id="academic" className="section academic">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Academic Projects</h2>
          <div className="section__divider"></div>
        </div>
        
        <div className="academic__grid">
          {academicProjects.map((project) => (
            <div key={project.id} className="academic-card">
              {project.imageUrl && (
                <div className="academic-card__image">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="academic-card__img"
                  />
                </div>
              )}
              
              <div className="academic-card__content">
                <h3 className="academic-card__title">{project.title}</h3>
                <p className="academic-card__description">{project.description}</p>
                
                <div className="academic-card__technologies">
                  <h4 className="academic-card__tech-title">Technologies Used:</h4>
                  <div className="academic-card__tech-tags">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="academic-card__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="academic-card__actions">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="academic-card__link academic-card__link--github"
                    >
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="academic-card__link academic-card__link--live"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicProjects;


