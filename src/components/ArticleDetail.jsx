import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { FaCalendar, FaUser, FaClock, FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchArticle, formatArticleDate } from '../utils/articlesApi';
import styles from './ArticleDetail.module.css';

function InlineText({ children }) {
  const parts = String(children).split(/(\*\*.*?\*\*)/g).filter(Boolean);
  return parts.map((part, index) => (
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
  ));
}

function ArticleBody({ content }) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      if (/^\*\*[^*]+\*\*$/.test(block)) {
        return <h3 key={index} className={styles.subheading}>{block.slice(2, -2)}</h3>;
      }

      const lines = block.split('\n');
      if (lines.every((line) => /^(•|-)\s*/.test(line.trim()))) {
        return (
          <ul key={index} className={styles.bulletList}>
            {lines.map((line, itemIndex) => (
              <li key={itemIndex}><InlineText>{line.replace(/^(•|-)\s*/, '')}</InlineText></li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className={styles.paragraph}>
          {lines.map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {lineIndex > 0 && <br />}
              <InlineText>{line}</InlineText>
            </React.Fragment>
          ))}
        </p>
      );
    });
}

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState();

  useEffect(() => {
    let active = true;
    setArticle(undefined);
    fetchArticle(slug).then((item) => {
      if (active) setArticle(item);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (article === undefined) {
    return (
      <div className={styles.articlePage}>
        <Navbar />
        <div className={styles.notFound}><p>Caricamento articolo…</p></div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.articlePage}>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Articolo non trovato</h1>
          <p>L’articolo che stai cercando non esiste o è stato rimosso.</p>
          <RouterLink to="/novita" className={styles.backButton}>Torna al Blog</RouterLink>
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
          <header className={styles.articleHeader}>
            <div className={styles.headerTop}>
              <RouterLink to="/novita" className={styles.backButton} aria-label="Torna agli articoli">
                <FaArrowLeft />
              </RouterLink>
              <div className={styles.categoryBadge}>{article.category}</div>
            </div>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
            <div className={styles.articleMeta}>
              <span className={styles.metaItem}>
                <FaCalendar className={styles.metaIcon} />
                {formatArticleDate(article.publishedAt)}
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

          {(article.image || article.gallery?.length) && (
            <div className={styles.articleImageContainer}>
              {article.gallery?.length ? (
                <div className={styles.multipleImages}>
                  {article.image && <img src={article.image} alt={article.title} className={styles.articleImage} />}
                  <div className={styles.additionalImagesGrid}>
                    {article.gallery.map((image, index) => (
                      <img
                        key={image}
                        src={image}
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
          )}

          <article className={styles.articleContent}>
            <ArticleBody content={article.content} />
          </article>

          <div className={styles.backToBlog}>
            <RouterLink to="/novita" className={styles.backLink}>
              <FaArrowLeft />
              Torna al Blog
            </RouterLink>
          </div>
        </div>
      </main>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Ti è piaciuto questo articolo?</h3>
            <p className={styles.ctaText}>
              Contattami per una consulenza personalizzata sul tuo progetto di impermeabilizzazione.
              Con oltre 15 anni di esperienza, posso aiutarti a trovare la soluzione perfetta.
            </p>
            <a
              href={`https://wa.me/393938657606?text=${encodeURIComponent(`Ciao! Ho letto il tuo articolo su: ${article.title} e vorrei una consulenza`)}`}
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
