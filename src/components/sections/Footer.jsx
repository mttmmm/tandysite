import React from 'react';
import './Footer.css';
import { INSTAGRAM_URL, buildWhatsAppUrl } from '../../config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">TANDY</h3>
            <p className="footer-tagline">Arte eterna na sua pele.</p>
          </div>

          <div className="footer-columns">
            <div className="footer-col">
              <h4 className="footer-heading">Navegação</h4>
              <a href="#home" className="footer-link">Início</a>
              <a href="#portfolio" className="footer-link">Portfólio</a>
              <a href="#about" className="footer-link">Sobre</a>
              <a href="#contact" className="footer-link">Contato</a>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Redes</h4>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
              <a
                href={buildWhatsAppUrl('Olá Tandy! Vim pelo site e gostaria de falar sobre uma tatuagem.')}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Tandy Ink. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
