import React, { useState } from 'react';
import CritereForm from './CritereForm';

interface CritereProps {
  label: string;
  value: string;
  type: string;
  color: string;
  borderColor?: string;
  options?: string[];
  onUpdate: (newValue: string) => Promise<void>;
}

const Critere: React.FC<CritereProps> = ({ label, value, type, color, borderColor, options = [], onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`relative flex flex-col p-8 bg-white dark:bg-[#1A1A1A] border-2 ${borderColor || 'border-gray-100 dark:border-gray-800'} transition-all group`}>
      <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-[0.3em] mb-4">{type}</span>
      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">{label}</h4>
      
      <div className="flex items-end justify-between mt-auto">
        <span className="text-3xl font-black text-clutch-black dark:text-white uppercase tracking-tighter">{value}</span>
        <div className={`w-8 h-8 border border-gray-100 dark:border-gray-800 flex items-center justify-center p-1`}>
          <div className={`w-full h-full ${color.split(' ')[0]} opacity-50`}></div>
        </div>
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute top-6 right-6 p-2 text-gray-300 hover:text-clutch-coral transition-colors"
        title="Modifier"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-clutch-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <CritereForm 
            label={label}
            currentValue={value}
            options={options}
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
