import React, { useRef, useState } from 'react';
import styles from './MaiSenzaConsigli.module.css';

const lessons = [
  { title: 'Preparare il supporto', meta: 'Le basi · 6 min', src: '/assets/video1.mp4' },
  { title: 'Leggere una scheda tecnica', meta: 'Prodotti · 8 min', src: '/assets/video2.mp4' },
  { title: 'Evitare gli errori comuni', meta: 'Metodo · 5 min', src: '/assets/video4.mp4' },
];

const topics = [
  ['SRI, elasticità, consumo', 'Capisci cosa dicono davvero i numeri prima di acquistare.'],
  ['Primer: quando serve', 'Riconosci supporto, assorbimento e compatibilità.'],
  ['Una superficie pronta', 'Preparazione, pulizia e dettagli che cambiano il risultato.'],
  ['Applicazione corretta', 'Tempi, spessori e condizioni per non vanificare il lavoro.'],
];

const MaiSenzaConsigli = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const galleryRef = useRef(null);

  const selectLesson = (index) => {
    const safeIndex = Math.max(0, Math.min(lessons.length - 1, index));
    setActiveLesson(safeIndex);
    galleryRef.current?.children[safeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const updateActiveOnScroll = () => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const center = gallery.scrollLeft + gallery.clientWidth / 2;
    const cards = Array.from(gallery.children);
    const closest = cards.reduce((best, card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - center);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity });
    setActiveLesson(closest.index);
  };

  return (
    <section className={styles.section} id="mai-senza-consigli">
      <div className="site-container">
        <header className={styles.header}>
          <div>
            <p className="eyebrow">01 · Conoscenza</p>
            <h2 className="section-heading">Prima capisci.<br />Poi scegli.</h2>
          </div>
          <p className={styles.headerCopy}>
            Ogni superficie ha le sue regole e ogni prodotto i suoi limiti.
            Qui impari il perché, prima ancora del come.
            Per stimare quantità e consumi prima dell’acquisto, presto potrai usare questo calcolatore: {' '}
            <a href="https://www.buildcalclab.com/">construction material calculators</a>.
          </p>
        </header>

        <div className={styles.galleryShell}>
          <button
            className={`${styles.galleryArrow} ${styles.previous}`}
            type="button"
            onClick={() => selectLesson(activeLesson - 1)}
            disabled={activeLesson === 0}
            aria-label="Video precedente"
          >
            ‹
          </button>

          <div className={styles.lessonGrid} ref={galleryRef} onScroll={updateActiveOnScroll}>
            {lessons.map((lesson) => (
              <article className={styles.lessonCard} key={lesson.title}>
                <div className={styles.lessonMedia}>
                  <video
                    src={lesson.src}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={lesson.title}
                  />
                </div>
                <div className={styles.lessonCopy}>
                  <p>{lesson.meta}</p>
                  <h3>{lesson.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <button
            className={`${styles.galleryArrow} ${styles.next}`}
            type="button"
            onClick={() => selectLesson(activeLesson + 1)}
            disabled={activeLesson === lessons.length - 1}
            aria-label="Video successivo"
          >
            ›
          </button>
        </div>

        <div className={styles.galleryDots} aria-label="Seleziona video">
          {lessons.map((lesson, index) => (
            <button
              type="button"
              key={lesson.title}
              className={activeLesson === index ? styles.activeDot : ''}
              onClick={() => selectLesson(index)}
              aria-label={`Vai al video ${index + 1}`}
              aria-current={activeLesson === index}
            />
          ))}
        </div>

        <div className={styles.topicGrid}>
          {topics.map(([title, copy], index) => (
            <article className={styles.topic} key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className={styles.prompt}>
          <p>Hai un dubbio prima di acquistare?</p>
          <a
            className="button-primary"
            href="https://wa.me/393938657606?text=Ciao Mauro! Ho un dubbio prima di acquistare."
            target="_blank"
            rel="noreferrer"
          >
            Chiedi prima di scegliere
          </a>
        </div>
      </div>
    </section>
  );
};

export default MaiSenzaConsigli;
