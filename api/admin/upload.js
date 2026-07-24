const fs = require('fs/promises');
const path = require('path');
const { put, del } = require('@vercel/blob');
const { requireAdmin, validateMutationOrigin } = require('../_lib/adminAuth');

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
// Limite Vercel Functions ~4.5 MB sul body JSON; teniamo margine sul file binario.
const MAX_BYTES = 3 * 1024 * 1024;

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

function getBlobPutOptions(contentType) {
  const options = {
    access: 'public',
    contentType,
    addRandomSuffix: false,
  };

  if (process.env.BLOB_STORE_ID) {
    options.storeId = process.env.BLOB_STORE_ID;
  }

  return options;
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

async function saveToBlob(buffer, filename, contentType) {
  const safeName = `articles/${Date.now()}-${sanitizeFilename(filename)}`;
  const blob = await put(safeName, buffer, getBlobPutOptions(contentType));
  return { url: blob.url, contentType };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'POST') {
      if (!requireAdmin(req, res)) return;
      if (!validateMutationOrigin(req)) {
        return res.status(403).json({ success: false, message: 'Origine della richiesta non valida.' });
      }

      const { filename, contentType, data } = req.body || {};
      if (!data || !contentType || !ALLOWED_TYPES.has(contentType)) {
        return res.status(400).json({
          success: false,
          message: 'Formato immagine non supportato. Usa JPG, PNG, WebP o GIF.',
        });
      }

      const buffer = Buffer.from(data, 'base64');
      if (!buffer.length || buffer.length > MAX_BYTES) {
        return res.status(400).json({
          success: false,
          message: 'Immagine troppo grande. Dimensione massima: 3 MB.',
        });
      }

      if (process.env.VERCEL === '1' && !isBlobConfigured()) {
        return res.status(503).json({
          success: false,
          message: 'Caricamento immagini non configurato. Collega un Blob store al progetto (BLOB_STORE_ID).',
        });
      }

      const saved = isBlobConfigured()
        ? await saveToBlob(buffer, filename, contentType)
        : await saveLocally(buffer, filename, contentType);

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
        await del(url, getBlobPutOptions().storeId ? { storeId: process.env.BLOB_STORE_ID } : undefined);
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
