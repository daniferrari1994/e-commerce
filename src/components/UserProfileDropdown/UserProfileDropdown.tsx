import { useState, useRef, useEffect } from 'react';
import './UserProfileDropdown.css';

// Interfaz para los datos del usuario
interface User {
  name: string;      // Nombre del usuario
  email: string;     // Email del usuario
  avatar?: string;   // URL del avatar (opcional)
}

// Props del componente UserProfileDropdown
interface UserProfileDropdownProps {
  user?: User;                                    // Datos del usuario (opcional, tiene valores por defecto)
  onMenuItemClick?: (action: string) => void;    // Callback para clicks en items del menú
  className?: string;                             // Clases CSS adicionales
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ 
  user = { name: 'Usuario', email: 'usuario@email.com' }, // Usuario por defecto
  onMenuItemClick,
  className = ""
}) => {
  // Estado para controlar si el dropdown está abierto
  const [isOpen, setIsOpen] = useState(false);
  
  // Referencia para detectar clicks fuera del dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Items del menú del usuario con iconos
  const menuItems = [
    { id: 'profile', label: 'Mi Perfil', icon: '📊' },
    { id: 'orders', label: 'Mis Pedidos', icon: '📦' },
    { id: 'wishlist', label: 'Lista de Deseos', icon: '❤️' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' },
  ];

  // Effect para cerrar el dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Agregar listener para clicks en el documento
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejador para clicks en items del menú
  const handleMenuItemClick = (action: string) => {
    setIsOpen(false); // Cierra el dropdown
    if (onMenuItemClick) {
      onMenuItemClick(action);
    }
  };

  return (
    <div className={`user-profile-dropdown ${className}`} ref={dropdownRef}>
      {/* Botón trigger que muestra el avatar del usuario */}
      <button 
        className="dropdown-trigger user-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="user-avatar">
          {/* Muestra imagen del avatar o emoji por defecto */}
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="avatar-image" />
          ) : (
            '👤'
          )}
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {/* Menu dropdown del usuario */}
      {isOpen && (
        <div className="dropdown-menu user-menu">
          {/* Información del usuario en la parte superior */}
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
          
          {/* Separador */}
          <div className="dropdown-divider"></div>
          
          {/* Items del menú */}
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
          
          {/* Separador antes del logout */}
          <div className="dropdown-divider"></div>
          
          {/* Botón de cerrar sesión */}
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