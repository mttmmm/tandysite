import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo/tandy.jpeg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="navbar-logo">
          <img src={logo} alt="Tandy Ink Logo" className="navbar-logo-img" />
        </a>

        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="navbar-links"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div id="navbar-links" className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <a href="#portfolio" className="nav-link" onClick={() => setMobileOpen(false)}>Portfólio</a>
          <a href="#about" className="nav-link" onClick={() => setMobileOpen(false)}>Sobre</a>
          <a href="#contact" className="nav-link nav-btn" onClick={() => setMobileOpen(false)}>
            Agendar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
