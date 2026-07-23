import React from 'react';
import styles from './MaiSenzaManutenzione.module.css';

const MaiSenzaManutenzione = () => (
  <section className={styles.section} id="mai-senza-manutenzione">
    <div className={styles.intro}>
      <p className={styles.eyebrow}>02 · Cura</p>
      <h2 className="section-heading">Il lavoro non finisce<br />con l’applicazione.</h2>
      <p className={styles.lead}>
        Una cura programmata protegge il sistema, mantiene le prestazioni
        e trasforma un piccolo controllo in un grande risparmio.
      </p>
      <div className={styles.metric}>
        <strong className={styles.metricValue}>73%</strong>
        <span className={styles.metricText}>
          dei danni strutturali può essere evitato con una semplice cura preventiva.
        </span>
      </div>
    </div>

    <div className={styles.comparison}>
      <article>
        <div className={styles.comparisonImage}>
          <img
            src="/assets/generated/manutenzione-preventiva.png"
            alt="Tecnico durante il controllo preventivo di una copertura impermeabilizzata"
          />
        </div>
        <div className={styles.cardCopy}>
          <p className="eyebrow">Prima</p>
          <h3>Controllare oggi.</h3>
          <p>Ispezione, pulizia e piccoli ripristini prima che l’acqua trovi spazio.</p>
        </div>
      </article>
      <article className={styles.darkCard}>
        <div className={styles.comparisonImage}>
          <img
            src="/assets/generated/danno-infiltrazione.png"
            alt="Danno da infiltrazione con umidità e distacco dell’intonaco"
          />
        </div>
        <div className={styles.cardCopy}>
          <p className={styles.darkEyebrow}>Dopo</p>
          <h3>Riparare domani.</h3>
          <p>Demolizioni, infiltrazioni e costi che una manutenzione avrebbe evitato.</p>
        </div>
      </article>
    </div>

    <div className={styles.cta}>
      <p><strong>La differenza è semplice:</strong> un piccolo gesto oggi protegge da costi enormi domani.</p>
      <a
        className="button-primary"
        href="https://wa.me/393938657606?text=Ciao Mauro! Vorrei programmare un controllo della mia impermeabilizzazione."
        target="_blank"
        rel="noreferrer"
      >
        Valuta lo stato della superficie
      </a>
    </div>
  </section>
);

export default MaiSenzaManutenzione;
