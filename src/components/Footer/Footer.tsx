import { useState } from 'react';
import './Footer.css';

interface FooterProps {
  onEmailSubmit?: (email: string) => void;      // Callback para el formulario de newsletter
  onMenuClick?: (item: string) => void;         // Callback para items del menú
  onPolicyClick?: (item: string) => void;       // Callback para links de políticas
  onSocialClick?: (platform: string) => void;   // Callback para iconos sociales
  onCountryChange?: (country: any) => void;     // Callback para cambio de país
  className?: string;                           // Clases CSS adicionales
}

const Footer: React.FC<FooterProps> = ({
  onEmailSubmit,
  onMenuClick,
  onPolicyClick,
  onSocialClick,
  onCountryChange,
  className = ""
}) => {
  // Estado para el email del formulario de newsletter
  const [email, setEmail] = useState('');
  
  // Estado para el país seleccionado (Estados Unidos por defecto)
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD'
  });

  // Lista de países disponibles para selección
  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
    { code: 'EU', name: 'European Union', flag: '🇪🇺', currency: 'EUR' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD' }
  ];

  // Items del menú principal del footer
  const menuItems = ['Collections', 'Categories', 'Shop All', 'More'];
  
  // Items de políticas y enlaces sociales
  const policyItems = [
    'Discord.com',
    'Twitter', 
    'Youtube',
    'Instagram',
    'TikTok',
    'DOTEXE Refunds and Returns',
    'DOTEXE Privacy Policy',
    'Contact Us'
  ];

  // Métodos de pago aceptados
  const paymentMethods = [
    'Amex', 'Apple Pay', 'Diners Club', 'Discover', 
    'Google Pay', 'Mastercard', 'Shop Pay', 'Visa'
  ];

  // Manejador para el envío del formulario de newsletter
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEmailSubmit && email.trim()) {
      onEmailSubmit(email.trim());
      setEmail(''); // Limpia el campo después del envío
    }
  };

  // Manejador para la selección de país
  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    if (onCountryChange) {
      onCountryChange(country);
    }
  };

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-container">
        
        {/* Sección de Newsletter */}
        <div className="footer-newsletter">
          <h2 className="footer-newsletter-title">Subscribe to the Latest and Greatest.</h2>
          <p className="footer-newsletter-subtitle">Official Discord merch news, contests and updates!</p>
          
          {/* Formulario de suscripción */}
          <form className="footer-newsletter-form" onSubmit={handleEmailSubmit}>
            <div className="footer-email-container">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-email-input"
                required
              />
              <button type="submit" className="footer-signup-button">
                Sign up
              </button>
            </div>
          </form>
        </div>

        {/* Divisor visual */}
        <div className="footer-divider"></div>

        {/* Contenido principal del footer */}
        <div className="footer-content">
          
          {/* Columna de Menú */}
          <div className="footer-column">
            <h3 className="footer-column-title">Menu</h3>
            <ul className="footer-column-list">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    className="footer-link"
                    onClick={() => onMenuClick && onMenuClick(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna de Políticas */}
          <div className="footer-column">
            <h3 className="footer-column-title">Policies</h3>
            <ul className="footer-column-list">
              {policyItems.map((item, index) => (
                <li key={index}>
                  <button
                    className="footer-link"
                    onClick={() => onPolicyClick && onPolicyClick(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna de Redes Sociales */}
          <div className="footer-column">
            <h3 className="footer-column-title">Follow us</h3>
            <div className="footer-social-icons">
              {/* Botón de Twitter */}
              <button
                className="footer-social-icon"
                onClick={() => onSocialClick && onSocialClick('twitter')}
                aria-label="Follow us on Twitter"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              
              {/* Botón de Facebook */}
              <button
                className="footer-social-icon"
                onClick={() => onSocialClick && onSocialClick('facebook')}
                aria-label="Follow us on Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              
              {/* Botón de Instagram */}
              <button
                className="footer-social-icon"
                onClick={() => onSocialClick && onSocialClick('instagram')}
                aria-label="Follow us on Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sección inferior del footer */}
        <div className="footer-bottom">
          
          {/* Copyright */}
          <div className="footer-copyright">
            <p>Copyright © 2025 Discord Powered by DOTEXE. Powered by Shopify</p>
          </div>

          {/* Sección derecha: País y métodos de pago */}
          <div className="footer-right">
            
            {/* Dropdown de selección de país */}
            <div className="footer-country-dropdown">
              <select
                value={selectedCountry.code}
                onChange={(e) => {
                  const country = countries.find(c => c.code === e.target.value);
                  if (country) handleCountrySelect(country);
                }}
                className="footer-country-select"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name} ({country.currency})
                  </option>
                ))}
              </select>
            </div>

            {/* Iconos de métodos de pago */}
            <div className="footer-payment-methods">
              {paymentMethods.map((method, index) => (
                <div key={index} className="footer-payment-icon" title={method}>
                  <span className="payment-text">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;