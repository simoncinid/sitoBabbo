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
      title: "Lastrico Solare",
      description: "Lastrico Solare con evidenti infiltrazioni.",
      challenge: "Reimpermeabilizzare senza demolire.",
      solution: "Applicazione di un ciclo impermeabilizzante idoneo.",
      result: "Superficie impermeabilizzata e pedonabile",
      image: "/assets/materiale2.jpg",
      investment: "E' il tuo caso? Clicca qua!",
      duration: "4 giorni",
      whatsappUrl: "https://wa.me/393938675606?text=Ciao%20Mauro!%20Ho%20un%20lastrico%20solare%20con%20infiltrazioni%20e%20vorrei%20reimpermeabilizzarlo%20senza%20demolire.%20Potresti%20aiutarmi%20con%20una%20consulenza%20sui%20prodotti%20giusti?"
    },
    {
      id: 2,
      title: "Lamiere Coibentate",
      description: "Lamiere Coibentate con segni di usura.",
      challenge: "Impermeabilizzare e proteggere.",
      solution: "Spalmatura di membrana impermeabilizzante fibrata.",
      result: "Superficie rinnovata e resistente alla grandine.",
      image: "/assets/materiale3.jpg",
      investment: "E' il tuo caso? Clicca qua!",
      duration: "2 giorni",
      whatsappUrl: "https://wa.me/393938675606?text=Ciao%20Mauro!%20Ho%20delle%20lamiere%20coibentate%20con%20segni%20di%20usura%20che%20devo%20impermeabilizzare%20e%20proteggere.%20Potresti%20consigliarmi%20la%20soluzione%20migliore?"
    },
    {
      id: 3,
      title: "Guine Bituminose o Ardesiate",
      description: "Vecchie guaine coccodrillate o usurate.",
      challenge: "Impermeabilizzare senza demolire.",
      solution: "Applicazione di ciclo impermeabilizzante liquido.",
      result: "Superficie pedonabile, impermeabilizzata e termoriflettente.",
      image: "/assets/materiale1.png",
      investment: "E' il tuo caso? Clicca qua!",
      duration: "5 giorni",
      whatsappUrl: "https://wa.me/393938675606?text=Ciao%20Mauro!%20Ho%20delle%20vecchie%20guaine%20bituminose%20coccodrillate%20che%20vorrei%20impermeabilizzare%20senza%20demolire.%20Potresti%20aiutarmi%20con%20il%20ciclo%20impermeabilizzante%20liquido?"
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
                    <a 
                      href={caseStudy.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.caseInvestment}
                    >
                      {caseStudy.investment}
                    </a>
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
                    <a 
                      href={caseStudies[currentCaseIndex].whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.caseInvestment}
                    >
                      {caseStudies[currentCaseIndex].investment}
                    </a>
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