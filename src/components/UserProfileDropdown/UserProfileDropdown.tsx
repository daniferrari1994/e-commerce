import { useState, useRef, useEffect } from 'react';
import './UserProfileDropdown.css';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface UserProfileDropdownProps {
  user?: User;
  onMenuItemClick?: (action: string) => void;
  className?: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ 
  user = { name: 'Usuario', email: 'usuario@email.com' },
  onMenuItemClick,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 'profile', label: 'Mi Perfil', icon: '📊' },
    { id: 'orders', label: 'Mis Pedidos', icon: '📦' },
    { id: 'wishlist', label: 'Lista de Deseos', icon: '❤️' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' },
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

  const handleMenuItemClick = (action: string) => {
    setIsOpen(false);
    if (onMenuItemClick) {
      onMenuItemClick(action);
    }
  };

  return (
    <div className={`user-profile-dropdown ${className}`} ref={dropdownRef}>
      <button 
        className="dropdown-trigger user-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="user-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="avatar-image" />
          ) : (
            '👤'
          )}
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu user-menu">
          <div className="user-info">
            <div className="user-avatar-large">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="avatar-image-large" />
              ) : (
                '👤'
              )}
            </div>
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>
          
          <div className="dropdown-divider"></div>
          
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="dropdown-item"
              onClick={() => handleMenuItemClick(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
          
          <div className="dropdown-divider"></div>
          
          <button 
            className="dropdown-item logout"
            onClick={() => handleMenuItemClick('logout')}
          >
            <span className="menu-icon">🚪</span>
            <span className="menu-label">Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;