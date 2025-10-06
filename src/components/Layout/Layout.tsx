import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import SimpleNeuralNetwork from '../UI/SimpleNeuralNetwork';
import SignatureBadge from '../UI/SignatureBadge';
import { NavItem } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('about');

  const navItems: NavItem[] = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'educations', label: 'Educations', href: '#educations' },
    { id: 'background', label: 'Professional Background', href: '#background' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' }
  ];

  useEffect(() => {
    const HEADER_OFFSET = 130; // match header height
    const labelById: Record<string, string> = {
      about: 'About',
      educations: 'Educations',
      background: 'Professional Background',
      services: 'Services',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications'
    };

    const ids = Object.keys(labelById);

    const updateActive = () => {
      const scrollPos = window.scrollY + HEADER_OFFSET + 1; // +1 to push past borders
      let currentId = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (scrollPos >= top) currentId = id;
      }
      if (navItems.some(n => n.id === currentId)) setActiveSection(currentId);
      const base = 'Anouzla Yassine Portfolio';
      const sectionTitle = labelById[currentId];
      if (sectionTitle) document.title = `${sectionTitle} — ${base}`;
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="layout">
      <SimpleNeuralNetwork />
      <Header 
        navItems={navItems} 
        activeSection={activeSection} 
        onNavClick={handleNavClick} 
      />
      <main className="layout__main">
        {children}
      </main>
      <Footer />
      <SignatureBadge href={undefined} fixed />
    </div>
  );
};

export default Layout;
