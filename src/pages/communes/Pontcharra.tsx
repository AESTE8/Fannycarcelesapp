import { MapPin, Mountain, Building } from 'lucide-react';
import CommunePage from '../CommunePage';

export default function Pontcharra() {
  return (
    <CommunePage data={{
      name: "Pontcharra",
      slug: "pontcharra",
      heroTitle: "Immobilier à Pontcharra",
      heroSub: "Au carrefour de la vallée du Grésivaudan : un marché résidentiel dynamique entre Grenoble et Chambéry.",
      intro: "Pontcharra est le pôle urbain du nord-Grésivaudan, situé à mi-chemin entre Grenoble et Chambéry. Dotée d'une gare SNCF, de commerces, de collèges et d'infrastructures sportives, c'est une commune recherchée par les familles actives qui travaillent dans les métropoles voisines tout en souhaitant un cadre de vie au pied des montagnes.",
      highlights: [
        { icon: MapPin, title: "Gare SNCF & axes routiers", text: "Gare TER sur la ligne Grenoble-Chambéry et accès direct à l'A41. Un atout majeur pour les actifs qui travaillent en métropole." },
        { icon: Building, title: "Commerces & services", text: "Centre-ville commerçant, collèges, médiathèque, complexe sportif : une vie de quartier complète sans dépendre de Grenoble." },
        { icon: Mountain, title: "Porte de Belledonne", text: "Accès direct aux vallées de Belledonne (Allevard, Le Collet) et à la Chartreuse. Randonnée, ski et nature à portée de main." }
      ],
      typesOfBiens: [
        "Appartement centre-ville", "Maison familiale", "T3/T4 avec balcon",
        "Maison avec jardin", "Bien locatif", "Primo-accession"
      ],
      whyBuy: "Pontcharra offre le meilleur compromis accessibilité-prix de la vallée du Grésivaudan : des prix encore modérés par rapport à Grenoble, une desserte ferroviaire et routière efficace, et un cadre de vie familial au pied de Belledonne. Un marché porteur tant pour la résidence principale que pour l'investissement locatif (forte demande de location grâce à la gare TER)."
    }} />
  );
}
