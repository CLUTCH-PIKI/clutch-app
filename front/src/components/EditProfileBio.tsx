import React, { useState } from 'react';
import { type User } from '../store/userStore';

interface EditProfileBioProps {
  user: User;
  onSave: (data: { name: string; location: string; bio: string }) => Promise<void>;
  onCancel: () => void;
  onAvatarEdit: () => void;
}

const EditProfileBio: React.FC<EditProfileBioProps> = ({ user, onSave, onCancel, onAvatarEdit }) => {
  const [name, setName] = useState(user.personalInfo.name || '');
  const [location, setLocation] = useState(user.personalInfo.location || '');
  const [bio, setBio] = useState(user.personalInfo.bio || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({ name, location, bio });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 mb-12 items-center md:items-start w-full">
      {/* Avatar Section (Structure identique à ProfileBio) */}
      <div className="relative w-48 h-64 md:w-60 md:h-80 bg-gray-100 group flex-shrink-0 border border-gray-100 dark:border-gray-800">
        <img 
          src={user.personalInfo.avatarUrl || 'https://via.placeholder.com/300x400?text=Profile+Photo'} 
          alt={user.personalInfo.name || 'User'} 
          className="w-full h-full object-cover filter grayscale"
        />
        <button 
          type="button"
          onClick={onAvatarEdit}
          className="absolute -bottom-4 -right-4 bg-clutch-black dark:bg-white p-3 shadow-xl hover:bg-clutch-coral dark:hover:bg-clutch-coral transition-colors z-10 clutch-hover-wiggle"
          title="Modifier la photo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white dark:text-clutch-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <div className="absolute inset-0 bg-clutch-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-[10px] font-black uppercase tracking-widest">Édition en cours</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col pt-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
          <div className="text-center md:text-left flex-grow">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <h1 className="text-5xl font-black uppercase tracking-tighter text-clutch-black dark:text-white leading-none">
                Mon Compte
              </h1>
            </div>
            
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl font-bold uppercase tracking-widest text-gray-400 bg-transparent border-2 border-gray-200 dark:border-gray-800 focus:border-clutch-black dark:focus:border-white outline-none w-full max-w-[350px] transition-colors px-4 py-2"
                placeholder="PRÉNOM NOM"
              />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-xs font-bold uppercase tracking-widest text-gray-400 italic bg-transparent border-2 border-gray-200 dark:border-gray-800 focus:border-clutch-black dark:focus:border-white outline-none transition-colors w-full max-w-[350px] px-4 py-1"
                placeholder="LOCALISATION"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0 justify-center md:justify-end opacity-50">
            {user.personalInfo.badges?.map((badge, i) => (
              <span key={i} className="px-4 py-1.5 border border-clutch-coral text-clutch-coral text-[9px] font-black uppercase tracking-[0.2em]">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[350px] text-center md:text-left mb-8">
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full text-lg font-medium leading-relaxed text-gray-400 bg-transparent border-2 border-gray-200 dark:border-gray-800 focus:border-clutch-black dark:focus:border-white outline-none resize-none min-h-[120px] transition-colors p-4"
            placeholder="Votre bio apparaîtra ici. Parlez-nous de vos goûts et de votre routine beauté."
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button 
            type="button"
            onClick={onCancel}
            className="w-12 h-12 flex items-center justify-center border-2 border-clutch-coral bg-white text-clutch-coral hover:bg-clutch-coral hover:text-white dark:bg-clutch-black transition-all clutch-hover-wiggle"
            title="Annuler"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button 
            type="submit"
            disabled={isSaving}
            className="w-12 h-12 flex items-center justify-center border-2 border-clutch-blue bg-white text-clutch-blue hover:bg-clutch-blue hover:text-white dark:bg-clutch-black disabled:opacity-50 transition-all clutch-hover-wiggle"
            title="Enregistrer"
          >
            {isSaving ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileBio;
