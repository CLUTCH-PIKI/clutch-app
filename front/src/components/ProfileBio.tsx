import React from 'react';
import { type User } from '../store/userStore';

interface ProfileBioProps {
  user: User;
  onEdit: () => void;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ user, onEdit }) => {
  return (
    <div className="flex flex-col md:flex-row gap-12 mb-12 items-center md:items-start w-full">
      <div className="relative w-48 h-64 md:w-60 md:h-80 bg-gray-100 group flex-shrink-0 border border-gray-100 dark:border-gray-800">
        <img 
          src={user.personalInfo.avatarUrl || 'https://via.placeholder.com/300x400?text=Profile+Photo'} 
          alt={user.personalInfo.name || 'User'} 
          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>

      <div className="flex-grow flex flex-col pt-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4 relative">
              <h1 className="text-5xl font-black uppercase tracking-tighter text-clutch-black dark:text-white leading-none">
                Mon Compte
              </h1>
              <button 
                onClick={onEdit}
                className="md:absolute md:-right-12 p-2 text-gray-400 hover:text-clutch-coral transition-colors clutch-hover-wiggle"
                title="Modifier le profil"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-bold uppercase tracking-widest text-clutch-black dark:text-white border-2 border-transparent px-4 py-2 w-full max-w-[350px]">
                {user.personalInfo.name || 'Prénom Nom'}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-clutch-black dark:text-white italic border-2 border-transparent px-4 py-1 w-full max-w-[350px]">
                {user.personalInfo.location || 'Localisation non définie'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0 justify-center md:justify-end">
            {user.personalInfo.badges?.map((badge, i) => (
              <span key={i} className="px-4 py-1.5 border border-clutch-coral text-clutch-coral text-[9px] font-black uppercase tracking-[0.2em] clutch-hover-wiggle cursor-default">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[350px] text-center md:text-left mb-8">
          <p className="text-lg font-medium leading-relaxed text-clutch-black dark:text-white border-2 border-transparent p-4 min-h-[120px]">
            {user.personalInfo.bio || 'Votre bio apparaîtra ici. Parlez-nous de vos goûts et de votre routine beauté.'}
          </p>
        </div>

        {/* Boutons Placeholder pour éviter le décalage de hauteur lors du passage en mode édition */}
        <div className="flex justify-end gap-4 pt-4 opacity-0 pointer-events-none">
          <div className="w-12 h-12 border-2 border-transparent"></div>
          <div className="w-12 h-12 border-2 border-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
