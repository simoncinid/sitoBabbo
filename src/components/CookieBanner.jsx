import React, { useState, useEffect } from 'react';
import { FaCookie, FaTimes, FaCog, FaCheck, FaInfo, FaShieldAlt } from 'react-icons/fa';
import { CookieManager, COOKIE_CATEGORIES, COOKIE_INFO } from '../utils/CookieManager';
import styles from './CookieBanner.module.css';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(CookieManager.getPreferences());
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mostra il banner solo se il consenso non è stato ancora dato
    if (!CookieManager.hasConsent()) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    CookieManager.acceptAll();
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleRejectAll = () => {
    CookieManager.rejectAll();
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    CookieManager.setPreferences({
      ...preferences,
      consentGiven: true
    });
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleCategoryToggle = (category) => {
    if (category === COOKIE_CATEGORIES.NECESSARY) return; // Non può essere disabilitato
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const openPreferences = () => {
    setShowPreferences(true);
  };

  const closePreferences = () => {
    setShowPreferences(false);
    setPreferences(CookieManager.getPreferences());
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className={styles.cookieBanner}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerIcon}>
            <FaCookie />
          </div>
          
          <div className={styles.bannerText}>
            <h3 className={styles.bannerTitle}>
              🍪 Utilizziamo i cookie per migliorare la tua esperienza
            </h3>
            <p className={styles.bannerDescription}>
              Utilizziamo cookie tecnici e, previo tuo consenso, cookie analitici e di profilazione per offrirti 
              un'esperienza personalizzata. Puoi accettare tutti i cookie, personalizzare le tue preferenze o 
              utilizzare solo quelli necessari per il funzionamento del sito.
            </p>
            <p className={styles.bannerLegal}>
              Continuando la navigazione accetti l'utilizzo dei cookie necessari. 
              Per maggiori informazioni consulta la nostra{' '}
              <button className={styles.linkButton} onClick={() => setActiveTab('policy')}>
                Privacy Policy
              </button>.
            </p>
          </div>

          <div className={styles.bannerActions}>
            <button 
              className={styles.rejectButton}
              onClick={handleRejectAll}
              title="Accetta solo cookie necessari"
            >
              Solo Necessari
            </button>
            <button 
              className={styles.settingsButton}
              onClick={openPreferences}
              title="Personalizza preferenze"
            >
              <FaCog /> Personalizza
            </button>
            <button 
              className={styles.acceptButton}
              onClick={handleAcceptAll}
              title="Accetta tutti i cookie"
            >
              <FaCheck /> Accetta Tutti
            </button>
          </div>
        </div>
      </div>

      {/* Modal Preferenze */}
      {showPreferences && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <FaShieldAlt /> Gestione Cookie e Privacy
              </h2>
              <button 
                className={styles.closeButton}
                onClick={closePreferences}
                aria-label="Chiudi"
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalTabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Panoramica
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Dettagli Cookie
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'policy' ? styles.active : ''}`}
                onClick={() => setActiveTab('policy')}
              >
                Privacy Policy
              </button>
            </div>

            <div className={styles.modalBody}>
              {activeTab === 'overview' && (
                <div className={styles.overviewTab}>
                  <div className={styles.introText}>
                    <p>
                      La tua privacy è importante per noi. Puoi scegliere quali categorie di cookie accettare. 
                      I cookie necessari sono sempre attivi poiché indispensabili per il funzionamento del sito.
                    </p>
                  </div>

                  <div className={styles.cookieCategories}>
                    {Object.entries(COOKIE_INFO).map(([category, info]) => (
                      <div key={category} className={styles.categoryCard}>
                        <div className={styles.categoryHeader}>
                          <div className={styles.categoryInfo}>
                            <h4 className={styles.categoryName}>{info.name}</h4>
                            <p className={styles.categoryDescription}>
                              {info.description}
                            </p>
                          </div>
                          
                          <div className={styles.toggleWrapper}>
                            <label className={styles.toggle}>
                              <input
                                type="checkbox"
                                checked={preferences[category]}
                                onChange={() => handleCategoryToggle(category)}
                                disabled={category === COOKIE_CATEGORIES.NECESSARY}
                              />
                              <span className={styles.slider}></span>
                            </label>
                            {category === COOKIE_CATEGORIES.NECESSARY && (
                              <span className={styles.alwaysActive}>Sempre attivo</span>
                            )}
                          </div>
                        </div>

                        <div className={styles.cookieList}>
                          {info.cookies.map((cookie, index) => (
                            <div key={index} className={styles.cookieItem}>
                              <strong>{cookie.name}</strong>: {cookie.purpose} 
                              <span className={styles.cookieMeta}>
                                (Durata: {cookie.duration} | Tipo: {cookie.type})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className={styles.detailsTab}>
                  <h3>Informazioni Dettagliate sui Cookie</h3>
                  
                  <div className={styles.legalInfo}>
                    <h4>Cosa sono i cookie?</h4>
                    <p>
                      I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. 
                      Ci aiutano a rendere il sito più utile permettendoci di capire come viene utilizzato.
                    </p>

                    <h4>Come gestiamo i tuoi dati</h4>
                    <p>
                      Trattiamo i tuoi dati in conformità al GDPR (Regolamento Generale sulla Protezione dei Dati) 
                      e alla normativa italiana sulla privacy. I tuoi dati non vengono mai venduti a terzi.
                    </p>

                    <h4>I tuoi diritti</h4>
                    <ul>
                      <li>Diritto di accesso ai dati personali</li>
                      <li>Diritto di rettifica e cancellazione</li>
                      <li>Diritto di limitazione del trattamento</li>
                      <li>Diritto alla portabilità dei dati</li>
                      <li>Diritto di opposizione</li>
                      <li>Diritto di revocare il consenso</li>
                    </ul>

                    <h4>Contatti</h4>
                    <p>
                      Per esercitare i tuoi diritti o per qualsiasi domanda sulla privacy, contattaci all'indirizzo: 
                      <strong> privacy@maisenza.it</strong>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'policy' && (
                <div className={styles.policyTab}>
                  <h3>Privacy Policy</h3>
                  
                  <div className={styles.policyContent}>
                    <h4>1. Titolare del trattamento</h4>
                    <p>
                      Il titolare del trattamento dei dati è <strong>Mai Senza Impermeabilizzazioni</strong>, 
                      nella persona di Mauro Simoncini.
                    </p>

                    <h4>2. Finalità del trattamento</h4>
                    <p>I tuoi dati vengono trattati per le seguenti finalità:</p>
                    <ul>
                      <li>Erogazione dei servizi richiesti</li>
                      <li>Analisi statistiche anonime (previo consenso)</li>
                      <li>Comunicazioni di marketing (previo consenso)</li>
                      <li>Adempimenti di legge</li>
                    </ul>

                    <h4>3. Base giuridica</h4>
                    <p>
                      Il trattamento si basa sul tuo consenso esplicito per le attività di marketing e analytics, 
                      e su legittimo interesse per le funzionalità essenziali del sito.
                    </p>

                    <h4>4. Conservazione dei dati</h4>
                    <p>
                      I dati vengono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti 
                      e comunque non oltre 2 anni dall'ultimo contatto.
                    </p>

                    <h4>5. Condivisione dei dati</h4>
                    <p>
                      I tuoi dati possono essere condivisi solo con fornitori di servizi tecnici (hosting, analytics) 
                      che agiscono come responsabili del trattamento sotto la nostra diretta supervisione.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.footerInfo}>
                <FaInfo />
                <span>
                  Le tue preferenze verranno salvate per 1 anno. Puoi modificarle in qualsiasi momento.
                </span>
              </div>
              
              <div className={styles.footerActions}>
                <button 
                  className={styles.rejectButton}
                  onClick={handleRejectAll}
                >
                  Rifiuta Tutti
                </button>
                <button 
                  className={styles.saveButton}
                  onClick={handleSavePreferences}
                >
                  Salva Preferenze
                </button>
                <button 
                  className={styles.acceptButton}
                  onClick={handleAcceptAll}
                >
                  Accetta Tutti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner; 