const fs = require('fs/promises');
const path = require('path');
const { del } = require('@vercel/blob');
const { handleUpload } = require('@vercel/blob/client');
const { requireAdmin, validateMutationOrigin, verifySession } = require('../_lib/adminAuth');

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 5 * 1024 * 1024;

function sanitizeFilename(name) {
  return String(name || 'immagine')
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'immagine';
}

function isBlobUrl(url) {
  return typeof url === 'string' && url.includes('.blob.vercel-storage.com');
}

function isBlobConfigured() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return true;
  if (process.env.BLOB_STORE_ID && process.env.VERCEL === '1') return true;
  return false;
}

function getBlobCommandOptions() {
  return process.env.BLOB_STORE_ID ? { storeId: process.env.BLOB_STORE_ID } : undefined;
}

function isClientUploadRequest(body) {
  return typeof body?.type === 'string' && body.type.startsWith('blob.');
}

async function saveLocally(buffer, filename, contentType) {
  const uploadsDir = path.join(process.cwd(), 'public', 'assets', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}-${sanitizeFilename(filename)}`;
  const filePath = path.join(uploadsDir, safeName);
  await fs.writeFile(filePath, buffer);
  return {
    url: `/assets/uploads/${safeName}`,
    contentType,
  };
}

async function handleClientUpload(req, res) {
  const isTokenRequest = req.body?.type === 'blob.generate-client-token';

  if (isTokenRequest) {
    if (!verifySession(req)) {
      return res.status(401).json({ success: false, message: 'Sessione non valida o scaduta.' });
    }
    if (!validateMutationOrigin(req)) {
      return res.status(403).json({ success: false, message: 'Origine della richiesta non valida.' });
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(503).json({
        success: false,
        message: 'Manca BLOB_READ_WRITE_TOKEN. Ricollega lo Blob store al progetto Vercel.',
      });
    }
  }

  const response = await handleUpload({
    body: req.body,
    request: req,
    onBeforeGenerateToken: async (pathname) => {
      if (!pathname.startsWith('articles/')) {
        throw new Error('Percorso di upload non consentito.');
      }
      return {
        allowedContentTypes: ALLOWED_TYPES,
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: false,
      };
    },
  });

  return res.status(200).json(response);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'POST' && isClientUploadRequest(req.body)) {
      return handleClientUpload(req, res);
    }

    if (req.method === 'POST') {
      if (!requireAdmin(req, res)) return;
      if (!validateMutationOrigin(req)) {
        return res.status(403).json({ success: false, message: 'Origine della richiesta non valida.' });
      }

      const { filename, contentType, data } = req.body || {};
      if (!data || !contentType || !ALLOWED_TYPES.includes(contentType)) {
        return res.status(400).json({
          success: false,
          message: 'Formato immagine non supportato. Usa JPG, PNG, WebP o GIF.',
        });
      }

      const buffer = Buffer.from(data, 'base64');
      if (!buffer.length || buffer.length > MAX_BYTES) {
        return res.status(400).json({
          success: false,
          message: 'Immagine troppo grande. Dimensione massima: 5 MB.',
        });
      }

      const saved = await saveLocally(buffer, filename, contentType);
      return res.status(201).json({ success: true, ...saved });
    }

    if (req.method === 'DELETE') {
      if (!requireAdmin(req, res)) return;
      if (!validateMutationOrigin(req)) {
        return res.status(403).json({ success: false, message: 'Origine della richiesta non valida.' });
      }

      const { url } = req.body || {};
      if (!url) {
        return res.status(400).json({ success: false, message: 'URL immagine mancante.' });
      }

      if (isBlobUrl(url) && isBlobConfigured()) {
        await del(url, getBlobCommandOptions());
      }

      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', 'POST, DELETE');
    return res.status(405).json({ success: false, message: 'Metodo non consentito.' });
  } catch (error) {
    console.error('Errore upload immagine:', error);
    const message = String(error?.message || '');
    if (message.startsWith('Vercel Blob:')) {
      return res.status(500).json({ success: false, message: message.replace(/^Vercel Blob:\s*/, '') });
    }
    return res.status(500).json({
      success: false,
      message: 'Caricamento non riuscito. Riprova tra qualche istante.',
    });
  }
};
