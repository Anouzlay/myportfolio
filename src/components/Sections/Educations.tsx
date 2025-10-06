import React, { useEffect, useState } from 'react';
import { Education } from '@/types';

interface EducationsProps {
  items: Education[];
}

const Educations: React.FC<EducationsProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openModal = (index: number) => setOpenIndex(index);
  const closeModal = () => setOpenIndex(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const formatYear = (iso: string | null) => {
    if (!iso) return 'Present';
    const [year] = iso.split('-');
    return year;
  };

  return (
    <section id="educations" className="section educations">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Educations</h2>
          <div className="section__divider"></div>
        </div>

        <div className="projects__grid">
          {items.map((edu, index) => (
            <div
              key={`${edu.institution}-${index}`}
              className={`education-card project-card--visible`}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="button"
              tabIndex={0}
              onClick={() => openModal(index)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(index); } }}
            >
              <div className="project-card__content">
                <div className="project-card__header" style={{ alignItems: 'baseline' }}>
                  <h3 className="project-card__title" style={{ marginBottom: 8 }}>{edu.program}</h3>
                </div>
                <div className="education-card__badge" style={{ display: 'inline-block', marginBottom: 10 }}>
                  {formatYear(edu.start_date)}–{formatYear(edu.end_date)}
                </div>
                <div className="education-card__institution" style={{ marginBottom: 12 }}>{edu.institution}</div>
                {edu.status && (
                  <div className="background__meta" style={{ marginBottom: 8 }}>
                    <span className="background__location">{edu.status}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {openIndex !== null && (
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby={`edu-title-${openIndex}`} onClick={closeModal}>
            <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal__header">
                <h3 id={`edu-title-${openIndex}`} className="modal__title">{items[openIndex].program}</h3>
                <button className="modal__close" aria-label="Close" onClick={closeModal}>×</button>
              </div>
              <div className="modal__meta">
                <span className="modal__badge">{formatYear(items[openIndex].start_date)}–{formatYear(items[openIndex].end_date)}</span>
                <span className="modal__institution">{items[openIndex].institution}</span>
              </div>
              <div className="modal__body">
                {items[openIndex].status && (
                  <p className="modal__text"><strong>Status:</strong> {items[openIndex].status}</p>
                )}
                {items[openIndex].location && (
                  <p className="modal__text"><strong>Location:</strong> {items[openIndex].location}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Educations;


