import React from 'react';
import type { ProductData } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: ProductData;  // Datos del producto a mostrar
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      {/* Contenedor de imagen con botón de compra rápida */}
      <div className="product-card__image-container">
        <img 
          src={product.image} 
          alt={product.alt || product.title}  // Usa alt específico o título como fallback
          className="product-card__image"
        />
        {/* Botón de compra rápida que aparece solo en hover */}
        <button 
          className="product-card__quick-buy-button"
          onClick={(e) => {
            e.stopPropagation(); // Previene propagación del evento
            // TODO: Implementar funcionalidad de compra rápida
            console.log('Quick buy clicked for:', product.title);
          }}
        >
          Quick buy
        </button>
      </div>
      
      {/* Título del producto */}
      <h4 className="product-card__title">
        {product.title}
      </h4>
      
      {/* Precio del producto */}
      <p className="product-card__price">
        {product.price}
      </p>
    </div>
  );
};

export default ProductCard;