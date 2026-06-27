import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [subject, setSubject] = useState('Orçamento de Tatuagem');

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = "556195032547";
    const message = `Olá Tandy! Gostaria de falar sobre: ${subject}`;
    const url = `https://wa.me/${+556195032547}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-header">
          <span className="contact-label">Pronto para começar?</span>
          <h2 className="contact-heading">
            Vamos Criar<br />
            <span className="contact-heading-accent">Algo Único</span>
          </h2>
          <span className="ornament"></span>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-desc">
              Inicie seu projeto aqui. Entre em contato pelo WhatsApp para agendamentos e orçamentos.
              Sua experiência exclusiva começa no primeiro traço.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="detail-label">Localização</span>
                <span className="detail-value">Brasília - DF</span>
              </div>
              <div className="contact-detail-item">
                <span className="detail-label">Instagram</span>
                <span className="detail-value">@tandy.ink</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleWhatsApp}>
            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="form-control"
              >
                <option value="Orçamento de Tatuagem">Orçamento Nova Tatuagem</option>
                <option value="Cobertura / Cover up">Cobertura (Cover up)</option>
                <option value="Retoque">Retoque</option>
                <option value="Dúvida Geral">Dúvida Geral</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary contact-submit">
              Chamar no WhatsApp
            </button>
            <p className="bot-notice">
              * Atendimento personalizado via WhatsApp.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;