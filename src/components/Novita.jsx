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
      title: 'Adesione a fiamma❓️5 criticità spesso sottovalutate.',
      date: '15/01/2024',
      author: 'Mauro Simoncini',
      excerpt: 'L\'uso di fiamma libera comporta rischi e criticità spesso sottovalutate che possono compromettere l\'efficacia dell\'impermeabilizzazione.',
      content: 'L\'uso di fiamma libera comporta un\'elevata esposizione a innesco. Senza adeguate barriere protettive, il pericolo è concreto. La posa richiede operatori qualificati e un\'applicazione non conforme può compromettere la continuità del manto.',
      image: '/assets/news1.png',
      category: 'Tecnica',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Mai Senza approfondire. La norma ISO 4628❓️',
      date: '08/01/2024',
      author: 'Mauro Simoncini',
      excerpt: 'La norma ISO 4628 è una serie di standard internazionali che definiscono un sistema per valutare i difetti e i cambiamenti nell\'aspetto dei rivestimenti liquidi.',
      content: 'La norma ISO 4628 è fondamentale per garantire la qualità dei rivestimenti. Un prodotto conforme assicura controllo dei difetti, mantenimento dell\'aspetto estetico e resistenza al degrado superficiale.',
      image: null,
      isTextHeader: true,
      headerTitle: 'Mai Senza approfondire. La norma ISO 4628❓️',
      category: 'Normative',
      readTime: '4 min'
    },
    {
      id: 3,
      title: 'In che modo un alto valore SRI aiuta a ridurre il surriscaldamento delle coperture?',
      date: '02/01/2024',
      author: 'Mauro Simoncini',
      excerpt: 'L\'SRI (Solar Reflectance Index) aiuta a ridurre il surriscaldamento delle coperture combinando due proprietà: alta riflettanza solare e alta emissività termica.',
      content: 'Un alto valore di SRI significa che il materiale riflette più radiazione solare e disperde meglio il calore, riducendo la temperatura superficiale del tetto e limitando il trasferimento di calore agli ambienti interni.',
      image: '/assets/news2.png',
      category: 'Efficienza Energetica',
      readTime: '3 min'
    },
    {
      id: 4,
      title: 'Siamo su una copertura industriale attiva, in provincia di Grosseto.',
      date: '28/12/2023',
      author: 'Mauro Simoncini',
      excerpt: 'Impianti in esercizio, geometrie complesse, vecchia guaina da trattare. Non si può demolire, non si possono scollegare gli impianti. Serve un approccio diverso.',
      content: 'FibroGum è stato scelto perché si applica senza demolizione del sottostante, è conforme alle normative vigenti e rende possibile lavorare in continuità senza il fermo degli impianti. Soluzione documentabile per la DL.',
      image: '/assets/news33.jpg',
      additionalImages: ['/assets/news35.jpg', '/assets/news34.jpg'],
      category: 'Case Study',
      readTime: '7 min'
    },
    {
      id: 5,
      title: 'Ecco cosa sapere (e valutare) se hai un terrazzo, un balcone o una copertura piastrellata da proteggere una volta per tutte.',
      date: '20/12/2023',
      author: 'Mauro Simoncini',
      excerpt: 'L\'esposizione alla pioggia senza protezione adeguata può causare infiltrazioni, distacco delle piastrelle, muffe e danni alla struttura dell\'edificio.',
      content: 'Esistono 3 modi per intervenire senza demolire: sovrapposizione su superficie esistente, intervento su massetto grezzo o impermeabilizzazione trasparente. Ogni superficie ha le sue esigenze specifiche.',
      image: '/assets/news4.png',
      category: 'Guide',
      readTime: '8 min'
    }
  ];

  const categories = ['Tutti', 'Tecnica', 'Normative', 'Efficienza Energetica', 'Case Study', 'Guide'];
  
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
                        {article.isTextHeader ? (
                          <div className={styles.textHeader}>
                            <h3 className={styles.textHeaderTitle}>{article.headerTitle}</h3>
                          </div>
                        ) : (
                          <>
                            <img src={article.image} alt={article.title} loading="lazy" />
                            {article.additionalImages && (
                              <div className={styles.multipleImagesIndicator}>
                                <span>+{article.additionalImages.length}</span>
                              </div>
                            )}
                          </>
                        )}
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
                href="https://wa.me/393938657606?text=Ciao! Ho letto i tuoi articoli e vorrei una consulenza"
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