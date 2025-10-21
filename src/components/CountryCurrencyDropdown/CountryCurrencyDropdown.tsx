import { useState, useRef, useEffect } from 'react';
import type { Country } from '../../types';
import './CountryCurrencyDropdown.css';

// Props del componente CountryCurrencyDropdown
interface CountryCurrencyDropdownProps {
  onCountryChange?: (country: Country) => void;  // Callback cuando se selecciona un país
  className?: string;                            // Clases CSS adicionales
}

const CountryCurrencyDropdown: React.FC<CountryCurrencyDropdownProps> = ({ 
  onCountryChange,
  className = ""
}) => {
  // Estado para controlar si el dropdown está abierto
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado para el país seleccionado actualmente (Estados Unidos por defecto)
  const [selectedCountry, setSelectedCountry] = useState<Country>({ 
    code: 'US', 
    name: 'Estados Unidos', 
    currency: 'USD', 
    flag: '🇺🇸' 
  });
  
  // Referencia al contenedor del dropdown para detectar clicks fuera
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lista de países disponibles con sus datos
  const countries: Country[] = [
    { code: 'US', name: 'Estados Unidos', currency: 'USD', flag: '🇺🇸' },
    { code: 'MX', name: 'México', currency: 'MXN', flag: '🇲🇽' },
    { code: 'CA', name: 'Canadá', currency: 'CAD', flag: '🇨🇦' },
    { code: 'ES', name: 'España', currency: 'EUR', flag: '🇪🇸' },
    { code: 'AR', name: 'Argentina', currency: 'ARS', flag: '🇦🇷' },
  ];

  // Effect para cerrar el dropdown cuando se hace click fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Agregar listener para clicks en el documento
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup: remover listener al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejador para seleccionar un país del dropdown
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);  // Actualiza el país seleccionado
    setIsOpen(false);            // Cierra el dropdown
    
    // Ejecuta el callback si está disponible
    if (onCountryChange) {
      onCountryChange(country);
    }
  };

  return (
    <div className={`country-currency-dropdown ${className}`} ref={dropdownRef}>
      {/* Botón que muestra el país seleccionado y abre/cierra el dropdown */}
      <button 
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="country-flag">{selectedCountry.flag}</span>
        <span className="country-currency">{selectedCountry.currency}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {/* Menu dropdown que se muestra condicionalmente */}
      {isOpen && (
        <div className="dropdown-menu">
          {/* Mapea todos los países disponibles */}
          {countries.map((country) => (
            <button
              key={country.code}
              className={`dropdown-item ${selectedCountry.code === country.code ? 'active' : ''}`}
              onClick={() => handleCountrySelect(country)}
            >
              <span className="country-flag">{country.flag}</span>
              <span className="country-info">
                <span className="country-name">{country.name}</span>
                <span className="country-currency">{country.currency}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCurrencyDropdown;