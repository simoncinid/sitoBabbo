import React from 'react';
import { FaFilePdf, FaFileImage } from 'react-icons/fa';
import styles from './Guides.module.css';

const Guides = () => {
  return (
    <section className={styles.guidesSection} id="guide">
      <div className={styles.container}>
        <h2 className="section-title">Guide Fai-da-te</h2>
        <div className={styles.guidesGrid}>
          <div className={styles.guideCard}>
            <img 
              src="assets/icon1.png"           
              alt="Impermeabilizzazione balcone" 
              className={styles.guideImage}
            />
            <div className={styles.guideContent}>
              <h3 className={styles.guideTitle}>Come impermeabilizzare un balcone da soli</h3>
              <p className={styles.guideDesc}>
                Impara a impermeabilizzare il tuo balcone con strumenti semplici e tecniche efficaci.
              </p>
              <a href="#" className={styles.guideLink}>Leggi la guida</a>
            </div>
          </div>
          
          <div className={styles.guideCard}>
            <img 
              src="assets/icon2.png"
              alt="Prodotto per tetto" 
              className={styles.guideImage}
            />
            <div className={styles.guideContent}>
              <h3 className={styles.guideTitle}>Che prodotto usare per il tetto?</h3>
              <p className={styles.guideDesc}>
                Scopri i migliori prodotti per l'impermeabilizzazione dei tetti a seconda del materiale e dell'esposizione.
              </p>
              <a href="#" className={styles.guideLink}>Leggi la guida</a>
            </div>
          </div>
          
          <div className={styles.guideCard}>
            <img 
              src="assets/icon3.png" 
              alt="Quando chiamare un professionista" 
              className={styles.guideImage}
            />
            <div className={styles.guideContent}>
              <h3 className={styles.guideTitle}>Quando serve chiamare un professionista?</h3>
              <p className={styles.guideDesc}>
                Impara a riconoscere i segnali che indicano quando è meglio affidarsi a un esperto.
              </p>
              <a href="#" className={styles.guideLink}>Leggi la guida</a>
            </div>
          </div>
        </div>
        
        <div className={styles.downloads}>
          <h3 className={styles.downloadTitle}>Materiali scaricabili</h3>
          <a href="#" className={styles.downloadLink}>
            <FaFilePdf /> Guida completa all'impermeabilizzazione (PDF)
          </a>
          <a href="#" className={styles.downloadLink}>
            <FaFileImage /> Infografica: Scegliere il giusto impermeabilizzante
          </a>
        </div>
      </div>
    </section>
  );
};

export default Guides; 