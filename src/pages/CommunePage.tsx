import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone, MapPin, TrendingUp, Home as HomeIcon, Building, Mountain } from 'lucide-react';

interface CommuneData {
  name: string;
  slug: string;
  heroTitle: string;
  heroSub: string;
  intro: string;
  population?: string;
  prixAppart?: string;
  prixMaison?: string;
  nbVentes?: string;
  highlights: { icon: typeof MapPin; title: string; text: string }[];
  typesOfBiens: string[];
  whyBuy: string;
}

export default function CommunePage({ data }: { data: CommuneData }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-[#001a33] text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" /> {data.name}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{data.heroTitle}</h1>
          <p className="text-xl text-slate-300 font-light max-w-2xl">{data.heroSub}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section>
          <p className="text-lg text-slate-700 leading-relaxed">{data.intro}</p>
        </section>

        {(data.population || data.prixAppart || data.prixMaison || data.nbVentes) && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.population && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
                <p className="text-3xl font-extrabold text-[#003366]">{data.population}</p>
                <p className="text-sm text-slate-500 font-medium mt-1">habitants</p>
              </div>
            )}
            {data.prixAppart && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
                <p className="text-3xl font-extrabold text-[#003366]">{data.prixAppart}</p>
                <p className="text-sm text-slate-500 font-medium mt-1">€/m² appart.</p>
              </div>
            )}
            {data.prixMaison && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
                <p className="text-3xl font-extrabold text-[#003366]">{data.prixMaison}</p>
                <p className="text-sm text-slate-500 font-medium mt-1">€/m² maison</p>
              </div>
            )}
            {data.nbVentes && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
                <p className="text-3xl font-extrabold text-[#003366]">{data.nbVentes}</p>
                <p className="text-sm text-slate-500 font-medium mt-1">ventes/an</p>
              </div>
            )}
          </section>
        )}

        <section>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Pourquoi {data.name} ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.highlights.map((h, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center mb-4">
                  <h.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{h.title}</h3>
                <p className="text-slate-600 leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Types de biens à {data.name}</h2>
          <div className="flex flex-wrap gap-3">
            {data.typesOfBiens.map((t, i) => (
              <span key={i} className="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium text-slate-700">{t}</span>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Investir à {data.name}</h2>
          <p className="text-slate-700 leading-relaxed mb-8">{data.whyBuy}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/#avis-valeur" className="bg-[#003366] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[#002244] transition-colors flex items-center justify-center gap-2">
              Obtenir mon avis de valeur gratuit <ArrowRight className="w-5 h-5" />
            </a>
            <a href="tel:+33645003752" className="border border-[#003366]/20 text-[#003366] px-8 py-4 rounded-full font-bold text-center hover:bg-[#003366]/5 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> 06 45 00 37 52
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#001a33] text-slate-400 py-8 text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Fanny Carceles. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
