import React, { useState, useEffect } from 'react';
import { NavItem } from '@/types';

interface HeaderProps {
  navItems: NavItem[];
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navItems, activeSection, onNavClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavClick(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <div className="header__brand">
          <h1 className="header__title">Anouzla Yassine</h1>
          <img src="/Mylogo.png" alt="Site logo" className="header__logo" />
        </div>

        <nav className="header__nav">
          <button 
            className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="header__hamburger"></span>
          </button>
          
          <ul className={`header__nav-list ${isMobileMenuOpen ? 'header__nav-list--open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id} className="header__nav-item">
                <button
                  className={`header__nav-link ${activeSection === item.id ? 'header__nav-link--active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions" aria-hidden="true"></div>
      </div>
    </header>
  );
};

export default Header;

