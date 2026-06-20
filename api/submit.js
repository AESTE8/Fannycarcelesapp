/**
 * Fonction serverless Vercel — proxy sécurisé vers Web3Forms.
 *
 * La clé d'accès Web3Forms reste UNIQUEMENT côté serveur (variable
 * d'environnement WEB3FORMS_ACCESS_KEY) et n'est jamais exposée dans le
 * bundle JavaScript envoyé au navigateur.
 *
 * Configuration : définir WEB3FORMS_ACCESS_KEY dans Vercel
 * (Settings → Environment Variables) et dans un fichier .env local pour
 * le développement avec `vercel dev`.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('WEB3FORMS_ACCESS_KEY manquante dans les variables d\'environnement');
    return res.status(500).json({ success: false, message: 'Service indisponible' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // Honeypot : si la case cachée est cochée, c'est un bot → on ignore en silence.
    if (body.botcheck) {
      return res.status(200).json({ success: true });
    }

    // On retire toute clé éventuellement injectée par le client : la clé
    // serveur fait autorité.
    const { access_key: _ignored, botcheck: _bot, ...fields } = body;

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // User-Agent réaliste : sans lui, Cloudflare (devant Web3Forms)
        // challenge la requête serveur-à-serveur et renvoie une page HTML
        // « Just a moment… » au lieu du JSON attendu.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({ ...fields, access_key: accessKey }),
    });

    // Lecture défensive : Web3Forms peut renvoyer du non-JSON en cas d'erreur.
    const raw = await response.text();
    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      result = { success: false, message: raw.slice(0, 300) };
    }
    return res.status(response.status).json(result);
  } catch (error) {
    console.error('Erreur proxy Web3Forms:', error);
    // Diagnostic temporaire : on expose le message d'erreur réel.
    return res
      .status(500)
      .json({ success: false, message: 'Erreur serveur', debug: String(error?.message || error) });
  }
}
