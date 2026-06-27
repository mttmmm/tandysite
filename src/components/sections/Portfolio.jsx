import React, { useState } from 'react';
import './Portfolio.css';
import logoVideo1 from '../../assets/videos e fotos/WhatsApp Video 2026-05-01 at 22.47.02.mp4';
import logoVideo2 from '../../assets/videos e fotos/WhatsApp Video 2026-05-01 at 22.47.04.mp4';
import logoVideo3 from '../../assets/videos e fotos/WhatsApp Video 2026-05-01 at 22.47.09.mp4';
import logoVideo4 from '../../assets/videos e fotos/WhatsApp Video 2026-05-02 at 08.23.38.mp4';
import portfolioImage1 from '../../assets/videos e fotos/WhatsApp Image 2026-05-02 at 08.23.45.jpeg';
import portfolioImage2 from '../../assets/videos e fotos/WhatsApp Image 2026-05-02 at 08.23.51.jpeg';
import portfolioImage3 from '../../assets/videos e fotos/WhatsApp Image 2026-05-02 at 08.23.54.jpeg';
import portfolioImage4 from '../../assets/videos e fotos/2fadabca-b7fc-4223-8151-906997854673.jpg';
import portfolioImage5 from '../../assets/videos e fotos/319bd60b-96f9-4b73-bdeb-116052283722.jpg';
import { INSTAGRAM_URL } from '../../config/site';

const Portfolio = () => {
  const [activeVideoId, setActiveVideoId] = useState(null);

  const works = [
    { id: 1, title: 'Projetos em Blackwork', category: 'Processo', type: 'video', src: logoVideo1, poster: portfolioImage1 },
    { id: 2, title: 'Blackwork autoral', category: 'Blackwork', type: 'video', src: logoVideo2, poster: portfolioImage2 },
    { id: 3, title: 'Blackworks de mitologia', category: 'Studio', type: 'video', src: logoVideo3, poster: portfolioImage3 },
    { id: 4, title: 'Detalhe e acabamento', category: 'Blackwork', type: 'video', src: logoVideo4, poster: portfolioImage1 },
    { id: 5, title: 'Composição fechada', category: 'Blackwork', type: 'image', src: portfolioImage4 },
    { id: 6, title: 'Flash selecionado', category: 'Portfólio', type: 'image', src: portfolioImage5 },
  ];

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <div className="portfolio-header">
          <span className="portfolio-label">Trabalhos Selecionados</span>
          <h2 className="section-title">Portfólio</h2>
          <span className="ornament"></span>
        </div>

        <div className="portfolio-grid">
          {works.map((work, index) => (
            <div
              key={work.id}
              className={`portfolio-item ${index === 0 ? 'portfolio-item-large' : ''}`}
            >
              <div className="portfolio-img-wrapper">
                {work.type === 'video' ? (
                  activeVideoId === work.id ? (
                    <div className="portfolio-video-shell">
                      <video
                        src={work.src}
                        poster={work.poster}
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        className="portfolio-video-player"
                      />
                      <button
                        type="button"
                        className="portfolio-video-close"
                        onClick={() => setActiveVideoId(null)}
                        aria-label={`Fechar video ${work.title}`}
                      >
                        Fechar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="portfolio-video-poster"
                      onClick={() => setActiveVideoId(work.id)}
                      aria-label={`Reproduzir video ${work.title}`}
                    >
                      <img src={work.poster} alt={work.title} loading="lazy" />
                      <span className="portfolio-video-play">
                        <span className="portfolio-video-play-icon" />
                        Tocar video
                      </span>
                    </button>
                  )
                ) : (
                  <img src={work.src} alt={work.title} loading="lazy" />
                )}
              </div>
              <div className="portfolio-info">
                <span className="portfolio-category">{work.category}</span>
                <h3 className="portfolio-item-title">{work.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-cta">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Ver Mais no Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
