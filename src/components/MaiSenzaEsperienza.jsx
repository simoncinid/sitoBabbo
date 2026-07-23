import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MaiSenzaEsperienza.module.css';

const cases = [
  {
    title: 'Lastrico solare',
    problem: 'Infiltrazioni evidenti',
    solution: 'Ciclo liquido senza demolire',
    result: 'Superficie protetta e pedonabile',
    time: '4 giorni',
    slug: 'use-case-lastrico-solare-senza-demolire',
    image: '/assets/generated/lastrico-solare-fibrogum.png',
    alt: 'Lastrico solare impermeabilizzato con Fibro-gum',
  },
  {
    title: 'Lamiere coibentate',
    problem: 'Usura e punti scoperti',
    solution: 'Membrana impermeabilizzante fibrata',
    result: 'Copertura rinnovata e resistente',
    time: '2 giorni',
    slug: 'use-case-lamiere-coibentate-protette',
    image: '/assets/generated/lamiere-coibentate-fibrogum.png',
    alt: 'Copertura in lamiere coibentate protetta con Fibro-gum',
  },
  {
    title: 'Guaine bituminose',
    problem: 'Superficie vecchia e coccodrillata',
    solution: 'Sistema liquido termoriflettente',
    result: 'Niente demolizioni, nuova protezione',
    time: '5 giorni',
    slug: 'use-case-guaina-bituminosa-rinnovata',
    image: '/assets/generated/guaina-rinnovata-fibrogum.png',
    alt: 'Guaina bituminosa rinnovata con membrana bianca Fibro-gum',
  },
];

const MaiSenzaEsperienza = () => (
  <section className={styles.section} id="mai-senza-esperienza">
    <div className="site-container">
      <header className={styles.header}>
        <p className={styles.eyebrow}>03 · Il prodotto giusto</p>
        <h2 className="section-heading">Ogni supporto chiede<br />la sua soluzione.</h2>
        <p>
          Non serve il prodotto più costoso. Serve quello compatibile con il supporto,
          il risultato che vuoi e il modo in cui lavorerai.
        </p>
      </header>

      <div className={styles.grid}>
        {cases.map((item, index) => (
          <Link className={styles.card} to={`/novita/${item.slug}`} key={item.title}>
            <div className={styles.caseImage}>
              <img src={item.image} alt={item.alt} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTopline}>
                <span>Use case 0{index + 1}</span>
                <span>{item.time}</span>
              </div>
              <h3>{item.title}</h3>
              <dl>
                <div><dt>Partenza</dt><dd>{item.problem}</dd></div>
                <div><dt>Sistema</dt><dd>{item.solution}</dd></div>
                <div><dt>Risultato</dt><dd>{item.result}</dd></div>
              </dl>
              <span className={styles.readCase}>
                Leggi il caso completo <span aria-hidden="true">›</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default MaiSenzaEsperienza;
