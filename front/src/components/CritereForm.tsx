import React, { useState } from 'react';
import { COLOR_MAP } from '../store/userStore';

interface CritereFormProps {
  label: string;
  currentValue: string;
  options: string[];
  onSave: (newValue: string) => Promise<void>;
  onClose: () => void;
}

const CritereForm: React.FC<CritereFormProps> = ({ label, currentValue, options, onSave, onClose }) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {options.map((option) => (
            <label 
              key={option}
              className={`flex items-center justify-between p-6 border-2 transition-all cursor-pointer group ${
                selected === option 
                ? 'border-clutch-black dark:border-white bg-white dark:bg-clutch-black shadow-[4px_4px_0px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_0px_#FDFDFD] -translate-x-1 -translate-y-1 z-10' 
                : 'border-gray-100 dark:border-gray-800 bg-transparent hover:border-clutch-coral'
              }`}
            >
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors whitespace-normal break-words leading-relaxed ${selected === option ? 'text-clutch-black dark:text-white' : 'text-gray-400'}`}>
                {option}
              </span>

              {COLOR_MAP[option] && (
                <div 
                  className="w-10 h-6 border border-clutch-black/10 dark:border-white/10 shrink-0"
                  style={{ backgroundColor: COLOR_MAP[option] }}
                ></div>
              )}
              
              <input 
                type="radio" 
                name="critere-option"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="hidden"
              />
            </label>
          ))}
        </div>

        <div className="border-t-2 border-gray-100 dark:border-gray-800 pt-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-10 text-center leading-relaxed">
            Vos données sont traitées avec sincérité et servent à affiner nos recommandations loops.
          </p>
          
          <div className="flex justify-center gap-8">
            <button
              onClick={onClose}
              className="w-16 h-16 flex items-center justify-center border-2 border-clutch-coral bg-white text-clutch-coral hover:bg-clutch-coral hover:text-white dark:bg-clutch-black transition-all shadow-[4px_4px_0px_0px_rgba(255,90,95,0.3)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              title="Quitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-16 h-16 flex items-center justify-center border-2 border-clutch-blue bg-white text-clutch-blue hover:bg-clutch-blue hover:text-white dark:bg-clutch-black disabled:opacity-50 transition-all shadow-[4px_4px_0px_0px_rgba(168,218,220,0.3)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              title="Enregistrer"
            >
              {isSaving ? (
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CritereForm;
