import './ProductShowcase.css';

interface ProductSpecification {
  label: string;
  value: string;
}

interface ProductData {
  title: string;
  price?: string;
  description?: string;
  specifications?: ProductSpecification[];
  image: string;
  alt: string;
  url?: string;
}

interface ProductShowcaseProps {
  products: ProductData[];
  variant?: 'cards' | 'featured';
  onActionClick?: (product: ProductData, action: 'shop' | 'buy') => void;
  className?: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  variant = 'cards',
  onActionClick,
  className = ""
}) => {
  const handleActionClick = (product: ProductData, action: 'shop' | 'buy') => {
    if (onActionClick) {
      onActionClick(product, action);
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`product-showcase product-showcase--${variant} ${className}`}>
      <div className="product-showcase-container">
        {products.map((product, index) => (
          <div key={index} className="product-showcase-item">
            
            {variant === 'cards' ? (
              // Layout para cards simples
              <div className="product-card">
                <div className="product-card-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="product-card-image"
                    onClick={() => handleActionClick(product, 'shop')}
                  />
                  
                  {/* Overlay con título y botón */}
                  <div className="product-card-overlay">
                    <div className="product-card-overlay-content">
                      <h2 className="product-card-overlay-title">{product.title}</h2>
                      <button 
                        className="product-card-shop-button"
                        onClick={() => handleActionClick(product, 'shop')}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Layout para productos destacados (imagen siempre a la derecha)
              <div className="featured-product">
                <div className="featured-product-content">
                  
                  {/* Información del producto - siempre a la izquierda */}
                  <div className="featured-product-info">
                    <h2 className="featured-product-title">{product.title}</h2>
                    
                    {product.price && (
                      <div className="featured-product-price">
                        {product.price}
                      </div>
                    )}
                    
                    {product.description && (
                      <p className="featured-product-description">
                        {product.description}
                      </p>
                    )}
                    
                    {product.specifications && product.specifications.length > 0 && (
                      <div className="featured-product-specifications">
                        <h3 className="specifications-title">Specifications</h3>
                        <ul className="specifications-list">
                          {product.specifications.map((spec, specIndex) => (
                            <li key={specIndex} className="specification-item">
                              <span className="spec-label">{spec.label}:</span>
                              <span className="spec-value">{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button 
                      className="featured-product-quick-buy"
                      onClick={() => handleActionClick(product, 'buy')}
                    >
                      Quick Buy
                    </button>
                  </div>
                  
                  {/* Imagen del producto - siempre a la derecha */}
                  <div className="featured-product-image-container">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="featured-product-image"
                    />
                  </div>
                  
                </div>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;