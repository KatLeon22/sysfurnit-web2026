import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './styles/App.css';
import Home from './pages/Home';
import Collections from './pages/Collections';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Subcategories from './pages/Subcategories';
import FurnitureItems from './pages/FurnitureItems';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { trackPageView } from './utils/analytics';

// Componente para trackear cambios de página
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function App() {
  // Idioma por defecto: Inglés
  const [userLang, setUserLang] = useState('en'); // Inglés por defecto

  useEffect(() => {
    // Detectar idioma del navegador, pero mantener inglés como predeterminado
    const browserLang = navigator.language.toLowerCase();
    // Solo cambiar a español si el navegador está explícitamente en español
    const lang = browserLang.startsWith('es') ? 'es' : 'en';
    setUserLang(lang);
  }, []);

  return (
    <Router>
      <div className="font-sans bg-gray-50 min-h-screen">
        {/* Trackear cambios de página */}
        <PageTracker />
        
        {/* Header */}
        <Header lang={userLang} setLang={setUserLang} />

        {/* Contenido principal según la ruta */}
        <Routes>
          <Route path="/" element={<Home userLang={userLang} />} />
          <Route path="/collections" element={<Collections userLang={userLang} />} />
          <Route path="/collection/:collectionId" element={<Subcategories userLang={userLang} />} />
          <Route path="/collection/:collectionId/:subcategoryId" element={<FurnitureItems userLang={userLang} />} />
          <Route path="/catalog/:collectionId" element={<Catalog userLang={userLang} />} />
          <Route path="/contact" element={<Contact userLang={userLang} />} />
        </Routes>

        {/* Botón flotante de WhatsApp */}
        <WhatsAppButton userLang={userLang} />

        {/* Footer */}
        <Footer userLang={userLang} />
      </div>
    </Router>
  );
}

export default App;
