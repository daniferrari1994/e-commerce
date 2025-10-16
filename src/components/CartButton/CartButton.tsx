import './CartButton.css';

interface CartButtonProps {
  itemsCount?: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ 
  itemsCount = 0,
  onClick,
  className = "",
  disabled = false
}) => {
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
      {itemsCount > 0 && (
        <span className="cart-badge" aria-label={`${itemsCount} artículos en el carrito`}>
          {itemsCount > 99 ? '99+' : itemsCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;