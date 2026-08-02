import React from 'react';
import './About.css';
import tatuadorImg from '../../assets/tatuador.png';

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-intro">
          <p className="about-quote">
            Do conceito à pele, uma experiência exclusiva.
          </p>
        </div>

        <div className="about-content">
          <div className="about-photo-wrapper">
            <div className="about-photo-frame">
              <img
                src={tatuadorImg}
                alt="Tatuador Tandy trabalhando em seu estúdio"
                className="about-photo"
              />
              <div className="about-photo-overlay" />
              <span className="about-photo-corner-tr" />
              <span className="about-photo-corner-bl" />
            </div>
          </div>

          <div className="about-text-side">
            <div className="about-tag">Sobre mim</div>
            <p className="about-bio">
              Tatuador há mais de <em>5 anos</em>, especializado em{' '}
              <em>blackwork</em> e <em>fine line</em>. Transformei minha paixão
              pelo desenho em profissão durante a pandemia, e desde então venho
              criando tatuagens que carregam <em>identidade, sentimento e
                significado</em>.
            </p>
            <p className="about-bio">
              Cada trabalho é pensado nos mínimos detalhes para transformar
              ideias em arte na pele.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Anos de<br />Experiência</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">84</span>
                <span className="stat-label">Posts no<br />Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
