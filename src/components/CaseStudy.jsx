import React from 'react';
import styles from './CaseStudy.module.css';

const CaseStudy = () => {
  return (
    <section className={styles.caseStudySection}>
      <div className={styles.container}>
        <h2 className="section-title">Il caso FibroGum: da prodotto a soluzione per migliaia di clienti</h2>
        <div className={styles.caseStudyContent}>
          <p className={styles.caseStudyText}>
            Durante il mio percorso professionale con FibroGum, ho trasformato un semplice prodotto in una soluzione completa per le esigenze di impermeabilizzazione dei clienti. Ho sviluppato strategie di comunicazione efficaci e creato contenuti formativi che hanno aiutato migliaia di persone a risolvere i loro problemi.
          </p>
          <div className={styles.caseStudyStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>+45%</span>
              <span className={styles.statDesc}>Vendite</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>+150</span>
              <span className={styles.statDesc}>Video Tutorial</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>+10K</span>
              <span className={styles.statDesc}>Clienti Soddisfatti</span>
            </div>
          </div>
          <a href="#" className={styles.caseStudyLink}>Scopri la mia strategia</a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy; 