import React from 'react';
import { Link } from 'react-router-dom';

const HomeComponent: React.FC = () => {
  return (
    <div className="space-y-24 py-12">
      {/* 1. Hero / Full-width Image Placeholder */}
      <section>
        <div className="w-full h-80 md:h-[500px] bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-clutch-black dark:text-white leading-none mb-4 opacity-10">
              CLARITY
            </h1>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Digital Editorial Platform</span>
          </div>
        </div>
      </section>

      {/* 2. Featured Features - 4 cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-100 dark:border-gray-800">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-10 border-r border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1f1f1f] transition-colors group">
            <span className="text-[9px] font-black text-clutch-coral mb-6 block tracking-widest">0{i} // SERVICE</span>
            <h3 className="text-xl font-bold mb-4 text-clutch-black dark:text-white uppercase tracking-tight">Feature Name {i}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-serif italic">
              "L'antidote à la saturation publicitaire par la clarté et la sincérité du détail."
            </p>
            <div className="w-8 h-[1px] bg-gray-200 group-hover:w-full group-hover:bg-clutch-coral transition-all duration-500"></div>
          </div>
        ))}
      </section>

      {/* 3. Carousel with header - Loops */}
      <section>
        <div className="flex items-end justify-between mb-12 border-b-2 border-clutch-black dark:border-white pb-6">
          <h2 className="text-5xl font-black text-clutch-black dark:text-white uppercase tracking-tighter leading-none">Loop influencer</h2>
          <Link to="/loops" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-clutch-black dark:hover:text-white transition-colors underline underline-offset-8 decoration-gray-200">
            Explorer tout
          </Link>
        </div>
        <div className="flex space-x-10 overflow-x-auto pb-8 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 w-72 group">
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 mb-6 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 grayscale group-hover:grayscale-0 transition-all duration-700 flex items-center justify-center">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Influencer {i}</span>
                </div>
              </div>
              <p className="text-xs font-black text-clutch-black dark:text-white uppercase tracking-widest mb-1">Nom de la Loop {i}</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Saison 2026 // Paris</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Filtering Bar */}
      <section className="border-y border-gray-100 dark:border-gray-800 py-6 flex flex-wrap gap-8 items-center px-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Filtres</span>
        <button className="text-[11px] font-bold uppercase tracking-widest hover:text-clutch-coral transition-colors">Catégorie</button>
        <button className="text-[11px] font-bold uppercase tracking-widest hover:text-clutch-coral transition-colors">Prix</button>
        <button className="text-[11px] font-bold uppercase tracking-widest hover:text-clutch-coral transition-colors">Note</button>
        <div className="ml-auto flex items-center space-x-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Trier</span>
          <select className="bg-transparent text-[11px] font-bold uppercase tracking-widest focus:outline-none dark:text-white cursor-pointer">
            <option>Plus récents</option>
            <option>Populaires</option>
          </select>
        </div>
      </section>

      {/* 5. CTA Button */}
      <section className="flex justify-center py-12">
        <button className="clutch-button-primary scale-110">
          Voir la selection
        </button>
      </section>

      {/* 6. Jumbotron - Editorial style */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-clutch-black dark:border-white">
        <div className="p-16 flex flex-col justify-center bg-clutch-black text-white">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
            L'antidote à la <span className="text-clutch-coral">saturation.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-md font-serif italic">
            "Rejoignez la communauté Clutch et accédez à des avis vérifiés qui font la différence dans un monde de bruit."
          </p>
          <div>
            <button className="clutch-button-primary bg-white text-clutch-black border-white hover:bg-clutch-black hover:text-white">
              S'inscrire
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-gray-100 dark:bg-[#0a0a0a]">
          <div className="aspect-square border-r border-gray-200 dark:border-gray-800 flex items-center justify-center">
            <div className="w-1/2 h-1/2 border border-clutch-coral animate-spin-slow"></div>
          </div>
          <div className="aspect-square flex items-center justify-center p-12">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 grayscale"></div>
          </div>
        </div>
      </section>

      {/* 7. Manifesto Section */}
      <section className="max-w-4xl mx-auto text-center py-20 px-6">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-clutch-coral mb-10 block">Manifeste</span>
        <h2 className="text-5xl md:text-6xl font-black mb-12 text-clutch-black dark:text-white uppercase tracking-tighter leading-none">Pourquoi Clutch ?</h2>
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed font-serif italic">
          "Dans un monde saturé par la publicité et les messages promotionnels, il devient difficile de discerner le vrai du faux. 
          Clutch a été créé pour redonner le pouvoir aux consommateurs. Nous centralisons des avis granulaires, sincères et vérifiés. 
          Que vous soyez un consommateur à la recherche de clarté, un influenceur souhaitant engager sa communauté, 
          ou une marque en quête d'insights réels, Clutch est votre plateforme de confiance."
        </p>
      </section>
    </div>
  );
};

export default HomeComponent;
