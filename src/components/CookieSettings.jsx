import React, { useState } from 'react';
import { COOKIE_CATEGORIES, COOKIE_INFO, CookieManager } from '../utils/CookieManager';
import styles from './CookieBanner.module.css';

const CookieSettings = ({ compact = false }) => {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState(CookieManager.getPreferences());

  const save = () => {
    CookieManager.setPreferences({ ...preferences, consentGiven: true });
    setOpen(false);
  };

  return (
    <>
      <button
        className={compact ? styles.settingsButton : styles.cookieSettingsLink}
        type="button"
        onClick={() => setOpen(true)}
      >
        Preferenze cookie
      </button>

      {open && (
        <div className={styles.modalOverlay} role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className={styles.modalContent}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className={styles.modalHeader}>
              <div>
                <span>Privacy</span>
                <h2 id="cookie-title">Scegli i cookie che vuoi.</h2>
              </div>
              <button className={styles.closeButton} type="button" onClick={() => setOpen(false)} aria-label="Chiudi">
                ×
              </button>
            </header>

            <div className={styles.modalBody}>
              <p className={styles.introText}>
                I cookie necessari sono sempre attivi. Gli altri ci aiutano a capire come viene usato il sito.
              </p>
              <div className={styles.cookieCategories}>
                {Object.entries(COOKIE_INFO).map(([category, info]) => {
                  const necessary = category === COOKIE_CATEGORIES.NECESSARY;
                  return (
                    <div className={styles.categoryCard} key={category}>
                      <div>
                        <h3>{info.name}</h3>
                        <p>{info.description}</p>
                      </div>
                      <label className={styles.toggle}>
                        <span>{necessary ? 'Sempre attivo' : preferences[category] ? 'Attivo' : 'Non attivo'}</span>
                        <input
                          type="checkbox"
                          checked={Boolean(preferences[category])}
                          disabled={necessary}
                          onChange={() => setPreferences((current) => ({
                            ...current,
                            [category]: !current[category],
                          }))}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <footer className={styles.modalFooter}>
              <button
                className={styles.rejectButton}
                type="button"
                onClick={() => {
                  CookieManager.rejectAll();
                  setPreferences(CookieManager.getPreferences());
                  setOpen(false);
                }}
              >
                Rifiuta facoltativi
              </button>
              <button className={styles.saveButton} type="button" onClick={save}>Salva preferenze</button>
              <button
                className={styles.acceptButton}
                type="button"
                onClick={() => {
                  CookieManager.acceptAll();
                  setPreferences(CookieManager.getPreferences());
                  setOpen(false);
                }}
              >
                Accetta tutti
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
};

export default CookieSettings;
