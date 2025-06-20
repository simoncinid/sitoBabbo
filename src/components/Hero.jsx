import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './Hero.module.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
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
  
  const handleShowChatbot = () => {
    setShowChatbot(true);
    setTimeout(() => {
      const chatbotSection = document.getElementById('chatbot-section');
      if (chatbotSection) {
        chatbotSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
              <div className={styles.nameSeparator}></div>
            </div>

            {/* DESKTOP: Luxury Pillars */}
            <div className={styles.pillarsSystem}>
              <Link
                to="mai-senza-consigli"
                smooth={true}
                duration={1000}
                className={styles.pillarItem}
              >
                <div className={styles.pillarNumber}>01</div>
                <div className={styles.pillarContent}>
                  <h3>Mai senza <span className={styles.pillarHighlight}>consigli</span></h3>
                </div>
              </Link>
              
              <Link
                to="mai-senza-manutenzione"
                smooth={true}
                duration={1000}
                className={styles.pillarItem}
              >
                <div className={styles.pillarNumber}>02</div>
                <div className={styles.pillarContent}>
                  <h3>Mai senza <span className={styles.pillarHighlight}>manutenzione</span></h3>
                </div>
              </Link>
              
              <Link
                to="mai-senza-esperienza"
                smooth={true}
                duration={1000}
                className={styles.pillarItem}
              >
                <div className={styles.pillarNumber}>03</div>
                <div className={styles.pillarContent}>
                  <h3>Mai senza <span className={styles.pillarHighlight}>esperienza</span></h3>
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
                    <div className={styles.pillarNumber}>01</div>
                    <div className={styles.pillarContent}>
                      <h3>Mai senza <span className={styles.pillarHighlight}>consigli</span></h3>
                    </div>
                  </Link>
                  
                  <Link
                    to="mai-senza-manutenzione"
                    smooth={true}
                    duration={1000}
                    className={styles.pillarItem}
                  >
                    <div className={styles.pillarNumber}>02</div>
                    <div className={styles.pillarContent}>
                      <h3>Mai senza <span className={styles.pillarHighlight}>manutenzione</span></h3>
                    </div>
                  </Link>
                  
                  <Link
                    to="mai-senza-esperienza"
                    smooth={true}
                    duration={1000}
                    className={styles.pillarItem}
                  >
                    <div className={styles.pillarNumber}>03</div>
                    <div className={styles.pillarContent}>
                      <h3>Mai senza <span className={styles.pillarHighlight}>esperienza</span></h3>
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* Colonna Destra: Foto */}
              <div className={styles.mobileRight}>
                <img 
                  src="/assets/hero.png"
                  alt="Mauro Simoncini"
                  className={styles.mobilePhoto}
                />
              </div>
            </div>

            {/* Premium Actions */}
            <div className={styles.actionsSystem}>
              <Link 
                to="consulenza" 
                smooth={true} 
                duration={1000}
                className={styles.primaryAction}
              >
                <span className={styles.actionText}>Consulenza Gratuita</span>
                <span className={styles.actionArrow}>→</span>
              </Link>
              
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
            
            {/* Single Large Image - Desktop */}
            <div className={styles.singleImageContainer}>
              <div className={styles.mainImageFrame}>
                <div className={styles.imageFlipContainer}>
                  {/* Front - Immagine */}
                  <div className={styles.imageContainer}>
                    <img 
                      src="/assets/hero.png"
                      alt="Impermeabilizzazione professionale"
                      className={styles.mainImageContent}
                    />
                    <div className={styles.imageOverlay}></div>
                  </div>
                  
                  {/* Back - Slogan */}
                  <div className={styles.imageSloganContainer}>
                    <div className={styles.sloganContent}>
                      <h3 className={styles.sloganTitle}>La Manutenzione</h3>
                      <h3 className={styles.sloganTitle}>È Tutto</h3>
                      <p className={styles.sloganText}>
                        Prevenire è meglio che riparare. Una manutenzione costante 
                        protegge il tuo investimento e ti risparmia costi futuri.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.imageLabel}>Esperienza Professionale</div>
              </div>
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
      
      {/* Premium Chatbot Interface */}
      {showChatbot && (
        <section id="chatbot-section" className={styles.chatbotSection}>
          <div className={styles.chatbotContainer}>
            <div className={styles.chatbotHeader}>
              <div className={styles.chatbotBrand}>
                <div className={styles.chatbotIcon}>◆</div>
                <div className={styles.chatbotInfo}>
                  <h2 className={styles.chatbotTitle}>Assistente Tecnico Specializzato</h2>
                  <p className={styles.chatbotSubtitle}>Consulenza immediata per le tue esigenze</p>
                </div>
              </div>
            </div>
            
            <div className={styles.chatbotInterface}>
              <div className={styles.chatbotLoading}>
                <div className={styles.loadingSystem}>
                  <div className={styles.loadingIndicator}></div>
                  <p>Connessione in corso...</p>
                </div>
              </div>
              
              <iframe
                id="chatbot-widget-window-iframe"
                src="https://app.gpt-trainer.com/widget/3d05d31a4b584ff2bbf56c35f78b59f2"
                width="100%"
                height="600px"
                frameBorder="0"
                allow="clipboard-read; clipboard-write"
                className={styles.chatbotFrame}
                onLoad={() => {
                  const loading = document.querySelector(`.${styles.chatbotLoading}`);
                  if (loading) loading.style.display = 'none';
                }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;