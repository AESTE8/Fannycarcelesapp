import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Politique de confidentialité (RGPD). Le formulaire d'avis de valeur collecte
 * des données personnelles : cette page informe sur leur traitement.
 * Les champs entre [crochets] doivent être complétés/validés avant production.
 */
export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-[#001a33] text-white py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Politique de confidentialité</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Responsable du traitement</h2>
          <p>
            Les données collectées sur ce site sont traitées par <strong>Fanny Carceles</strong>,
            conseillère immobilière indépendante (IAD France). Contact :
            fanny.carceles@iadfrance.fr.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Données collectées</h2>
          <p>Via le formulaire de demande d'avis de valeur, nous collectons :</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>Identité : prénom, nom</li>
            <li>Coordonnées : e-mail, téléphone</li>
            <li>Informations sur le bien : type, adresse, surface, nombre de pièces, atouts</li>
            <li>Tout message libre que vous nous transmettez</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Finalité et base légale</h2>
          <p>
            Ces données sont utilisées uniquement pour répondre à votre demande
            d'avis de valeur et vous recontacter dans le cadre de votre projet
            immobilier. La base légale est votre <strong>consentement</strong> et
            l'exécution de mesures précontractuelles prises à votre demande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Destinataires</h2>
          <p>
            Vos données sont destinées à la seule Fanny Carceles, pour le
            traitement de votre demande. Elles ne sont jamais cédées ni revendues
            à des tiers à des fins commerciales. Elles sont stockées via notre
            prestataire technique <strong>Supabase</strong>, qui agit en qualité
            de sous-traitant.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant la durée nécessaire au traitement
            de votre demande, puis archivées ou supprimées au plus tard
            <strong> 3 ans </strong> après le dernier contact, conformément aux
            recommandations de la CNIL en matière de prospection.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification, d'effacement, de limitation, d'opposition et de
            portabilité de vos données. Pour les exercer, écrivez à
            fanny.carceles@iadfrance.fr. Vous pouvez également introduire une
            réclamation auprès de la CNIL (www.cnil.fr).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Cookies</h2>
          <p>
            Ce site n'utilise pas de cookies publicitaires ni de traceurs de suivi.
            <strong> [À vérifier et compléter si des outils de mesure d'audience sont ajoutés.]</strong>
          </p>
        </section>
      </main>
    </div>
  );
}
