import { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Buscar productos...", 
  onSearch,
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`search-bar ${className}`}>
      <div className="search-container">
        <input 
          type="text" 
          placeholder={placeholder}
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
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