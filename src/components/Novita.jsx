import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Novita.module.css';

const articles = [
  {
    id: 1,
    title: 'Adesione a fiamma?  5 criticità spesso sottovalutate.',
    slug: 'adesione-a-fiamma5-criticita-spesso-sottovalutate',
    date: '19 dicembre 2024',
    excerpt: 'Fiamma libera, continuità del manto e competenze: i rischi da conoscere prima di scegliere il sistema.',
    image: '/assets/news1.png',
    category: 'Tecnica',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Mai Senza approfondire. La norma ISO 4628?',
    date: '19 dicembre 2024',
    excerpt: 'Lo standard internazionale per valutare difetti e cambiamenti nell’aspetto dei rivestimenti liquidi.',
    image: '/assets/generated/iso-4628-laboratorio.png',
    category: 'Normative',
    readTime: '4 min',
  },
  {
    id: 3,
    title: 'In che modo un alto valore SRI aiuta a ridurre il surriscaldamento delle coperture?',
    date: '19 dicembre 2024',
    excerpt: 'Riflettanza solare ed emissività termica: cosa misurano e perché contano davvero.',
    image: '/assets/news2.png',
    category: 'Efficienza Energetica',
    readTime: '3 min',
  },
  {
    id: 4,
    title: 'Siamo su una copertura industriale attiva, in provincia di Grosseto.',
    date: '19 dicembre 2024',
    excerpt: 'Impianti in esercizio, geometrie complesse e una vecchia guaina: intervenire senza fermare il lavoro.',
    image: '/assets/news33.jpg',
    category: 'Case Study',
    readTime: '7 min',
  },
  {
    id: 5,
    title: 'Ecco cosa sapere (e valutare) se hai un terrazzo, un balcone o una copertura piastrellata da proteggere una volta per tutte.',
    date: '19 dicembre 2024',
    excerpt: 'Tre modi per proteggere una superficie piastrellata senza demolire, con criteri e limiti.',
    image: '/assets/news4.jpg',
    category: 'Guide',
    readTime: '8 min',
  },
  {
    id: 6,
    title: 'Lastrico solare: impermeabilizzare senza demolire',
    slug: 'use-case-lastrico-solare-senza-demolire',
    date: '23 luglio 2026',
    excerpt: 'Un lastrico con infiltrazioni recuperato con un ciclo liquido continuo e senza rimuovere il supporto.',
    image: '/assets/generated/lastrico-solare-fibrogum.png',
    category: 'Case Study',
    readTime: '6 min',
  },
  {
    id: 7,
    title: 'Lamiere coibentate: protezione continua e resistente',
    slug: 'use-case-lamiere-coibentate-protette',
    date: '23 luglio 2026',
    excerpt: 'La protezione di una copertura metallica usurata senza sostituire i pannelli ancora efficienti.',
    image: '/assets/generated/lamiere-coibentate-fibrogum.png',
    category: 'Case Study',
    readTime: '5 min',
  },
  {
    id: 8,
    title: 'Guaina bituminosa: rinnovarla senza rimuoverla',
    slug: 'use-case-guaina-bituminosa-rinnovata',
    date: '23 luglio 2026',
    excerpt: 'Una vecchia guaina recuperata con un sistema liquido compatibile e termoriflettente.',
    image: '/assets/generated/guaina-rinnovata-fibrogum.png',
    category: 'Case Study',
    readTime: '6 min',
  },
];

const slugify = (title) => title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const Novita = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tutti');
  const categories = ['Tutti', ...new Set(articles.map((article) => article.category))];
  const filtered = useMemo(() => articles.filter((article) => {
    const categoryMatch = category === 'Tutti' || article.category === category;
    const queryMatch = `${article.title} ${article.excerpt}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [category, query]);

  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <header className={styles.hero}>
          <div className="site-container">
            <p className="eyebrow">Mai Senza · Articoli</p>
            <h1 className="display-title">Capire meglio.<br />Lavorare meglio.</h1>
            <p>Approfondimenti tecnici, guide pratiche e casi reali spiegati senza gergo inutile.</p>
          </div>
        </header>

        <section className={styles.filters} aria-label="Filtra articoli">
          <div className={styles.filterInner}>
            <label className={styles.search}>
              <span className="sr-only">Cerca negli articoli</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cerca un argomento"
              />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Cancella ricerca">×</button>}
            </label>
            <div className={styles.categories}>
              {categories.map((item) => (
                <button
                  type="button"
                  className={category === item ? styles.active : ''}
                  onClick={() => setCategory(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.articles}>
          <div className="site-container">
            <div className={styles.resultLine}>
              <h2>{filtered.length} {filtered.length === 1 ? 'articolo' : 'articoli'}</h2>
              {(query || category !== 'Tutti') && (
                <button type="button" onClick={() => { setQuery(''); setCategory('Tutti'); }}>Azzera filtri</button>
              )}
            </div>

            {filtered.length ? (
              <div className={styles.grid}>
                {filtered.map((article, index) => (
                  <Link
                    className={`${styles.card} ${index === 0 ? styles.featured : ''}`}
                    to={`/novita/${article.slug || slugify(article.title)}`}
                    key={article.id}
                  >
                    <div className={styles.image}>
                      <img src={article.image} alt="" />
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.meta}>
                        <span>{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h2>{article.title}</h2>
                      <p>{article.excerpt}</p>
                      <span className={styles.link}>Leggi l’articolo <span aria-hidden="true">›</span></span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <h2>Nessun articolo trovato.</h2>
                <p>Prova un altro termine o torna a tutti gli articoli.</p>
                <button className="button-primary" type="button" onClick={() => { setQuery(''); setCategory('Tutti'); }}>
                  Mostra tutto
                </button>
              </div>
            )}
          </div>
        </section>

        <section className={styles.cta}>
          <div className="site-container">
            <p className="eyebrow">Il tuo progetto</p>
            <h2 className="section-heading">Dalla teoria al tuo caso.</h2>
            <p>Hai letto qualcosa che somiglia al tuo problema? Raccontamelo.</p>
            <a
              className="button-primary"
              href="https://wa.me/393938657606?text=Ciao Mauro! Ho letto i tuoi articoli e vorrei parlarti del mio progetto."
              target="_blank"
              rel="noreferrer"
            >
              Scrivi a Mauro
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Novita;
