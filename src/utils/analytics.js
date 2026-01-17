// Google Analytics configuration
export const GA_TRACKING_ID = 'G-8CXRQC68QM'; // Tu ID de Google Analytics

// Función para inicializar Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Cargar el script de Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Función para trackear páginas
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Función para trackear eventos personalizados
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos específicos para tu sitio
export const trackWhatsAppClick = () => {
  trackEvent('click', 'WhatsApp', 'WhatsApp Button');
};

export const trackContactFormSubmit = () => {
  trackEvent('submit', 'Contact', 'Contact Form');
};

export const trackLanguageChange = (language) => {
  trackEvent('change', 'Language', language);
};

export const trackServiceView = (serviceName) => {
  trackEvent('view', 'Service', serviceName);
};