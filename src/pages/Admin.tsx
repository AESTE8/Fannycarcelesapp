import React, { useEffect, useState } from 'react';
import { Users, Home, Calendar, MapPin, Mail, Phone, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  address: string;
  surface: number;
  rooms: number;
  message?: string;
  features?: string[];
  createdAt: any;
  status: string;
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData: Lead[] = [];
      snapshot.forEach((doc) => {
        leadsData.push({ id: doc.id, ...doc.data() } as Lead);
      });
      setLeads(leadsData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching leads:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Date inconnue';
    
    // Handle Firestore Timestamp
    if (timestamp instanceof Timestamp || (timestamp.seconds && timestamp.nanoseconds)) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString('fr-FR', { 
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    }
    
    // Fallback for other formats
    try {
      return new Date(timestamp).toLocaleDateString('fr-FR', { 
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return 'Date invalide';
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-6">
            <img 
              src="/profil.jpg" 
              alt="Fanny Carceles" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Espace Conseillère</h2>
          <p className="text-slate-500 mb-8">Connectez-vous avec votre compte Google pour voir vos prospects</p>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-[#003366] text-white py-3 rounded-xl font-bold hover:bg-[#002244] transition-colors flex items-center justify-center gap-2"
          >
            Se connecter avec Google
          </button>
          
          <div className="mt-6 text-center">
            <Link className="text-sm text-slate-500 hover:text-[#003366]" to="/">
              &larr; Retour au site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/profil.jpg" 
              alt="Fanny Carceles" 
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <h1 className="font-bold text-lg text-slate-900">Tableau de bord</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-slate-500 hover:text-[#003366] font-medium">
              Voir le site
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Demandes d'estimation</h2>
            <p className="text-slate-500 mt-1">Vous avez {leads.length} demandes de contact.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            <p className="mt-4 text-slate-500">Chargement des données...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Aucune demande pour le moment</h3>
            <p className="text-slate-500">Les formulaires remplis sur votre site apparaîtront ici.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-[#003366] rounded-full flex items-center justify-center font-bold">
                      {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{lead.firstName} {lead.lastName}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(lead.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${lead.phone}`} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1.5">
                      <Phone className="w-4 h-4" /> Appeler
                    </a>
                    <a href={`mailto:${lead.email}`} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-1.5">
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Détails du bien</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Home className="w-5 h-5 text-slate-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900">{lead.propertyType}</p>
                            <p className="text-sm text-slate-500">{lead.surface} m² • {lead.rooms} pièces</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900">Adresse</p>
                            <p className="text-sm text-slate-500">{lead.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Informations complémentaires</h4>
                      {(!lead.features || lead.features.length === 0) && !lead.message ? (
                        <p className="text-sm text-slate-400 italic">Aucune information complémentaire</p>
                      ) : (
                        <div className="space-y-4">
                          {lead.features && lead.features.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {lead.features.map((feature, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-blue-50 text-[#003366] text-xs font-bold rounded-full border border-blue-100">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}
                          {lead.message && (
                            <div className="bg-slate-50 rounded-xl p-4 text-slate-700 text-sm border border-slate-100">
                              {lead.message}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
