import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './About.module.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
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
      text: "Problema risolto senza demolire. Grazie Mauro!",
      rating: 5
    },
    {
      name: "Giulia Bianchi", 
      role: "Architetto",
      text: "Consulenza precisa e prodotti perfetti.",
      rating: 5
    },
    {
      name: "Roberto Verdi",
      role: "Impresa Edile", 
      text: "Competenze tecniche eccezionali.",
      rating: 5
    }
  ];

  return (
    <>
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
            
            {/* Testimonials Section - Desktop only */}
            <div className={styles.testimonialsDesktop}>
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
                href="https://wa.me/393938657606?text=Ciao! Vorrei una consulenza gratuita per impermeabilizzazione"
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

        {/* Testimonials Section - Separate from main content */}
        <div className={styles.testimonialsSection}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className={styles.star}>⭐</span>
                ))}
              </div>
              <div className={styles.testimonialText}>
                "{testimonial.text}"
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorName}>{testimonial.name}</div>
                <div className={styles.authorRole}>{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid Section - Full Width */}
        <div className={styles.bottomGridSection}>
          <div className={styles.bottomGrid}>
            {/* Social Media Section */}
            <div className={styles.socialGridSection} onClick={() => setActivePopup('social')}>
              <div className={styles.socialTitle}>Social</div>
              <div className={styles.socialGridIcons}>
                <a
                  href="https://www.tiktok.com/@simoncinimauro?_t=ZN-8xbiKa5s8O6&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialGridIcon}
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                
                <a
                  href="https://www.facebook.com/share/19bi5aQMxz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialGridIcon}
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/mauro-simoncini-04303b3a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialGridIcon}
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* PDF Downloads Section */}
            <div className={styles.pdfSection} onClick={() => setActivePopup('guides')}>
              <div className={styles.pdfTitle}>Guide PDF</div>
              <div className={styles.pdfLinks}>
                <a
                  href="/assets/guida-impermeabilizzazione.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pdfLink}
                  aria-label="Scarica Guida Impermeabilizzazione"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <span>Guida</span>
                </a>
                
                <a
                  href="/assets/checklist-impermeabilizzazione.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pdfLink}
                  aria-label="Scarica Checklist"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <span>Checklist</span>
                </a>
              </div>
            </div>

            {/* About Me Section */}
            <div className={styles.contactSection} onClick={() => setActivePopup('info')}>
              <div className={styles.contactTitle}>Su di me</div>
              <div className={styles.contactLinks}>
                <a
                  href="https://www.linkedin.com/posts/mauro-simoncini-04303b3a_prospectaformazione-formazionecontinua-impermeabilizzazioni-activity-7310060251192463361-Eqfi?utm_source=social_share_video_v2&utm_medium=android_app&rcm=ACoAAAgxHXMBSYmk2YS369REuJF5qBNK4-5UuJE&utm_campaign=share_via"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  aria-label="Consulente Esperto in Impermeabilizzazioni"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>Consulente Esperto in Impermeabilizzazioni</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* POPUP FUORI DAL CONTAINER - SI POSIZIONANO RELATIVI AL VIEWPORT */}
    {activePopup === 'social' && (
      <div className={styles.mobilePopup} onClick={() => setActivePopup(null)}>
        <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.popupClose} onClick={() => setActivePopup(null)}>×</button>
          <div className={styles.popupTitle}>I miei Social</div>
          <div className={styles.popupIcons}>
            <a
              href="https://www.tiktok.com/@simoncinimauro?_t=ZN-8xbiKa5s8O6&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.popupIcon}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.popupIconSvg}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span className={styles.popupIconText}>TikTok</span>
            </a>
            
            <a
              href="https://www.facebook.com/share/19bi5aQMxz/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.popupIcon}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.popupIconSvg}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className={styles.popupIconText}>Facebook</span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/mauro-simoncini-04303b3a/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.popupIcon}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.popupIconSvg}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className={styles.popupIconText}>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    )}

    {activePopup === 'guides' && (
      <div className={styles.mobilePopup} onClick={() => setActivePopup(null)}>
        <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.popupClose} onClick={() => setActivePopup(null)}>×</button>
          <div className={styles.popupTitle}>Guide PDF Gratuite</div>
          <div className={styles.popupIcons}>
            <a
              href="/assets/guida-impermeabilizzazione.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.popupIcon}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.popupIconSvg}>
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <span className={styles.popupIconText}>Guida Completa</span>
            </a>
            
            <a
              href="/assets/checklist-impermeabilizzazione.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.popupIcon}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.popupIconSvg}>
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <span className={styles.popupIconText}>Checklist Pratica</span>
            </a>
          </div>
        </div>
      </div>
    )}

    {activePopup === 'info' && (
      <div className={styles.mobilePopup} onClick={() => setActivePopup(null)}>
        <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.popupClose} onClick={() => setActivePopup(null)}>×</button>
          <div className={styles.popupTitle}>Chi sono</div>
          <div className={styles.popupIcons}>
            <a
              href="https://www.linkedin.com/posts/mauro-simoncini-04303b3a_prospectaformazione-formazionecontinua-impermeabilizzazioni-activity-7310060251192463361-Eqfi?utm_source=social_share_video_v2&utm_medium=android_app&rcm=ACoAAAgxHXMBSYmk2YS369REuJF5qBNK4-5UuJE&utm_campaign=share_via"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.popupIcon}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.popupIconSvg}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className={styles.popupIconText}>Consulente Esperto</span>
            </a>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default About; 