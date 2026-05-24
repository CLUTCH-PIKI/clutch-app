import React from 'react';
import { Link } from 'react-router-dom';

const HomeComponent: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      {/* 1. Full-width Image Placeholder Card */}
      <section>
        <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl flex items-center justify-center overflow-hidden">
          <span className="text-gray-400 dark:text-gray-600 font-medium">Image Placeholder</span>
        </div>
      </section>

      {/* 2. 4 cards lined up with texts inside */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Feature {i}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Exemple de texte pour la carte {i}. Clutch offre une clarté totale sur vos choix.
            </p>
          </div>
        ))}
      </section>

      {/* 3. Carousel with header */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-left">Loop influencer</h2>
          <Link to="/loops" className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
            Voir tout
          </Link>
        </div>
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 w-64 text-left">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-2xl mb-3 flex items-center justify-center">
                <span className="text-gray-400">Influencer {i}</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">Nom de la Loop {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bar with filter settings */}
      <section className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
        <span className="text-sm font-medium text-gray-500 mr-2">Filtrer par :</span>
        <button className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm hover:bg-white dark:hover:bg-gray-800 transition-colors">Catégorie</button>
        <button className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm hover:bg-white dark:hover:bg-gray-800 transition-colors">Prix</button>
        <button className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm hover:bg-white dark:hover:bg-gray-800 transition-colors">Note</button>
        <div className="ml-auto flex items-center space-x-2">
          <span className="text-sm text-gray-400">Trier par :</span>
          <select className="bg-transparent text-sm font-medium focus:outline-none dark:text-white">
            <option>Plus récents</option>
            <option>Populaires</option>
          </select>
        </div>
      </section>

      {/* 5. Centered pill button */}
      <section className="flex justify-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105 cursor-pointer">
          Voir la selection
        </button>
      </section>

      {/* 6. Jumbotron */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-gray-900 dark:bg-black rounded-[2rem] p-10 text-white">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Prêt à découvrir l'antidote à la saturation ?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Rejoignez la communauté Clutch et accédez à des avis vérifiés qui font la différence.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors cursor-pointer">
            Commencer maintenant
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-gray-800 rounded-2xl animate-pulse"></div>
          <div className="aspect-square bg-gray-800 rounded-2xl animate-pulse"></div>
        </div>
      </section>

      {/* 7. Section that present the app */}
      <section className="max-w-4xl mx-auto text-center py-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Pourquoi Clutch ?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Dans un monde saturé par la publicité et les messages promotionnels, il devient difficile de discerner le vrai du faux. 
          Clutch a été créé pour redonner le pouvoir aux consommateurs. Nous centralisons des avis granulaires, sincères et vérifiés. 
          Que vous soyez un consommateur à la recherche de clarté, un influenceur souhaitant engager sa communauté, 
          ou une marque en quête d'insights réels, Clutch est votre plateforme de confiance.
        </p>
      </section>
    </div>
  );
};

export default HomeComponent;
