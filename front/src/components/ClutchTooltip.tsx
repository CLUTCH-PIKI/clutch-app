import React, { useRef, useEffect, useState } from 'react';

interface ClutchTooltipProps {
  text: string;
  borderColor?: string;
}

const ClutchTooltip: React.FC<ClutchTooltipProps> = ({ text, borderColor = '' }) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      // Zone visible estimée : max-height (80px) - padding (16px) = 64px
      // On déclenche l'animation si la hauteur du texte dépasse 60px
      setIsOverflowing(contentRef.current.scrollHeight > 60);
    }
  }, [text]);

  const getThemeClasses = () => {
    if (borderColor.includes('clutch-blue')) {
      return 'bg-clutch-blue text-clutch-black border-clutch-blue after:border-t-clutch-blue';
    }
    if (borderColor.includes('clutch-coral')) {
      return 'bg-clutch-coral text-white border-clutch-coral after:border-t-clutch-coral';
    }
    if (borderColor.includes('clutch-orange')) {
      return 'bg-clutch-orange text-clutch-black border-clutch-orange after:border-t-clutch-orange';
    }
    // Par défaut (noir sur blanc ou blanc sur noir)
    return 'bg-clutch-black text-white border-clutch-black dark:bg-white dark:text-clutch-black dark:border-white after:border-t-clutch-black dark:after:border-t-white';
  };

  return (
    <div className={`clutch-tooltip ${getThemeClasses()}`}>
      <span 
        ref={contentRef}
        className={`clutch-tooltip-prompteur ${isOverflowing ? 'animate' : ''}`}
      >
        {text}
      </span>
    </div>
  );
};

export default ClutchTooltip;
