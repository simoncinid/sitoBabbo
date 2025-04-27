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
              <div className={styles.logo}>MS</div>
              <p>Mauro Simoncini - Esperto di Impermeabilizzanti</p>
            </div>
          </div>
          
          <div>
            <h3 className={styles.footerTitle}>Navigazione</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <Link to="home" className={styles.footerLink} smooth={true} duration={500}>Home</Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="chi-sono" className={styles.footerLink} smooth={true} duration={500}>Chi Sono</Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="guide" className={styles.footerLink} smooth={true} duration={500}>Guide</Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="video" className={styles.footerLink} smooth={true} duration={500}>Video</Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="consigli" className={styles.footerLink} smooth={true} duration={500}>Consigli</Link>
              </li>
              <li className={styles.linkItem}>
                <Link to="contatti" className={styles.footerLink} smooth={true} duration={500}>Contatti</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={styles.footerTitle}>Resta Aggiornato</h3>
            <p className={styles.newsletterText}>Iscriviti alla newsletter per ricevere consigli e novità</p>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <input 
                className={styles.newsletterInput} 
                type="email" 
                placeholder="La tua email" 
                required 
              />
              <button 
                className={styles.newsletterButton} 
                type="submit"
              >
                Iscriviti
              </button>
            </form>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Mauro Simoncini. Tutti i diritti riservati.</p>
          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="#" className={styles.socialLink} aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 