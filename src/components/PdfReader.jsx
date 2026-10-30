import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import styles from './MetodoManual.module.css';

GlobalWorkerOptions.workerSrc = workerUrl;

export default function PdfReader({ url }) {
  const [document, setDocument] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const viewportRef = useRef(null);
  const canvasHostRef = useRef(null);

  useEffect(() => {
    let active = true;
    setError('');
    setLoading(true);
    const task = getDocument({ url });
    task.promise.then((pdf) => {
      if (active) setDocument(pdf);
    }).catch(() => {
      if (active) {
        setError('Il manuale non è stato caricato. Riprova oppure apri o scarica il PDF.');
        setLoading(false);
      }
    });
    return () => { active = false; task.destroy(); };
  }, [url, attempt]);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!document || !size.width || !size.height) return;
    let active = true;
    let renderTask;
    setLoading(true);
    setError('');
    async function render() {
      try {
        const pdfPage = await document.getPage(page);
        if (!active) return;
        const base = pdfPage.getViewport({ scale: 1 });
        const scale = Math.min(size.width / base.width, size.height / base.height);
        const viewport = pdfPage.getViewport({ scale });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = window.document.createElement('canvas');
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', `Mai Senza Metodo, pagina ${page} di ${document.numPages}. Per leggere il testo con tecnologie assistive, apri o scarica il PDF.`);
        renderTask = pdfPage.render({
          canvasContext: canvas.getContext('2d'), viewport,
          transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
        });
        await renderTask.promise;
        if (active) {
          canvasHostRef.current.replaceChildren(canvas);
          setLoading(false);
        }
      } catch (err) {
        if (active && err.name !== 'RenderingCancelledException') {
          setError('Questa pagina non è disponibile. Riprova oppure apri il PDF.');
          setLoading(false);
        }
      }
    }
    render();
    return () => { active = false; renderTask?.cancel(); };
  }, [document, page, size, attempt]);

  const changePage = (value) => {
    if (document) setPage(Math.max(1, Math.min(document.numPages, value)));
  };

  return (
    <div className={styles.reader} role="region" aria-label="Lettore del manuale Mai Senza Metodo"
      tabIndex="0" onKeyDown={(event) => {
        if (event.target.tagName === 'INPUT') return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          changePage(page + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }}>
      <div className={styles.toolbar}>
        <div className={styles.pageControls}>
          <button type="button" aria-label="Pagina precedente" disabled={!document || page === 1}
            onClick={() => changePage(page - 1)}><FiChevronLeft aria-hidden="true" /></button>
          <form onSubmit={(event) => {
            event.preventDefault();
            const input = event.currentTarget.elements.page;
            const value = Number(input.value);
            if (Number.isInteger(value) && value > 0) changePage(value);
            input.value = String(Math.max(1, Math.min(document.numPages, value || page)));
          }}>
            <label htmlFor="manual-page">Pagina</label>
            <input key={page} id="manual-page" name="page" type="number" inputMode="numeric"
              min="1" max={document?.numPages || 64} defaultValue={page} disabled={!document} />
            <span>di {document?.numPages || 64}</span>
            <button className="sr-only" type="submit" disabled={!document}>Vai alla pagina</button>
          </form>
          <button type="button" aria-label="Pagina successiva" disabled={!document || page === document.numPages}
            onClick={() => changePage(page + 1)}><FiChevronRight aria-hidden="true" /></button>
        </div>
        <a className={styles.headerPdfLink} href={url} target="_blank" rel="noreferrer">
          Apri il PDF <FiExternalLink aria-hidden="true" />
        </a>
      </div>
      <div className={styles.viewport} ref={viewportRef} aria-busy={loading}>
        <div ref={canvasHostRef} className={styles.canvasHost} hidden={!!error} />
      </div>
      <div className={styles.readerStatus}>
        <p role="status" aria-live="polite">{error || (loading ? 'Caricamento della pagina…' : `Pagina ${page} di ${document.numPages}.`)}</p>
        {error && <button type="button" className="button-secondary" onClick={() => {
          setDocument(null);
          setAttempt((value) => value + 1);
        }}>Riprova</button>}
      </div>
    </div>
  );
}
