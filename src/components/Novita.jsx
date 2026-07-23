import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchArticles } from '../utils/articlesApi';
import styles from './Novita.module.css';

const Novita = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tutti');

  useEffect(() => {
    let active = true;
    fetchArticles().then((items) => {
      if (active) {
        setArticles(items);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => ['Tutti', ...new Set(articles.map((article) => article.category))],
    [articles],
  );
  const filtered = useMemo(() => articles.filter((article) => {
    const categoryMatch = category === 'Tutti' || article.category === category;
    const queryMatch = `${article.title} ${article.excerpt}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [articles, category, query]);

  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <header className={styles.hero}>
          <div className={`site-container ${styles.heroContent}`}>
            <p className="eyebrow">Mai Senza · Articoli</p>
            <h1 className="display-title">Capire meglio.<br />Lavorare meglio.</h1>
            <p>Approfondimenti tecnici, guide pratiche e casi reali spiegati senza gergo inutile.</p>
          </div>
          <img
            className={styles.desktopHeroPortrait}
            src="/assets/mauro/heromauro.png"
            alt=""
            aria-hidden="true"
          />
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
              <h2>{loading ? 'Caricamento…' : `${filtered.length} ${filtered.length === 1 ? 'articolo' : 'articoli'}`}</h2>
              {(query || category !== 'Tutti') && (
                <button type="button" onClick={() => { setQuery(''); setCategory('Tutti'); }}>Azzera filtri</button>
              )}
            </div>

            {!loading && filtered.length ? (
              <div className={styles.grid}>
                {filtered.map((article, index) => (
                  <Link
                    className={`${styles.card} ${index === 0 ? styles.featured : ''}`}
                    to={`/novita/${article.slug}`}
                    key={article.id}
                  >
                    <div className={styles.image}>
                      {article.image ? <img src={article.image} alt="" /> : <span className={styles.imageFallback}>Mai Senza</span>}
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
            ) : !loading && (
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
