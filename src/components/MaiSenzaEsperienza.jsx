import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './MaiSenzaEsperienza.module.css';

const MaiSenzaEsperienza = () => {
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

  const caseStudies = [
    {
      id: 1,
      title: "Terrazzo Impossibile",
      description: "200mq con infiltrazioni multiple risolte in 5 giorni",
      challenge: "Infiltrazioni su tre lati con pendenza critica",
      solution: "Sistema a doppia membrana nanotecnologica",
      result: "Zero infiltrazioni da 3 anni consecutivi",
      image: "/assets/icon2.png",
      investment: "€8.500",
      duration: "5 giorni"
    },
    {
      id: 2,
      title: "Cantina Allagata",
      description: "Dalla risalita critica alla sicurezza totale",
      challenge: "3 tentativi falliti con altre ditte",
      solution: "Diagnosi termografica e pressione negativa",
      result: "Asciutta anche con temporali di 100mm/h",
      image: "/assets/icon2.png",
      investment: "€3.800",
      duration: "3 giorni"
    },
    {
      id: 3,
      title: "Piscina Complessa",
      description: "Perdite invisibili risolte definitivamente",
      challenge: "Perdite non localizzabili in struttura esistente",
      solution: "Membrane liquide speciali con rinforzi mirati",
      result: "Risparmio idrico del 90%, zero perdite",
      image: "/assets/icon2.png",
      investment: "€15.000",
      duration: "7 giorni"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`${styles.esperienzaContainer} ${isVisible ? styles.visible : ''}`} 
      id="mai-senza-esperienza"
    >
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Mai Senza Esperienza</h2>
          <p className={styles.sectionDescription}>
            Oltre 20 anni di esperienza nella risoluzione di problemi complessi. 
            Ogni progetto è una sfida vinta con competenza e innovazione.
          </p>
        </div>

        {/* Experience Stats */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>20+</div>
              <div className={styles.statLabel}>Anni di Esperienza</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Progetti Completati</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Problemi Risolti</div>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className={styles.caseStudiesSection}>
          <h3 className={styles.caseStudiesTitle}>Casi di Successo</h3>
          <div className={styles.caseStudiesGrid}>
            {caseStudies.map((caseStudy) => (
              <div key={caseStudy.id} className={styles.caseCard}>
                <div className={styles.caseImage}>
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title}
                    className={styles.casePhoto}
                  />
                  <div className={styles.caseOverlay}>
                    <span className={styles.caseDuration}>{caseStudy.duration}</span>
                  </div>
                </div>
                <div className={styles.caseContent}>
                  <h4 className={styles.caseTitle}>{caseStudy.title}</h4>
                  <p className={styles.caseDescription}>{caseStudy.description}</p>
                  
                  <div className={styles.caseDetails}>
                    <div className={styles.caseDetail}>
                      <strong>Sfida:</strong> {caseStudy.challenge}
                    </div>
                    <div className={styles.caseDetail}>
                      <strong>Soluzione:</strong> {caseStudy.solution}
                    </div>
                    <div className={styles.caseDetail}>
                      <strong>Risultato:</strong> {caseStudy.result}
                    </div>
                  </div>

                  <div className={styles.caseFooter}>
                    <span className={styles.caseInvestment}>{caseStudy.investment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default MaiSenzaEsperienza;