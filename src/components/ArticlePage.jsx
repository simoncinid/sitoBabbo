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
    title: 'Adesione a fiamma❓️5 criticità spesso sottovalutate.',
    date: '15/01/2024',
    summary: 'L\'uso di fiamma libera comporta rischi e criticità spesso sottovalutate.',
    content: `
      <p>🔥 <strong>Rischio incendio</strong><br />
      L'uso di fiamma libera comporta un'elevata esposizione a innesco. Senza adeguate barriere protettive, il pericolo è concreto.</p>
      
      <p>🛠️ <strong>Applicazione complessa</strong><br />
      La posa richiede operatori qualificati. Un'applicazione non conforme può compromettere la continuità del manto e generare punti deboli in fase di esercizio.</p>
      
      <p>📉 <strong>Adesione parziale</strong><br />
      Anche in condizioni ideali, l'adesione effettiva della guaina alla superficie raramente supera il 70%. Questo dato impatta sulla durabilità del sistema.</p>
      
      <p>🚫 <strong>Incompatibilità con alcuni materiali</strong><br />
      La posa a fiamma non è indicata su substrati sensibili al calore o su materiali termicamente instabili, se non previa installazione di strati separatori certificati.</p>
      
      <p>🔧 <strong>Riparabilità limitata</strong><br />
      Le operazioni di taglio e risagomatura (cosiddetti "taglia e cuci") indeboliscono lo strato impermeabile, aumentando il rischio di infiltrazioni nel tempo.</p>
      
      <h2>📌 Conclusione tecnica</h2>
      <p>La posa a fiamma resta una tecnologia valida, ma va valutata caso per caso, alla luce delle caratteristiche del supporto, delle condizioni di sicurezza e dell'evoluzione dei sistemi impermeabilizzanti alternativi (liquidi, autoadesivi, reattivi).</p>
      
      <p><strong>🧭 Mai Senza una valutazione tecnica approfondita.</strong><br />
      👉Devi affrontare una impermeabilizzazione della tua copertura? Scrivimi.</p>
    `,
    image: '/assets/news1.png'
  },
  {
    id: 2,
    title: 'Mai Senza approfondire. La norma ISO 4628❓️',
    date: '08/01/2024',
    summary: 'La norma ISO 4628 è una serie di standard internazionali che definiscono un sistema per valutare i difetti e i cambiamenti nell\'aspetto dei rivestimenti.',
    content: `
      <p>La norma ISO 4628❓️ è una serie di standard internazionali che definiscono un sistema per valutare i difetti e i cambiamenti nell'aspetto dei rivestimenti liquidi causati da invecchiamento, agenti atmosferici o altri fattori.</p>
      
      <p>Un prodotto conforme alla norma ISO 4628 garantisce principalmente le seguenti caratteristiche relative alla qualità e alla durabilità del rivestimento:</p>
      
      <p>🔹️Controllo e limitazione di difetti quali presenza di bolle, crepe, sfogliamento e sfarinamento.</p>
      
      <p>🔹️Mantenimento dell'aspetto estetico del film.</p>
      
      <p>🔹️Resistenza ai fenomeni di degrado superficiale come ingiallimento, sfarinamento e scagliatura, anche dopo esposizioni a condizioni ambientali aggressive.</p>
      
      <p>🔹️Valutazione standardizzata e oggettiva dello stato del film applicato per garantire la durabilità e la protezione del substrato sottostante.</p>
      
      <p>In sintesi, un prodotto conforme ISO 4628 assicura che il rivestimento mantenga integrità, estetica e funzionalità nel tempo, limitando difetti e deterioramenti secondo criteri riconosciuti a livello internazionale.</p>
      
      <p><strong>‼️Ecco perché è importante acquistare prodotti con ISO4628 dichiarata.</strong></p>
    `,
    image: null, // Questo articolo avrà un componente speciale invece dell'immagine
    isTextHeader: true,
    headerTitle: 'Mai Senza approfondire. La norma ISO 4628❓️'
  },
  {
    id: 3,
    title: 'In che modo un alto valore SRI aiuta a ridurre il surriscaldamento delle coperture?',
    date: '02/01/2024',
    summary: 'L\'SRI (Solar Reflectance Index) aiuta a ridurre il surriscaldamento delle coperture combinando due proprietà: alta riflettanza solare e alta emissività termica.',
    content: `
      <p>L'SRI (Solar Reflectance Index) aiuta a ridurre il surriscaldamento delle coperture combinando due proprietà: alta riflettanza solare e alta emissività termica.</p>
      
      <p>🔹️Un alto valore di SRI significa che il materiale riflette più radiazione solare e disperde meglio il calore, riducendo così la temperatura superficiale del tetto e limitando il trasferimento di calore agli ambienti interni.</p>
      
      <p>🔹️Questo porta a minori consumi energetici per il raffrescamento e contribuisce a mitigare l'effetto isola di calore urbano.</p>
    `,
    image: '/assets/news2.png'
  },
  {
    id: 4,
    title: 'Siamo su una copertura industriale attiva, in provincia di Grosseto.',
    date: '28/12/2023',
    summary: 'Impianti in esercizio, geometrie complesse, vecchia guaina da trattare. Non si può demolire, non si possono scollegare gli impianti. Serve un approccio diverso.',
    content: `
      <p>Siamo su una copertura industriale attiva, in provincia di Grosseto.<br />
      Impianti in esercizio, geometrie complesse, vecchia guaina da trattare.<br />
      Non si può demolire, non si possono scollegare gli impianti. Serve un approccio diverso.</p>
      
      <h2>🎯 Esigenza della DL:</h2>
      <blockquote>Impermeabilizzare senza interferire con impianti, garantendo Pedonabilità, Durabilità e protezione Antifiamma tutto con documentazione tecnica.</blockquote>
      
      <h2>🎯 Esigenza del rivenditore:</h2>
      <blockquote>Offrire una soluzione liquida già collaudata, senza sorprese.</blockquote>
      
      <h2>🟩 FibroGum è stato scelto perché:</h2>
      <p>✅ Si applica senza demolizione del sottostante</p>
      <p>✅ È conforme alle normative vigenti</p>
      <p>✅ Rende possibile lavorare in continuità senza il fermo degli impianti.</p>
      <p>✅ È fibrorinforzato e certificato per pedonabilità e B-Roof t2.</p>
      
      <p>🧰 Qui non si parla di "prodotto" ma di soluzione concreta per chi lavora con i cantieri complessi.</p>
      <p>🔹️ Documentabile per la DL<br />
      🔹️Proposta completa per la rivendita<br />
      🔹️Affidabile per l'applicatore</p>
    `,
    image: '/assets/news33.jpg',
    additionalImages: ['/assets/news35.jpg', '/assets/news34.jpg'] // Supporto per immagini multiple
  },
  {
    id: 5,
    title: 'Ecco cosa sapere (e valutare) se hai un terrazzo, un balcone o una copertura piastrellata da proteggere una volta per tutte.',
    date: '20/12/2023',
    summary: 'L\'esposizione alla pioggia senza protezione adeguata può causare infiltrazioni, distacco delle piastrelle, muffe e danni alla struttura.',
    content: `
      <p>L'esposizione alla pioggia senza protezione adeguata può causare:</p>
      
      <p>🔹️infiltrazioni nei muri e nei soffitti sottostanti</p>
      <p>🔹️distacco delle piastrelle o rigonfiamenti</p>
      <p>🔹️muffe e umidità permanente</p>
      <p>🔹️danni alla struttura dell'edificio</p>
      <p>🔹️costi elevati di ripristino nel tempo</p>
      
      <h2>🛠️ 3 MODI PER INTERVENIRE senza DEMOLIRE</h2>
      
      <h3>🔹 1. Sovrapposizione su superficie esistente</h3>
      <p>Hai già le piastrelle?<br />
      In molti casi è possibile intervenire senza demolire, applicando direttamente sopra la pavimentazione un sistema impermeabile continuo, elastico e resistente.</p>
      
      <h3>🔹 2. Intervento su massetto grezzo</h3>
      <p>Se devi ancora piastrellare, questa è l'occasione perfetta per proteggere tutto prima della posa.<br />
      Una membrana impermeabile stesa sul massetto permette di avere una superficie pronta ad accogliere il rivestimento.</p>
      
      <h3>🔹 3. Impermeabilizzazione trasparente</h3>
      <p>In certi casi si può proteggere il terrazzo senza cambiarne l'aspetto, usando materiali trasparenti che sigillano le fughe e impediscono infiltrazioni, mantenendo visibile la pavimentazione sottostante.</p>
      
      <h2>🔍 COSA DOVREBBE AVERE UN BUON SISTEMA IMPERMEABILE</h2>
      <p>✔️ Deve aderire bene alla superficie<br />
      ✔️ Resistere al sole, al gelo, alla pioggia<br />
      ✔️ Coprire tutto senza giunture<br />
      ✔️ Seguire i movimenti della struttura senza rompersi<br />
      ✔️ Durare negli anni<br />
      ✔️ Essere applicabile anche senza fiamme o attrezzature complesse</p>
      
      <h2>ℹ️ ATTENZIONE AI DETTAGLI</h2>
      <p>Occhio alle bocche di scolo: devono rimanere libere e ben integrate nel sistema impermeabilizzante.</p>
      <p>Occhio ai parapetti e ai battiscopa: sono spesso i punti più critici.</p>
      <p>Occhio ai prodotti miracolosi: meglio informarsi bene prima di acquistare, ogni superficie ha le sue esigenze.</p>
    `,
    image: '/assets/news4.png'
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