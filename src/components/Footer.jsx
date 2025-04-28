import React from 'react';
import { Link } from 'react-scroll';
import { FaLinkedin, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Iscrizione alla newsletter completata! (Simulazione)');
    e.target.reset();
  };
  
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div>
            <div className={styles.footerLogo}>
              <img src="/assets/logo.png" alt="Logo Mauro Simoncini" />
              <p>Mauro Simoncini - Esperto di Impermeabilizzanti</p>
            </div>
          </div>
          
          <div>
            <h3 className={styles.footerTitle}>Newsletter</h3>
            <p className={styles.newsletterText}>Iscriviti per ricevere aggiornamenti e consigli</p>
            <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
              <input type="email" placeholder="La tua email" className={styles.newsletterInput} required />
              <button type="submit" className={styles.newsletterButton}>Iscriviti</button>
            </form>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© 2024 Mauro Simoncini. Tutti i diritti riservati.</p>
          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialLink}><FaLinkedin /></a>
            <a href="#" className={styles.socialLink}><FaYoutube /></a>
            <a href="#" className={styles.socialLink}><FaTiktok /></a>
            <a href="#" className={styles.socialLink}><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 