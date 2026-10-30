import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import LanguageSwitcher from './LanguageSwitcher';

const homeLinks = [
  { id: 'about', label: 'Mauro' },
  { id: 'mai-senza-consigli', label: 'Conoscenza' },
  { id: 'mai-senza-manutenzione', label: 'Cura' },
  { id: 'mai-senza-esperienza', label: 'Soluzioni' },
  { id: 'manuale', label: 'Il manuale' },
  { id: 'faq', label: 'FAQ' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const renderLink = (item, mobile = false) => {
    const className = mobile ? styles.mobileLink : styles.navLink;
    return onHome ? (
      <ScrollLink
        key={item.id}
        to={item.id}
        smooth
        duration={550}
        offset={-96}
        spy
        activeClass={styles.active}
        className={className}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </ScrollLink>
    ) : (
      <RouterLink
        key={item.id}
        to={`/#${item.id}`}
        className={className}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </RouterLink>
    );
  };

  return (
    <>
      <nav className={styles.globalNav} aria-label="Navigazione principale">
        <div className={styles.navInner}>
          <RouterLink to="/" className={styles.brand} aria-label="Mai Senza, home">
            <img
              className={styles.brandMark}
              src="/assets/brand/mai-senza-mark.webp"
              alt=""
              width="28"
              height="28"
            />
            <span className={styles.brandName}>Mai Senza</span>
          </RouterLink>

          <div className={styles.desktopLinks}>
            {homeLinks.map((item) => renderLink(item))}
            <RouterLink to="/novita" className={`${styles.navLink} ${styles.navLinkFeatured}`}>
              Articoli
            </RouterLink>
          </div>

          <a
            className={styles.navCta}
            href="https://wa.me/393938657606?text=Ciao Mauro! Vorrei una consulenza sull'impermeabilizzazione."
            target="_blank"
            rel="noreferrer"
          >
            Parliamone
          </a>
          <LanguageSwitcher />

          <button
            className={`${styles.menuButton} ${open ? styles.menuOpen : ''}`}
            type="button"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={styles.subNav}>
        <div className={styles.subNavInner}>
          <span>Impermeabilizzare, senza improvvisare.</span>
          <RouterLink to="/#consulenza">Consulenza gratuita <span aria-hidden="true">›</span></RouterLink>
        </div>
      </div>

      <div
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ''}`}
        aria-hidden={!open}
        inert={open ? undefined : ''}
      >
        <div className={styles.mobileLinks}>
          {homeLinks.map((item) => renderLink(item, true))}
          <RouterLink
            to="/novita"
            className={`${styles.mobileLink} ${styles.mobileLinkFeatured}`}
            onClick={() => setOpen(false)}
          >
            Articoli
          </RouterLink>
        </div>
        <a
          className="button-primary"
          href="https://wa.me/393938657606?text=Ciao Mauro! Vorrei una consulenza sull'impermeabilizzazione."
          target="_blank"
          rel="noreferrer"
        >
          Scrivi a Mauro
        </a>
        <LanguageSwitcher mobile />
      </div>
    </>
  );
};

export default Navbar;
