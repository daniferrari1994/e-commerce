import { useState, useRef } from 'react';
import { collectionsData } from '../../data';
import './SecondaryNav.css';

// Props del componente SecondaryNav (navegación secundaria con dropdowns)
interface SecondaryNavProps {
  onCollectionSelect?: (collectionId: string) => void;  // Callback para selección de colección
  onCategorySelect?: (category: 'apparel' | 'goods') => void;  // Callback para selección de categoría
  onSubcategorySelect?: (subcategory: string) => void;  // Callback para selección de subcategoría
  onShopAllClick?: () => void;                          // Callback para "Shop All"
  onNewArrivalsClick?: () => void;                      // Callback para "New Arrivals"
  className?: string;                                   // Clases CSS adicionales
}

const SecondaryNav: React.FC<SecondaryNavProps> = ({
  onCollectionSelect,
  onCategorySelect,
  onSubcategorySelect,
  onShopAllClick,
  onNewArrivalsClick,
  className = ""
}) => {
  // Estado para controlar qué dropdown está abierto
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Referencias para los elementos de dropdown
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Categorías principales
  const mainCategories = [
    { id: 'apparel', name: 'Apparel', subcategories: ['Tees', 'Tops', 'Hoodies', 'Sweatshirts', 'Outerwear', 'Bottoms'] },
    { id: 'goods', name: 'Goods', subcategories: ['Plushies', 'Keyboards', 'Streaming Gear', 'Headwear', 'Drinkware', 'Bags', 'Collectibles', 'Accessories'] }
  ];

  // Manejador para mostrar dropdown al hacer hover
  const handleMouseEnter = (dropdownName: string) => {
    setOpenDropdown(dropdownName);
  };

  // Manejador para ocultar dropdown al salir del hover
  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  // Manejador para clicks en colecciones
  const handleCollectionClick = (collectionId: string) => {
    setOpenDropdown(null);
    onCollectionSelect?.(collectionId);
  };

  // Manejador para clicks en categorías principales
  const handleCategoryClick = (category: 'apparel' | 'goods') => {
    setOpenDropdown(null);
    onCategorySelect?.(category);
  };

  // Manejador para clicks en subcategorías
  const handleSubcategoryClick = (subcategory: string) => {
    setOpenDropdown(null);
    onSubcategorySelect?.(subcategory);
  };

  // Manejador específico para el botón "Shop All"
  const handleShopAllClick = () => {
    onShopAllClick?.();
  };

  // Manejador específico para el botón "New Arrivals"
  const handleNewArrivalsClick = () => {
    onNewArrivalsClick?.();
  };

  return (
    <nav className={`secondary-nav ${className}`}>
      <div className="secondary-nav-container">
        
        {/* Dropdown de Collections */}
        <div 
          className="nav-item dropdown"
          ref={(el) => { dropdownRefs.current.collections = el; }}
          onMouseEnter={() => handleMouseEnter('collections')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-button dropdown-trigger ${openDropdown === 'collections' ? 'active' : ''}`}
          >
            <span className="nav-text">Collections</span>
            <span className={`chevron ${openDropdown === 'collections' ? 'open' : ''}`}>▼</span>
          </button>
          
          {/* Menu dropdown de colecciones */}
          {openDropdown === 'collections' && (
            <div className="dropdown-menu single-column">
              {collectionsData.map((collection) => (
                <button
                  key={collection.id}
                  className="dropdown-item"
                  onClick={() => handleCollectionClick(collection.id)}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Dropdown de Categories */}
        <div 
          className="nav-item dropdown"
          ref={(el) => { dropdownRefs.current.categories = el; }}
          onMouseEnter={() => handleMouseEnter('categories')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-button dropdown-trigger ${openDropdown === 'categories' ? 'active' : ''}`}
          >
            <span className="nav-text">Categories</span>
            <span className={`chevron ${openDropdown === 'categories' ? 'open' : ''}`}>▼</span>
          </button>
          
          {/* Menu dropdown de categorías (dos columnas: Apparel y Goods) */}
          {openDropdown === 'categories' && (
            <div className="dropdown-menu two-columns">
              {/* Columna de Apparel */}
              <div className="column">
                <button
                  className="column-header clickable"
                  onClick={() => handleCategoryClick('apparel')}
                >
                  Apparel
                </button>
                {mainCategories[0].subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    className="dropdown-item"
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
              {/* Columna de Goods */}
              <div className="column">
                <button
                  className="column-header clickable"
                  onClick={() => handleCategoryClick('goods')}
                >
                  Goods
                </button>
                {mainCategories[1].subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    className="dropdown-item"
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Botón Shop All (sin dropdown) */}
        <div className="nav-item">
          <button
            className="nav-button shop-all-button"
            onClick={handleShopAllClick}
          >
            <span className="nav-text">Shop All</span>
          </button>
        </div>
        
        {/* Botón New Arrivals (sin dropdown) */}
        <div className="nav-item">
          <button
            className="nav-button new-arrivals-button"
            onClick={handleNewArrivalsClick}
          >
            <span className="nav-text">New Arrivals</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNav;