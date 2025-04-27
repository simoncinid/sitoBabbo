import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Tips.module.css';

const Tips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTips, setFilteredTips] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const tipsPerPage = 3;
  
  const tips = [
    {
      id: 1,
      title: 'Mi si infiltra l\'acqua dal muro esterno, che faccio?',
      date: '15/07/2023',
      content: 'Le infiltrazioni dai muri esterni sono spesso causate da microfessure nel rivestimento. Il primo passo è identificare l\'origine dell\'infiltrazione. In molti casi, potrebbe essere sufficiente applicare un sigillante elastico nelle fessure visibili. Se il problema persiste, potrebbe essere necessario un trattamento impermeabilizzante più esteso.'
    },
    {
      id: 2,
      title: 'Come proteggere l\'impermeabilizzazione dai raggi UV',
      date: '08/07/2023',
      content: 'L\'esposizione prolungata ai raggi UV può degradare anche i migliori materiali impermeabilizzanti. Per proteggere il tuo lavoro e garantire una durata maggiore, consiglio di applicare una vernice protettiva specifica per superfici impermeabilizzate. Esistono prodotti con pigmenti riflettenti che respingono i raggi UV e mantengono la superficie più fresca.'
    },
    {
      id: 3,
      title: 'Impermeabilizzazione in inverno: è possibile?',
      date: '01/07/2023',
      content: 'Molti pensano che l\'impermeabilizzazione sia un lavoro da fare solo in estate, ma con i giusti accorgimenti e i prodotti adatti, è possibile lavorare anche con temperature più basse. Scegli materiali che possono essere applicati fino a +5°C e assicurati che la superficie sia completamente asciutta prima dell\'applicazione.'
    },
    {
      id: 4,
      title: 'Qual è la durata di un\'impermeabilizzazione ben fatta?',
      date: '24/06/2023',
      content: 'Una buona impermeabilizzazione, eseguita con materiali di qualità e tecniche appropriate, può durare dai 10 ai 20 anni. Tuttavia, questo dipende da vari fattori come l\'esposizione agli agenti atmosferici, il tipo di superficie, e la manutenzione periodica.'
    },
    {
      id: 5,
      title: 'Come scegliere tra membrane bituminose e sintetiche?',
      date: '17/06/2023',
      content: 'La scelta tra membrane bituminose e sintetiche dipende dalle specifiche del progetto. Le membrane bituminose sono più economiche e facili da riparare, mentre quelle sintetiche hanno una maggiore resistenza ai raggi UV e all\'invecchiamento.'
    },
    {
      id: 6,
      title: 'Impermeabilizzazione del terrazzo: errori da evitare',
      date: '10/06/2023',
      content: 'Nell\'impermeabilizzazione di un terrazzo, gli errori più comuni includono una preparazione inadeguata della superficie, l\'uso di materiali non compatibili con il supporto esistente e una scarsa attenzione ai dettagli come raccordi e giunti. Assicurati sempre di pulire e livellare bene la superficie, scegliere materiali adatti e prestare particolare attenzione ai punti critici.'
    },
    {
      id: 7,
      title: 'Manutenzione periodica delle impermeabilizzazioni: cosa fare',
      date: '03/06/2023',
      content: 'Per mantenere efficiente la tua impermeabilizzazione, è fondamentale una manutenzione periodica. Almeno una volta all\'anno, ispeziona visivamente la superficie cercando segni di deterioramento come crepe o bolle. Rimuovi detriti, foglie e sporcizia che potrebbero trattenere l\'umidità e danneggiare il rivestimento. In caso di piccoli danni, intervenire tempestivamente può prevenire problemi maggiori.'
    },
    {
      id: 8,
      title: 'Impermeabilizzare il bagno: guida completa',
      date: '27/05/2023',
      content: 'L\'impermeabilizzazione del bagno è fondamentale per prevenire danni all\'intera struttura. Prima di posare le piastrelle, applica una membrana impermeabilizzante liquida su pavimenti e pareti, prestando particolare attenzione alle zone attorno alla doccia, vasca e lavandini. Non dimenticare di sigillare bene gli angoli e i raccordi con la rete di rinforzo per garantire una protezione completa.'
    },
    {
      id: 9,
      title: 'Problemi di umidità ascendente: soluzioni efficaci',
      date: '20/05/2023',
      content: 'L\'umidità di risalita è un problema comune nelle strutture più vecchie. Le soluzioni più efficaci includono barriere chimiche iniettate nella muratura, sistemi elettro-osmotici o l\'installazione di membrane impermeabili durante lavori di ristrutturazione. È importante anche garantire una buona ventilazione degli ambienti e, quando possibile, creare un\'intercapedine ventilata tra il terreno e la pavimentazione.'
    },
    {
      id: 10,
      title: 'Impermeabilizzanti ecologici: le novità sul mercato',
      date: '13/05/2023',
      content: 'Il mercato degli impermeabilizzanti sta evolvendo verso soluzioni più sostenibili. Oggi sono disponibili prodotti a base d\'acqua con basse emissioni di VOC, membrane derivate da materiali riciclati e persino impermeabilizzanti naturali a base di oli vegetali o caseina. Questi prodotti non solo riducono l\'impatto ambientale ma offrono anche benefici in termini di salubrità degli ambienti interni.'
    }
  ];
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTips(tips);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const results = tips.filter(tip => 
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tip.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTips(results);
    }
    setCurrentPage(1);
  }, [searchTerm]);
  
  useEffect(() => {
    setFilteredTips(tips);
  }, []);

  // Get current tips
  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = filteredTips.slice(indexOfFirstTip, indexOfLastTip);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Go to next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredTips.length / tipsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };
  
  return (
    <section className={styles.tipsSection} id="consigli">
      <div className={styles.container}>
        <h2 className="section-title">Consigli Settimanali</h2>
        
        
        
        {/* BARRA DI RICERCA SEMPLIFICATA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          
          margin: '0 auto 30px',
          background: 'rgb(213, 253, 220)',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            background: 'white',
            border: '2px solid rgb(0, 99, 41)',
            borderRadius: '4px',
            padding: '8px 12px',
            marginRight: '10px'
          }}>
            <FaSearch style={{color: 'rgb(16, 113, 56)', marginRight: '10px'}} />
            <input
              type="text"
              placeholder="Cerca nei consigli..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                padding: '5px',
                fontSize: '16px'
              }}
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={clearSearch}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgb(16, 113, 56)',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            )}
          </div>
          <button 
            onClick={() => {/* ricerca già gestita dall'onChange */}}
            style={{
              padding: '10px 20px',
              background: 'rgb(0, 99, 41)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Cerca
          </button>
        </div>
        
        {isSearching && (
          <div style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto 20px',
            textAlign: 'center',
            padding: '10px',
            background: '#e8f0fe',
            borderRadius: '8px'
          }}>
            <p>Risultati per: <strong>"{searchTerm}"</strong> ({filteredTips.length} trovati)</p>
          </div>
        )}
        
        <div className={styles.tipsContent}>
          {currentTips.length > 0 ? (
            currentTips.map(tip => (
              <article className={styles.tipPost} key={tip.id}>
                <h3 className={styles.tipTitle}>{tip.title}</h3>
                <p className={styles.tipDate}>Pubblicato il {tip.date}</p>
                <p className={styles.tipContent}>{tip.content.substring(0, 150)}...</p>
                <Link to={`/articolo/${tip.id}`} className={styles.readMore}>Continua a leggere</Link>
              </article>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>Nessun consiglio trovato per "{searchTerm}"</p>
              <button onClick={clearSearch} className={styles.resetSearch}>Mostra tutti i consigli</button>
            </div>
          )}
        </div>
        
        {/* Paginazione */}
        {filteredTips.length > tipsPerPage && (
          <div className={styles.pagination}>
            <button 
              onClick={goToPrevPage} 
              disabled={currentPage === 1}
              className={`${styles.pageNavBtn} ${currentPage === 1 ? styles.disabled : ''}`}
            >
              <FaArrowLeft />
            </button>
            
            {Array.from({ length: Math.ceil(filteredTips.length / tipsPerPage) }).map((_, index) => {
              // Show only 5 page numbers at a time
              if (
                index === 0 || // Always show first page
                index === Math.ceil(filteredTips.length / tipsPerPage) - 1 || // Always show last page
                (index >= currentPage - 2 && index <= currentPage + 2) // Show current page and 2 pages on either side
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.activeBtn : ''}`}
                  >
                    {index + 1}
                  </button>
                );
              } else if (
                (index === currentPage - 3 && currentPage > 3) ||
                (index === currentPage + 3 && currentPage < Math.ceil(filteredTips.length / tipsPerPage) - 3)
              ) {
                // Show ellipsis
                return <span key={index} className={styles.ellipsis}>...</span>;
              }
              return null;
            })}
            
            <button 
              onClick={goToNextPage} 
              disabled={currentPage === Math.ceil(filteredTips.length / tipsPerPage)}
              className={`${styles.pageNavBtn} ${
                currentPage === Math.ceil(filteredTips.length / tipsPerPage) ? styles.disabled : ''
              }`}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
        
        <div className={styles.tipCounter}>
          <p>Mostrando {indexOfFirstTip + 1}-{Math.min(indexOfLastTip, filteredTips.length)} di {filteredTips.length} consigli</p>
        </div>
      </div>
    </section>
  );
};

export default Tips; 