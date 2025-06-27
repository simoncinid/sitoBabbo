import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './About.module.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Marco Rossi",
      role: "Proprietario di Casa",
      text: "Grazie ai consigli di Mauro ho risolto l'infiltrazione sul terrazzo senza demolire. Risparmio incredibile!",
      rating: 5
    },
    {
      name: "Giulia Bianchi", 
      role: "Architetto",
      text: "Consulenza precisa e professionale. Mauro mi ha guidato nella scelta dei prodotti migliori per il progetto.",
      rating: 5
    },
    {
      name: "Roberto Verdi",
      role: "Impresa Edile", 
      text: "Collaborazione fantastica! Le sue competenze tecniche hanno fatto la differenza nei nostri lavori.",
      rating: 5
    }
  ];

  return (
    <section 
      ref={aboutRef}
      className={`${styles.aboutContainer} ${isVisible ? styles.visible : ''}`} 
      id="about"
    >
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.geometricPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleLine1}>Impermeabilizzare senza demolire?</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <div className={styles.photoContainer}>
              <img 
                src="/assets/mauro2.png" 
                alt="Profilo professionale"
                className={styles.profilePhoto}
              />
            </div>
            
            {/* Testimonials Section */}
            <div className={styles.testimonialsSection}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.testimonialContent}>
                    <div className={styles.testimonialText}>
                      "{testimonial.text}"
                    </div>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.authorInfo}>
                        <div className={styles.authorName}>{testimonial.name}</div>
                        <div className={styles.authorRole}>{testimonial.role}</div>
                      </div>
                      <div className={styles.rating}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className={styles.star}>⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Social Media Section */}
            <div className={styles.socialSection}>
              <div className={styles.socialTitle}>Seguimi sui social</div>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.tiktok.com/@maurosimoncini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                
                <a
                  href="https://www.facebook.com/maurosimoncini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a
                  href="https://www.instagram.com/maurosimoncini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.textSection}>
            <p className={styles.aboutText}>
              <strong>Posso farlo da solo?</strong> <br></br>
              In casa ti dicono di no. <br></br>
              Il vicino ci ha provato (e ha fatto un disastro).<br />
              Tu ci stai pensando. <br></br>
              <br></br>
              <strong>Impermeabilizzare sembra complicato.</strong> <br />
              Ma se ti dicessi che <strong>può diventare semplice</strong>, con gli strumenti e i consigli giusti?
              
              <br></br>Qui trovi uno spazio dove imparare, senza paura di sbagliare.<br />
              Dove puoi fare domande e ricevere risposte chiare, pratiche e immediate.<br />
              
              <br></br><strong>Perchè fidarti di me?</strong>
              
             <br></br> Mi chiamo Mauro Simoncini,
              e da anni mi occupo di consulenza tecnica e commerciale nel mondo dell'impermeabilizzazione. <br></br>
              
              Lavoro a fianco di rivendite, progettisti, imprese e anche privati ambiziosi,
              aiutandoli a scegliere, consigliare e utilizzare i prodotti giusti in ogni contesto.
              
              <br></br>Negli anni ho avuto l'opportunità di contribuire allo sviluppo di sistemi impermeabilizzanti oggi molto conosciuti,
              partecipando in prima linea alla loro crescita tecnica e commerciale.
              
              <br></br><strong>Non applico direttamente i prodotti, ma ti aiuto a capire come funzionano, quando, come e se usarli.<br />
              Il mio obiettivo è uno solo: farti risparmiare errori, tempo e soldi.</strong>
              <br /><br />
              
              <strong>Hai un dubbio sull'impermeabilizzazione o devi iniziare un lavoro?</strong>
              
              
            </p>

            <div className={styles.ctaSection}>
              <a
                href="https://wa.me/393938675606?text=Ciao! Vorrei una consulenza gratuita per impermeabilizzazione"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <span className={styles.ctaIcon}>📞</span>
                <span className={styles.ctaText}>Contattami cliccando qua </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 