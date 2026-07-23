import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCheck,
  FaCopy,
  FaEdit,
  FaExternalLinkAlt,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaTrash,
} from 'react-icons/fa';
import { formatArticleDate, slugify } from '../utils/articlesApi';
import styles from './Admin.module.css';

const today = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

const emptyArticle = () => ({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  gallery: [],
  category: 'Guide',
  author: 'Mauro Simoncini',
  readTime: '5 min',
  publishedAt: today(),
  published: false,
});

async function adminRequest(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Operazione non riuscita.');
    error.status = response.status;
    throw error;
  }
  return data;
}

function Login({ onAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const data = await adminRequest('/api/admin/session', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      onAuthenticated(data.user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <Link to="/" className={styles.backHome}><FaArrowLeft /> Torna al sito</Link>
        <div className={styles.adminMark}>MS</div>
        <p className={styles.eyebrow}>Area riservata</p>
        <h1>Gestione articoli</h1>
        <p className={styles.loginIntro}>Accedi con le credenziali amministratore configurate su Vercel.</p>
        <form onSubmit={submit} className={styles.loginForm}>
          <label>
            Nome utente
            <input
              autoComplete="username"
              autoFocus
              required
              value={credentials.username}
              onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              required
              type="password"
              value={credentials.password}
              onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
            />
          </label>
          {error && <p className={styles.formError} role="alert">{error}</p>}
          <button className={styles.primaryButton} disabled={submitting} type="submit">
            {submitting ? 'Accesso…' : 'Accedi'}
          </button>
        </form>
      </section>
    </main>
  );
}

function Editor({ article, onCancel, onSaved, onUnauthorized }) {
  const [form, setForm] = useState(article || emptyArticle);
  const [galleryText, setGalleryText] = useState((article?.gallery || []).join('\n'));
  const [slugEdited, setSlugEdited] = useState(Boolean(article));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isExisting = Boolean(article?.id);

  const update = (key, value) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === 'title' && !slugEdited) next.slug = slugify(value);
      return next;
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        gallery: galleryText.split('\n').map((item) => item.trim()).filter(Boolean),
      };
      const data = await adminRequest('/api/admin/articles', {
        method: isExisting ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      onSaved(data.article, isExisting ? 'Articolo aggiornato.' : 'Articolo creato.');
    } catch (requestError) {
      if (requestError.status === 401) onUnauthorized();
      else setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.editor}>
      <div className={styles.editorHeading}>
        <div>
          <p className={styles.eyebrow}>{isExisting ? 'Modifica' : 'Nuovo articolo'}</p>
          <h2>{isExisting ? form.title : 'Scrivi un nuovo articolo'}</h2>
        </div>
        <button type="button" className={styles.textButton} onClick={onCancel}>Annulla</button>
      </div>

      <form onSubmit={submit} className={styles.editorForm}>
        <div className={styles.mainFields}>
          <label className={styles.fullField}>
            Titolo
            <input required value={form.title} onChange={(event) => update('title', event.target.value)} />
          </label>
          <label className={styles.fullField}>
            Slug URL
            <div className={styles.slugField}>
              <span>/novita/</span>
              <input
                required
                value={form.slug}
                onChange={(event) => {
                  setSlugEdited(true);
                  update('slug', slugify(event.target.value));
                }}
              />
            </div>
          </label>
          <label className={styles.fullField}>
            Riassunto
            <textarea
              required
              rows="3"
              value={form.excerpt}
              onChange={(event) => update('excerpt', event.target.value)}
            />
          </label>
          <label className={styles.fullField}>
            Contenuto
            <textarea
              className={styles.contentEditor}
              required
              rows="20"
              value={form.content}
              onChange={(event) => update('content', event.target.value)}
            />
            <small>Separa i paragrafi con una riga vuota. Usa <code>**Titolo sezione**</code> e righe che iniziano con <code>-</code> oppure <code>•</code> per gli elenchi.</small>
          </label>
        </div>

        <aside className={styles.sideFields}>
          <div className={styles.publishCard}>
            <label className={styles.switchRow}>
              <span>
                <strong>{form.published ? 'Pubblicato' : 'Bozza'}</strong>
                <small>{form.published ? 'Visibile nel blog' : 'Visibile solo qui'}</small>
              </span>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => update('published', event.target.checked)}
              />
            </label>
            <button className={styles.primaryButton} disabled={saving} type="submit">
              <FaCheck /> {saving ? 'Salvataggio…' : 'Salva articolo'}
            </button>
          </div>

          <div className={styles.fieldCard}>
            <h3>Informazioni</h3>
            <label>
              Data
              <input required type="date" value={form.publishedAt} onChange={(event) => update('publishedAt', event.target.value)} />
            </label>
            <label>
              Categoria
              <input list="article-categories" required value={form.category} onChange={(event) => update('category', event.target.value)} />
              <datalist id="article-categories">
                <option value="Tecnica" />
                <option value="Normative" />
                <option value="Efficienza Energetica" />
                <option value="Case Study" />
                <option value="Guide" />
              </datalist>
            </label>
            <label>
              Autore
              <input required value={form.author} onChange={(event) => update('author', event.target.value)} />
            </label>
            <label>
              Tempo di lettura
              <input required value={form.readTime} onChange={(event) => update('readTime', event.target.value)} placeholder="5 min" />
            </label>
          </div>

          <div className={styles.fieldCard}>
            <h3>Immagini</h3>
            <label>
              URL immagine principale
              <input value={form.image} onChange={(event) => update('image', event.target.value)} placeholder="/assets/immagine.jpg" />
            </label>
            {form.image && (
              <div className={styles.imagePreview}>
                <img src={form.image} alt="Anteprima" />
              </div>
            )}
            <label>
              Galleria
              <textarea
                rows="4"
                value={galleryText}
                onChange={(event) => setGalleryText(event.target.value)}
                placeholder={'Un URL per riga\n/assets/dettaglio-1.jpg'}
              />
            </label>
          </div>
        </aside>

        {error && <p className={`${styles.formError} ${styles.editorError}`} role="alert">{error}</p>}
      </form>
    </section>
  );
}

function Dashboard({ user, onLogout, onUnauthorized }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [editorArticle, setEditorArticle] = useState(undefined);
  const [editorOpen, setEditorOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const loadArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminRequest('/api/admin/articles');
      setArticles(data.articles);
    } catch (requestError) {
      if (requestError.status === 401) onUnauthorized();
      else setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return articles;
    return articles.filter((article) => (
      `${article.title} ${article.category} ${article.excerpt}`.toLowerCase().includes(term)
    ));
  }, [articles, query]);

  const openCreate = () => {
    setEditorArticle(undefined);
    setEditorOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (article) => {
    setEditorArticle(article);
    setEditorOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveComplete = (saved, message) => {
    setArticles((current) => {
      const exists = current.some((item) => item.id === saved.id);
      const next = exists
        ? current.map((item) => (item.id === saved.id ? saved : item))
        : [saved, ...current];
      return next.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
    });
    setEditorOpen(false);
    setNotice(message);
  };

  const duplicate = async (article) => {
    setBusyId(article.id);
    setError('');
    try {
      const data = await adminRequest('/api/admin/articles', {
        method: 'POST',
        body: JSON.stringify({ action: 'duplicate', id: article.id }),
      });
      setArticles((current) => [data.article, ...current]);
      setNotice('Copia creata come bozza.');
      openEdit(data.article);
    } catch (requestError) {
      if (requestError.status === 401) onUnauthorized();
      else setError(requestError.message);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (article) => {
    if (!window.confirm(`Eliminare definitivamente “${article.title}”?`)) return;
    setBusyId(article.id);
    setError('');
    try {
      await adminRequest('/api/admin/articles', {
        method: 'DELETE',
        body: JSON.stringify({ id: article.id }),
      });
      setArticles((current) => current.filter((item) => item.id !== article.id));
      setNotice('Articolo eliminato.');
    } catch (requestError) {
      if (requestError.status === 401) onUnauthorized();
      else setError(requestError.message);
    } finally {
      setBusyId(null);
    }
  };

  if (editorOpen) {
    return (
      <main className={styles.dashboardPage}>
        <header className={styles.adminHeader}>
          <Link to="/" className={styles.brand}>Mai Senza <span>Admin</span></Link>
          <span className={styles.user}>{user}</span>
        </header>
        <Editor
          key={editorArticle?.id || 'new'}
          article={editorArticle}
          onCancel={() => setEditorOpen(false)}
          onSaved={saveComplete}
          onUnauthorized={onUnauthorized}
        />
      </main>
    );
  }

  return (
    <main className={styles.dashboardPage}>
      <header className={styles.adminHeader}>
        <Link to="/" className={styles.brand}>Mai Senza <span>Admin</span></Link>
        <nav>
          <a href="/novita" target="_blank" rel="noreferrer">Vedi blog <FaExternalLinkAlt /></a>
          <span className={styles.user}>{user}</span>
          <button type="button" onClick={onLogout}><FaSignOutAlt /> Esci</button>
        </nav>
      </header>

      <section className={styles.dashboard}>
        <div className={styles.dashboardTitle}>
          <div>
            <p className={styles.eyebrow}>Contenuti</p>
            <h1>Articoli</h1>
            <p>{articles.length} {articles.length === 1 ? 'articolo' : 'articoli'} in archivio</p>
          </div>
          <button type="button" className={styles.primaryButton} onClick={openCreate}>
            <FaPlus /> Nuovo articolo
          </button>
        </div>

        {notice && <div className={styles.notice}><FaCheck /> {notice}<button onClick={() => setNotice('')} aria-label="Chiudi">×</button></div>}
        {error && <div className={styles.errorBanner}>{error}<button onClick={() => setError('')} aria-label="Chiudi">×</button></div>}

        <label className={styles.search}>
          <FaSearch />
          <span className="sr-only">Cerca articoli</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cerca per titolo, categoria o testo…" />
        </label>

        {loading ? (
          <div className={styles.loading}>Caricamento articoli…</div>
        ) : filtered.length ? (
          <div className={styles.articleList}>
            {filtered.map((article) => (
              <article className={styles.articleRow} key={article.id}>
                <div className={styles.thumbnail}>
                  {article.image ? <img src={article.image} alt="" /> : <span>MS</span>}
                </div>
                <div className={styles.articleInfo}>
                  <div className={styles.rowMeta}>
                    <span className={article.published ? styles.published : styles.draft}>
                      {article.published ? 'Pubblicato' : 'Bozza'}
                    </span>
                    <span>{article.category}</span>
                    <span>{formatArticleDate(article.publishedAt, true)}</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                </div>
                <div className={styles.rowActions}>
                  <button type="button" onClick={() => openEdit(article)} title="Modifica"><FaEdit /><span>Modifica</span></button>
                  <button type="button" disabled={busyId === article.id} onClick={() => duplicate(article)} title="Duplica"><FaCopy /><span>Duplica</span></button>
                  <button type="button" className={styles.deleteButton} disabled={busyId === article.id} onClick={() => remove(article)} title="Elimina"><FaTrash /><span>Elimina</span></button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2>{query ? 'Nessun risultato' : 'Nessun articolo'}</h2>
            <p>{query ? 'Prova a modificare la ricerca.' : 'Crea il primo articolo per iniziare.'}</p>
            {!query && <button type="button" className={styles.primaryButton} onClick={openCreate}><FaPlus /> Nuovo articolo</button>}
          </div>
        )}
      </section>
    </main>
  );
}

export default function Admin() {
  const [status, setStatus] = useState('checking');
  const [user, setUser] = useState('');

  useEffect(() => {
    adminRequest('/api/admin/session')
      .then((data) => {
        setUser(data.user);
        setStatus('authenticated');
      })
      .catch(() => setStatus('anonymous'));
  }, []);

  const authenticated = (username) => {
    setUser(username);
    setStatus('authenticated');
  };

  const logout = async () => {
    try {
      await adminRequest('/api/admin/session', { method: 'DELETE' });
    } finally {
      setUser('');
      setStatus('anonymous');
    }
  };

  if (status === 'checking') {
    return <main className={styles.sessionLoading}>Verifica sessione…</main>;
  }

  if (status === 'anonymous') {
    return <Login onAuthenticated={authenticated} />;
  }

  return (
    <Dashboard
      user={user}
      onLogout={logout}
      onUnauthorized={() => {
        setUser('');
        setStatus('anonymous');
      }}
    />
  );
}
