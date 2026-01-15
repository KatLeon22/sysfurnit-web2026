// Footer.jsx
import React from "react";
import "../styles/footer.css"; // Estilos específicos del footer
import { Link } from "react-router-dom";
import { translations } from '../utils/translations';

const Footer = ({ userLang }) => {
  const t = translations[userLang];

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo - izquierda */}
        <div className="footer-logo">
          <img src={require("../assets/FurniLogo.jpg")} alt="Mueblería Logo" className="logo" />
          <span className="logo-text"></span>
        </div>

        {/* Contacto - centro */}
        <div className="footer-contact">
          <h4>{t.footer.contact}</h4>
          <div className="contact-item">
            <p>Tel: <a href="tel:+50251172443">+502 5117-2443</a></p>
            <p>Email: <a href="mailto:contacto@muebleria.com">contacto@muebleria.com</a></p>
          </div>
        </div>

        {/* Enlaces rápidos - derecha */}
        <div className="footer-links">
          <ul>
            <li><Link to="/">{t.nav.home}</Link></li>
            <li><Link to="/">{t.nav.collections}</Link></li>
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
