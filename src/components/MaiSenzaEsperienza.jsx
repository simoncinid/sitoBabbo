import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './MaiSenzaEsperienza.module.css';

const MaiSenzaEsperienza = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
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

  const nextCase = () => {
    setCurrentCaseIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCase = () => {
    setCurrentCaseIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section 
      ref={sectionRef}
      className={`${styles.esperienzaContainer} ${isVisible ? styles.visible : ''}`} 
      id="mai-senza-esperienza"
    >
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Mai Senza Il Prodotto Giusto</h2>
          <h4 className={styles.sectionSubtitle}>
            Perchè non tutti i supporti sono uguali, e nemmeno le soluzioni
          </h4>
          <p className={styles.sectionDescription}>
            Il tuo bisogno è impermeabilizzare?<br />
            Il tuo sogno è farlo da solo?<br />
            <strong>Il mio lavoro è rendertelo possibile!</strong>
            <br /><br />
            Oltre 15 anni di esperienza nella risoluzione di problematiche impermeabilizzative.<br />
            Ogni progetto è una sfida vinta con competenza e innovazione.
            <br /><br />
            
            
            
          </p>
        </div>

        

        {/* Case Studies - Desktop */}
        <div className={styles.caseStudiesSection}>
         
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

        {/* Case Studies Gallery - Mobile */}
        <div className={styles.caseGallery}>
          <h3 className={styles.caseStudiesTitle}>Casi di Successo</h3>
          <div className={styles.galleryContainer}>
            <button 
              className={styles.galleryNav + ' ' + styles.navPrev}
              onClick={prevCase}
              aria-label="Caso precedente"
            >
              ‹
            </button>
            
            <div className={styles.gallerySlide}>
              <div className={styles.caseCard}>
                <div className={styles.caseImage}>
                  <img 
                    src={caseStudies[currentCaseIndex].image} 
                    alt={caseStudies[currentCaseIndex].title}
                    className={styles.casePhoto}
                  />
                  <div className={styles.caseOverlay}>
                    <span className={styles.caseDuration}>{caseStudies[currentCaseIndex].duration}</span>
                  </div>
                </div>
                <div className={styles.caseContent}>
                  <h4 className={styles.caseTitle}>{caseStudies[currentCaseIndex].title}</h4>
                  <p className={styles.caseDescription}>{caseStudies[currentCaseIndex].description}</p>
                  
                  <div className={styles.caseDetails}>
                    <div className={styles.caseDetail}>
                      <strong>Sfida:</strong> {caseStudies[currentCaseIndex].challenge}
                    </div>
                    <div className={styles.caseDetail}>
                      <strong>Soluzione:</strong> {caseStudies[currentCaseIndex].solution}
                    </div>
                    <div className={styles.caseDetail}>
                      <strong>Risultato:</strong> {caseStudies[currentCaseIndex].result}
                    </div>
                  </div>

                  <div className={styles.caseFooter}>
                    <span className={styles.caseInvestment}>{caseStudies[currentCaseIndex].investment}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              className={styles.galleryNav + ' ' + styles.navNext}
              onClick={nextCase}
              aria-label="Caso successivo"
            >
              ›
            </button>
          </div>
          
          <div className={styles.galleryDots}>
            {caseStudies.map((_, index) => (
              <button
                key={index}
                className={`${styles.galleryDot} ${index === currentCaseIndex ? styles.active : ''}`}
                onClick={() => setCurrentCaseIndex(index)}
                aria-label={`Vai al caso ${index + 1}`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default MaiSenzaEsperienza;