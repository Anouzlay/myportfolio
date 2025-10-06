import React from 'react';
import { ProfessionalExperience } from '@/types';

interface ProfessionalBackgroundProps {
  experiences: ProfessionalExperience[];
}

const ProfessionalBackground: React.FC<ProfessionalBackgroundProps> = ({ experiences }) => {
  return (
    <section id="background" className="section background">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Professional Background</h2>
          <div className="section__divider"></div>
        </div>
        
        <div className="background__timeline">
          <div className="background__item">
            <div className="background__content background__content--with-line" style={{ paddingLeft: 48 }}>
              {experiences.map((experience, index) => (
                <div key={experience.id} className="background__entry">
                  <span className="background__entry-dot"></span>
                  <div className="background__entry-body">
                    <div className="background__header">
                      <h3 className="background__position">{experience.position}</h3>
                      <h4 className="background__company">{experience.company}</h4>
                      <div className="background__meta">
                        <span className="background__duration">{experience.duration}</span>
                        <span className="background__location">{experience.location}</span>
                      </div>
                    </div>

                    {index < experiences.length - 1 && (
                      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginTop: 12, marginBottom: 4 }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBackground;


