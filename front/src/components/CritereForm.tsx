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

  // Extraire les couleurs pour l'encart rond
  const bgColor = color.split(' ')[0] || 'bg-gray-100';
  const dotColor = color.split(' ')[1]?.replace('text-', 'bg-') || 'bg-gray-400';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden max-w-md w-full animate-in fade-in zoom-in duration-300">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Modifier {label}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-8">Sélectionnez la valeur qui vous correspond le mieux.</p>

        <div className="space-y-3 mb-10">
          {options.map((option) => (
            <label 
              key={option}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                selected === option 
                ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/20' 
                : 'border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-900/40'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Encart rond coloré associé au critère */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${bgColor}`}>
                  <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                </div>
                <span className={`font-semibold ${selected === option ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`}>
                  {option}
                </span>
              </div>
              
              <input 
                type="radio" 
                name="critere-option"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-gray-300"
              />
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => onSave(selected)}
            className="w-full py-4 bg-[#FF5A5F] text-white font-bold rounded-2xl shadow-[0_6px_0_0_#D14448] hover:translate-y-[1px] hover:shadow-[0_5px_0_0_#D14448] active:translate-y-[4px] active:shadow-none transition-all"
          >
            ENREGISTRER
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 dark:text-gray-400 font-bold hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default CritereForm;
