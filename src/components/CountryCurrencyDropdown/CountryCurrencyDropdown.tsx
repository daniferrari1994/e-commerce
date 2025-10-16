import { useState, useRef, useEffect } from 'react';
import './CountryCurrencyDropdown.css';

interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
}

interface CountryCurrencyDropdownProps {
  onCountryChange?: (country: Country) => void;
  className?: string;
}

const CountryCurrencyDropdown: React.FC<CountryCurrencyDropdownProps> = ({ 
  onCountryChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({ 
    code: 'US', 
    name: 'Estados Unidos', 
    currency: 'USD', 
    flag: '🇺🇸' 
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries: Country[] = [
    { code: 'US', name: 'Estados Unidos', currency: 'USD', flag: '🇺🇸' },
    { code: 'MX', name: 'México', currency: 'MXN', flag: '🇲🇽' },
    { code: 'CA', name: 'Canadá', currency: 'CAD', flag: '🇨🇦' },
    { code: 'ES', name: 'España', currency: 'EUR', flag: '🇪🇸' },
    { code: 'AR', name: 'Argentina', currency: 'ARS', flag: '🇦🇷' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    if (onCountryChange) {
      onCountryChange(country);
    }
  };

  return (
    <div className={`country-currency-dropdown ${className}`} ref={dropdownRef}>
      <button 
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="country-flag">{selectedCountry.flag}</span>
        <span className="country-currency">{selectedCountry.currency}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
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