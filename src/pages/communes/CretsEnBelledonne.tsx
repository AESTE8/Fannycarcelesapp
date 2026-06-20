import { MapPin, Mountain, Building } from 'lucide-react';
import CommunePage from '../CommunePage';

export default function CretsEnBelledonne() {
  return (
    <CommunePage data={{
      name: "Crêts-en-Belledonne",
      slug: "crets-en-belledonne",
      heroTitle: "Immobilier à Crêts-en-Belledonne",
      heroSub: "Maisons familiales, terrains constructibles et cadre de vie en Belledonne : un marché résidentiel en plein essor aux portes d'Allevard.",
      intro: "Commune née de la fusion de plusieurs villages au pied de Belledonne, Crêts-en-Belledonne attire les familles et primo-accédants à la recherche de maisons avec terrain, dans un cadre montagnard préservé tout en restant proches de Grenoble et de la vallée du Grésivaudan. Le marché est dominé par les maisons individuelles et les terrains constructibles.",
      highlights: [
        { icon: Mountain, title: "Cadre montagnard préservé", text: "Des hameaux authentiques, des vues sur Belledonne et un environnement naturel à quelques minutes d'Allevard et de la vallée." },
        { icon: Building, title: "Maisons & terrains", text: "Un marché résidentiel orienté maisons familiales avec jardin et terrains constructibles. Des opportunités de rénovation à prix attractifs." },
        { icon: MapPin, title: "Proximité vallée", text: "Accès rapide à la vallée du Grésivaudan, aux commerces d'Allevard et aux axes vers Grenoble et Chambéry." }
      ],
      typesOfBiens: [
        "Maison familiale", "Maison de village", "Terrain constructible",
        "Bien à rénover", "Maison avec vue", "Primo-accession"
      ],
      whyBuy: "Crêts-en-Belledonne offre des prix au m² encore très raisonnables pour une maison avec terrain en Belledonne. Les terrains constructibles y sont encore disponibles — un avantage de plus en plus rare dans la vallée. C'est un choix idéal pour les familles qui veulent un cadre montagnard sans renoncer à la proximité des services et des transports."
    }} />
  );
}
