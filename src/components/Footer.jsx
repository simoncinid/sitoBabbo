import React from 'react';
import { Link } from 'react-router-dom';
import CookieSettings from './CookieSettings';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer} id="contatti">
    <div className={styles.inner}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <img
            className={styles.mark}
            src="/assets/brand/mai-senza-mark.webp"
            alt=""
            width="52"
            height="52"
          />
          <div>
            <strong>Mai Senza</strong>
            <p>Prodotti e consigli per impermeabilizzare al top.</p>
          </div>
        </div>
        <a
          className="button-primary"
          href="https://wa.me/393938657606?text=Ciao Mauro! Vorrei parlarti del mio progetto."
          target="_blank"
          rel="noreferrer"
        >
          Scrivi a Mauro
        </a>
      </div>

      <div className={styles.columns}>
        <div>
          <h3>Contatti</h3>
          <a href="tel:+393938657606">+39 393 8657606</a>
          <a href="mailto:simonciniliquiplast@gmail.com">simonciniliquiplast@gmail.com</a>
          <span>Pontedera, Italia</span>
        </div>
        <div>
          <h3>Segui Mauro</h3>
          <a href="https://www.tiktok.com/@simoncinimauro" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://www.facebook.com/share/19bi5aQMxz/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.linkedin.com/in/mauro-simoncini-04303b3a/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div>
          <h3>Informazioni</h3>
          <Link to="/novita">Articoli</Link>
          <Link to="/#manuale">Mai Senza Metodo</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/termini">Termini di servizio</Link>
          <CookieSettings />
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Mauro Simoncini. Tutti i diritti riservati.</p>
        <p>Le informazioni hanno scopo educativo. Per interventi complessi consulta un professionista qualificato.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
