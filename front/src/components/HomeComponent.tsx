import React from 'react';

const HomeComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Bienvenue sur Clutch</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-center">
        L'antidote à la saturation publicitaire. Découvrez des avis consommateurs vérifiés, sincères et détaillés pour faire vos choix en toute conscience.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Opinion Granulaire</h2>
          <p className="text-gray-500">Des avis détaillés pour une clarté totale sur les produits.</p>
        </div>
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Loops</h2>
          <p className="text-gray-500">Participez à des loteries exclusives avec vos influenceurs préférés.</p>
        </div>
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Clutch UGC</h2>
          <p className="text-gray-500">Du contenu organique et authentique pour les marques.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
