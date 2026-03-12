import React, { useState, useEffect, useRef } from 'react';
import { Building, Home as HomeIcon, MapPin, Phone, Mail, CheckCircle2, ArrowRight, Star, Quote, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types pour l'API Adresse
interface AddressFeature {
  properties: {
    label: string;
    context: string;
  };
}

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: 'Appartement',
    address: '',
    surface: '',
    rooms: '',
    features: [] as string[],
    message: ''
  });
  
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  const PROPERTY_FEATURES = [
    'Balcon', 'Terrasse', 'Jardin', 'Garage / Parking', 
    'Cave', 'Ascenseur', 'Vue dégagée', 'Refait à neuf', 
    'Dernier étage', 'Lumineux', 'Calme', 'Piscine'
  ];

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // États pour l'autocomplétion de l'adresse
  const [addressSuggestions, setAddressSuggestions] = useState<AddressFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressRef = useRef<HTMLDivElement>(null);

  // Fermer les suggestions si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setFormData({ ...formData, address: query });
    
    if (query.length > 3) {
      try {
        // Utilisation de l'API gratuite du gouvernement français (Base Adresse Nationale)
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        setAddressSuggestions(data.features);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Erreur lors de la recherche d'adresse:", error);
      }
    } else {
      setAddressSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectAddress = (address: string) => {
    setFormData({ ...formData, address });
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      
      await addDoc(collection(db, 'leads'), {
        ...formData,
        surface: parseInt(formData.surface) || 0,
        rooms: parseInt(formData.rooms) || 0,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      
      setIsSuccess(true);
      setShowOtherInput(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviews = [
    {
      name: "Daniel",
      title: "Très bon service",
      text: "Toujours disponible, rapide dans la résolution d'une ou autre difficulté. Je recommande vivement !",
      date: "19/01/2026"
    },
    {
      name: "Romain.F",
      title: "Disponibilité efficacité",
      text: "Fanny est d'une grande disponibilité, passionnée par son métier, ce qui facilite grandement votre projet immobilier, car tout deviens très simple grace à son professionnalisme et la connaissance de son métier. Je vous la recommande grandement si vous avez un projet immobilier , vente, achat estimation ou autre , et notamment sur la commune d'Allevard que Fanny connait très bien.",
      date: "19/01/2026"
    },
    {
      name: "Carole D",
      title: "Très bon travail",
      text: "Mme Carceles nous a accompagné dans la vente d'un bien. Étant à distance nous cherchions une personne de confiance qui pourrait s'occuper de tout de A à Z. Paris réussi. De plus, la communication est très facile et sa réactivité sans faille. Nous recommandons vivement.",
      date: "12/01/2026"
    },
    {
      name: "Pierre.",
      title: "Transaction parfaite.",
      text: "Bonne connaissance des lieux et du bien à vendre, bonne connaissance du fonctionnement de la copro et des prestations du bien à vendre. Disponibilité, réactivité et réponses à nos questions données rapidement par mail ou téléphone. Liens avec le vendeur et le notaire très appréciable. Merci.",
      date: "16/04/2025"
    },
    {
      name: "MAD",
      title: "Excellente collaboration",
      text: "Nous avons confié la vente de notre logement à Fanny Carcélès. Elle géra notre affaire de manière très professionnelle. A l'écoute et bienveillante, elle a su nous mettre en confiance. Ses conseils furent pertinents et fructueux. Nous vous souhaitons une belle continuation",
      date: "10/04/2025"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#003366] selection:text-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Remplacement du carré par une photo de profil ronde */}
            <img 
              src="https://images.iadfrance.fr/profile-picture/d9/2d/03/d92d0312cbef74b230ef7fd2894e55ed153c9303b43e32c15cfc558f41c10959.png?format=auto&width=640" 
              alt="Fanny Carceles" 
              className="w-12 h-12 rounded-full object-cover border-2 border-[#003366]/10 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="font-bold text-xl text-[#003366] leading-tight tracking-tight">Fanny Carceles</h1>
              <p className="text-sm text-slate-500 font-medium">Conseillère IAD France</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-semibold text-slate-600 hover:text-[#003366] transition-colors">Mes services</a>
            <a href="#avis" className="text-sm font-semibold text-slate-600 hover:text-[#003366] transition-colors">Avis clients</a>
            <a href="#estimation" className="text-sm font-semibold text-slate-600 hover:text-[#003366] transition-colors">Estimer mon bien</a>
            <a href="tel:+33645003752" className="flex items-center gap-2 bg-[#003366]/5 text-[#003366] px-4 py-2 rounded-full font-bold hover:bg-[#003366]/10 transition-colors">
              <Phone className="w-4 h-4" />
              06 45 00 37 52
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#001a33] text-white pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=2000&q=80" 
            alt="Vallée du Grésivaudan" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a33] via-[#001a33]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>Votre conseillère de confiance sur Allevard et ses environs</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Vendez votre bien au <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">meilleur prix</span>.
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-xl">
              De l'estimation précise à la signature chez le notaire, je vous accompagne à chaque étape avec la puissance du réseau IAD France.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#estimation" className="bg-white text-[#003366] px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-slate-50 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2 hover:-translate-y-0.5">
                Estimer mon bien <ArrowRight className="w-5 h-5" />
              </a>
              <a href="https://www.iadfrance.fr/conseiller-immobilier/fanny.carceles" target="_blank" rel="noopener noreferrer" className="border border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Voir ma page IAD <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Pourquoi me confier votre projet ?</h3>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Une approche humaine et professionnelle pour concrétiser votre vente dans les meilleures conditions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Expertise Locale", desc: "Une connaissance pointue du marché immobilier local pour une estimation juste et précise de votre bien." },
              { icon: Building, title: "Réseau IAD France", desc: "La force du 1er réseau de mandataires en France pour une diffusion massive et ciblée de votre annonce." },
              { icon: CheckCircle2, title: "Accompagnement de A à Z", desc: "Je gère les visites, la négociation et les démarches administratives jusqu'à l'acte authentique." }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
              >
                <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 text-[#003366] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#003366] group-hover:text-white transition-all duration-300">
                  <service.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h4>
                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="avis" className="py-24 bg-slate-50 border-y border-slate-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Ils m'ont fait confiance</h3>
              <p className="text-lg text-slate-500 font-medium">Découvrez les retours de mes clients sur leur expérience.</p>
            </div>
            <a href="https://www.iadfrance.fr/conseiller-immobilier/fanny.carceles" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#003366] font-bold hover:underline">
              Voir tous les avis sur IAD France <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="relative w-full py-4">
          {/* Gradient overlays for smooth fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex gap-6 animate-marquee whitespace-nowrap w-max px-6">
            {[...reviews, ...reviews].map((review, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative whitespace-normal flex flex-col w-[320px] md:w-[400px] flex-shrink-0"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-50 opacity-50" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-3">{review.title}</h4>
                <p className="text-slate-700 leading-relaxed mb-8 relative z-10 font-medium line-clamp-6">"{review.text}"</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                  <span className="font-bold text-slate-900">{review.name}</span>
                  <span className="text-sm text-slate-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimation Form Section */}
      <section id="estimation" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
            <div className="bg-[#003366] p-10 md:p-16 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
              </div>
              <h3 className="text-4xl font-extrabold mb-4 relative z-10 tracking-tight">Vous souhaitez vendre ?</h3>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto relative z-10 font-light">
                Remplissez ce formulaire en quelques secondes. Je vous recontacterai rapidement pour vous proposer une estimation gratuite et confidentielle.
              </p>
            </div>
            
            <div className="p-8 md:p-12 lg:p-16">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-3xl font-bold text-emerald-900 mb-4 tracking-tight">Demande envoyée !</h4>
                    <p className="text-emerald-700 text-lg mb-8">
                      Merci pour votre confiance. Je vous recontacterai très prochainement au <strong>{formData.phone}</strong> pour discuter de votre projet.
                    </p>
                    <button 
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          firstName: '', lastName: '', email: '', phone: '',
                          propertyType: 'Appartement', address: '', surface: '', rooms: '', features: [], message: ''
                        });
                      }}
                      className="text-[#003366] font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
                    >
                      Envoyer une autre demande <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <h4 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">1. Votre bien</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Type de bien *</label>
                          <select 
                            name="propertyType" 
                            required
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium"
                          >
                            <option value="Appartement">Appartement</option>
                            <option value="Maison">Maison</option>
                            <option value="Terrain">Terrain</option>
                            <option value="Immeuble">Immeuble</option>
                            <option value="Autre">Autre</option>
                          </select>
                        </div>
                        
                        {/* Champ Adresse avec Autocomplétion */}
                        <div className="relative" ref={addressRef}>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Adresse du bien *</label>
                          <input 
                            type="text" 
                            name="address" 
                            required
                            autoComplete="off"
                            placeholder="Ex: 12 rue de la Paix, 75000 Paris"
                            value={formData.address}
                            onChange={handleAddressChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium"
                          />
                          
                          {/* Dropdown des suggestions d'adresse */}
                          <AnimatePresence>
                            {showSuggestions && addressSuggestions.length > 0 && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden"
                              >
                                {addressSuggestions.map((suggestion, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => selectAddress(suggestion.properties.label)}
                                    className="w-full text-left px-5 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors"
                                  >
                                    <p className="font-medium text-slate-900">{suggestion.properties.label}</p>
                                    <p className="text-xs text-slate-500">{suggestion.properties.context}</p>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Surface (m²) *</label>
                          <input 
                            type="number" 
                            name="surface" 
                            required
                            min="1"
                            placeholder="Ex: 85"
                            value={formData.surface}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre de pièces *</label>
                          <input 
                            type="number" 
                            name="rooms" 
                            required
                            min="1"
                            placeholder="Ex: 4"
                            value={formData.rooms}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                      <h4 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">2. Vos coordonnées</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Prénom *</label>
                          <input 
                            type="text" 
                            name="firstName" 
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Nom *</label>
                          <input 
                            type="text" 
                            name="lastName" 
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                          <input 
                            type="email" 
                            name="email" 
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Téléphone *</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Atouts du bien (optionnel)</label>
                        <div className="flex flex-wrap gap-2">
                          {PROPERTY_FEATURES.map(feature => (
                            <button
                              key={feature}
                              type="button"
                              onClick={() => toggleFeature(feature)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                                formData.features.includes(feature)
                                  ? 'bg-[#003366] text-white border-[#003366] shadow-md transform scale-105'
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#003366]/30 hover:bg-slate-50'
                              }`}
                            >
                              {feature}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setShowOtherInput(!showOtherInput)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                              showOtherInput || formData.message.length > 0
                                ? 'bg-[#003366] text-white border-[#003366] shadow-md transform scale-105'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-[#003366]/30 hover:bg-slate-50'
                            }`}
                          >
                            Autres...
                          </button>
                        </div>
                        <AnimatePresence>
                          {showOtherInput && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              className="overflow-hidden"
                            >
                              <textarea 
                                name="message" 
                                rows={3}
                                placeholder="Précisez les autres atouts ou ajoutez un message..."
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/10 focus:border-[#003366] outline-none bg-slate-50 transition-all font-medium resize-none"
                              ></textarea>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#003366] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#002244] transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Envoi en cours...
                        </span>
                      ) : (
                        'Demander mon estimation gratuite'
                      )}
                    </button>
                    <p className="text-sm text-slate-500 text-center mt-6 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Vos données sont sécurisées et strictement confidentielles.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001a33] text-slate-400 py-16 text-center border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <img 
            src="https://images.iadfrance.fr/profile-picture/d9/2d/03/d92d0312cbef74b230ef7fd2894e55ed153c9303b43e32c15cfc558f41c10959.png?format=auto&width=640" 
            alt="Fanny Carceles" 
            className="w-16 h-16 rounded-full object-cover border-2 border-white/20 mx-auto mb-6 grayscale hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <h4 className="text-white font-bold text-xl mb-2 tracking-tight">Fanny Carceles</h4>
          <p className="mb-8 font-medium">Conseillère Indépendante en Immobilier - IAD France</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
            <a href="mailto:fanny.carceles@iadfrance.fr" className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-colors flex items-center gap-3 text-white">
              <Mail className="w-5 h-5" /> fanny.carceles@iadfrance.fr
            </a>
            <a href="tel:+33645003752" className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-colors flex items-center gap-3 text-white">
              <Phone className="w-5 h-5" /> 06 45 00 37 52
            </a>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} Fanny Carceles. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="https://www.iadfrance.fr/conseiller-immobilier/fanny.carceles" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Page IAD France</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
