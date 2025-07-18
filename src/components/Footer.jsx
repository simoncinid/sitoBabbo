import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaLinkedin, FaTiktok, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import CookieSettings from './CookieSettings';
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
                <FaPhone className={styles.contactIcon} />
                <span>+39 393 8657606</span>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>Pontedera, Italia</span>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div className={styles.footerSocial}>
            <h4 className={styles.footerTitle}>Seguimi</h4>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.tiktok.com/@simoncinimauro?_t=ZN-8xbiKa5s8O6&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="TikTok"
              >
                <FaTiktok />
                <span>TikTok</span>
              </a>
              <a 
                href="https://www.facebook.com/share/19bi5aQMxz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="Facebook"
              >
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.linkedin.com/posts/mauro-simoncini-04303b3a_prospectaformazione-formazionecontinua-impermeabilizzazioni-activity-7310060251192463361-Eqfi?utm_source=social_share_video_v2&utm_medium=android_app&rcm=ACoAAAgxHXMBSYmk2YS369REuJF5qBNK4-5UuJE&utm_campaign=share_via" 
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
              <CookieSettings />
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