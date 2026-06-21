import React, { useState } from 'react';

interface CritereFormProps {
  label: string;
  currentValue: string;
  options: string[];
  color: string;
  onSave: (newValue: string) => void;
  onClose: () => void;
}

const CritereForm: React.FC<CritereFormProps> = ({ label, currentValue, options, color, onSave, onClose }) => {
  const [selected, setSelected] = useState(currentValue);

  return (
    <div className="bg-white dark:bg-[#1A1A1A] border-2 border-clutch-black dark:border-white max-w-lg w-full p-12">
      <div className="flex flex-col">
        <h2 className="text-5xl font-black text-center text-clutch-black dark:text-white mb-4 uppercase tracking-tighter">Modifier</h2>
        <h3 className="text-xl font-bold text-center text-gray-400 mb-12 uppercase tracking-widest">{label}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {options.map((option) => (
            <label 
              key={option}
              className={`flex items-center justify-between p-5 border transition-all cursor-pointer ${
                selected === option 
                ? 'border-clutch-coral bg-clutch-coral/5' 
                : 'border-gray-100 dark:border-gray-800 hover:border-clutch-black dark:hover:border-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 ${color.split(' ')[0]} opacity-50`}></div>
                <span className={`text-xs font-black uppercase tracking-widest ${selected === option ? 'text-clutch-coral' : 'text-gray-400'}`}>
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
              {selected === option && <span className="text-clutch-coral text-[10px]">●</span>}
            </label>
          ))}
        </div>

        <div className="border-t-2 border-gray-100 dark:border-gray-800 pt-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-10 text-center leading-relaxed">
            Vos données sont traitées avec sincérité et servent à affiner nos recommandations loops.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <button
              onClick={() => onSave(selected)}
              className="flex-grow clutch-button-primary"
            >
              Enregistrer
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
