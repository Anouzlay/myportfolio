import React, { useState, useEffect, useCallback } from 'react';
import { Certification } from '@/types';

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <section id="certifications" className="section certifications">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Certifications</h2>
          <div className="section__divider"></div>
        </div>
        
        <div className="certifications__grid">
          {certifications.map((certification, index) => (
            <div 
              key={certification.id} 
              className="certification-card"
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(index)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenIndex(index); } }}
            >
              <div className="certification-card__header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <h3 className="certification-card__name">{certification.name}</h3>
                  {certification.logoUrl && (
                    <img src={certification.logoUrl} alt={`${certification.issuer} logo`} className="certification-card__logo" />
                  )}
                </div>
                <p className="certification-card__issuer">{certification.issuer}</p>
              </div>
              
              <div className="certification-card__content">
                <div className="certification-card__date">
                  <span className="certification-card__date-label">Issued:</span>
                  <span className="certification-card__date-value">{certification.date}</span>
                </div>
                
                {certification.credentialId && (
                  <div className="certification-card__credential">
                    <span className="certification-card__credential-label">Credential ID:</span>
                    <span className="certification-card__credential-value">{certification.credentialId}</span>
                  </div>
                )}
                
                {certification.credentialUrl && (
                  <div className="certification-card__actions">
                    <a 
                      href={certification.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="certification-card__link"
                    >
                      View Credential
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {openIndex !== null && (
          <div className="modal" onClick={close}>
            <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal__header">
                <h3 className="modal__title">{certifications[openIndex].name}</h3>
                <button className="modal__close" onClick={close} aria-label="Close">×</button>
              </div>
              <div className="modal__meta">
                <span className="modal__badge">{certifications[openIndex].issuer}</span>
                <span>Issued: {certifications[openIndex].date}</span>
              </div>
              <div className="modal__body">
                {certifications[openIndex].credentialUrl && (
                  <a 
                    href={certifications[openIndex].credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certification-card__link"
                  >
                    View Credential
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;


