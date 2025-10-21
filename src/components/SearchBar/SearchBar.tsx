import { useState } from 'react';
import './SearchBar.css';

// Props del componente SearchBar
interface SearchBarProps {
  placeholder?: string;                   // Texto placeholder del input (opcional)
  onSearch?: (query: string) => void;     // Callback que se ejecuta al realizar una búsqueda
  className?: string;                     // Clases CSS adicionales
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Buscar productos...", 
  onSearch,
  className = ""
}) => {
  // Estado para el texto de búsqueda actual
  const [searchQuery, setSearchQuery] = useState("");

  // Función que ejecuta la búsqueda si hay un callback disponible
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  // Manejador para detectar Enter y ejecutar búsqueda
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`search-bar ${className}`}>
      <div className="search-container">
        {/* Input de búsqueda con soporte para Enter */}
        <input 
          type="text" 
          placeholder={placeholder}
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {/* Botón de búsqueda */}
        <button 
          className="search-button"
          onClick={handleSearch}
        >
          🔍
        </button>
      </div>
    </div>
  );
};

export default SearchBar;