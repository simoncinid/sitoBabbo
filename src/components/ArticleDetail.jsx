import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { FaCalendar, FaUser, FaClock, FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './ArticleDetail.module.css';

const ArticleDetail = () => {
  const { slug } = useParams();
  
  // Stesso array di articoli (in un'app reale verrebbe da un API/database)
  const articles = [
    {
      id: 1,
      title: 'Adesione a fiamma❓️5 criticità spesso sottovalutate.',
      date: '19/12/2024',
      author: 'Mauro Simoncini',
      excerpt: 'L\'uso di fiamma libera comporta rischi e criticità spesso sottovalutate che possono compromettere l\'efficacia dell\'impermeabilizzazione.',
      content: `🔥 Rischio incendio
L'uso di fiamma libera comporta un'elevata esposizione a innesco. Senza adeguate barriere protettive, il pericolo è concreto.

🛠️ Applicazione complessa
La posa richiede operatori qualificati. Un'applicazione non conforme può compromettere la continuità del manto e generare punti deboli in fase di esercizio.

📉 Adesione parziale
Anche in condizioni ideali, l'adesione effettiva della guaina alla superficie raramente supera il 70%. Questo dato impatta sulla durabilità del sistema.

🚫 Incompatibilità con alcuni materiali
La posa a fiamma non è indicata su substrati sensibili al calore o su materiali termicamente instabili, se non previa installazione di strati separatori certificati.

🔧 Riparabilità limitata
Le operazioni di taglio e risagomatura (cosiddetti "taglia e cuci") indeboliscono lo strato impermeabile, aumentando il rischio di infiltrazioni nel tempo.

**📌 Conclusione tecnica**
La posa a fiamma resta una tecnologia valida, ma va valutata caso per caso, alla luce delle caratteristiche del supporto, delle condizioni di sicurezza e dell'evoluzione dei sistemi impermeabilizzanti alternativi (liquidi, autoadesivi, reattivi).

**🧭 Mai Senza una valutazione tecnica approfondita.**
👉Devi affrontare una impermeabilizzazione della tua copertura?Scrivimi.`,
      image: '/assets/news1.png',
      category: 'Tecnica',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Mai Senza approfondire. La norma ISO 4628❓️',
      date: '19/12/2024',
      author: 'Mauro Simoncini',
      excerpt: 'La norma ISO 4628 è una serie di standard internazionali che definiscono un sistema per valutare i difetti e i cambiamenti nell\'aspetto dei rivestimenti liquidi.',
      content: `La norma ISO 4628❓️ è una serie di standard internazionali che definiscono un sistema per valutare i difetti e i cambiamenti nell'aspetto dei rivestimenti liquidi causati da invecchiamento, agenti atmosferici o altri fattori.

Un prodotto conforme alla norma ISO 4628 garantisce principalmente le seguenti caratteristiche relative alla qualità e alla durabilità del rivestimento:

🔹️Controllo e limitazione di difetti quali presenza di bolle, crepe, sfogliamento e sfarinamento.

🔹️Mantenimento dell'aspetto estetico del film.

🔹️Resistenza ai fenomeni di degrado superficiale come ingiallimento, sfarinamento e scagliatura, anche dopo esposizioni a condizioni ambientali aggressive.

🔹️Valutazione standardizzata e oggettiva dello stato del film applicato per garantire la durabilità e la protezione del substrato sottostante.

In sintesi, un prodotto conforme ISO 4628 assicura che il rivestimento mantenga integrità, estetica e funzionalità nel tempo, limitando difetti e deterioramenti secondo criteri riconosciuti a livello internazionale.

**‼️Ecco perché è importante acquistare prodotti con ISO4628 dichiarata.**`,
      image: null,
      isTextHeader: true,
      headerTitle: 'Mai Senza approfondire. La norma ISO 4628❓️',
      category: 'Normative',
      readTime: '4 min'
    },
    {
      id: 3,
      title: 'In che modo un alto valore SRI aiuta a ridurre il surriscaldamento delle coperture?',
      date: '19/12/2024',
      author: 'Mauro Simoncini',
      excerpt: 'L\'SRI (Solar Reflectance Index) aiuta a ridurre il surriscaldamento delle coperture combinando due proprietà: alta riflettanza solare e alta emissività termica.',
      content: `L'SRI (Solar Reflectance Index) aiuta a ridurre il surriscaldamento delle coperture combinando due proprietà: alta riflettanza solare e alta emissività termica.

🔹️Un alto valore di SRI significa che il materiale riflette più radiazione solare e disperde meglio il calore, riducendo così la temperatura superficiale del tetto e limitando il trasferimento di calore agli ambienti interni.

🔹️Questo porta a minori consumi energetici per il raffrescamento e contribuisce a mitigare l'effetto isola di calore urbano.`,
      image: '/assets/news2.png',
      category: 'Efficienza Energetica',
      readTime: '3 min'
    },
    {
      id: 4,
      title: 'Siamo su una copertura industriale attiva, in provincia di Grosseto.',
      date: '19/12/2024',
      author: 'Mauro Simoncini',
      excerpt: 'Impianti in esercizio, geometrie complesse, vecchia guaina da trattare. Non si può demolire, non si possono scollegare gli impianti. Serve un approccio diverso.',
      content: `Siamo su una copertura industriale attiva, in provincia di Grosseto.
Impianti in esercizio, geometrie complesse, vecchia guaina da trattare.
Non si può demolire, non si possono scollegare gli impianti. Serve un approccio diverso.

**🎯 Esigenza della DL:**
Impermeabilizzazione conforme alle normative vigenti, senza fermo degli impianti e senza demolizione del sottostante.

**✅ Soluzione scelta: FibroGum**
Sistema impermeabilizzante liquido che si applica direttamente sulla guaina esistente, creando una membrana continua e resistente.

**🔧 Vantaggi:**
- Applicazione senza demolizione
- Nessun fermo degli impianti
- Conformità normativa documentabile
- Resistenza agli agenti atmosferici
- Facilità di manutenzione

**📋 Risultato:**
Copertura perfettamente impermeabilizzata, impianti operativi, DL soddisfatta.

**💡 Mai Senza la soluzione giusta per ogni esigenza.**`,
      image: '/assets/news33.jpg',
      additionalImages: ['/assets/news35.jpg', '/assets/news34.jpg'],
      category: 'Case Study',
      readTime: '7 min'
    },
    {
      id: 5,
      title: 'Ecco cosa sapere (e valutare) se hai un terrazzo, un balcone o una copertura piastrellata da proteggere una volta per tutte.',
      date: '19/12/2024',
      author: 'Mauro Simoncini',
      excerpt: 'L\'esposizione alla pioggia senza protezione adeguata può causare infiltrazioni, distacco delle piastrelle, muffe e danni alla struttura dell\'edificio.',
      content: `Se hai un terrazzo, un balcone o una copertura piastrellata che presenta problemi di infiltrazioni, è importante sapere che esistono soluzioni efficaci senza demolire tutto.

**🔹 1. Sovrapposizione su superficie esistente**
Si può applicare un nuovo sistema impermeabile direttamente sopra le piastrelle esistenti, dopo aver verificato che siano ben ancorate. Questa soluzione è veloce ed economica.

**🔹 2. Intervento su massetto grezzo**
Se devi ancora piastrellare, questa è l'occasione perfetta per proteggere tutto prima della posa.
Una membrana impermeabile stesa sul massetto permette di avere una superficie pronta ad accogliere il rivestimento.

**🔹 3. Impermeabilizzazione trasparente**
In certi casi si può proteggere il terrazzo senza cambiarne l'aspetto, usando materiali trasparenti che sigillano le fughe e impediscono infiltrazioni, mantenendo visibile la pavimentazione sottostante.

**🔍 COSA DOVREBBE AVERE UN BUON SISTEMA IMPERMEABILE**

✔️ Deve aderire bene alla superficie
✔️ Resistere al sole, al gelo, alla pioggia
✔️ Coprire tutto senza giunture
✔️ Seguire i movimenti della struttura senza rompersi
✔️ Durare negli anni
✔️ Essere applicabile anche senza fiamme o attrezzature complesse

**ℹ️ ATTENZIONE AI DETTAGLI**

Occhio alle bocche di scolo: devono rimanere libere e ben integrate nel sistema impermeabilizzante.

Occhio ai parapetti e ai battiscopa: sono spesso i punti più critici.

Occhio ai prodotti miracolosi: meglio informarsi bene prima di acquistare, ogni superficie ha le sue esigenze.`,
      image: '/assets/news4.jpg',
      category: 'Guide',
      readTime: '8 min'
    }
  ];

  // Create slug from title for matching
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

  // Find article by slug
  const article = articles.find(a => createSlug(a.title) === slug);

  if (!article) {
    return (
      <div className={styles.articlePage}>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Articolo non trovato</h1>
          <p>L'articolo che stai cercando non esiste o è stato rimosso.</p>
          <RouterLink to="/novita" className={styles.backButton}>
            Torna al Blog
          </RouterLink>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.articlePage}>
      <Navbar />
      
      <main className={styles.articleMain}>
        <div className={styles.container}>
          {/* Article Header */}
          <header className={styles.articleHeader}>
            <div className={styles.headerTop}>
              <RouterLink to="/novita" className={styles.backButton}>
                <FaArrowLeft />
              </RouterLink>
              <div className={styles.categoryBadge}>{article.category}</div>
            </div>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
            
            <div className={styles.articleMeta}>
              <span className={styles.metaItem}>
                <FaCalendar className={styles.metaIcon} />
                {article.date}
              </span>
              <span className={styles.metaSeparator}>•</span>
              <span className={styles.metaItem}>
                <FaUser className={styles.metaIcon} />
                {article.author}
              </span>
              <span className={styles.metaSeparator}>•</span>
              <span className={styles.metaItem}>
                <FaClock className={styles.metaIcon} />
                {article.readTime}
              </span>
            </div>
          </header>

          {/* Article Image or Text Header */}
          <div className={styles.articleImageContainer}>
            {article.isTextHeader ? (
              <div className={styles.textHeader}>
                <h1 className={styles.textHeaderTitle}>{article.headerTitle}</h1>
              </div>
            ) : article.additionalImages ? (
              <div className={styles.multipleImages}>
                <img src={article.image} alt={article.title} className={styles.articleImage} />
                <div className={styles.additionalImagesGrid}>
                  {article.additionalImages.map((imgSrc, index) => (
                    <img 
                      key={index} 
                      src={imgSrc} 
                      alt={`${article.title} - Immagine ${index + 2}`} 
                      className={styles.additionalImage} 
                    />
                  ))}
                </div>
              </div>
            ) : (
              <img src={article.image} alt={article.title} className={styles.articleImage} />
            )}
          </div>

          {/* Article Content */}
          <article className={styles.articleContent}>
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h3 key={index} className={styles.subheading}>{paragraph.slice(2, -2)}</h3>;
              } else if (paragraph.startsWith('•')) {
                const items = paragraph.split('\n').filter(item => item.startsWith('•'));
                return (
                  <ul key={index} className={styles.bulletList}>
                    {items.map((item, i) => {
                      const formattedItem = item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return <li key={i} dangerouslySetInnerHTML={{__html: formattedItem}}></li>;
                    })}
                  </ul>
                );
              } else if (paragraph.includes('*') && paragraph.includes(':')) {
                return <h4 key={index} className={styles.sectionTitle}>{paragraph.replace(/\*/g, '')}</h4>;
              } else {
                const formattedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return <p key={index} className={styles.paragraph} dangerouslySetInnerHTML={{__html: formattedParagraph}}></p>;
              }
            })}
          </article>

          {/* Back to Blog */}
          <div className={styles.backToBlog}>
            <RouterLink to="/novita" className={styles.backLink}>
              <FaArrowLeft />
              Torna al Blog
            </RouterLink>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Ti è piaciuto questo articolo?</h3>
            <p className={styles.ctaText}>
              Contattami per una consulenza personalizzata sul tuo progetto di impermeabilizzazione. 
              Con oltre 20 anni di esperienza, posso aiutarti a trovare la soluzione perfetta.
            </p>
            <a
              href={`https://wa.me/393938657606?text=Ciao! Ho letto il tuo articolo su: ${article.title} e vorrei una consulenza`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              <FaWhatsapp />
              Consulenza WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleDetail; 