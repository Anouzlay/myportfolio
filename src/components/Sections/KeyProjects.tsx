import React, { useState, useEffect, useCallback } from 'react';
import { Project } from '@/types';

interface KeyProjectsProps {
  projects: Project[];
}

const KeyProjects: React.FC<KeyProjectsProps> = ({ projects }) => {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const professionalProjects = projects.filter(project => project.category === 'professional');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    professionalProjects.forEach((project) => {
      const element = document.getElementById(project.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [professionalProjects]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <section id="projects" className="section projects">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Key Projects & Contributions</h2>
          <div className="section__divider"></div>
        </div>
        
        <div className="projects__grid">
          {professionalProjects.map((project, index) => (
            <div 
              key={project.id} 
              id={project.id}
              className={`project-card ${project.featured ? 'project-card--featured' : ''} ${visibleCards.has(project.id) ? 'project-card--visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(index)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenIndex(index); } }}
            >
              {project.imageUrl && (
                <div className="project-card__image">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="project-card__img"
                  />
                  <div className="project-card__image-overlay"></div>
                </div>
              )}
              
              <div className="project-card__content">
                <div className="project-card__header">
                  <h3 className="project-card__title">{project.title}</h3>
                  {project.featured && (
                    <div className="project-card__featured-badge">
                      <span>⭐ Featured</span>
                    </div>
                  )}
                </div>
                
                <p className="project-card__description">{project.description}</p>
                
                <div className="project-card__technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-card__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-card__actions">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-card__link project-card__link--github"
                    >
                      <span>View Code</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-card__link project-card__link--live"
                    >
                      <span>Live Demo</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {openIndex !== null && (
          <div className="modal" onClick={close}>
            <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal__header">
                <h3 className="modal__title">{professionalProjects[openIndex].title}</h3>
                <button className="modal__close" onClick={close} aria-label="Close">×</button>
              </div>
              <div className="modal__body">
                <p className="modal__text">{professionalProjects[openIndex].description}</p>
                <div className="modal__meta" style={{ marginTop: 8 }}>
                  {professionalProjects[openIndex].technologies.map((t, i) => (
                    <span key={i} className="project-card__tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default KeyProjects;

