import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './ArticlePage.module.css';

// Dati estesi degli articoli
const articlesData = [
  {
    id: 1,
    title: 'Mi si infiltra l\'acqua dal muro esterno, che faccio?',
    date: '15/07/2023',
    summary: 'Le infiltrazioni dai muri esterni sono spesso causate da microfessure nel rivestimento.',
    content: `
      <p>Le infiltrazioni d'acqua dai muri esterni rappresentano uno dei problemi più comuni nelle abitazioni, soprattutto in zone con elevate precipitazioni o in edifici di vecchia costruzione.</p>
      
      <h2>Identificare l'origine del problema</h2>
      <p>Prima di intervenire, è fondamentale capire da dove proviene l'acqua. Ispeziona attentamente il muro durante o subito dopo una pioggia per individuare il punto esatto d'ingresso dell'acqua.</p>
      
      <h3>Cause più comuni</h3>
      <ul>
        <li>Microfessurazioni nell'intonaco o nel rivestimento esterno</li>
        <li>Problemi ai giunti di dilatazione</li>
        <li>Deterioramento del materiale sigillante attorno a finestre e porte</li>
      </ul>
      
      <h2>Soluzioni immediate</h2>
      <p>Per un intervento tempestivo, puoi utilizzare sigillanti elastomerici o a base di silicone per chiudere piccole fessure. Questi prodotti sono facili da applicare e creano una barriera impermeabile.</p>
      
      <h2>Soluzioni a lungo termine</h2>
      <p>Se il problema persiste o riguarda un'ampia superficie, è necessario un trattamento più approfondito come l'applicazione di rivestimenti impermeabilizzanti specifici.</p>
    `
  },
  {
    id: 2,
    title: 'Come proteggere l\'impermeabilizzazione dai raggi UV',
    date: '08/07/2023',
    summary: 'L\'esposizione prolungata ai raggi UV può degradare anche i migliori materiali impermeabilizzanti.',
    content: `
      <p>I raggi ultravioletti sono uno dei principali nemici delle impermeabilizzazioni esposte. Nel tempo, possono causare invecchiamento precoce, crepe e deterioramento dei materiali.</p>
      
      <h2>Effetti dei raggi UV sui materiali impermeabilizzanti</h2>
      <p>L'esposizione solare prolungata può causare:</p>
      <ul>
        <li>Perdita di elasticità e flessibilità</li>
        <li>Infragilimento e formazione di microfessure</li>
        <li>Decolorazione e deterioramento estetico</li>
      </ul>
      
      <h2>Soluzioni protettive</h2>
      <p>Le vernici con pigmenti riflettenti sono una delle soluzioni più efficaci. Questi prodotti sono formulati per respingere i raggi UV e ridurre l'assorbimento di calore.</p>
    `
  },
  {
    id: 3,
    title: 'Impermeabilizzazione in inverno: è possibile?',
    date: '01/07/2023',
    summary: 'Molti pensano che l\'impermeabilizzazione sia un lavoro da fare solo in estate, ma con i giusti accorgimenti è possibile anche d\'inverno.',
    content: `
      <p>Contrariamente a quanto si pensa, i lavori di impermeabilizzazione possono essere eseguiti anche durante la stagione fredda, adottando gli accorgimenti giusti e scegliendo materiali appropriati.</p>
      
      <h2>Limitazioni delle basse temperature</h2>
      <p>È importante conoscere le sfide che il freddo comporta:</p>
      <ul>
        <li>Tempi di asciugatura e indurimento più lunghi</li>
        <li>Minore flessibilità di alcuni materiali</li>
        <li>Difficoltà di adesione su superfici umide o gelate</li>
      </ul>
      
      <h2>Materiali adatti alle basse temperature</h2>
      <p>Esistono sul mercato impermeabilizzanti liquidi formulati appositamente per l'applicazione in condizioni di bassa temperatura, fino a +5°C.</p>
    `
  },
  {
    id: 4,
    title: 'Qual è la durata di un\'impermeabilizzazione ben fatta?',
    date: '24/06/2023',
    summary: 'Una buona impermeabilizzazione, eseguita con materiali di qualità e tecniche appropriate, può durare dai 10 ai 20 anni.',
    content: `
      <p>La durabilità di un sistema impermeabilizzante dipende da molteplici fattori, tra cui la qualità dei materiali, la corretta installazione e le condizioni ambientali a cui è esposto.</p>
      
      <h2>Aspettativa di vita dei diversi sistemi</h2>
      <ul>
        <li>Membrane bituminose standard: 10-15 anni</li>
        <li>Membrane bituminose modificate APP/SBS: 15-20 anni</li>
        <li>Membrane sintetiche PVC: 20-30 anni</li>
        <li>Membrane EPDM: fino a 50 anni in condizioni ottimali</li>
      </ul>
      
      <h2>Fattori che influenzano la durata</h2>
      <p>L'esposizione a elementi climatici estremi, la qualità dell'installazione e la manutenzione regolare sono fattori determinanti per la durata dell'impermeabilizzazione.</p>
    `
  },
  {
    id: 5,
    title: 'Come scegliere tra membrane bituminose e sintetiche?',
    date: '17/06/2023',
    summary: 'La scelta tra membrane bituminose e sintetiche dipende dalle specifiche del progetto.',
    content: `
      <p>La scelta del tipo di membrana impermeabilizzante è fondamentale per il successo di qualsiasi progetto di impermeabilizzazione.</p>
      
      <h2>Membrane bituminose: vantaggi</h2>
      <ul>
        <li>Costo generalmente inferiore</li>
        <li>Facilità di riparazione</li>
        <li>Ampia disponibilità di manodopera esperta</li>
      </ul>
      
      <h2>Membrane sintetiche: vantaggi</h2>
      <ul>
        <li>Maggiore durata (20-50 anni)</li>
        <li>Elevata resistenza ai raggi UV e all'ozono</li>
        <li>Maggiore elasticità e flessibilità</li>
      </ul>
    `
  }
];

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Trova l'articolo corrispondente all'ID
    const articleId = parseInt(id);
    const foundArticle = articlesData.find(article => article.id === articleId);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Trova articoli correlati (escluso l'articolo corrente)
      const related = articlesData
        .filter(article => article.id !== articleId)
        .sort(() => 0.5 - Math.random()) // Mischia casualmente
        .slice(0, 3); // Prendi i primi 3
      
      setRelatedArticles(related);
    } else {
      // Articolo non trovato, reindirizza
      navigate('/');
    }
  }, [id, navigate]);
  
  if (!article) {
    return <div>Caricamento...</div>;
  }

  // Calcola articolo precedente e successivo
  const currentIndex = articlesData.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articlesData[currentIndex - 1] : null;
  const nextArticle = currentIndex < articlesData.length - 1 ? articlesData[currentIndex + 1] : null;
  
  return (
    <>
      <Navbar />
      <div className={styles.articleContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.meta}>
            <div className={styles.dateContainer}>
              <FaCalendarAlt />
              <span>Pubblicato il {article.date}</span>
            </div>
          </div>
        </header>
        
        <Link to="/#consigli" className={styles.backToArticles}>
          <FaArrowLeft /> Torna ai consigli
        </Link>
        
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <nav className={styles.navigation}>
          {prevArticle && (
            <Link to={`/articolo/${prevArticle.id}`} className={styles.navLink}>
              <FaArrowLeft /> Articolo precedente
            </Link>
          )}
          
          {nextArticle && (
            <Link to={`/articolo/${nextArticle.id}`} className={`${styles.navLink} ${styles.nextLink}`}>
              Articolo successivo <FaArrowRight />
            </Link>
          )}
        </nav>
        
        {relatedArticles.length > 0 && (
          <div className={styles.relatedArticles}>
            <h2 className={styles.relatedTitle}>Potrebbe interessarti anche</h2>
            <div className={styles.relatedList}>
              {relatedArticles.map(relatedArticle => (
                <div key={relatedArticle.id} className={styles.relatedArticle}>
                  <h3 className={styles.relatedArticleTitle}>{relatedArticle.title}</h3>
                  <p className={styles.relatedArticleDate}>{relatedArticle.date}</p>
                  <p>{relatedArticle.summary}</p>
                  <Link to={`/articolo/${relatedArticle.id}`} className={styles.relatedArticleLink}>
                    Leggi l'articolo
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage; 