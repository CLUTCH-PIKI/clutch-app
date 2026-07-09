import React, { useState } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (isNewUser?: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login({ email, password });
        onSuccess();
      } else {
        await userService.createUser({ email, password, name });
        await authService.login({ email, password });
        onSuccess(true);
      }
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-clutch-black/80 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-[#1A1A1A] border-2 border-clutch-black dark:border-white w-full max-w-md p-10 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-clutch-black dark:hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-5xl font-black mb-12 text-center text-clutch-black dark:text-white uppercase tracking-tighter">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>

        {error && (
          <div className="border-l-4 border-clutch-coral bg-red-50 text-red-700 p-4 mb-8">
            <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 dark:border-gray-800 focus:border-clutch-black dark:focus:border-white outline-none transition-colors text-lg font-bold"
                placeholder="Votre nom"
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 dark:border-gray-800 focus:border-clutch-black dark:focus:border-white outline-none transition-colors text-lg font-bold"
              placeholder="votre@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 dark:border-gray-800 focus:border-clutch-black dark:focus:border-white outline-none transition-colors text-lg font-bold"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full clutch-button-primary mt-4 disabled:opacity-50"
          >
            {loading ? 'CHARGEMENT...' : (isLogin ? 'SE CONNECTER' : "S'INSCRIRE")}
          </button>
        </form>

        <div className="mt-12 text-center">
          {isLogin ? (
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pas encore de compte ?</span>
              <button 
                onClick={() => setIsLogin(false)}
                className="text-[11px] font-black text-clutch-black dark:text-white uppercase tracking-[0.2em] hover:text-clutch-coral transition-colors underline underline-offset-4"
              >
                S'inscrire
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Déjà un compte ?</span>
              <button 
                onClick={() => setIsLogin(true)}
                className="text-[11px] font-black text-clutch-black dark:text-white uppercase tracking-[0.2em] hover:text-clutch-coral transition-colors underline underline-offset-4"
              >
                Se connecter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
