import React, { useState } from 'react';
import CritereForm from './CritereForm';

interface CritereProps {
  label: string;
  value: string;
  type: string;
  color: string;
  options?: string[];
  onUpdate: (newValue: string) => Promise<void>;
}

const Critere: React.FC<CritereProps> = ({ label, value, type, color, options = [], onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extraire les classes de couleur
  const bgColor = color.split(' ')[0] || 'bg-gray-100';
  const dotColor = color.split(' ')[1]?.replace('text-', 'bg-') || 'bg-gray-400';

  return (
    <div className="relative flex flex-col p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest mb-1">{type}</span>
      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">{label}</h4>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">{value}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${bgColor}`}>
          <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
        </div>
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-3 right-3 p-2 bg-gray-50 dark:bg-gray-900 rounded-full hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors group"
        title="Modifier"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <CritereForm 
            label={label}
            currentValue={value}
            options={options}
            color={color}
            onSave={async (val) => {
              await onUpdate(val);
              setIsModalOpen(false);
            }}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Critere;
