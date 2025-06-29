import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FaSearch, FaCalendar, FaUser, FaArrowRight, FaArrowLeft, FaTags, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Novita.module.css';

const Novita = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;
  
  const articles = [
    {
      id: 1,
      title: 'Nuove Tecnologie per l\'Impermeabilizzazione 2024',
      date: '15/01/2024',
      author: 'Mauro Simoncini',
      excerpt: 'Scopri le ultime innovazioni nel campo dell\'impermeabilizzazione: dai nano-rivestimenti alle membrane smart che si auto-riparano. Una rivoluzione tecnologica che cambierà il modo di proteggere i nostri edifici.',
      content: 'Il 2024 porta con sé rivoluzionarie novità nel settore dell\'impermeabilizzazione. Le nuove tecnologie nano-strutturate permettono di creare barriere invisibili ma incredibilmente efficaci. I nano-rivestimenti, applicabili con semplici spruzzatori, penetrano in profondità nei materiali creando una protezione molecolare. Inoltre, le membrane smart dotate di micro-capsule contenenti agenti sigillanti si attivano automaticamente in presenza di micro-fessure, garantendo un\'auto-riparazione immediata.',
      image: '/assets/1.webp',
      category: 'Innovazione',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Impermeabilizzazione Sostenibile: Materiali Eco-Friendly',
      date: '08/01/2024',
      author: 'Mauro Simoncini',
      excerpt: 'L\'evoluzione green del settore: materiali biodegradabili e a basso impatto ambientale per un futuro più sostenibile. Scopri come proteggere l\'ambiente senza compromettere l\'efficacia.',
      content: 'La sostenibilità ambientale è diventata una priorità anche nel settore dell\'impermeabilizzazione. I nuovi materiali eco-friendly derivati da fonti rinnovabili offrono prestazioni paragonabili ai prodotti tradizionali ma con un impatto ambientale drasticamente ridotto. Dalle membrane a base di oli vegetali ai sigillanti biodegradabili, il futuro dell\'impermeabilizzazione è sempre più verde.',
      image: '/assets/2.png',
      category: 'Sostenibilità',
      readTime: '4 min'
    },
          {
        id: 3,
        title: 'Casi Studio: Progetti Complessi Risolti con Successo',
        date: '02/01/2024',
        author: 'Mauro Simoncini',
        excerpt: 'Analisi dettagliata di tre progetti particolarmente sfidanti: dalle infiltrazioni storiche alle soluzioni innovative per edifici moderni. Esempi pratici di come l\'esperienza fa la differenza.',
        content: 'Presentiamo tre casi studio che dimostrano come l\'esperienza e l\'innovazione possano risolvere anche i problemi più complessi. Il primo caso riguarda un palazzo storico del centro con infiltrazioni croniche risolte attraverso tecniche conservative. Il secondo caso presenta un edificio moderno con problemi strutturali che richiedevano soluzioni non invasive.',
        image: '/assets/3.png',
        category: 'Case Study',
        readTime: '7 min'
      },
      {
        id: 4,
        title: 'Impermeabilizzazione di Terrazzi: Guida Completa 2024',
        date: '28/12/2023',
        author: 'Mauro Simoncini',
        excerpt: 'Tutto quello che devi sapere per impermeabilizzare correttamente un terrazzo: dalla preparazione del sottofondo alla scelta dei materiali più adatti.',
        content: 'L\'impermeabilizzazione di un terrazzo richiede particolare attenzione a diversi fattori. La preparazione del sottofondo è fondamentale: deve essere pulito, asciutto e livellato. La scelta del sistema impermeabilizzante dipende dal tipo di utilizzo del terrazzo e dalle condizioni climatiche della zona.',
        image: '/assets/hero.png',
        category: 'Guide',
        readTime: '6 min'
      },
      {
        id: 5,
        title: 'Errori Comuni nell\'Impermeabilizzazione da Evitare',
        date: '20/12/2023',
        author: 'Mauro Simoncini',
        excerpt: 'I 10 errori più frequenti che compromettono l\'efficacia dell\'impermeabilizzazione e come evitarli per garantire risultati duraturi.',
        content: 'Dopo 20 anni di esperienza, ho identificato gli errori più comuni che possono compromettere un lavoro di impermeabilizzazione. Il primo errore è sottovalutare la preparazione del supporto. Il secondo è scegliere materiali inadatti al tipo di superficie.',
        image: '/assets/1.webp',
        category: 'Guide',
        readTime: '5 min'
      },
      {
        id: 6,
        title: 'Manutenzione Impermeabilizzazioni: Quando e Come',
        date: '15/12/2023',
        author: 'Mauro Simoncini',
        excerpt: 'La manutenzione preventiva è la chiave per prolungare la vita delle impermeabilizzazioni. Scopri quando intervenire e quali controlli effettuare.',
        content: 'Una corretta manutenzione può prolungare la vita di un\'impermeabilizzazione fino al 50%. È importante effettuare controlli periodici, specialmente dopo eventi atmosferici intensi. I segnali di allarme includono crepe, bolle o distacchi della membrana.',
        image: '/assets/2.png',
        category: 'Manutenzione',
        readTime: '4 min'
      },
      {
        id: 7,
        title: 'Impermeabilizzazione e Risparmio Energetico',
        date: '10/12/2023',
        author: 'Mauro Simoncini',
        excerpt: 'Come una corretta impermeabilizzazione può contribuire al risparmio energetico dell\'edificio e quali sono le soluzioni più innovative.',
        content: 'L\'impermeabilizzazione non serve solo a proteggere dall\'acqua, ma può contribuire significativamente al risparmio energetico. Le membrane riflettenti possono ridurre il surriscaldamento estivo, mentre un buon isolamento termico abbinato all\'impermeabilizzazione migliora l\'efficienza energetica.',
        image: '/assets/3.png',
        category: 'Innovazione',
        readTime: '6 min'
      },
      {
        id: 8,
        title: 'Soluzioni per Infiltrazioni Difficili da Individuare',
        date: '05/12/2023',
        author: 'Mauro Simoncini',
        excerpt: 'Tecniche avanzate per individuare e risolvere infiltrazioni nascoste che non si manifestano nel punto di origine.',
        content: 'Le infiltrazioni più insidiose sono quelle che si manifestano lontano dal punto di origine. Utilizziamo tecnologie avanzate come la termografia e i test con gas traccianti per individuare con precisione la fonte del problema. Una volta identificata, la riparazione deve essere mirata e definitiva.',
        image: '/assets/hero.png',
        category: 'Case Study',
        readTime: '8 min'
      }
  ];

  const categories = ['Tutti', 'Innovazione', 'Sostenibilità', 'Case Study', 'Guide', 'Manutenzione'];
  
  useEffect(() => {
    let results = articles;
    
    // Filtro per categoria
    if (selectedCategory !== 'Tutti') {
      results = results.filter(article => article.category === selectedCategory);
    }
    
    // Filtro per ricerca
    if (searchTerm.trim() !== '') {
      setIsSearching(true);
      results = results.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      setIsSearching(false);
    }
    
    setFilteredArticles(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory]);

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('Tutti');
    setIsSearching(false);
  };

  // Create URL-friendly slug from title
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };
  
      return (
      <div className={styles.novitaPage}>
        <Navbar />

      

      {/* Search and Filter Section */}
      <section className={styles.searchSection}>
        <div className={styles.container}>
          {/* Barra di ricerca avanzata */}
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Cerca articoli, tecnologie, casi studio..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={clearSearch}
                  className={styles.clearButton}
                  title="Cancella ricerca"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Filtri per categoria */}
          <div className={styles.categoryFilters}>
            <span className={styles.filterLabel}>
              <FaTags className={styles.filterIcon} />
              Filtra per categoria:
            </span>
            <div className={styles.categoryButtons}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Statistiche ricerca */}
          <div className={styles.searchStats}>
            <span className={styles.resultsCount}>
              {filteredArticles.length} {filteredArticles.length === 1 ? 'articolo trovato' : 'articoli trovati'}
            </span>
            {(isSearching || selectedCategory !== 'Tutti') && (
              <button onClick={clearSearch} className={styles.resetFilters}>
                Cancella filtri
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className={styles.articlesSection}>
        <div className={styles.container}>
          {filteredArticles.length > 0 ? (
            <>
              <div className={styles.articlesGrid}>
                {currentArticles.map((article) => (
                  <RouterLink 
                    key={article.id} 
                    to={`/novita/${createSlug(article.title)}`}
                    className={styles.articleCardLink}
                  >
                    <article className={styles.articleCard}>
                      <div className={styles.articleImage}>
                        <img src={article.image} alt={article.title} loading="lazy" />
                        <div className={styles.categoryBadge}>
                          {article.category}
                        </div>
                        <div className={styles.readTime}>
                          {article.readTime}
                        </div>
                      </div>
                      
                      <div className={styles.articleContent}>
                        <div className={styles.articleMeta}>
                          <span className={styles.metaItem}>
                            <FaCalendar className={styles.metaIcon} />
                            {article.date}
                          </span>
                          <span className={styles.metaItem}>
                            <FaUser className={styles.metaIcon} />
                            {article.author}
                          </span>
                        </div>
                        
                        <h2 className={styles.articleTitle}>{article.title}</h2>
                        <p className={styles.articleExcerpt}>{article.excerpt}</p>
                        
                        <div className={styles.readMoreButton}>
                          Leggi l'articolo completo
                          <FaArrowRight className={styles.buttonIcon} />
                        </div>
                      </div>
                    </article>
                  </RouterLink>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className={`${styles.paginationButton} ${styles.paginationArrow}`}
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <div className={styles.paginationNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`${styles.paginationButton} ${currentPage === number ? styles.active : ''}`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className={`${styles.paginationButton} ${styles.paginationArrow}`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>Nessun articolo trovato</h3>
              <p>
                Non abbiamo trovato articoli che corrispondono ai tuoi criteri di ricerca.
                <br />
                Prova a modificare i termini di ricerca o i filtri.
              </p>
              <button onClick={clearSearch} className={styles.resetButton}>
                Mostra tutti gli articoli
              </button>
            </div>
          )}
        </div>
      </section>

      

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Hai un progetto di impermeabilizzazione?</h3>
            <p className={styles.ctaText}>
              Contattami per una consulenza personalizzata. Con oltre 20 anni di esperienza, 
              posso aiutarti a trovare la soluzione perfetta per le tue esigenze.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://wa.me/393938675606?text=Ciao! Ho letto i tuoi articoli e vorrei una consulenza"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButtonPrimary}
              >
                Consulenza WhatsApp
              </a>
              <RouterLink to="/" className={styles.ctaButtonSecondary}>
                Scopri i Servizi
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

              <Footer />
    </div>
  );
};

export default Novita; 