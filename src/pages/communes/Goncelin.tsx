import { MapPin, Mountain, Building } from 'lucide-react';
import CommunePage from '../CommunePage';

export default function Goncelin() {
  return (
    <CommunePage data={{
      name: "Goncelin",
      slug: "goncelin",
      heroTitle: "Immobilier à Goncelin",
      heroSub: "Village résidentiel au cœur du Grésivaudan : un marché calme et familial entre vallée et montagne.",
      intro: "Goncelin est un village résidentiel de la vallée du Grésivaudan, niché entre l'Isère et le massif de Belledonne. À une vingtaine de minutes de Grenoble, il offre un cadre de vie rural et familial avec un accès direct aux services de Pontcharra et Crolles, tout en restant proche d'Allevard et de ses thermes.",
      highlights: [
        { icon: MapPin, title: "Cadre vallée calme", text: "Un village à taille humaine dans le Grésivaudan, apprécié pour son calme et son environnement agricole et montagnard." },
        { icon: Building, title: "Prix attractifs", text: "Des prix au m² parmi les plus accessibles du Grésivaudan, qui attirent les primo-accédants et les familles à la recherche d'espace." },
        { icon: Mountain, title: "Nature & proximité", text: "Randonnées en Belledonne, berges de l'Isère, et un accès rapide à Grenoble, Pontcharra et Allevard." }
      ],
      typesOfBiens: [
        "Maison de village", "Maison avec terrain", "Appartement",
        "Terrain constructible", "Bien à rénover", "Résidence familiale"
      ],
      whyBuy: "Goncelin séduit les acquéreurs qui cherchent l'espace et le calme à un prix maîtrisé, tout en restant connectés à la vallée. C'est un marché de niche pour les maisons avec jardin et les terrains, dans un secteur où la demande familiale reste soutenue."
    }} />
  );
}
