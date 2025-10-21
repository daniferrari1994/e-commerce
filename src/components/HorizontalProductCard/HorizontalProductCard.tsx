import React from 'react';
import './HorizontalProductCard.css';

// Tipos para las transiciones de hover disponibles
export type HoverEffect = 'zoom' | 'fade' | 'slide';

// Interfaz para las características del producto
interface ProductFeature {
  label: string;
  value: string;
}

// Interfaz para los datos del producto
export interface HorizontalProductData {
  id: string;
  title: string;
  price: string;
  description: string;
  features: ProductFeature[];
  image: string;
  hoverImage?: string; // Imagen opcional para mostrar en hover
  alt: string;
}

// Props del componente
interface HorizontalProductCardProps {
  product: HorizontalProductData;
  hoverEffect: HoverEffect;
  onQuickBuy: (product: HorizontalProductData) => void;
}

const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({ 
  product, 
  hoverEffect, 
  onQuickBuy 
}) => {
  return (
    <div className="horizontal-card">
      {/* Sección de contenido - Lado izquierdo */}
      <div className="horizontal-card__content">
        <div>
          {/* Título del producto */}
          <h3 className="horizontal-card__title">
            {product.title}
          </h3>
          
          {/* Precio del producto */}
          <p className="horizontal-card__price">
            {product.price}
          </p>
          
          {/* Descripción del producto */}
          <p className="horizontal-card__description">
            {product.description}
          </p>
          
          {/* Características del producto */}
          <div className="horizontal-card__features">
            {product.features.map((feature, index) => (
              <div key={index} className="horizontal-card__feature">
                <span className="horizontal-card__feature-label">{feature.label}:</span>
                <span className="horizontal-card__feature-value">{feature.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Botón Quick Buy */}
        <button 
          className="horizontal-card__button"
          onClick={() => onQuickBuy(product)}
        >
          Quick Buy
        </button>
      </div>
      
      {/* Sección de imagen - Lado derecho */}
      <div className="horizontal-card__image-container">
        {/* Imagen principal */}
        <img 
          src={product.image} 
          alt={product.alt}
          className={`horizontal-card__image horizontal-card__image--${hoverEffect}`}
        />
        
        {/* Imagen hover (si existe) */}
        {product.hoverImage && (
          <img 
            src={product.hoverImage} 
            alt={`${product.alt} - hover`}
            className="horizontal-card__hover-image"
          />
        )}
      </div>
    </div>
  );
};

export default HorizontalProductCard;