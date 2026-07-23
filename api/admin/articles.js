const {
  createArticle,
  deleteArticle,
  duplicateArticle,
  listArticles,
  updateArticle,
} = require('../_lib/articles');
const { requireAdmin, validateMutationOrigin } = require('../_lib/adminAuth');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!requireAdmin(req, res)) return;

  if (req.method !== 'GET' && !validateMutationOrigin(req)) {
    return res.status(403).json({ success: false, message: 'Origine della richiesta non valida.' });
  }

  try {
    if (req.method === 'GET') {
      const articles = await listArticles(true);
      return res.status(200).json({ success: true, articles });
    }

    if (req.method === 'POST') {
      if (req.body?.action === 'duplicate') {
        const article = await duplicateArticle(req.body.id);
        if (!article) {
          return res.status(404).json({ success: false, message: 'Articolo non trovato.' });
        }
        return res.status(201).json({ success: true, article });
      }

      const article = await createArticle(req.body);
      return res.status(201).json({ success: true, article });
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const article = await updateArticle(req.body?.id, req.body);
      if (!article) {
        return res.status(404).json({ success: false, message: 'Articolo non trovato.' });
      }
      return res.status(200).json({ success: true, article });
    }

    if (req.method === 'DELETE') {
      const deleted = await deleteArticle(req.body?.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Articolo non trovato.' });
      }
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(405).json({ success: false, message: 'Metodo non consentito.' });
  } catch (error) {
    console.error('Errore API admin articoli:', error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode === 400
        ? error.message
        : 'Operazione non riuscita. Controlla la configurazione del database.',
    });
  }
};
