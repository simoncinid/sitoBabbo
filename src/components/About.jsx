import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './About.module.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={aboutRef}
      className={`${styles.aboutContainer} ${isVisible ? styles.visible : ''}`} 
      id="about"
    >
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.geometricPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleLine1}>Perchè fidarti di Mauro?</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.photoSection}>
            <div className={styles.photoContainer}>
              <img 
                src="/assets/hero.png" 
                alt="Profilo professionale"
                className={styles.profilePhoto}
              />
            </div>
          </div>

          <div className={styles.textSection}>
            <p className={styles.aboutText}>
              ❓Posso farlo da solo?
              <br /><br />
              In casa ti dicono di no.<br />
              Il vicino ci ha provato (e ha fatto un disastro).<br />
              Tu ci stai pensando. 😉
              <br /><br />
              Impermeabilizzare sembra complicato.<br />
              Ma se ti dicessi che può diventare semplice, con gli strumenti e i consigli giusti?
              <br /><br />
              🎯 Qui trovi uno spazio dove imparare, senza paura di sbagliare.<br />
              Dove puoi fare domande e ricevere risposte chiare, pratiche e immediate.<br />
              Perché nessuno nasce esperto… ma tutti possono diventarlo.
              <br /><br />
              ---
              <br /><br />
              👷 <strong>Chi ti guida</strong>
              <br /><br />
              Mi chiamo Mauro Simoncini,<br />
              e da anni mi occupo di consulenza tecnica e commerciale nel mondo dell'impermeabilizzazione.
              <br /><br />
              Lavoro a fianco di rivendite, progettisti, imprese e anche privati ambiziosi,<br />
              aiutandoli a scegliere, consigliare e utilizzare i prodotti giusti in ogni contesto.
              <br /><br />
              Negli anni ho avuto l'opportunità di contribuire allo sviluppo di sistemi impermeabilizzanti oggi molto conosciuti,<br />
              partecipando in prima linea alla loro crescita tecnica e commerciale.
              <br /><br />
              📦 Non applico direttamente i prodotti,<br />
              ma ti aiuto a capire come funzionano, quando, come e se usarli.<br />
              Il mio obiettivo è uno solo: farti risparmiare errori, tempo e soldi.
              <br /><br />
              🧭 <strong>La mia filosofia</strong>
              <br /><br />
              Ogni problema ha una soluzione.<br />
              E se non la trovi, è solo perché nessuno te l'ha spiegata nel modo giusto.
              <br /><br />
              👀 La mia forza è l'esperienza unita alla chiarezza.<br />
              Ti accompagno dalla consulenza iniziale alla fase applicativa,<br />
              con parole semplici, indicazioni tecniche e una guida concreta.
              <br /><br />
              🎯 Se vuoi capire come impermeabilizzare senza fare errori,<br />
              sei nel posto giusto.
              <br /><br />
              📩 <strong>Hai un dubbio sull'impermeabilizzazione o devi iniziare un lavoro?</strong>
              <br /><br />
              👉 Mandami una foto, un messaggio, o raccontami il tuo caso.<br />
              Insieme troveremo la soluzione, senza giri di parole.
            </p>

            <div className={styles.ctaSection}>
              <a
                href="https://wa.me/393938675606?text=Ciao! Vorrei una consulenza gratuita per impermeabilizzazione"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <span className={styles.ctaIcon}>🚀</span>
                <span className={styles.ctaText}>Consulenza Gratuita</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 