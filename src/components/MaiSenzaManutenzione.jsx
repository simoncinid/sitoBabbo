import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './MaiSenzaManutenzione.module.css';

const MaiSenzaManutenzione = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.manutContainer} ${isVisible ? styles.visible : ''}`} 
      id="mai-senza-manutenzione"
    >
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Mai Senza Cura</h2>
          <h4 className={styles.sectionSubtitle}>
            Perchè l'impermeabilizzazione non finisce con l'applicazione
          </h4>
          <p className={styles.sectionDescription}>
            Il 73% dei danni strutturali poteva essere evitato con una semplice cura preventiva.
          </p>
        </div>

        {/* Professional Comparison */}
        <div className={styles.comparisonSection}>
          <div className={styles.comparisonGrid}>
            <div className={styles.preventionCard}>
              <div className={styles.cardImage}>
                <img 
                  src="/assets/1.webp" 
                  alt="Cura preventiva professionale"
                  className={styles.comparisonImage}
                />
                
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Intervento Preventivo</h3>
                  <div className={styles.costBadge}>€200</div>
                </div>
                <ul className={styles.benefitsList}>
                  <li>Ispezione completa</li>
                  <li>Piccole riparazioni</li>
                  <li>Sigillature preventive</li>
                  <li>Report dettagliato</li>
                </ul>
              </div>
            </div>

            <div className={styles.emergencyCard}>
              <div className={styles.cardImage}>
                <img 
                  src="/assets/2.png" 
                  alt="Danni da infiltrazioni non trattate"
                  className={styles.comparisonImage}
                />
                
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Riparazione Totale</h3>
                  <div className={styles.costBadge}>€15.000</div>
                </div>
                <ul className={styles.damagesList}>
                  <li>Rifacimento completo</li>
                  <li>Rimozione materiali</li>
                  <li>Ripristino strutturale</li>
                  <li>Tempo e disagi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.offerCard}>
            <p className={styles.conclusionText}>
              <strong>La differenza è evidente:</strong> un piccolo investimento oggi ti protegge da costi enormi domani.
            </p>
            
            
            
            <a
              href="https://wa.me/393938675606?text=Ciao! Vorrei una consulenza gratuita per impermeabilizzazione"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Richiedi Consulenza Gratuita
            </a>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaiSenzaManutenzione;