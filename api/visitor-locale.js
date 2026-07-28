module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Metodo non consentito.' });
  }

  // Vercel aggiunge questo header dalla geolocalizzazione dell'IP, senza servizi esterni.
  const country = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
  res.setHeader('Cache-Control', 'private, no-store');
  return res.status(200).json({ country });
};
