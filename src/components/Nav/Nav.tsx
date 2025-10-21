import './Nav.css';
import SearchBar from '../SearchBar/index';
import CountryCurrencyDropdown from '../CountryCurrencyDropdown/index';
import UserProfileDropdown from '../UserProfileDropdown/index';
import CartButton from '../CartButton/index';

// Props del componente Nav (navegación principal)
interface NavProps {
  cartItemsCount?: number;                        // Número de items en el carrito
  onSearch?: (query: string) => void;             // Callback para búsquedas
  onCountryChange?: (country: any) => void;       // Callback para cambio de país/moneda
  onUserMenuClick?: (action: string) => void;     // Callback para acciones del menú de usuario
  onCartClick?: () => void;                       // Callback para click en carrito
  onLogoClick?: () => void;                       // Callback para click en logo (ir al home)
}

const Nav: React.FC<NavProps> = ({ 
  cartItemsCount = 0,
  onSearch,
  onCountryChange,
  onUserMenuClick,
  onCartClick,
  onLogoClick
}) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Sección de logos (Discord + Brand) */}
        <div className="nav-logos">
          {/* Logo de Discord */}
          <div className="logo-discord" onClick={onLogoClick}>
            <img 
              src="https://discordmerch.com/cdn/shop/files/Discord_2022_Lockup_black_s_a9ebf8c2-511d-4cdd-91ed-d116bbccfa69_740x.png?v=1661910167"
              alt="Discord Logo"
              className="discord-logo-image"
            />
          </div>
          {/* Logo/Nombre de la marca */}
          <div className="logo-brand">
            <span className="brand-text">E-Commerce</span>
          </div>
        </div>
        
        {/* Barra de búsqueda central */}
        <SearchBar onSearch={onSearch} />
        
        {/* Acciones del lado derecho */}
        <div className="nav-actions">
          <CountryCurrencyDropdown onCountryChange={onCountryChange} />
          <UserProfileDropdown onMenuItemClick={onUserMenuClick} />
          <CartButton itemsCount={cartItemsCount} onClick={onCartClick} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;