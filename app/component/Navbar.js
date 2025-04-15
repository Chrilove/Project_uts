'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import '../styles/globals.css';
import '../component/sections/hero/HeroSection.css'

export default function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Navbar appearance
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Section tracking for highlighting
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute('id'));
          // Trigger zoom animation on section title when scrolled into view
          const sectionTitle = section.querySelector('.section-title');
          if (sectionTitle && !sectionTitle.classList.contains('animated')) {
            sectionTitle.classList.add('zoom-in-out', 'animated');
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section function with enhanced animation
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: 'smooth'
      });
      
      // Apply section entry animation
      section.classList.add('section-enter');
      
      // Apply zoom animation to section title
      const sectionTitle = section.querySelector('.section-title');
      if (sectionTitle) {
        sectionTitle.classList.remove('zoom-in-out');
        // Trigger reflow to restart animation
        void sectionTitle.offsetWidth;
        sectionTitle.classList.add('zoom-in-out');
      }
    }
    setActiveSection(sectionId);
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}
      data-bs-theme={theme}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/" onClick={(e) => {
          e.preventDefault();
          scrollToSection('hero');
        }}>
          <span className="brand-text navbar-section"><h3 className="hero-title">My Portofolio ✨</h3></span> 
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse hero-sub-title" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'hero' ? 'active active-section-indicator' : ''}`} 
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
              >
                <h6 className="fas fa-home me-1 navbar-sub-title"> Home</h6>
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'about' ? 'active active-section-indicator' : ''}`} 
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                <h6 className="fas fa-user me-1 navbar-sub-title"> About</h6>
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'projects' ? 'active active-section-indicator' : ''}`} 
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
              >
                <h6 className="fas fa-briefcase me-1 navbar-sub-title"> Projects</h6>
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'skills' ? 'active active-section-indicator' : ''}`} 
                href="#skills"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('skills');
                }}
              >
                <h6 className="fas fa-star me-1 navbar-sub-title"> Skills</h6>
              </a>
            </li>
            <li className="nav-item hero-sub-title">
              <a 
                className={`nav-link ${activeSection === 'experience' ? 'active active-section-indicator' : ''}`} 
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('experience');
                }}
              >
                <h6 className="fas fa-laptop-code me-1 navbar-sub-title"> Experiences</h6>
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'contact' ? 'active active-section-indicator' : ''}`} 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                <h6 className="fas fa-envelope me-1 navbar-sub-title"> Contact</h6>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}