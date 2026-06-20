/**
 * Point d'entrée SSR pour le pré-rendu au build (SSG).
 * Rend en HTML statique les pages publiques afin que le contenu soit visible
 * des moteurs de recherche et des crawlers IA (qui n'exécutent pas le JS).
 *
 * /admin est volontairement exclu (page privée, ne doit pas être indexée et
 * importe Supabase au chargement).
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
      </Routes>
    </StaticRouter>,
  );
}

// Liste des routes à pré-rendre (consommée par prerender.mjs).
export const ROUTES = ['/', '/mentions-legales', '/confidentialite'];
