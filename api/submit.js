/**
 * Fonction serverless Vercel — envoi du formulaire d'estimation par email
 * via Resend (https://resend.com).
 *
 * Tout est côté serveur : la clé API n'est jamais exposée au navigateur.
 * Contrairement à Web3Forms (derrière Cloudflare), l'API Resend est une
 * API développeur qui accepte sans souci les requêtes serveur-à-serveur
 * depuis Vercel.
 *
 * Variables d'environnement requises (déjà configurées dans Vercel) :
 *   - RESEND_API_KEY    : clé API Resend (re_...)
 *   - RESEND_FROM_EMAIL : expéditeur, ex. "Site Fanny Carceles <no-reply@ton-domaine.fr>"
 *   - RECIPIENT_EMAIL   : destinataire des demandes (l'agente)
 */
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RECIPIENT_EMAIL;
  if (!apiKey || !from || !to) {
    console.error('Variables Resend manquantes (RESEND_API_KEY/RESEND_FROM_EMAIL/RECIPIENT_EMAIL)');
    return res.status(500).json({ success: false, message: 'Service indisponible' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // Honeypot : si la case cachée est cochée, c'est un bot → on ignore en silence.
    if (body.botcheck) {
      return res.status(200).json({ success: true });
    }

    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      propertyType = '',
      address = '',
      surface = '',
      rooms = '',
      features = [],
      message = '',
    } = body;

    const featuresText = Array.isArray(features) && features.length ? features.join(', ') : '—';

    const row = (label, value) =>
      `<tr><td style="padding:6px 12px;font-weight:600;color:#003366;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#1e293b">${escapeHtml(value) || '—'}</td></tr>`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#003366">Nouvelle demande d'estimation</h2>
        <table style="border-collapse:collapse;width:100%;font-size:15px">
          ${row('Type de bien', propertyType)}
          ${row('Adresse', address)}
          ${row('Surface', surface ? `${surface} m²` : '')}
          ${row('Pièces', rooms)}
          ${row('Prénom', firstName)}
          ${row('Nom', lastName)}
          ${row('Email', email)}
          ${row('Téléphone', phone)}
          ${row('Atouts', featuresText)}
          ${row('Message', message)}
        </table>
      </div>`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email || undefined,
        subject: `Nouvelle estimation — ${firstName} ${lastName} (${address})`.trim(),
        html,
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Erreur Resend:', result);
      return res
        .status(502)
        .json({ success: false, message: result?.message || 'Envoi impossible' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur envoi formulaire:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
