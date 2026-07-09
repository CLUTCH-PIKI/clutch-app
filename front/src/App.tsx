import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HomeComponent from './components/HomeComponent'
import LoginModal from './components/LoginModal'
import ProfileComponent from './components/ProfileComponent'
import { authService } from './services/authService'

function Layout() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [user, setUser] = useState(() => authService.getCurrentUser())
  const navigate = useNavigate()

  const handleLoginClick = () => {
    if (user) {
      navigate('/profile')
    } else {
      setIsLoginModalOpen(true)
    }
  }

  const handleLoginSuccess = (isNewUser?: boolean) => {
    setUser(authService.getCurrentUser())
    if (isNewUser) {
      navigate('/profile', { state: { openEditProfile: true } })
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-800 bg-clutch-white dark:bg-clutch-black sticky top-0 z-40">
        <div className="text-3xl font-black text-clutch-black dark:text-white uppercase tracking-tighter">
          <Link to="/">Clutch</Link>
        </div>
        <nav className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-clutch-black dark:hover:text-white transition-colors">Accueil</Link>
          <Link to="/loops" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-clutch-black dark:hover:text-white transition-colors">Loops</Link>
          <Link to="/avis" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-clutch-black dark:hover:text-white transition-colors">Avis</Link>
          <Link to="/marques" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-clutch-black dark:hover:text-white transition-colors">Marques</Link>
          <Link to="/ugc" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-clutch-black dark:hover:text-white transition-colors">UGC</Link>
        </nav>
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLoginClick}
            className="clutch-button-primary"
          >
            {user ? 'Mon Profil' : 'Connexion'}
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4">
        <Outlet />
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 py-16 bg-white dark:bg-clutch-black">
        <div className="container mx-auto px-8">
          <nav className="flex justify-center items-center space-x-12 mb-10">
            <Link to="/about" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-clutch-black dark:hover:text-white transition-colors">À propos</Link>
            <Link to="/contact" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-clutch-black dark:hover:text-white transition-colors">Contact</Link>
            <Link to="/legal" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-clutch-black dark:hover:text-white transition-colors">Légal</Link>
            <Link to="/privacy" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-clutch-black dark:hover:text-white transition-colors">Confidentialité</Link>
          </nav>
          <div className="text-center text-gray-300 dark:text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} CLUTCH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSuccess={handleLoginSuccess}
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="loops" element={<div className="py-20 text-center text-2xl">Page Loops en construction</div>} />
          <Route path="avis" element={<div className="py-20 text-center text-2xl">Page Avis en construction</div>} />
          <Route path="marques" element={<div className="py-20 text-center text-2xl">Page Marques en construction</div>} />
          <Route path="ugc" element={<div className="py-20 text-center text-2xl">Page UGC en construction</div>} />
          <Route path="about" element={<div className="py-20 text-center text-2xl">À propos de Clutch</div>} />
          <Route path="contact" element={<div className="py-20 text-center text-2xl">Contactez-nous</div>} />
          <Route path="legal" element={<div className="py-20 text-center text-2xl">Mentions Légales</div>} />
          <Route path="privacy" element={<div className="py-20 text-center text-2xl">Politique de Confidentialité</div>} />
          <Route path="profile" element={<ProfileComponent />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
