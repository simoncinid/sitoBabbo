import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.aboutSection} id="chi-sono">
      <div className={styles.container}>
        <h2 className="section-title">Chi Sono</h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <img src="/assets/1.png" alt="Mauro Simoncini" />
          </div>
          <div className={styles.aboutText}>
            <h3 className={styles.aboutTitle}>Ho portato FibroGum a un altro livello. Ora ti aiuto a farlo con casa tua.</h3>
            <p className={styles.aboutParagraph}>
              Da oltre 20 anni nel settore degli impermeabilizzanti, ho aiutato migliaia di persone a risolvere i loro problemi di infiltrazioni e umidità.
            </p>
            <p className={styles.aboutParagraph}>
              Con la mia esperienza in FibroGum, ho sviluppato metodi semplici ed efficaci che anche tu puoi applicare nelle tue piccole riparazioni domestiche.
            </p>
            <p className={styles.aboutParagraph}>
              La mia missione è rendere l'impermeabilizzazione accessibile a tutti gli appassionati del fai-da-te, con soluzioni pratiche e di qualità.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 