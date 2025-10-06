import React from 'react';
import { PersonalInfo } from '@/types';

interface AboutMeProps {
  personalInfo: PersonalInfo;
}

const AboutMe: React.FC<AboutMeProps> = ({ personalInfo }) => {
  return (
    <section id="about" className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <div className="identity">
              <div className="identity__main">
                <h2 className="identity__name">{personalInfo.name}</h2>
                <p className="identity__title">{personalInfo.title}</p>
              </div>
              <div className="identity__badges">
                <a className="identity__badge" href="https://www.linkedin.com/in/yassine-anouzla-a909251b3/" target="_blank" rel="noopener noreferrer">in LinkedIn</a>
                <a className="identity__badge" href={`mailto:${personalInfo.email}`}>✉ {personalInfo.email}</a>
                <a className="identity__badge" href={`tel:${personalInfo.phone}`}>☎ {personalInfo.phone}</a>
                <span className="identity__badge">📍 {personalInfo.location}</span>
              </div>
            </div>

            <h1 className="hero__title">
              <span className="hero__title-line">A DATA SCIENCE</span>
              <span className="hero__title-line hero__title-line--accent">& AI ENGINEER</span>

            </h1>
            
          </div>
          
          <div className="hero__image">
            <div className="hero__image-container">
              <img 
                src={personalInfo.profileImage || "/2.PNG"} 
                alt={`${personalInfo.name} profile`}
                className="hero__image-img"
                onLoad={() => console.log('Image loaded successfully:', personalInfo.profileImage)}
                onError={(e) => console.error('Image failed to load:', personalInfo.profileImage, e)}
              />
            </div>
          </div>
        </div>
        
        {/* Single Summary Popup - appears below both sections */}
        <div className="hero__summary-popup">
          <p>{personalInfo.summary}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

