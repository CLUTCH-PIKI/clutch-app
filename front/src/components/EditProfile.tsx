import React, { useState } from 'react';
import { type User } from '../store/userStore';

interface CriteriaData {
  ageRange: string;
  monthlyBudget: string;
  phenotype: string;
  hairType: string;
  hairColor: string;
  makeupStyle: string;
  skinConcerns: string[];
}

interface EditProfileProps {
  user: User;
  onSave: (updatedCriteria: CriteriaData) => Promise<void>;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSave, onClose }) => {
  // Initialisation des états avec les valeurs actuelles du user ou valeurs par défaut
  const [criteria, setCriteria] = useState<CriteriaData>(() => {
    const defaultCriteria = {
      ageRange: '25-34',
      monthlyBudget: '50€ - 100€',
      phenotype: 'Médium',
      hairType: 'Bouclés',
      hairColor: 'Châtain',
      makeupStyle: 'Naturel',
      skinConcerns: ['Hydratation']
    };
    
    const userCriteria = user.criteria.criteria;

    // Tentative de récupération depuis user.criteria si structuré comme CriteriaData
    if (userCriteria && !Array.isArray(userCriteria)) {
      return { ...defaultCriteria, ...userCriteria as unknown as CriteriaData };
    }
    
    // Si c'est l'ancien format (tableau), on essaie de mapper
    if (Array.isArray(userCriteria)) {
      const mapped: Partial<CriteriaData> = {};
      userCriteria.forEach(item => {
        if (item.label === 'Tranche d\'âge') mapped.ageRange = item.value;
        if (item.label === 'Budget') mapped.monthlyBudget = item.value;
        if (item.label === 'Phénotype') mapped.phenotype = item.value;
        if (item.label === 'Type Cheveux') mapped.hairType = item.value;
        if (item.label === 'Couleur Cheveux') mapped.hairColor = item.value;
        if (item.label === 'Style Maquillage') mapped.makeupStyle = item.value;
        if (item.label === 'Problématiques') mapped.skinConcerns = item.value.split(', ');
      });
      return { ...defaultCriteria, ...mapped };
    }

    return { ...defaultCriteria }; 
  });

  const ageOptions = ['18-24', '25-34', '35-44', '45+'];
  const budgetOptions = ['< 50€', '50€ - 100€', '100€ - 200€', '> 200€'];
  const phenotypeOptions = [
    { name: 'Très Clair', color: '#FAD4D4' },
    { name: 'Clair', color: '#F7C197' },
    { name: 'Médium', color: '#D2B48C' },
    { name: 'Mat', color: '#8B4513' },
    { name: 'Foncé', color: '#5D3A1A' }
  ];
  const hairTypeOptions = ['Raides', 'Ondulés', 'Bouclés', 'Crépus'];
  const hairColorOptions = [
    { name: 'Blond', color: '#FAF0BE' },
    { name: 'Châtain', color: '#8B4513' },
    { name: 'Roux', color: '#D2691E' },
    { name: 'Brun', color: '#2C1B18' },
    { name: 'Noir', color: '#000000' }
  ];
  const makeupOptions = ['Minimaliste', 'Naturel', 'Sophistiqué', 'Artistique'];
  const skinConcernOptions = ['Hydratation', 'Anti-âge', 'Éclat', 'Imperfections', 'Sensibilité', 'Taches', 'Pores'];

  const toggleSkinConcern = (concern: string) => {
    setCriteria(prev => ({
      ...prev,
      skinConcerns: prev.skinConcerns.includes(concern)
        ? prev.skinConcerns.filter(c => c !== concern)
        : [...prev.skinConcerns, concern]
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(criteria);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1A1A1A] border-2 border-clutch-black dark:border-white w-full max-w-5xl p-10 md:p-16 overflow-y-auto max-h-[90vh]">
      <div className="mb-16 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-clutch-black dark:text-white uppercase tracking-tighter mb-4">Votre ADN beauté</h2>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Personnalisez votre profil pour des recommandations ultra-précises</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-20">
        {/* Tranche d'âge */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-clutch-coral mb-6">Tranche d'âge</h3>
          <div className="grid grid-cols-2 gap-4">
            {ageOptions.map(option => (
              <button
                key={option}
                onClick={() => setCriteria({ ...criteria, ageRange: option })}
                className={`py-4 border-2 font-bold text-xs uppercase tracking-widest transition-all ${
                  criteria.ageRange === option 
                  ? 'border-clutch-black dark:border-white bg-clutch-black text-white dark:bg-white dark:text-clutch-black' 
                  : 'border-gray-100 dark:border-gray-800 text-gray-400 hover:border-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        {/* Budget mensuel */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-clutch-coral mb-6">Budget mensuel</h3>
          <div className="space-y-4">
            {budgetOptions.map(option => (
              <div 
                key={option}
                onClick={() => setCriteria({ ...criteria, monthlyBudget: option })}
                className="flex items-center justify-between group cursor-pointer"
              >
                <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${criteria.monthlyBudget === option ? 'text-clutch-black dark:text-white' : 'text-gray-400'}`}>Investissement</span>
                <div className={`flex-grow mx-4 border-b border-dotted ${criteria.monthlyBudget === option ? 'border-clutch-black dark:border-white' : 'border-gray-200'}`}></div>
                <span className={`text-xs font-black uppercase tracking-widest transition-colors ${criteria.monthlyBudget === option ? 'text-clutch-coral' : 'text-gray-400'}`}>{option}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Phénotype */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-clutch-coral mb-6">Phénotype</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {phenotypeOptions.map(opt => (
              <button
                key={opt.name}
                onClick={() => setCriteria({ ...criteria, phenotype: opt.name })}
                className="group flex flex-col items-center"
              >
                <div 
                  className={`w-full aspect-square border-2 mb-2 transition-all ${criteria.phenotype === opt.name ? 'border-clutch-black dark:border-white p-1' : 'border-transparent group-hover:border-gray-200'}`}
                >
                  <div className="w-full h-full" style={{ backgroundColor: opt.color }}></div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${criteria.phenotype === opt.name ? 'text-clutch-black dark:text-white' : 'text-gray-400'}`}>
                  {opt.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Type de cheveux */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-clutch-coral mb-6">Type de cheveux</h3>
          <div className="grid grid-cols-2 gap-4">
            {hairTypeOptions.map(option => (
              <button
                key={option}
                onClick={() => setCriteria({ ...criteria, hairType: option })}
                className={`py-4 border-2 font-bold text-xs uppercase tracking-widest transition-all ${
                  criteria.hairType === option 
                  ? 'border-clutch-black dark:border-white bg-clutch-black text-white dark:bg-white dark:text-clutch-black' 
                  : 'border-gray-100 dark:border-gray-800 text-gray-400 hover:border-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        {/* Couleur de cheveux - Full Width */}
        <section className="md:col-span-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-clutch-coral mb-6">Couleur de cheveux</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {hairColorOptions.map(opt => (
              <button
                key={opt.name}
                onClick={() => setCriteria({ ...criteria, hairColor: opt.name })}
                className={`flex items-center gap-4 p-4 border-2 transition-all ${
                  criteria.hairColor === opt.name 
                  ? 'border-clutch-black dark:border-white bg-gray-50 dark:bg-gray-900' 
                  : 'border-gray-100 dark:border-gray-800 hover:border-gray-200'
                }`}
              >
                <div className="w-6 h-6 shrink-0" style={{ backgroundColor: opt.color }}></div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${criteria.hairColor === opt.name ? 'text-clutch-black dark:text-white' : 'text-gray-400'}`}>
                  {opt.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Style de maquillage - Full Width */}
        <section className="md:col-span-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-clutch-coral mb-6">Style de maquillage</h3>
          <div className="flex flex-wrap gap-4">
            {makeupOptions.map(option => (
              <button
                key={option}
                onClick={() => setCriteria({ ...criteria, makeupStyle: option })}
                className={`px-8 py-4 border-2 font-bold text-xs uppercase tracking-widest transition-all ${
                  criteria.makeupStyle === option 
                  ? 'border-clutch-black dark:border-white bg-clutch-black text-white dark:bg-white dark:text-clutch-black' 
                  : 'border-gray-100 dark:border-gray-800 text-gray-400 hover:border-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        {/* Problématiques peau - Full Width */}
        <section className="md:col-span-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-clutch-coral mb-6">Problématiques peau</h3>
          <div className="flex flex-wrap gap-3">
            {skinConcernOptions.map(option => (
              <button
                key={option}
                onClick={() => toggleSkinConcern(option)}
                className={`px-6 py-2 border font-black text-[9px] uppercase tracking-[0.2em] transition-all ${
                  criteria.skinConcerns.includes(option)
                  ? 'border-clutch-coral bg-clutch-coral text-white'
                  : 'border-gray-200 text-gray-400 hover:border-clutch-coral hover:text-clutch-coral'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="border-t-2 border-clutch-black dark:border-white pt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] max-w-sm text-center md:text-left leading-relaxed">
            Clutch garantit la confidentialité de votre ADN beauté. Ces données sont utilisées exclusivement pour votre expérience.
          </p>
          <div className="flex gap-6 w-full md:w-auto">
            <button
              onClick={onClose}
              className="flex-grow md:flex-none clutch-button-secondary"
            >
              Quitter
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-grow md:flex-none clutch-button-primary bg-clutch-coral border-clutch-coral hover:bg-white hover:text-clutch-coral dark:hover:bg-clutch-black disabled:opacity-50"
              style={{ boxShadow: '8px 8px 0px rgba(255, 90, 95, 0.2)' }}
            >
              {loading ? 'CHARGEMENT...' : 'ENREGISTRER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
