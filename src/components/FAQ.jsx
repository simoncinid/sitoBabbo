import React, { useState } from 'react';
import styles from './FAQ.module.css';

const questions = [
  {
    question: 'Posso impermeabilizzare una guaina ardesiata?',
    answer: 'Sì. Con un sistema compatibile è possibile intervenire sulla guaina esistente, dopo averne verificato stato, aderenza e preparazione.',
  },
  {
    question: 'Quanto dura un’impermeabilizzazione liquida ben fatta?',
    answer: 'Può superare i 10 anni. La durata dipende da prodotto, preparazione, spessore applicato, esposizione e manutenzione periodica.',
  },
  {
    question: 'Membrana liquida o guaina prefabbricata?',
    answer: 'La membrana liquida crea un film continuo senza giunti e si applica senza fiamme. La scelta corretta dipende però dal supporto e dal risultato richiesto.',
  },
  {
    question: 'Posso fare il lavoro da solo?',
    answer: 'Molti interventi sono alla portata di un privato preparato. Prima bisogna valutare supporto, dettagli critici, sicurezza e ciclo completo.',
  },
  {
    question: 'Ogni quanto va controllata la superficie?',
    answer: 'In media ogni tre anni, e sempre dopo eventi atmosferici importanti. Un controllo visivo periodico permette di intervenire prima del danno.',
  },
];

const FAQ = () => {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section} id="faq">
      <div className="site-container">
        <header className={styles.header}>
          <p className="eyebrow">Domande frequenti</p>
          <h2 className="section-heading">Risposte chiare.<br />Prima di iniziare.</h2>
        </header>
        <div className={styles.layout}>
          <div className={styles.list}>
            {questions.map((item, index) => (
              <article className={`${styles.item} ${active === index ? styles.active : ''}`} key={item.question}>
                <button
                  type="button"
                  aria-expanded={active === index}
                  onClick={() => setActive(active === index ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{active === index ? '−' : '+'}</span>
                </button>
                <div className={styles.answer}>
                  <p>{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className={styles.aside}>
            <span>Non trovi il tuo dubbio?</span>
            <h3>Ogni caso parte da una domanda.</h3>
            <p>Mandami due righe e, se puoi, una foto della superficie.</p>
            <a
              className="button-primary"
              href="https://wa.me/393938657606?text=Ciao Mauro! Ho una domanda sulla mia impermeabilizzazione."
              target="_blank"
              rel="noreferrer"
            >
              Fai la tua domanda
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
