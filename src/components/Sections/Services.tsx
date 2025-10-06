import React, { useState, useEffect, useCallback } from 'react';
import { ServiceItem } from '@/types';

interface ServicesProps {
  items: ServiceItem[];
}

const Services: React.FC<ServicesProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <section id="services" className="section services">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Services</h2>
          <div className="section__divider"></div>
        </div>

        <div className="projects__grid">
          {items.map((service, index) => (
            <div
              key={`${service.title}-${index}`}
              className={`project-card project-card--visible`}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(index)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenIndex(index); } }}
            >
              <div className="project-card__content">
                <div className="project-card__header">
                  <h3 className="project-card__title">{service.title}</h3>
                </div>
                <p className="project-card__description">{service.description}</p>
                {service.features && service.features.length > 0 && (
                  <ul className="background__achievements-list">
                    {service.features.map((feat, i) => (
                      <li key={i} className="background__achievement">{feat}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {openIndex !== null && (
          <div className="modal" onClick={close}>
            <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal__header">
                <h3 className="modal__title">{items[openIndex].title}</h3>
                <button className="modal__close" onClick={close} aria-label="Close">×</button>
              </div>
              <div className="modal__body">
                <p className="modal__text" style={{ marginBottom: 12 }}>{items[openIndex].description}</p>
                {items[openIndex].features && (
                  <ul className="background__achievements-list">
                    {items[openIndex].features!.map((f, i) => (
                      <li key={i} className="background__achievement">{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;


