import { useState, useRef } from 'react';
import './SecondaryNav.css';

interface SecondaryNavProps {
  onCollectionSelect?: (collection: string) => void;
  onCategorySelect?: (category: string) => void;
  onShopAllClick?: () => void;
  onMoreSelect?: (option: string) => void;
  className?: string;
}

const SecondaryNav: React.FC<SecondaryNavProps> = ({
  onCollectionSelect,
  onCategorySelect,
  onShopAllClick,
  onMoreSelect,
  className = ""
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const collections = [
    'DISXCORE',
    'Discord Developers',
    'Daydream Doodles',
    'Idle Nights',
    'Camp Wumpus',
    '@everyone',
    '@here',
    'Misc Misc'
  ];

  const apparelCategories = [
    'Tees',
    'Tops',
    'Hoodies',
    'Sweatshirts',
    'Outerwear',
    'Bottoms'
  ];

  const goodsCategories = [
    'Plushies',
    'Keyboards',
    'Streaming Gear',
    'Headwear',
    'Drinkware',
    'Bags',
    'Collectibles',
    'Accessories'
  ];

  const moreOptions = [
    'New',
    'FAQ and Contact Info',
    'Return Policy'
  ];

  const handleMouseEnter = (dropdownName: string) => {
    setOpenDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleItemClick = (type: string, item: string) => {
    setOpenDropdown(null);
    
    switch (type) {
      case 'collection':
        onCollectionSelect?.(item);
        break;
      case 'category':
        onCategorySelect?.(item);
        break;
      case 'more':
        onMoreSelect?.(item);
        break;
    }
  };

  const handleShopAllClick = () => {
    onShopAllClick?.();
  };

  return (
    <nav className={`secondary-nav ${className}`}>
      <div className="secondary-nav-container">
        
        {/* Collections Dropdown */}
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
          
          {openDropdown === 'collections' && (
            <div className="dropdown-menu single-column">
              {collections.map((collection) => (
                <button
                  key={collection}
                  className="dropdown-item"
                  onClick={() => handleItemClick('collection', collection)}
                >
                  {collection}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Categories Dropdown */}
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
          
          {openDropdown === 'categories' && (
            <div className="dropdown-menu two-columns">
              <div className="column">
                <div className="column-header">Apparel</div>
                {apparelCategories.map((category) => (
                  <button
                    key={category}
                    className="dropdown-item"
                    onClick={() => handleItemClick('category', category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="column">
                <div className="column-header">Goods</div>
                {goodsCategories.map((category) => (
                  <button
                    key={category}
                    className="dropdown-item"
                    onClick={() => handleItemClick('category', category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Shop All Button */}
        <div className="nav-item">
          <button
            className="nav-button shop-all-button"
            onClick={handleShopAllClick}
          >
            <span className="nav-text">Shop All</span>
          </button>
        </div>

        {/* More Dropdown */}
        <div 
          className="nav-item dropdown"
          ref={(el) => { dropdownRefs.current.more = el; }}
          onMouseEnter={() => handleMouseEnter('more')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-button dropdown-trigger ${openDropdown === 'more' ? 'active' : ''}`}
          >
            <span className="nav-text">More</span>
            <span className={`chevron ${openDropdown === 'more' ? 'open' : ''}`}>▼</span>
          </button>
          
          {openDropdown === 'more' && (
            <div className="dropdown-menu single-column">
              {moreOptions.map((option) => (
                <button
                  key={option}
                  className="dropdown-item"
                  onClick={() => handleItemClick('more', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default SecondaryNav;