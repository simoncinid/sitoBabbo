import React, { useState } from 'react';
import { Link } from 'react-scroll';
import styles from './Hero.module.css';

const Hero = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  
  const handleShowChatbot = () => {
    setShowChatbot(true);
    // Scrolliamo leggermente sotto per mostrare il chatbot
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
        className={styles.heroContainer} 
        id="home" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/hero.png')"
        }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Impermeabilizza da solo, con Mauro</h1>
          <h2 className={styles.heroSubtitle}>Consigli pratici e soluzioni facili per chi ama il fai-da-te</h2>
          <button onClick={handleShowChatbot} className={styles.ctaButton}>
            Scopri come iniziare
          </button>
        </div>
      </section>
      
      {showChatbot && (
        <section id="chatbot-section" className={styles.chatbotSection}>
          <div className={styles.chatbotContainer}>
            <h2 className={styles.chatbotTitle}>Hai una domanda? Chiedimelo!</h2>
            <div className={styles.chatbotWrapper}>
              <iframe
                id="chatbot-widget-window-iframe"
                src="https://app.gpt-trainer.com/widget/3d05d31a4b584ff2bbf56c35f78b59f2"
                width="100%"
                height="500px"
                frameBorder="0"
                allow="clipboard-read; clipboard-write"
                className={styles.chatbotFrame}
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero; 