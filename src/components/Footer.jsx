import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaLinkedin, FaTiktok, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter email:', newsletterEmail);
    alert('Iscrizione completata! Riceverai il primo consiglio entro una settimana.');
    setNewsletterEmail('');
  };
  
  return (
    <footer className={styles.footerContainer} id="contatti">
      <div className={styles.container}>
        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>Newsletter "Mai Senza Consigli"</h2>
            <p className={styles.newsletterDescription}>
              Ricevi ogni mese consigli pratici, guide stagionali e soluzioni per mantenere 
              perfette le tue impermeabilizzazioni. Unisciti a oltre 1000 proprietari di casa.
            </p>
            
            <div className={styles.newsletterBenefits}>
              <div className={styles.benefit}>✓ Consigli mensili di manutenzione</div>
              <div className={styles.benefit}>✓ Guide stagionali gratuite</div>
              <div className={styles.benefit}>✓ Offerte esclusive per iscritti</div>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
              <div className={styles.newsletterInputs}>
                <input 
                  type="email" 
                  placeholder="La tua email" 
                  className={styles.newsletterInput}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.newsletterButton}>
                  Iscriviti Gratis
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <img src="/assets/logo.png" alt="Mai Senza Logo" className={styles.logoImage} />
              <h3>Mai Senza Impermeabilizzazioni</h3>
            </div>
            <p className={styles.brandDescription}>
              La tua guida completa per l'impermeabilizzazione. Consigli pratici, 
              soluzioni testate e supporto continuo per proteggere i tuoi spazi.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <span>info@maisenza.it</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <span>+39 123 456 7890</span>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>Italia</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>Navigazione</h4>
            <ul className={styles.footerNavList}>
              <li>
                <Link to="about" smooth={true} duration={500} className={styles.footerNavLink}>
                  Chi Sono
                </Link>
              </li>
              <li>
                <Link to="mai-senza-consigli" smooth={true} duration={500} className={styles.footerNavLink}>
                  Consigli
                </Link>
              </li>
              <li>
                <Link to="mai-senza-manutenzione" smooth={true} duration={500} className={styles.footerNavLink}>
                  Manutenzione
                </Link>
              </li>
              <li>
                <Link to="mai-senza-esperienza" smooth={true} duration={500} className={styles.footerNavLink}>
                  Esperienza
                </Link>
              </li>
              <li>
                <Link to="faq" smooth={true} duration={500} className={styles.footerNavLink}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="consulenza" smooth={true} duration={500} className={styles.footerNavLink}>
                  Consulenza
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.footerServices}>
            <h4 className={styles.footerTitle}>Servizi</h4>
            <ul className={styles.servicesList}>
              <li>Impermeabilizzazione Terrazzi</li>
              <li>Riparazione Infiltrazioni</li>
              <li>Consulenza Tecnica</li>
              <li>Ispezioni Diagnostiche</li>
              <li>Manutenzione Preventiva</li>
              <li>Supporto Post-Intervento</li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className={styles.footerSocial}>
            <h4 className={styles.footerTitle}>Seguimi</h4>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.tiktok.com/@maurosimoncini" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="TikTok"
              >
                <FaTiktok />
                <span>TikTok</span>
              </a>
              <a 
                href="https://www.facebook.com/maurosimoncini" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="Facebook"
              >
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/maurosimoncini" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="LinkedIn"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
            </div>
            
            <div className={styles.legalLinks}>
              <a href="/privacy" className={styles.legalLink}>Privacy Policy</a>
              <a href="/termini" className={styles.legalLink}>Termini di Servizio</a>
              <a href="/cookie" className={styles.legalLink}>Cookie Policy</a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              © 2024 Mai Senza Impermeabilizzazioni - Mauro Simoncini. Tutti i diritti riservati.
            </p>
            <p className={styles.disclaimer}>
              Le informazioni fornite hanno scopo educativo. Per interventi complessi, 
              consulta sempre un professionista qualificato.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 