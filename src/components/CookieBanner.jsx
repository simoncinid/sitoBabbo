import React, { useEffect, useState } from 'react';
import { CookieManager } from '../utils/CookieManager';
import CookieSettings from './CookieSettings';
import styles from './CookieBanner.module.css';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!CookieManager.hasConsent());
  }, []);

  if (!visible) return null;

  return (
    <aside className={styles.cookieBanner} aria-label="Informativa cookie">
      <div className={styles.bannerText}>
        <strong>La tua privacy, senza complicazioni.</strong>
        <p>
          Usiamo cookie necessari e, solo con il tuo consenso, cookie analitici.
          Puoi cambiare idea in qualsiasi momento.
        </p>
      </div>
      <div className={styles.bannerActions}>
        <button
          className={styles.rejectButton}
          type="button"
          onClick={() => {
            CookieManager.rejectAll();
            setVisible(false);
          }}
        >
          Solo necessari
        </button>
        <CookieSettings compact />
        <button
          className={styles.acceptButton}
          type="button"
          onClick={() => {
            CookieManager.acceptAll();
            setVisible(false);
          }}
        >
          Accetta
        </button>
      </div>
    </aside>
  );
};

export default CookieBanner;
