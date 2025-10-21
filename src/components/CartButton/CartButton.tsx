import './CartButton.css';
interface CartButtonProps {
  itemsCount?: number;    // Número de items en el carrito (opcional, por defecto 0)
  onClick?: () => void;   // Función callback que se ejecuta al hacer clic (opcional)
  className?: string;     // Clases CSS adicionales (opcional)
  disabled?: boolean;     // Estado de deshabilitado del botón (opcional, por defecto false)
}

const CartButton: React.FC<CartButtonProps> = ({ 
  itemsCount = 0,      // Valor por defecto: carrito vacío
  onClick,             // Función de callback opcional
  className = "",      // Sin clases adicionales por defecto
  disabled = false     // Botón habilitado por defecto
}) => {
  // Manejador de clicks que verifica si el botón está habilitado
  // y si existe una función onClick antes de ejecutarla
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button 
      className={`cart-button ${className} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Carrito de compras ${itemsCount > 0 ? `con ${itemsCount} artículos` : 'vacío'}`}
    >
      <span className="cart-icon">🛒</span>
      
      {/* Badge que muestra el número de items - solo se renderiza si hay items */}
      {itemsCount > 0 && (
        <span className="cart-badge" aria-label={`${itemsCount} artículos en el carrito`}>
          {/* Limita la visualización a 99+ para evitar badges muy grandes */}
          {itemsCount > 99 ? '99+' : itemsCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;