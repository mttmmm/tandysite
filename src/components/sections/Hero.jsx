import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-vignette" />

      <div className="hero-content container">
        <div className="hero-top-text">
          <span className="hero-label">Tatuador de Blackwork</span>
          <span className="hero-label">Brasília - DF</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-thread hero-title-thread-left" />
          <span className="hero-title-line" data-text="Tandy">Tandy</span>
          <span className="hero-title-line hero-title-accent" data-text="Ink">Ink</span>
          <span className="hero-title-thread hero-title-thread-right" />
        </h1>

        <div className="hero-bottom">
          <p className="hero-subtitle hero-subtitle-left">
            Melhor trampo<br />
            da sua vida
          </p>
          <p className="hero-subtitle hero-subtitle-right">
            Especialista em blackwork<br />
          </p>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span></span>
      </div>
    </section>
  );
};

export default Hero;
