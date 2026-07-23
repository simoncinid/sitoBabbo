const { getArticleBySlug, listArticles } = require('./_lib/articles');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, message: 'Metodo non consentito.' });
  }

  try {
    res.setHeader('Cache-Control', 'no-store');

    if (req.query?.slug) {
      const article = await getArticleBySlug(req.query.slug);
      if (!article) {
        return res.status(404).json({ success: false, message: 'Articolo non trovato.' });
      }
      return res.status(200).json({ success: true, article });
    }

    const articles = (await listArticles(false)).map(({ content, gallery, ...article }) => article);
    return res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error('Errore API articoli:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Il servizio articoli non è momentaneamente disponibile.',
    });
  }
};
