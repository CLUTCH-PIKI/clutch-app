import React, { useState } from 'react';
import { COLOR_MAP } from '../store/userStore';

interface CritereFormProps {
  label: string;
  currentValue: string;
  options: string[];
  color: string;
  onSave: (newValue: string) => Promise<void>;
  onClose: () => void;
}

const CritereForm: React.FC<CritereFormProps> = ({ label, currentValue, options, color, onSave, onClose }) => {
  const [selected, setSelected] = useState(currentValue);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(selected);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1A1A1A] border-2 border-clutch-black dark:border-white max-w-lg w-full p-12">
      <div className="flex flex-col">
        <h2 className="text-5xl font-black text-center text-clutch-black dark:text-white mb-4 uppercase tracking-tighter">Modifier</h2>
        <h3 className="text-xl font-bold text-center text-gray-400 mb-12 uppercase tracking-widest">{label}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {options.map((option) => (
            <label 
              key={option}
              className={`flex items-center justify-between p-6 border-2 transition-all cursor-pointer group ${
                selected === option 
                ? 'border-clutch-black dark:border-white bg-clutch-black/5' 
                : 'border-gray-100 dark:border-gray-800 hover:border-clutch-coral'
              }`}
            >
              <div className="flex items-center gap-6">
                <div 
                  className={`w-6 h-6 rounded-full border border-gray-100 dark:border-gray-800 transition-transform group-hover:scale-110 ${!COLOR_MAP[option] ? color.split(' ')[0] : ''}`}
                  style={COLOR_MAP[option] ? { backgroundColor: COLOR_MAP[option] } : {}}
                ></div>
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${selected === option ? 'text-clutch-black dark:text-white' : 'text-gray-400'}`}>
                  {option}
                </span>
              </div>
              
              <input 
                type="radio" 
                name="critere-option"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="hidden"
              />
              <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${
                selected === option ? 'border-clutch-black dark:border-white bg-clutch-black dark:bg-white' : 'border-gray-200 dark:border-gray-700'
              }`}>
                {selected === option && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white dark:text-clutch-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </label>
          ))}
        </div>

        <div className="border-t-2 border-gray-100 dark:border-gray-800 pt-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-10 text-center leading-relaxed">
            Vos données sont traitées avec sincérité et servent à affiner nos recommandations loops.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex-grow clutch-button-primary ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              onClick={onClose}
              className="flex-grow clutch-button-secondary"
            >
              Quitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CritereForm;
