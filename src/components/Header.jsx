import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/FurniLogo.jpg";
import "../styles/header.css";
import { Link } from "react-router-dom";
import flagEs from "../assets/guatemala.png";
import flagEn from "../assets/usa.png";
import { trackLanguageChange } from '../utils/analytics';
import { translations } from '../utils/translations';

const Header = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false); // Estado para abrir/cerrar dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Estado para menú móvil
  const dropdownRef = useRef(null);
  const t = translations[lang];

  // Idiomas disponibles - siempre mostrar todos
  const languages = [
    { code: "es", label: "Español", flag: flagEs },
    { code: "en", label: "English", flag: flagEn },
  ];

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

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
            <span className="company-name"></span> {/* nombre del logo*/}
            <span className="company-tagline"></span>
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
            <li><Link to="/collections">{t.nav.collections}</Link></li>
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
            <li><Link to="/collections" onClick={() => setMobileMenuOpen(false)}>{t.nav.collections}</Link></li>
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
