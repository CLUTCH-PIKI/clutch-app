import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { type User, DEFAULT_CRITERIA_OPTIONS } from '../store/userStore';
import Critere from './Critere';
import EditProfile from './EditProfile';

interface ProfileLocationState {
  openEditProfile?: boolean;
}

const ProfileComponent: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as ProfileLocationState;

  const CRITERE_BORDERS = [
    'border-clutch-blue',
    'border-clutch-coral',
    'border-clutch-orange',
    'border-clutch-black dark:border-white'
  ];

  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [name, setName] = useState(user?.personalInfo.name || '');
  const [bio, setBio] = useState(user?.personalInfo.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(user?.personalInfo.avatarUrl || 'https://via.placeholder.com/300x400?text=Profile+Photo');
  const [isEditingDna, setIsEditingDna] = useState(() => {
    return !!(locationState && locationState.openEditProfile);
  });

  useEffect(() => {
    if (locationState && locationState.openEditProfile) {
      // Nettoyer l'état pour éviter de rouvrir la modale au rafraîchissement
      window.history.replaceState({}, document.title);
    }

    // S'abonner aux changements du store pour garder l'état local synchronisé
    const unsubscribe = authService.subscribeToUserChanges((userState) => {
      if (userState.user) {
        setUser(userState.user);
        setName(userState.user.personalInfo.name || '');
        setBio(userState.user.personalInfo.bio || '');
        setAvatarUrl(userState.user.personalInfo.avatarUrl || 'https://via.placeholder.com/300x400?text=Profile+Photo');
      }
    });

    return () => unsubscribe();
  }, [locationState]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await userService.updateUser(user.personalInfo.id, { name, bio, avatarUrl });
      setIsEditing(false);
      setMessage('Profil mis à jour avec succès !');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Une erreur est survenue';
      setMessage(`Erreur: ${errorMsg}`);
    }
  };

  const handleAvatarEdit = () => {
    const newUrl = prompt('Entrez l\'URL de votre nouvelle photo de profil :', avatarUrl);
    if (newUrl) {
      setAvatarUrl(newUrl);
      if (user) {
        userService.updateUser(user.personalInfo.id, { avatarUrl: newUrl });
      }
    }
  };

  const handleCritereUpdate = async (index: number, newValue: string) => {
    if (!user || !user.criteria.criteria) return;
    
    const newCriteria = [...user.criteria.criteria];
    newCriteria[index] = { ...newCriteria[index], value: newValue };
    
    try {
      await userService.updateUser(user.personalInfo.id, { criteria: newCriteria });
      setMessage('Critère mis à jour avec succès !');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setMessage(`Erreur: ${errorMsg}`);
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  const handleDnaSave = async (updatedDna: {
    ageRange: string;
    monthlyBudget: string;
    phenotype: string;
    hairType: string;
    hairColor: string;
    makeupStyle: string;
    skinConcerns: string[];
  }) => {
    if (!user) return;
    
    try {
      // Transformation des données simplifiées d'EditProfile en structure criteria attendue par l'API
      const newCriteria = [
        { 
          label: 'Tranche d\'âge', 
          value: updatedDna.ageRange, 
          type: 'Démographie', 
          color: 'bg-blue-100 text-blue-800',
          options: DEFAULT_CRITERIA_OPTIONS["Tranche d'âge"]
        },
        { 
          label: 'Budget', 
          value: updatedDna.monthlyBudget, 
          type: 'Profil', 
          color: 'bg-green-100 text-green-800',
          options: DEFAULT_CRITERIA_OPTIONS["Budget"]
        },
        { 
          label: 'Phénotype', 
          value: updatedDna.phenotype, 
          type: 'Carnation', 
          color: 'bg-orange-100 text-orange-800',
          options: DEFAULT_CRITERIA_OPTIONS["Phénotype"]
        },
        { 
          label: 'Type Cheveux', 
          value: updatedDna.hairType, 
          type: 'Cheveux', 
          color: 'bg-purple-100 text-purple-800',
          options: DEFAULT_CRITERIA_OPTIONS["Type Cheveux"]
        },
        { 
          label: 'Couleur Cheveux', 
          value: updatedDna.hairColor, 
          type: 'Cheveux', 
          color: 'bg-yellow-100 text-yellow-800',
          options: DEFAULT_CRITERIA_OPTIONS["Couleur Cheveux"]
        },
        { 
          label: 'Style Maquillage', 
          value: updatedDna.makeupStyle, 
          type: 'Esthétique', 
          color: 'bg-pink-100 text-pink-800',
          options: DEFAULT_CRITERIA_OPTIONS["Style Maquillage"]
        },
        { 
          label: 'Problématiques', 
          value: updatedDna.skinConcerns.join(', '), 
          type: 'Peau', 
          color: 'bg-red-100 text-red-800',
          options: DEFAULT_CRITERIA_OPTIONS["Problématiques"]
        }
      ];

      await userService.updateUser(user.personalInfo.id, { criteria: newCriteria });
      setIsEditingDna(false);
      setMessage('ADN Beauté mis à jour !');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setMessage(`Erreur: ${errorMsg}`);
    }
  };

  if (!user) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Accès refusé</h2>
        <p>Veuillez vous connecter pour accéder à votre profil.</p>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-6xl mx-auto px-6">
      {message && (
        <div className={`p-4 fixed top-24 right-6 z-50 border-l-4 shadow-sm animate-in slide-in-from-right duration-300 ${message.startsWith('Erreur') ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'}`}>
          <p className="text-[10px] font-bold uppercase tracking-widest">{message}</p>
        </div>
      )}

      {/* Header Full Width - Editorial Style */}
      <div className="flex flex-col md:flex-row gap-12 mb-12 items-center md:items-start">
        <div className="relative w-48 h-64 md:w-60 md:h-80 bg-gray-100 group flex-shrink-0 border border-gray-100 dark:border-gray-800">
          <img 
            src={avatarUrl} 
            alt={user.personalInfo.name || 'User'} 
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
          />
          <button 
            onClick={handleAvatarEdit}
            className="absolute -bottom-4 -right-4 bg-clutch-black dark:bg-white p-3 shadow-xl hover:bg-clutch-coral dark:hover:bg-clutch-coral transition-colors"
            title="Modifier la photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white dark:text-clutch-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        <div className="flex-grow flex flex-col pt-4">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-black uppercase tracking-tighter text-clutch-black dark:text-white leading-none mb-4">
                Mon Compte
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <p className="text-xl font-bold uppercase tracking-widest text-gray-400">
                  {user.personalInfo.name || 'Prénom Nom'}
                </p>
                <span className="hidden md:inline text-gray-200">/</span>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 italic">
                  {user.personalInfo.location || 'Localisation non définie'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-8 md:mt-0 justify-center md:justify-end">
              {user.personalInfo.badges?.map((badge, i) => (
                <span key={i} className="px-4 py-1.5 border border-clutch-coral text-clutch-coral text-[9px] font-black uppercase tracking-[0.2em]">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-2xl text-center md:text-left">
            <p className="text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400 font-serif italic">
              "{user.personalInfo.bio || 'Votre bio apparaîtra ici. Parlez-nous de vos goûts et de votre routine beauté.'}"
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Colonne 1/3 - Navigation et Stats */}
        <div className="lg:w-1/3 space-y-12">
          <div className="border-t-2 border-clutch-black dark:border-white pt-6">
            <h3 className="font-black text-clutch-black dark:text-white uppercase text-xs tracking-[0.3em] mb-8">Navigation</h3>
            <nav className="flex flex-col space-y-4">
              <a href="#profil" className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-clutch-coral transition-colors flex items-center justify-between group">
                Mon profil <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a href="#avis" className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-clutch-coral transition-colors flex items-center justify-between group">
                Mes avis <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a href="#commandes" className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-clutch-coral transition-colors flex items-center justify-between group">
                Mes commandes <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a href="#parametres" className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-clutch-coral transition-colors flex items-center justify-between group">
                Paramètres <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </nav>
          </div>

          <div className="border-t-2 border-clutch-black dark:border-white pt-6">
            <h3 className="font-black text-clutch-black dark:text-white uppercase text-xs tracking-[0.3em] mb-8">Statistiques</h3>
            
            <div className="space-y-12">
              {/* Evaluations et Mes UGC */}
              <div className="grid grid-cols-2 gap-x-8">
                <div className="flex flex-col border-l-4 border-clutch-blue pl-4">
                  <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-2">Evaluations</span>
                  <span className="text-4xl font-black text-clutch-black dark:text-white tracking-tighter">{user.personalInfo.stats?.[0]?.value || 0}</span>
                </div>
                <div className="flex flex-col border-l-4 border-clutch-orange pl-4">
                  <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-2">Mes UGC</span>
                  <span className="text-4xl font-black text-clutch-black dark:text-white tracking-tighter">{user.personalInfo.stats?.[1]?.value || 0}</span>
                </div>
              </div>

              {/* Commissions */}
              {user.personalInfo.stats?.[2] && (
                <div className="flex items-center justify-between border-l-4 border-clutch-black dark:border-white pl-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-2">Commissions</span>
                    <span className="text-4xl font-black text-clutch-black dark:text-white tracking-tighter">
                      {Number(user.personalInfo.stats[2].value).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                    </span>
                  </div>
                  <div className="text-clutch-black dark:text-white pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Progression Loop */}
              {user.personalInfo.stats?.[3] && (
                <div className="border-l-4 border-clutch-coral pl-4">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Progression loop</span>
                    <span className="text-[10px] font-black text-clutch-black dark:text-white">
                      {user.personalInfo.stats[3].value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-4 border border-clutch-black dark:border-white">
                    <div 
                      className="bg-clutch-coral h-full transition-all duration-1000" 
                      style={{ width: `${user.personalInfo.stats[3].value}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full py-4 border border-clutch-black dark:border-white text-clutch-black dark:text-white hover:bg-clutch-black hover:text-white dark:hover:bg-white dark:hover:text-clutch-black transition-all font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center"
          >
            Déconnexion
          </button>
        </div>

        {/* Colonne 2/3 - ADN Beauté */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-end mb-12 border-b-2 border-clutch-black dark:border-white pb-6">
            <h2 className="text-4xl font-black text-clutch-black dark:text-white uppercase tracking-tighter">Mon ADN beauté</h2>
            <button 
              onClick={() => setIsEditingDna(true)}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-clutch-black dark:hover:text-white transition-colors underline underline-offset-8 decoration-gray-200"
            >
              Modifier le profil
            </button>
          </div>

          {isEditing ? (
            <div className="bg-white dark:bg-[#1A1A1A] p-10 border border-gray-100 dark:border-gray-800">
              <form onSubmit={handleUpdate} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Nom complet</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-100 dark:border-gray-800 focus:border-clutch-black dark:focus:border-white outline-none transition-colors text-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-100 dark:border-gray-800 focus:border-clutch-black dark:focus:border-white outline-none transition-colors text-xl font-bold"
                    placeholder="Parlez-nous de vous..."
                  />
                </div>
                <div className="flex gap-6 pt-4">
                  <button
                    type="submit"
                    className="clutch-button-primary"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="clutch-button-secondary"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {user.criteria && user.criteria.criteria && Array.isArray(user.criteria.criteria) ? (
                user.criteria.criteria.map((item, i) => (
                  <Critere
                    key={i}
                    label={item.label}
                    value={item.value}
                    type={item.type}
                    color={item.color}
                    borderColor={CRITERE_BORDERS[i % CRITERE_BORDERS.length]}
                    options={item.options}
                    onUpdate={(val) => handleCritereUpdate(i, val)}
                  />
                ))
              ) : (
                <p className="text-gray-400 italic">Aucun critère défini.</p>
              )}
            </div>
          )}
        </div>
      </div>
      {isEditingDna && (
        <div className="fixed inset-0 bg-clutch-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <EditProfile 
            user={user} 
            onSave={handleDnaSave} 
            onClose={() => setIsEditingDna(false)} 
          />
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
