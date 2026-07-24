import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import styles from './Hero.module.css';

const Hero = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startVideo = () => {
      const video = videoRef.current;
      if (reducedMotion || !videoReady || !video) return;

      video.play().catch(() => {});
    };

    if (window.scrollY > 1) startVideo();
    window.addEventListener('scroll', startVideo, { passive: true, once: true });

    return () => {
      window.removeEventListener('scroll', startVideo);
    };
  }, [videoReady]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    let animationFrame = null;

    const updateOrbit = () => {
      animationFrame = null;
      if (!orbitRef.current) return;

      const rotation = Math.min(54, window.scrollY * 0.075);
      orbitRef.current.style.setProperty('--orbit-rotation', `${rotation}deg`);
    };

    const requestUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateOrbit);
      }
    };

    updateOrbit();
    window.addEventListener('scroll', requestUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleVideoReady = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setVideoReady(true);
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.copyColumn}>
        <div className={styles.copy}>
          <p className="eyebrow">Mai Senza · Conoscenza, cura e prodotto giusto</p>
          <h1 className="display-title">Impermeabilizzare.<br />Fallo bene, da solo.</h1>
          <p className={styles.subtitle}>
            Metodo, cura e il prodotto giusto per proteggere tutte le superfici
            senza demolire e senza costosi tentativi.
          </p>
          <div className={styles.actions}>
            <a
              className="button-primary"
              href="https://wa.me/393938657606?text=Ciao Mauro! Vorrei capire come impermeabilizzare la mia superficie."
              target="_blank"
              rel="noreferrer"
            >
              Chiedi a Mauro
            </a>
            <Link to="mai-senza-esperienza" smooth duration={550} offset={-96} className="button-secondary">
              Vedi le soluzioni
            </Link>
          </div>
          <img
            src="/assets/mauro/heromauro.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            decoding="async"
            className={styles.copyBucket}
          />
        </div>
      </div>

      <div className={styles.productSequence}>
        <div className={styles.productStage}>
          <div className={styles.productHeroCopy}>
            <h2><span>Il prodotto</span> <em>giusto</em></h2>
            <div className={styles.productActions}>
              <Link to="mai-senza-esperienza" smooth duration={550} offset={-96} className="button-primary">
                Scopri i casi
              </Link>
              <a
                className="button-secondary"
                href="https://wa.me/393938657606?text=Ciao Mauro! Vorrei scegliere il sistema giusto."
                target="_blank"
                rel="noreferrer"
              >
                Chiedi consiglio
              </a>
            </div>
          </div>

          <div
            className={styles.bucketSequence}
            role="img"
            aria-label="Secchio Fibro-gum che ruota fino a mostrare il prodotto e il rullo"
          >
            <div
              ref={orbitRef}
              className={`${styles.productOrbit} ${videoStarted ? styles.orbitVisible : ''}`}
              aria-hidden="true"
            >
              <img
                src="/assets/secchio-stile-apple/secchioinaria.png"
                alt=""
                className={`${styles.orbitItem} ${styles.orbitOne}`}
              />
              <img
                src="/assets/animazione/frame2.png"
                alt=""
                className={`${styles.orbitItem} ${styles.orbitTwo}`}
              />
              <img
                src="/assets/animazione/frame5.png"
                alt=""
                className={`${styles.orbitItem} ${styles.orbitThree}`}
              />
              <img
                src="/assets/animazione/frame8.png"
                alt=""
                className={`${styles.orbitItem} ${styles.orbitFour}`}
              />
              <img
                src="/assets/animazione/frame10.png"
                alt=""
                className={`${styles.orbitItem} ${styles.orbitFive}`}
              />
              <img
                src="/assets/animazione/frame3.png"
                alt=""
                className={`${styles.orbitItem} ${styles.orbitSix}`}
              />
              <img
                src="/assets/animazione/frame7.png"
                alt=""
                className={`${styles.orbitItem} ${styles.orbitSeven}`}
              />
              <img
                src="/assets/animazione/frame9.png"
                alt=""
                className={`${styles.orbitItem} ${styles.orbitEight}`}
              />
            </div>
            <img
              src="/assets/secchio-stile-apple/secchioinaria.png"
              alt=""
              aria-hidden="true"
              draggable="false"
              decoding="async"
              className={`${styles.bucketMedia} ${styles.bucketPoster} ${videoStarted ? styles.mediaHidden : ''}`}
            />
            <div
              className={`${styles.bucketMedia} ${styles.videoFrame} ${videoStarted ? styles.mediaReady : ''}`}
              aria-hidden="true"
            >
              <video
                ref={videoRef}
                className={styles.bucketVideo}
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                onLoadedData={handleVideoReady}
                onPlaying={() => setVideoStarted(true)}
              >
                <source src="/assets/animazione/video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pillars}>
        <Link to="mai-senza-consigli" smooth duration={550} offset={-96} className={styles.pillar}>
          <span>01</span>
          <strong>Conoscenza</strong>
          <small>Capire prima di scegliere</small>
        </Link>
        <Link to="mai-senza-manutenzione" smooth duration={550} offset={-96} className={styles.pillar}>
          <span>02</span>
          <strong>Cura</strong>
          <small>Proteggere nel tempo</small>
        </Link>
        <Link to="mai-senza-esperienza" smooth duration={550} offset={-96} className={styles.pillar}>
          <span>03</span>
          <strong>Prodotto giusto</strong>
          <small>Una soluzione per ogni supporto</small>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
