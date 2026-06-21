import React, { useState } from 'react';
import { authService } from '../services/authService';
import { userService, type User } from '../services/userService';

const ProfileComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updatedUser = await userService.updateUser(user.id, { name, bio });
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
    <div className="py-12 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mon Profil</h1>
          <button 
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Déconnexion
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.startsWith('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom</label>
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
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</h3>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nom</h3>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">{user.name || 'Non renseigné'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bio</h3>
              <p className="mt-1 text-lg text-gray-900 dark:text-white whitespace-pre-wrap">{user.bio || 'Aucune bio.'}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Modifier le profil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
