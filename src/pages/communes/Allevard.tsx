import { MapPin, Mountain, Building } from 'lucide-react';
import CommunePage from '../CommunePage';

export default function Allevard() {
  return (
    <CommunePage data={{
      name: "Allevard-les-Bains",
      slug: "allevard",
      heroTitle: "Immobilier à Allevard-les-Bains",
      heroSub: "Station thermale, montagne et cadre de vie : vendez ou achetez votre bien avec une conseillère qui connaît chaque quartier d'Allevard.",
      intro: "Nichée au pied du massif de Belledonne, Allevard-les-Bains est une commune de 3 962 habitants qui conjugue station thermale réputée, proximité du Collet d'Allevard pour le ski, et cadre de vie à 40 minutes de Grenoble. Son parc immobilier de 3 020 logements se compose à 58 % d'appartements et 41 % de maisons, avec près de 30 % de résidences secondaires — un marché dynamique porté par la cure thermale, le tourisme montagnard et l'investissement locatif.",
      population: "3 962",
      prixAppart: "~1 900",
      prixMaison: "~2 900",
      nbVentes: "104",
      highlights: [
        { icon: Mountain, title: "Station thermale & ski", text: "Thermes reconnus (rhumatologie, voies respiratoires, fibromyalgie) et station du Collet à 11 km. Un double moteur d'attractivité rare." },
        { icon: Building, title: "Marché accessible", text: "Des prix encore abordables par rapport aux grandes stations alpines : studios thermaux dès 60 000 €, T3 centre-ville autour de 160 000 €." },
        { icon: MapPin, title: "Entre Grenoble et Chambéry", text: "À 40 minutes de Grenoble et 45 minutes de Chambéry, Allevard offre un cadre montagnard sans sacrifier l'accès aux métropoles." }
      ],
      typesOfBiens: [
        "Appartement cure thermale", "Studio montagne", "T2/T3 centre-ville",
        "Maison familiale", "Bien vendu loué", "Résidence secondaire",
        "Terrain constructible", "Local commercial"
      ],
      whyBuy: "Allevard combine un rendement locatif intéressant (4 000 curistes/an, tourisme ski/montagne) et une qualité de vie recherchée par les familles et les retraités. Le marché 2025 a compté 104 ventes dont 76 appartements : un volume solide qui témoigne de la liquidité du marché. Que vous cherchiez un pied-à-terre montagne, un investissement meublé thermale ou une résidence principale au calme, Allevard offre un rapport prix-cadre de vie parmi les meilleurs des Alpes."
    }} />
  );
}
