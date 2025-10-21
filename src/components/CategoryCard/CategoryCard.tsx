import React from 'react';
import './CategoryCard.css';

// Interfaz para los datos de la categoría
export interface CategoryCardData {
  id: string;
  title: string;
  image: string;
  alt: string;
  category: string; // Para navegación
}

// Props del componente
interface CategoryCardProps {
  category: CategoryCardData;
  onShopNow: (category: CategoryCardData) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  onShopNow 
}) => {
  return (
    <div 
      className="category-card"
      style={{ backgroundImage: `url(${category.image})` }}
    >
      {/* Overlay para mejorar legibilidad del texto */}
      <div className="category-card__overlay"></div>
      
      {/* Contenido superpuesto */}
      <div className="category-card__content">
        <h3 className="category-card__title">
          {category.title}
        </h3>
        
        <button 
          className="category-card__button"
          onClick={() => onShopNow(category)}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;