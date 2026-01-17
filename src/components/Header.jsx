import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/1.jpeg";
import "../styles/header.css";
import { Link } from "react-router-dom";
import flagEs from "../assets/guatemala.png";
import flagEn from "../assets/usa.png";
import { trackLanguageChange } from '../utils/analytics';
import { translations, collections } from '../utils/translations';

const Header = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false); // Estado para abrir/cerrar dropdown de idioma
  const [collectionsOpen, setCollectionsOpen] = useState(false); // Estado para abrir/cerrar dropdown de colecciones
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Estado para menú móvil
  const dropdownRef = useRef(null);
  const collectionsDropdownRef = useRef(null);
  const t = translations[lang];

  // Idiomas disponibles - siempre mostrar todos
  const languages = [
    { code: "es", label: "Español", flag: flagEs },
    { code: "en", label: "English", flag: flagEn },
  ];

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (collectionsDropdownRef.current && !collectionsDropdownRef.current.contains(event.target)) {
        setCollectionsOpen(false);
      }
    };

    // Usar 'click' en lugar de 'mousedown' para mejor control
    if (open || collectionsOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('touchend', handleClickOutside, true);
      }, 50);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside, true);
        document.removeEventListener('touchend', handleClickOutside, true);
      };
    }
  }, [open, collectionsOpen]);

  const handleSelect = (code) => {
    if (code !== lang) {
      setLang(code);
      trackLanguageChange(code);
    }
    setOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logotipo" className="logo" />
          </Link>
          <div className="company-text">
            {/* nombre del logo - oculto por ahora */}
          </div>
        </div>

        {/* Botón hamburguesa para móvil */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
        </button>

        {/* Navegación Desktop */}
        <nav className="desktop-nav">
          <ul className="menu">
            <li><Link to="/">{t.nav.home}</Link></li>
            <li 
              className="collections-menu-item"
              ref={collectionsDropdownRef}
            >
              <Link 
                to="/collections"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCollectionsOpen(!collectionsOpen);
                }}
              >
                {t.nav.collections}
                <span className={`dropdown-arrow ${collectionsOpen ? 'open' : ''}`}>&#9662;</span>
              </Link>
              {collectionsOpen && (
                <div 
                  className="collections-dropdown" 
                  style={{ backgroundColor: '#FFFFFF' }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {collections.map((collection) => {
                    const hasSubcategories = collection.subcategories && collection.subcategories.length > 0;
                    const collectionName = lang === "es" ? collection.nameEs : collection.nameEn;
                    
                    return (
                      <Link
                        key={collection.id}
                        to={hasSubcategories ? `/collection/${collection.id}` : "/collections"}
                        className="collection-dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCollectionsOpen(false);
                        }}
                        style={{
                          color: '#000000',
                          WebkitTextFillColor: '#000000',
                          backgroundColor: '#FFFFFF',
                          display: 'block',
                          padding: '0.75rem 1rem',
                          textDecoration: 'none',
                          borderBottom: '1px solid #F0F0F0',
                          fontSize: '0.9rem',
                          fontWeight: '600'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#F5F5F5';
                          e.target.style.color = '#000000';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#FFFFFF';
                          e.target.style.color = '#000000';
                        }}
                      >
                        {collectionName}
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>
            <li><Link to="/contact">{t.nav.contact}</Link></li>
          </ul>

          {/* Selector de idioma Desktop */}
          <div className="language-selector">
            <span className="language-label">
              {lang === "es" ? "Idioma:" : "Language:"}
            </span>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
                className="language-button"
                aria-expanded={open}
              >
                <img src={currentLang.flag} alt={currentLang.label} className="flag-icon" />
                <span>{currentLang.label}</span>
                <span className={`dropdown-arrow ${open ? 'open' : ''}`}>&#9662;</span>
              </button>

              {open && (
                <div className="language-dropdown">
                  {languages.map((l) => (
                    <div
                      key={l.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(l.code);
                      }}
                      className={`language-option ${lang === l.code ? 'active' : ''}`}
                    >
                      <img src={l.flag} alt={l.label} className="flag-icon" />
                      <span>{l.label}</span>
                      {lang === l.code && <span className="check-mark">✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Navegación Móvil */}
        <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-menu">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</Link></li>
            <li className="mobile-collections-item">
              <Link 
                to="/collections" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCollectionsOpen(!collectionsOpen);
                }}
              >
                {t.nav.collections}
                <span className={`dropdown-arrow ${collectionsOpen ? 'open' : ''}`}>&#9662;</span>
              </Link>
              {collectionsOpen && (
                <div 
                  className="mobile-collections-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  {collections.map((collection) => {
                    const hasSubcategories = collection.subcategories && collection.subcategories.length > 0;
                    const collectionName = lang === "es" ? collection.nameEs : collection.nameEn;
                    
                    return (
                      <Link
                        key={collection.id}
                        to={hasSubcategories ? `/collection/${collection.id}` : "/collections"}
                        className="mobile-collection-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCollectionsOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        style={{
                          color: '#FFFFFF',
                          display: 'block',
                          textDecoration: 'none'
                        }}
                      >
                        {collectionName}
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>
            <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link></li>
          </ul>

          {/* Selector de idioma Móvil */}
          <div className="mobile-language-selector">
            <span className="language-label">
              {lang === "es" ? "Idioma:" : "Language:"}
            </span>
            <div className="language-options">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    handleSelect(l.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`language-option-mobile ${lang === l.code ? 'active' : ''}`}
                >
                  <img src={l.flag} alt={l.label} className="flag-icon" />
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
