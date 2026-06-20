import { MapPin, Mountain, Building } from 'lucide-react';
import CommunePage from '../CommunePage';

export default function LeCollet() {
  return (
    <CommunePage data={{
      name: "Le Collet d'Allevard",
      slug: "le-collet-allevard",
      heroTitle: "Immobilier au Collet d'Allevard",
      heroSub: "Station de ski familiale en Belledonne : trouvez votre résidence secondaire, votre investissement saisonnier ou votre pied-à-terre montagne.",
      intro: "Le Collet d'Allevard est la station de ski familiale de la vallée, accessible à seulement 11 km d'Allevard-les-Bains. Avec ses pistes orientées nord et son ambiance village, c'est un marché de niche prisé pour les résidences secondaires, les investissements saisonniers (ski l'hiver, randonnée l'été) et les pieds-à-terre montagne à budget maîtrisé.",
      highlights: [
        { icon: Mountain, title: "Ski familial en Belledonne", text: "Une station à taille humaine avec un domaine skiable accessible, idéale pour les familles et les amateurs de montagne authentique." },
        { icon: Building, title: "Petits prix station", text: "Des studios et T2 à des prix bien inférieurs aux grandes stations de Savoie, avec un potentiel locatif saisonnier intéressant (ski + été)." },
        { icon: MapPin, title: "Double saison", text: "Ski et raquettes l'hiver, randonnée et VTT l'été : une occupation saisonnière qui soutient la demande locative toute l'année." }
      ],
      typesOfBiens: [
        "Studio de station", "T2 montagne", "Appartement en résidence",
        "Chalet", "Résidence secondaire", "Investissement saisonnier"
      ],
      whyBuy: "Le Collet d'Allevard offre un ticket d'entrée parmi les plus bas des stations alpines, tout en bénéficiant de la proximité de Grenoble et du réseau thermal d'Allevard. C'est un segment porteur pour l'investissement locatif saisonnier : location ski en hiver, randonnée et montagne en été, avec un rendement brut attractif sur les petites surfaces."
    }} />
  );
}
