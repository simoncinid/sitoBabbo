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
            <span className={styles.titleLine1}>Chi Sono</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.photoSection}>
            <div className={styles.photoContainer}>
              <img 
                src="/assets/hero.png" 
                alt="Profilo professionale"
                className={styles.profilePhoto}
              />
            </div>
          </div>

          <div className={styles.textSection}>
            <p className={styles.aboutText}>
              Da oltre 20 anni mi occupo di impermeabilizzazione con passione e competenza. Ho trasformato migliaia di spazi, risolto problemi complessi e accompagnato i miei clienti verso soluzioni durature e affidabili.
              <br /><br />
              La mia filosofia è semplice: ogni problema ha una soluzione, e io sono qui per trovarla insieme a te. Dalla consulenza iniziale alla realizzazione finale, ti guido in ogni fase del processo con trasparenza e professionalità.
            </p>

            <div className={styles.ctaSection}>
              <Link
                to="consulenza"
                smooth={true}
                duration={800}
                className={styles.ctaButton}
              >
                <span className={styles.ctaIcon}>🚀</span>
                <span className={styles.ctaText}>Consulenza Gratuita</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 