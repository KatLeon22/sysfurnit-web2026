// Footer.jsx
import React from "react";
import "../styles/footer.css"; // Estilos específicos del footer
import { Link } from "react-router-dom";
import { translations } from '../utils/translations';
import logo from "../assets/1.jpeg";

const Footer = ({ userLang }) => {
  const t = translations[userLang];

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo - izquierda */}
        <div className="footer-logo">
          <img src={logo} alt="Mueblería Logo" className="logo" />
        </div>

        {/* Contacto - centro */}
        <div className="footer-contact">
          <h4>{t.footer.contact}</h4>
          <div className="contact-item">
            <p>San Francisco, CA</p>
            <p>Tel: <a href="tel:+14155550123">+1 (415) 555-0123</a></p>
            <p>Email: <a href="mailto:contacto@muebleria.com">contacto@muebleria.com</a></p>
          </div>
        </div>

        {/* Enlaces rápidos - derecha */}
        <div className="footer-links">
          <ul>
            <li><Link to="/">{t.nav.home}</Link></li>
            <li><Link to="/collections">{t.nav.collections}</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Mueblería. {t.footer.rights}
      </div>
    </footer>
  );
};

export default Footer;
