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

  const handleLoginSuccess = () => {
    setUser(authService.getCurrentUser())
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link to="/">Clutch</Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Accueil</Link>
          <Link to="/loops" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Loops</Link>
          <Link to="/avis" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Avis</Link>
          <Link to="/marques" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Marques</Link>
          <Link to="/ugc" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">UGC</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLoginClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            {user ? 'Mon Profil' : 'Connexion'}
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center max-w-2xl mx-auto">
            <Link to="/about" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">À propos</Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Contact</Link>
            <Link to="/legal" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Légal</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Confidentialité</Link>
          </nav>
          <div className="text-center mt-6 text-gray-400 text-sm">
            © {new Date().getFullYear()} Clutch. Tous droits réservés.
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
