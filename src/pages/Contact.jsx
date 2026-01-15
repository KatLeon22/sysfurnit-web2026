import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import "../styles/contact.css"; 
import { translations } from '../utils/translations';

const Contact = ({ userLang }) => {
  const t = translations[userLang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', ''

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const serviceID = 'service_1bp5a14';
      const templateID = 'template_si36xwu';
      const publicKey = 'FsPSjMlElPws4Nu9I';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'contacto@muebleria.com'
      };

      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('Error al enviar el correo:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = {
    es: {
      title: "Contacto",
      intro: "Estamos aquí para ayudarte. Completa el formulario o contáctanos por WhatsApp.",
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      submit: "Enviar",
      infoTitle: "Nuestra información",
      phone: "Teléfono: +502 4796 7384",
      emailContact: "Email: contacto@muebleria.com",
      footerNote: "Será un gusto atenderte",
      whatsappTitle: "O contáctanos por WhatsApp",
      whatsappBtn: "Abrir WhatsApp",
    },
    en: {
      title: "Contact Us",
      intro: "We are here to help. Fill out the form or contact us via WhatsApp.",
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send",
      infoTitle: "Our Information",
      phone: "Phone: +502 4796 7384",
      emailContact: "Email: contacto@muebleria.com",
      footerNote: "We will be happy to assist you",
      whatsappTitle: "Or contact us via WhatsApp",
      whatsappBtn: "Open WhatsApp",
    },
  };

  const text = content[userLang];
  const whatsappUrl = `https://wa.me/50251172443?text=${encodeURIComponent(userLang === 'es' ? 'Hola, me interesa conocer más sobre sus productos' : 'Hello, I am interested in learning more about your products')}`;

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>{text.title}</h2>
        <p className="contact-intro">{text.intro}</p>

        <div className="contact-cards">
          {/* Formulario de contacto */}
          <div className="contact-card form-card">
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder={text.name} 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder={text.email} 
                value={formData.email}
                onChange={handleChange}
                required 
              />

              <textarea 
                name="message"
                placeholder={text.message} 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (userLang === 'es' ? 'Enviando...' : 'Sending...') : text.submit}
              </button>
              
              {submitStatus === 'success' && (
                <div className="success-message">
                  {userLang === 'es' 
                    ? '¡Mensaje enviado correctamente! Te contactaremos pronto.'
                    : 'Message sent successfully! We will contact you soon.'}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="error-message">
                  {userLang === 'es'
                    ? 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
                    : 'Error sending message. Please try again.'}
                </div>
              )}
            </form>
          </div>

          {/* Información de contacto */}
          <div className="contact-card info-card">
            <h3>{text.infoTitle}</h3>
            <p className="phone">{text.phone}</p>
            <p className="email">{text.emailContact}</p>
            <p className="footer-note">{text.footerNote}</p>
            
            <div className="whatsapp-section">
              <h4>{text.whatsappTitle}</h4>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-contact-btn"
              >
                💬 {text.whatsappBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
