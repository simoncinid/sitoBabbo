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
      title: 'Nuove Tecnologie per l\'Impermeabilizzazione 2024',
      date: '15/01/2024',
      author: 'Mauro Simoncini',
      excerpt: 'Scopri le ultime innovazioni nel campo dell\'impermeabilizzazione: dai nano-rivestimenti alle membrane smart che si auto-riparano. Una rivoluzione tecnologica che cambierà il modo di proteggere i nostri edifici.',
      content: `Il 2024 porta con sé rivoluzionarie novità nel settore dell'impermeabilizzazione. Le nuove tecnologie nano-strutturate permettono di creare barriere invisibili ma incredibilmente efficaci.

I nano-rivestimenti, applicabili con semplici spruzzatori, penetrano in profondità nei materiali creando una protezione molecolare. Questi prodotti rappresentano una vera rivoluzione perché:

• **Penetrazione profonda**: Raggiungono fino a 5mm di profondità nel substrato
• **Durata eccezionale**: Resistono per oltre 15 anni senza manutenzione
• **Applicazione semplice**: Non richiedono attrezzature speciali
• **Eco-compatibilità**: Formulazioni a base acqua senza solventi

Le membrane smart dotate di micro-capsule contenenti agenti sigillanti si attivano automaticamente in presenza di micro-fessure, garantendo un'auto-riparazione immediata. Questa tecnologia, sviluppata inizialmente per l'industria aerospaziale, è ora disponibile anche per l'edilizia civile.

Un altro sviluppo interessante sono i sistemi di monitoraggio integrati che utilizzano sensori IoT per rilevare in tempo reale eventuali infiltrazioni, permettendo interventi preventivi prima che si manifestino danni visibili.

L'investimento in queste tecnologie si ripaga nel tempo grazie alla riduzione drastica dei costi di manutenzione e alla maggiore durata delle impermeabilizzazioni.`,
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
      content: `La sostenibilità ambientale è diventata una priorità anche nel settore dell'impermeabilizzazione. I nuovi materiali eco-friendly derivati da fonti rinnovabili offrono prestazioni paragonabili ai prodotti tradizionali ma con un impatto ambientale drasticamente ridotto.

**Membrane a base di oli vegetali**
Le nuove membrane ottenute da oli vegetali modificati chimicamente offrono:
• Biodegradabilità completa in 5-7 anni
• Prestazioni meccaniche superiori
• Resistenza ai raggi UV migliorata
• Costi competitivi rispetto ai prodotti tradizionali

**Sigillanti biodegradabili**
I sigillanti di nuova generazione utilizzano polimeri naturali che:
• Non rilasciano sostanze tossiche
• Mantengono elasticità per oltre 10 anni
• Sono completamente riciclabili
• Riducono l'impronta di carbonio del 60%

**Vantaggi per la salute**
Questi prodotti non solo rispettano l'ambiente ma garantiscono anche una maggiore salubrità degli ambienti interni, eliminando il rilascio di VOC (composti organici volatili) e altre sostanze potenzialmente nocive.

La transizione verso materiali sostenibili non è solo una scelta etica, ma rappresenta anche un vantaggio competitivo per le aziende che vogliono anticipare le future normative ambientali sempre più stringenti.`,
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
      content: `Presentiamo tre casi studio che dimostrano come l'esperienza e l'innovazione possano risolvere anche i problemi più complessi.

**CASO 1: Palazzo Storico del Centro**
Un edificio del 1800 con infiltrazioni croniche che compromettevano affreschi di valore storico.

*Problematiche:*
• Infiltrazioni dalle fondazioni per risalita capillare  
• Vincoli della Soprintendenza per materiali e tecniche
• Necessità di non alterare l'aspetto esterno

*Soluzione adottata:*
Abbiamo utilizzato una combinazione di:
- Iniezioni di resine cristallizzanti nelle murature
- Sistema di deumidificazione elettrofisica
- Intonaci macro-porosi traspiranti

*Risultati:* Eliminazione completa dell'umidità in 6 mesi, con conservazione integrale degli elementi decorativi.

**CASO 2: Edificio Moderno con Problemi Strutturali**
Un condominio di recente costruzione con infiltrazioni dal tetto giardino pensile.

*Problematiche:*
• Membrane danneggiate da radici
• Drenaggio insufficiente
• Difficoltà di accesso per i lavori

*Soluzione:* 
Sistema innovativo con:
- Membrane anti-radice di nuova generazione
- Drenaggio integrato con sensori di umidità
- Applicazione con tecniche di rope access

*Risultati:* Risoluzione definitiva con garanzia 15 anni e sistema di monitoraggio remoto.

**CASO 3: Piscina su Terrazza**
Impermeabilizzazione di una piscina infinity con vincoli architettonici particolari.

*Sfide:*
• Pressione idrostatica elevata
• Movimenti strutturali dell'edificio
• Estetica architettonica da preservare

*Soluzione:*
Membrana liquida poliuretanica applicata in più strati con rinforzi strutturali e giunti di dilatazione nascosti.

*Risultato:* Piscina perfettamente funzionante da 3 anni senza alcun problema.

Ogni progetto ha richiesto un approccio personalizzato e l'utilizzo di tecnologie all'avanguardia, dimostrando l'importanza dell'esperienza nella scelta delle soluzioni più appropriate.`,
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
      content: `L'impermeabilizzazione di un terrazzo richiede particolare attenzione a diversi fattori. La preparazione del sottofondo è fondamentale: deve essere pulito, asciutto e livellato.

**Preparazione del Sottofondo**
• Rimozione di vecchi rivestimenti e residui
• Riparazione di crepe e imperfezioni
• Pulizia accurata con idropulitrice
• Verifica delle pendenze per il deflusso dell'acqua

**Scelta del Sistema Impermeabilizzante**
La scelta dipende da:
- Tipo di utilizzo del terrazzo (calpestabile/non calpestabile)
- Condizioni climatiche della zona
- Budget disponibile
- Durata desiderata

**Sistemi Consigliati**
1. **Membrane bituminose**: Economiche e affidabili
2. **Membrane sintetiche**: Maggiore durata e resistenza
3. **Impermeabilizzanti liquidi**: Versatili e facili da applicare

**Fasi di Applicazione**
1. Primer di adesione
2. Applicazione del sistema impermeabilizzante
3. Protezione meccanica (se necessaria)
4. Test di tenuta finale

La corretta esecuzione garantisce una durata di 15-20 anni senza problemi.`,
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
      content: `Dopo 20 anni di esperienza, ho identificato gli errori più comuni che possono compromettere un lavoro di impermeabilizzazione.

**1. Sottovalutare la Preparazione del Supporto**
Il 70% dei fallimenti deriva da una preparazione inadeguata. Il supporto deve essere:
• Pulito e privo di parti friabili
• Perfettamente asciutto
• Livellato e privo di irregolarità

**2. Scegliere Materiali Inadatti**
Non tutti i materiali sono adatti a ogni situazione:
• Verificare compatibilità con il substrato
• Considerare l'esposizione agli agenti atmosferici
• Valutare il traffico pedonale previsto

**3. Ignorare le Condizioni Climatiche**
L'applicazione deve avvenire in condizioni ottimali:
• Temperatura tra 5°C e 35°C
• Umidità relativa inferiore al 80%
• Assenza di pioggia per 24-48 ore

**4. Trascurare i Dettagli**
I punti critici richiedono attenzione particolare:
• Raccordi tra superfici diverse
• Attraversamenti di tubazioni
• Giunti di dilatazione

**5. Spessori Insufficienti**
Risparmiare sul materiale è controproducente:
• Rispettare sempre gli spessori minimi
• Applicare in più mani se necessario
• Verificare la copertura uniforme

**Come Evitare gli Errori**
• Affidarsi a professionisti qualificati
• Utilizzare materiali certificati
• Seguire scrupolosamente le istruzioni del produttore
• Effettuare controlli durante l'applicazione

La prevenzione è sempre più economica della riparazione!`,
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
      content: `Una corretta manutenzione può prolungare la vita di un'impermeabilizzazione fino al 50%. È importante effettuare controlli periodici, specialmente dopo eventi atmosferici intensi.

**Controlli da Effettuare**
• Ispezione visiva semestrale
• Verifica dello stato delle membrane
• Controllo dei sistemi di drenaggio
• Test di tenuta annuale

**Segnali di Allarme**
I segnali che richiedono intervento immediato:
• Crepe o fessurazioni visibili
• Bolle o rigonfiamenti
• Distacchi della membrana
• Ristagni d'acqua persistenti

**Manutenzione Preventiva**
• Pulizia regolare delle superfici
• Rimozione di detriti e fogliame
• Controllo e pulizia dei canali di scolo
• Verifica della tenuta dei giunti

**Quando Intervenire**
• Ai primi segni di deterioramento
• Dopo grandinate o eventi estremi
• Ogni 5-7 anni per controlli approfonditi
• Prima della scadenza della garanzia

**Costi della Manutenzione**
La manutenzione preventiva costa circa il 10% del rifacimento completo ma può evitare danni per migliaia di euro.

Un piano di manutenzione programmata è l'investimento più intelligente per proteggere il tuo immobile.`,
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
      content: `L'impermeabilizzazione non serve solo a proteggere dall'acqua, ma può contribuire significativamente al risparmio energetico.

**Membrane Riflettenti**
Le membrane cool roof possono:
• Ridurre la temperatura superficiale fino a 30°C
• Diminuire i costi di climatizzazione del 20-40%
• Prolungare la vita dell'impermeabilizzazione
• Migliorare il comfort interno

**Isolamento Termico Integrato**
Sistemi che combinano:
• Impermeabilizzazione
• Isolamento termico
• Protezione meccanica
• Finitura riflettente

**Vantaggi Energetici**
• Riduzione delle dispersioni termiche
• Eliminazione dei ponti termici
• Miglioramento dell'inerzia termica
• Ottimizzazione del comfort estivo

**Incentivi Fiscali**
Questi interventi possono beneficiare di:
• Superbonus 110% (quando applicabile)
• Ecobonus 65%
• Bonus ristrutturazione 50%
• Conto termico

**ROI dell'Investimento**
Il ritorno economico si ottiene attraverso:
• Riduzione delle bollette energetiche
• Aumento del valore dell'immobile
• Minori costi di manutenzione
• Incentivi fiscali disponibili

L'impermeabilizzazione energeticamente efficiente rappresenta una scelta strategica per il futuro del tuo edificio.`,
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
      content: `Le infiltrazioni più insidiose sono quelle che si manifestano lontano dal punto di origine. Utilizziamo tecnologie avanzate per individuare con precisione la fonte del problema.

**Tecnologie di Diagnosi**
• **Termografia a infrarossi**: Rileva differenze di temperatura causate dall'umidità
• **Gas traccianti**: Permettono di seguire il percorso dell'infiltrazione
• **Endoscopia**: Ispezione interna delle strutture
• **Georadar**: Mappatura delle strutture sotterranee

**Casi Tipici**
1. **Infiltrazioni da coperture**: L'acqua percorre travi e pilastri prima di manifestarsi
2. **Risalita capillare**: Si manifesta a distanza dal punto di ingresso
3. **Infiltrazioni laterali**: Penetrano attraverso giunti strutturali

**Metodologia di Intervento**
1. **Analisi preliminare**: Studio dei sintomi e delle condizioni
2. **Diagnosi strumentale**: Utilizzo delle tecnologie appropriate
3. **Localizzazione precisa**: Individuazione del punto esatto
4. **Intervento mirato**: Riparazione definitiva alla fonte

**Vantaggi dell'Approccio Scientifico**
• Riduzione dei costi di intervento
• Eliminazione definitiva del problema
• Nessun danno collaterale
• Garanzia sui risultati

**Prevenzione**
• Controlli periodici con strumentazione
• Monitoraggio continuo in edifici critici
• Manutenzione programmata
• Documentazione fotografica dell'evoluzione

Una diagnosi precisa è la chiave per una riparazione efficace e duratura.`,
      image: '/assets/hero.png',
      category: 'Case Study',
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

          {/* Article Image */}
          <div className={styles.articleImageContainer}>
            <img src={article.image} alt={article.title} className={styles.articleImage} />
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