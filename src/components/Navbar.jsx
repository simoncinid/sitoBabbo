import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'mai-senza-consigli', 'mai-senza-manutenzione', 'mai-senza-esperienza', 'faq'];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: 'Chi Sono' },
    { id: 'mai-senza-consigli', label: 'Conoscenza' },
    { id: 'mai-senza-manutenzione', label: 'Cura' },
    { id: 'mai-senza-esperienza', label: 'Il Prodotto Giusto' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className={styles.logo}
            onClick={closeMobileMenu}
          >
            <div className={styles.logoIcon}>
              <img src="/assets/logo.png" alt="Logo" className={styles.logoImage} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Mai Senza</span>
              <span className={styles.logoSubtitle}>prodotti e consigli</span>
              <span className={styles.logoSubtitle}>per impermeabilizzare al top</span>

            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                duration={500}
                spy={true}
                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                onClick={closeMobileMenu}
              >
                <span className={styles.navText}>{item.label}</span>
                <div className={styles.navIndicator}></div>
              </Link>
            ))}
          </div>

          {/* Mobile Navbar Text */}
          <div className={styles.mobileNavbarText}>
            <span className={styles.mobileNavbarTitle}>mai senza</span>
            <span className={styles.mobileNavbarSubtitle}>mauro simoncini</span>
          </div>

          {/* CTA Button - Consulenza */}
          <div className={styles.navCta}>
            <a
              href="https://wa.me/393938675606?text=Ciao! Vorrei informazioni sui vostri prodotti per impermeabilizzazione"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
              onClick={closeMobileMenu}
            >
              <span className={styles.ctaText}>Whatsapp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileMenuLogo}>
                <img src="/assets/logo.png" alt="Logo" className={styles.mobileLogoImage} />
                <span className={styles.mobileLogoText}>mai senza</span>
              </div>
              <button
                className={styles.mobileMenuClose}
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                ✕
              </button>
            </div>

            <div className={styles.mobileNavLinks}>
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={500}
                  className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={closeMobileMenu}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className={styles.mobileNavText}>{item.label}</span>
                  <span className={styles.mobileNavArrow}>→</span>
                </Link>
              ))}
              
              {/* Additional mobile menu items */}
              <a
                href="https://wa.me/393938675606?text=Ciao! Vorrei una consulenza gratuita per impermeabilizzazione"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                style={{ animationDelay: `${navItems.length * 0.1}s` }}
              >
                <span className={styles.mobileNavText}>Consulenza Gratuita</span>
                <span className={styles.mobileNavArrow}>→</span>
              </a>
              
              <Link
                to="mai-senza-esperienza"
                smooth={true}
                duration={500}
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                style={{ animationDelay: `${(navItems.length + 1) * 0.1}s` }}
              >
                <span className={styles.mobileNavText}>Portfolio Progetti</span>
                <span className={styles.mobileNavArrow}>→</span>
              </Link>
            </div>

            <div className={styles.mobileMenuFooter}>
              <a
                href="https://wa.me/393938675606?text=Ciao! Vorrei una consulenza gratuita"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileCtaButton}
                onClick={closeMobileMenu}
              >
                <span className={styles.mobileCtaText}>Consulenza</span>
              </a>
              
              <div className={styles.mobileMenuInfo}>
                <p>Esperti dal 2004</p>
                <p>5000+ Progetti Completati</p>
                <p>100% Soddisfazione Garantita</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileMenuBackdrop}
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Navbar; 