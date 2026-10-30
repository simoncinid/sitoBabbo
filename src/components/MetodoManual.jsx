import React, { lazy, Suspense, useEffect, useState } from 'react';
import { FiArrowDown, FiBookOpen, FiX } from 'react-icons/fi';
import styles from './MetodoManual.module.css';

const PdfReader = lazy(() => import('./PdfReader'));
const pdfUrl = '/assets/documents/Mai_Senza_Metodo_Leggero.pdf';

export default function MetodoManual() {
  const [readerOpen, setReaderOpen] = useState(false);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 833px)');
    const closeOnMobile = () => { if (mobile.matches) setReaderOpen(false); };
    mobile.addEventListener('change', closeOnMobile);
    return () => mobile.removeEventListener('change', closeOnMobile);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 833px)').matches;
    if (readerOpen && !isMobile) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [readerOpen]);

  return (
    <section id="manuale" className={styles.section} aria-labelledby="manual-title">
      <div className="site-container">
        <div className={styles.intro}>
          <div className={styles.copy}>
            <p className="eyebrow">Il manuale di Mauro Simoncini</p>
            <h2 id="manual-title" className="section-heading">Mai Senza Metodo.</h2>
            <p className={styles.subtitle}>Osservare oggi.<br />Proteggere nel tempo.</p>
            <p className={styles.description}>
              Un metodo pratico per capire le coperture, riconoscere i segnali di usura
              e programmare la manutenzione. Con illustrazioni, schede di controllo
              e checklist da tenere a portata di mano.
            </p>
            <p className={styles.details}>64 pagine · Manuale illustrato · PDF, 20 MB</p>
            <div className={styles.actions}>
              <button type="button" className={`button-primary ${styles.desktopBrowse}`} aria-expanded={readerOpen}
                aria-controls="manual-reader" onClick={() => setReaderOpen((value) => !value)}>
                <FiBookOpen aria-hidden="true" /> {readerOpen ? 'Chiudi il lettore' : 'Sfoglia il manuale'}
              </button>
              <a className={`button-primary ${styles.mobileBrowse}`} href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <FiBookOpen aria-hidden="true" /> Sfoglia il manuale
              </a>
              <a className="button-secondary" href={pdfUrl} download="Mai_Senza_Metodo.pdf">
                <FiArrowDown aria-hidden="true" /> Scarica il PDF
              </a>
            </div>
          </div>
          <a className={styles.cover} href={pdfUrl} target="_blank" rel="noopener noreferrer"
            onClick={(event) => {
              if (window.matchMedia('(max-width: 833px)').matches) return;
              event.preventDefault();
              setReaderOpen(true);
            }} aria-label="Sfoglia Mai Senza Metodo">
            <img src="/assets/documents/mai-senza-cover.png" alt="Copertina del manuale Mai Senza Metodo di Mauro Simoncini"
              width="1200" height="849" loading="lazy" />
            <span><FiBookOpen aria-hidden="true" /> Scopri il manuale <span aria-hidden="true">↗</span></span>
          </a>
        </div>
        <div id="manual-reader" hidden={!readerOpen} className={styles.readerWrap}
          role="dialog" aria-modal="true" aria-labelledby="manual-reader-title">
          {readerOpen && (
            <>
              <h2 id="manual-reader-title" className="sr-only">Lettore Mai Senza Metodo</h2>
              <button type="button" className={styles.modalClose} aria-label="Chiudi lettore"
                onClick={() => setReaderOpen(false)}><FiX aria-hidden="true" /></button>
              <Suspense fallback={<p role="status" className={styles.message}>Caricamento del lettore…</p>}>
                <PdfReader url={pdfUrl} />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
