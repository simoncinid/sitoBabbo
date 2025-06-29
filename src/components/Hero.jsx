import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './Hero.module.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <section 
        ref={heroRef}
        className={`${styles.heroContainer} ${isVisible ? styles.visible : ''}`} 
        id="home"
      >
        {/* Luxury Background System */}
        <div className={styles.backgroundSystem}>
          <div className={styles.primaryGradient}></div>
          <div 
            className={styles.parallaxLayer}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          ></div>
          <div className={styles.noiseTexture}></div>
        </div>

        {/* World-Class Content Grid */}
        <div className={styles.contentGrid}>
          
          {/* Left Column - Typography Masterpiece */}
          <div className={styles.leftColumn}>
            
            {/* DESKTOP: Luxury Name System */}
            <div className={styles.nameSystem}>
              <div className={styles.nameBlock}>
                <div className={styles.letterGroup}>
                  <span className={styles.bigLetter}>M</span>
                  <div className={styles.wordStack}>
                    <span className={styles.topWord}>ai</span>
                    <span className={styles.bottomWord}>auro</span>
                  </div>
                </div>
                <div className={styles.letterGroup}>
                  <span className={styles.bigLetter}>S</span>
                  <div className={styles.wordStack}>
                    <span className={styles.topWord}>enza</span>
                    <span className={styles.bottomWord}>imoncini</span>
                  </div>
                </div>
              </div>
              <div className={styles.tagline}>Prodotti e consigli per impermeabilizzare al Top</div>
            </div>

            {/* DESKTOP: Luxury Pillars */}
            <div className={styles.pillarsSystem}>
              <Link
                to="mai-senza-consigli"
                smooth={true}
                duration={1000}
                className={styles.pillarItem}
              >
                <div className={styles.pillarIcon}>
                  <img src="/assets/icon11.png" alt="Conoscenza" />
                </div>
                <div className={styles.pillarContent}>
                  <h3>Mai senza <span className={styles.pillarHighlight}>conoscenza</span></h3>
                </div>
              </Link>
              
              <Link
                to="mai-senza-manutenzione"
                smooth={true}
                duration={1000}
                className={styles.pillarItem}
              >
                <div className={styles.pillarIcon}>
                  <img src="/assets/icon22.png" alt="Cura" />
                </div>
                <div className={styles.pillarContent}>
                  <h3>Mai senza <span className={styles.pillarHighlight}>cura</span></h3>
                </div>
              </Link>
              
              <Link
                to="mai-senza-esperienza"
                smooth={true}
                duration={1000}
                className={styles.pillarItem}
              >
                <div className={styles.pillarIcon}>
                  <img src="/assets/icon33.png" alt="Il Prodotto Giusto" />
                </div>
                <div className={styles.pillarContent}>
                  <h3>Mai senza <span className={styles.pillarHighlight}>il prodotto giusto</span></h3>
                </div>
              </Link>
            </div>

            {/* MOBILE ONLY: Sezione a due colonne */}
            <div className={styles.mobileTopSection}>
              {/* Colonna Sinistra: Mai Senza + Pillars */}
              <div className={styles.mobileLeft}>
                {/* Luxury Name System */}
                <div className={styles.nameBlock}>
                  <div className={styles.letterGroup}>
                    <span className={styles.bigLetter}>M</span>
                    <div className={styles.wordStack}>
                      <span className={styles.topWord}>ai</span>
                      <span className={styles.bottomWord}>auro</span>
                    </div>
                  </div>
                  <div className={styles.letterGroup}>
                    <span className={styles.bigLetter}>S</span>
                    <div className={styles.wordStack}>
                      <span className={styles.topWord}>enza</span>
                      <span className={styles.bottomWord}>imoncini</span>
                    </div>
                  </div>
                </div>
                
                {/* Pillars sotto Mai Senza */}
                <div className={styles.pillarsSystem}>
                  <Link
                    to="mai-senza-consigli"
                    smooth={true}
                    duration={1000}
                    className={styles.pillarItem}
                  >
                    <div className={styles.pillarIcon}>
                      <img src="/assets/icon11.png" alt="Conoscenza" />
                    </div>
                    <div className={styles.pillarContent}>
                      <h3>Mai senza <span className={styles.pillarHighlight}>conoscenza</span></h3>
                    </div>
                  </Link>
                  
                  <Link
                    to="mai-senza-manutenzione"
                    smooth={true}
                    duration={1000}
                    className={styles.pillarItem}
                  >
                    <div className={styles.pillarIcon}>
                      <img src="/assets/icon22.png" alt="Cura" />
                    </div>
                    <div className={styles.pillarContent}>
                      <h3>Mai senza <span className={styles.pillarHighlight}>cura</span></h3>
                    </div>
                  </Link>
                  
                  <Link
                    to="mai-senza-esperienza"
                    smooth={true}
                    duration={1000}
                    className={styles.pillarItem}
                  >
                    <div className={styles.pillarIcon}>
                      <img src="/assets/icon33.png" alt="Il Prodotto Giusto" />
                    </div>
                    <div className={styles.pillarContent}>
                      <h3>Mai senza <span className={styles.pillarHighlight}>il prodotto giusto</span></h3>
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* Colonna Destra: Foto */}
              <div className={styles.mobileRight}>
                <img 
                  src="/assets/babbonobg.png"
                  alt="Mauro Simoncini"
                  className={styles.mobilePhoto}
                />
              </div>
            </div>

            {/* Premium Actions */}
            <div className={styles.actionsSystem}>
              <a 
                href="https://wa.me/393938675606?text=Ciao! Vorrei una consulenza gratuita per impermeabilizzazione"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryAction}
              >
                <span className={styles.actionText}>Consulenza Gratuita</span>
                <span className={styles.actionArrow}>→</span>
              </a>
              
              <Link 
                to="mai-senza-esperienza" 
                smooth={true} 
                duration={1000}
                className={styles.secondaryAction}
              >
                <span className={styles.actionText}>Portfolio Progetti</span>
              </Link>
            </div>

          </div>

          {/* Right Column - Visual Excellence */}
          <div className={styles.rightColumn}>
            {/* Content overlay per eventuale testo futuro */}
            <div className={styles.rightColumnContent}>
              {/* Spazio per contenuto futuro */}
            </div>
          </div>

        </div>

        {/* Luxury Scroll Indicator */}
        <div className={styles.scrollSystem}>
          <div className={styles.scrollTrack}>
            <div className={styles.scrollIndicator}></div>
          </div>
        </div>

        {/* Background Accent */}
        <div className={styles.backgroundAccent}></div>

      </section>
    </>
  );
};

export default Hero;