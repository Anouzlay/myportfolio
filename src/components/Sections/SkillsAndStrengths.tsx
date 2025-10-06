import React, { useState, useEffect } from 'react';
import { Skill } from '@/types';

interface SkillsAndStrengthsProps {
  skills: Skill[];
}

const SkillsAndStrengths: React.FC<SkillsAndStrengthsProps> = ({ skills }) => {
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCategories(prev => new Set([...prev, parseInt(entry.target.id)]));
          }
        });
      },
      { threshold: 0.1 }
    );

    skills.forEach((_, index) => {
      const element = document.getElementById(`skill-category-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [skills]);

  const getSkillIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      'AI & Machine Learning': '🤖',
      'Natural Language Processing': '🗣️',
      'Computer Vision': '👁️',
      'Data Science & Analytics': '📊',
      'Data Engineering & Automation': '🛠️',
      'Multi-Agent Systems': '🕸️',
      'Software & Web Engineering': '🌐',
      'Tools & Frameworks': '🔧',
      'Soft Skills': '🤝'
    };
    return iconMap[category] || '🔧';
  };

  const getCategoryOrder = (category: string, index: number) => {
    if (category === 'Tools & Frameworks') return 999; // always last
    return index;
  };

  // Removed unused getSkillLevel helper to satisfy strict TypeScript builds

  return (
    <section id="skills" className="section skills">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Skills & Strengths</h2>
          <div className="section__divider"></div>
        </div>
        
        <div className="skills__grid">
          {skills.map((skillCategory, index) => (
            <div 
              key={index} 
              id={`skill-category-${index}`}
              className={`skill-category ${visibleCategories.has(index) ? 'skill-category--visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s`, order: getCategoryOrder(skillCategory.category, index) }}
            >
              <div className="skill-category__header">
                <span className="skill-category__icon">{getSkillIcon(skillCategory.category)}</span>
                <h3 className="skill-category__title">{skillCategory.category}</h3>
              </div>
              
              {/* Only show titles. For Soft Skills, show 5 compact examples. */}
              {skillCategory.category === 'Soft Skills' && (
                <div style={{ marginTop: 8, color: '#bfbfbf', fontSize: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skillCategory.skills.slice(0, 5).map((s, i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 10px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>{s}</span>
                  ))}
                </div>
              )}

              {skillCategory.category === 'Tools & Frameworks' && (
                <div style={{ marginTop: 8, color: '#bfbfbf', fontSize: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skillCategory.skills.slice(0, 20).map((s, i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 10px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsAndStrengths;

