import React, { useState } from 'react';
import { authService } from '../services/authService';
import { userService, type User } from '../services/userService';

const ProfileComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const currentUser = authService.getCurrentUser();
    // Données fictives pour la démo si non présentes
    if (currentUser && !currentUser.stats) {
      return {
        ...currentUser,
        location: currentUser.location || 'Paris, France',
        badges: currentUser.badges || ['Expert Reviewer', 'Top 10%'],
        stats: [
          { label: 'Avis', value: 12 },
          { label: 'Likes', value: 450 },
          { label: 'Loops', value: 3 },
          { label: 'Points', value: '1.2k' }
        ],
        dna: [
          { label: 'Type de peau', value: 'Mixte', color: 'bg-blue-100 text-blue-800' },
          { label: 'Teint', value: 'Clair', color: 'bg-orange-100 text-orange-800' },
          { label: 'Sensibilité', value: 'Haute', color: 'bg-red-100 text-red-800' },
          { label: 'Sous-ton', value: 'Neutre', color: 'bg-gray-100 text-gray-800' }
        ]
      };
    }
    return currentUser;
  });
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || 'https://via.placeholder.com/300x400?text=Profile+Photo');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updatedUser = await userService.updateUser(user.id, { name, bio, avatarUrl });
      setUser(updatedUser);
      localStorage.setItem('clutch_user', JSON.stringify(updatedUser));
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
        userService.updateUser(user.id, { avatarUrl: newUrl }).then(updated => {
          setUser(updated);
          localStorage.setItem('clutch_user', JSON.stringify(updated));
        });
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
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
    <div className="py-8 max-w-6xl mx-auto px-4">
      {message && (
        <div className={`p-4 rounded-lg mb-6 fixed top-20 right-4 z-50 shadow-md ${message.startsWith('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Header Full Width */}
      <div className="flex flex-col md:flex-row gap-8 mb-12 items-center md:items-start text-center md:text-left">
        <div className="relative w-48 h-64 md:w-64 md:h-80 bg-gray-200 rounded-2xl overflow-hidden group flex-shrink-0">
          <img 
            src={avatarUrl} 
            alt={user.name || 'User'} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={handleAvatarEdit}
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            title="Modifier la photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mon Compte</h1>
          <p className="text-2xl font-medium text-gray-800 dark:text-gray-200">{user.name || 'Prénom Nom'}</p>
          <p className="text-base text-gray-500 dark:text-gray-400 mb-4">{user.location || 'Localisation non définie'}</p>
          
          <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
            {user.badges?.map((badge, i) => (
              <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {badge}
              </span>
            ))}
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">
              {user.bio || 'Votre bio apparaîtra ici. Parlez-nous de vos goûts et de votre routine beauté.'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Colonne 1/3 - Navigation et Stats */}
        <div className="lg:w-1/3 space-y-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white uppercase text-xs tracking-widest">Navigation</h3>
            </div>
            <nav className="flex flex-col">
              <a href="#profil" className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 transition-colors border-b border-gray-100 dark:border-gray-700">Mon profil</a>
              <a href="#avis" className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 transition-colors border-b border-gray-100 dark:border-gray-700">Mes avis</a>
              <a href="#commandes" className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 transition-colors border-b border-gray-100 dark:border-gray-700">Mes commandes</a>
              <a href="#parametres" className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 transition-colors">Paramètres</a>
            </nav>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white uppercase text-xs tracking-widest">Mes statistiques</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              {user.stats?.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">{stat.label}</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full justify-center md:justify-start py-3 px-4 border border-red-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>

        {/* Colonne 2/3 - ADN Beauté */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-baseline mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mon ADN beauté</h2>
            <button 
              onClick={() => setIsEditing(true)}
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white underline font-medium"
            >
              Modifier le profil
            </button>
          </div>

          {isEditing ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-orange-200 shadow-sm">
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    placeholder="Parlez-nous de vous..."
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.dna?.map((item, i) => (
                <div key={i} className="flex flex-col p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">{item.label}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color.split(' ')[0]}`}>
                       <div className={`w-3 h-3 rounded-full ${item.color.split(' ')[1].replace('text-', 'bg-')}`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
