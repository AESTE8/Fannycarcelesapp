import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Mentions légales — obligation légale (LCEN art. 6 III) pour un site
 * professionnel français. Identifie l'éditeur (Fanny Carceles, entrepreneur
 * individuel). La mention « mandataire IAD » est volontairement minimale et
 * purement factuelle (conformité loi Hoguet : titulaire de la carte T).
 */
export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-[#001a33] text-white py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Mentions légales</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Éditeur du site</h2>
          <p>
            Le présent site est édité par <strong>Fanny Carceles</strong>,
            entrepreneur individuel exerçant l'activité de conseillère immobilière
            (agent commercial indépendant).
          </p>
          <ul className="mt-3 space-y-1">
            <li>SIREN : <strong>903 114 775</strong></li>
            <li>SIRET : <strong>903 114 775 00013</strong></li>
            <li>Inscrite au RSAC de Grenoble sous le n° <strong>903 114 775</strong></li>
            <li>Adresse : <strong>Le Bas Freydon, 38580 Le Moutaret</strong></li>
            <li>Téléphone : 06 45 00 37 52</li>
            <li>E-mail : fanny.carceles@iadfrance.fr</li>
          </ul>
          <p className="mt-3">
            Agent commercial indépendant exerçant pour le réseau IAD France,
            titulaire de la carte professionnelle ; l'agent ne détient pas la carte
            « Transactions » et ne perçoit aucun fonds dans le cadre de son activité.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave
            #4133, Walnut, CA 91789, États-Unis — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#003366] font-semibold hover:underline">vercel.com</a>.
            {' '}<span className="text-slate-400">[Adresse de l'hébergeur à confirmer.]</span>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, visuels) est
            protégé par le droit de la propriété intellectuelle. Toute reproduction
            ou représentation, totale ou partielle, sans autorisation préalable est
            interdite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Données personnelles</h2>
          <p>
            Le traitement des données collectées via le formulaire de contact est
            détaillé dans notre{' '}
            <Link to="/confidentialite" className="text-[#003366] font-semibold hover:underline">
              politique de confidentialité
            </Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
