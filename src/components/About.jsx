import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const NAV_HEIGHT = 96;
const DESKTOP_MIN_WIDTH = 834;

const mauroImages = [
  { src: '/assets/mauro/mauro1.png', alt: 'Mauro Simoncini controlla una copertura con un tablet' },
  { src: '/assets/mauro/mauro2.png', alt: 'Mauro Simoncini nel magazzino Fibro-gum' },
  { src: '/assets/mauro/newPhoto.jpg', alt: 'Mauro Simoncini con un secchio Fibro-gum' },
];

const About = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const syncSectionHeight = () => {
      if (window.innerWidth < DESKTOP_MIN_WIDTH) {
        setSectionHeight(null);
        return;
      }
      setSectionHeight(Math.max(0, window.innerHeight - NAV_HEIGHT));
    };

    syncSectionHeight();
    window.addEventListener('resize', syncSectionHeight);
    return () => window.removeEventListener('resize', syncSectionHeight);
  }, []);

  const selectImage = (index) => {
    const track = trackRef.current;
    if (!track) return;
    setActiveImage(index);
    track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' });
  };

  const updateActiveImage = () => {
    const track = trackRef.current;
    if (!track?.clientWidth) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActiveImage(Math.max(0, Math.min(mauroImages.length - 1, index)));
  };

  return (
    <section
      className={styles.about}
      id="about"
      style={
        sectionHeight
          ? { height: sectionHeight, maxHeight: sectionHeight }
          : undefined
      }
    >
      <div className={styles.visual}>
        <button
          type="button"
          className={`${styles.visualArrow} ${styles.visualArrowPrev}`}
          onClick={() => selectImage(activeImage - 1)}
          disabled={activeImage === 0}
          aria-label="Foto precedente"
        >
          ‹
        </button>
        <div className={styles.visualTrack} ref={trackRef} onScroll={updateActiveImage}>
          {mauroImages.map((image) => (
            <figure className={styles.visualSlide} key={image.src}>
              <img src={image.src} alt={image.alt} />
            </figure>
          ))}
        </div>
        <button
          type="button"
          className={`${styles.visualArrow} ${styles.visualArrowNext}`}
          onClick={() => selectImage(activeImage + 1)}
          disabled={activeImage === mauroImages.length - 1}
          aria-label="Foto successiva"
        >
          ›
        </button>
        <div className={styles.visualDots} aria-label="Foto di Mauro">
          {mauroImages.map((image, index) => (
            <button
              type="button"
              key={image.src}
              className={activeImage === index ? styles.activeDot : ''}
              onClick={() => selectImage(index)}
              aria-label={`Mostra foto ${index + 1}`}
              aria-current={activeImage === index}
            />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Mauro Simoncini</p>
        <h2 className="section-heading">La competenza che rende semplice il lavoro.</h2>
        <p className={styles.lead}>
          Non applico direttamente i prodotti. Ti aiuto a capire come funzionano,
          quando usarli e quale sistema scegliere.
        </p>
        <div className={styles.body}>
          <p>
            Da oltre 15 anni affianco rivendite, progettisti, imprese e privati nel mondo
            dell’impermeabilizzazione. Ho contribuito allo sviluppo tecnico e commerciale
            di sistemi oggi molto conosciuti.
          </p>
          <p>
            Il mio obiettivo è concreto: farti risparmiare errori, tempo e denaro,
            dandoti risposte comprensibili prima di iniziare.
          </p>
        </div>
        <div className={styles.stats} aria-label="Esperienza professionale">
          <div><strong>15+</strong><span>anni di esperienza</span></div>
          <div><strong>1:1</strong><span>supporto diretto</span></div>
          <div><strong>0</strong><span>soluzioni improvvisate</span></div>
        </div>
        <div className={styles.actions}>
          <a
            className="button-primary"
            href="https://wa.me/393938657606?text=Ciao Mauro! Ho un dubbio sul mio progetto."
            target="_blank"
            rel="noreferrer"
          >
            Raccontami il tuo progetto
          </a>
          <a
            className="button-on-dark"
            href="https://www.linkedin.com/in/mauro-simoncini-04303b3a/"
            target="_blank"
            rel="noreferrer"
          >
            Profilo LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
