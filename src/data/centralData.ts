// ARCHIVO ÚNICO DE DATOS CENTRALIZADOS - NO DUPLICAR INFORMACIÓN

// ========== CAROUSEL ==========
export const carouselData = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
    alt: 'DISXCORE Collection',
    title: 'DISXCORE',
    url: '/collections/disxcore'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=500&fit=crop',
    alt: 'daydream doodles Collection',
    title: 'daydream doodles',
    url: '/collections/daydream-doodles'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=500&fit=crop',
    alt: 'Gaming Gear Collection',
    title: 'Gaming Gear',
    url: '/collections/gaming-gear'
  }
];

// ========== COLLECTIONS ==========
export const collectionsData = [
  {
    id: 'disxcore',
    name: 'DISXCORE',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop',
    alt: 'DISXCORE Collection',
    url: '/collections/disxcore'
  },
  {
    id: 'daydream-doodles',
    name: 'daydream doodles',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=250&fit=crop',
    alt: 'daydream doodles Collection',
    url: '/collections/daydream-doodles'
  },
  {
    id: 'gaming-gear',
    name: 'Gaming Gear',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=250&fit=crop',
    alt: 'Gaming Gear Collection',
    url: '/collections/gaming-gear'
  },
  {
    id: 'camp-wumpus',
    name: 'Camp Wumpus',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
    alt: 'Camp Wumpus Collection',
    url: '/collections/camp-wumpus'
  },
  {
    id: 'everyone',
    name: '@everyone',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=250&fit=crop',
    alt: '@everyone Collection',
    url: '/collections/everyone'
  },
  {
    id: 'here',
    name: '@here',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=250&fit=crop',
    alt: '@here Collection',
    url: '/collections/here'
  },
  {
    id: 'misc-misc',
    name: 'Misc Misc',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=250&fit=crop',
    alt: 'Misc Misc Collection',
    url: '/collections/misc-misc'
  }
];

// ========== CATEGORY CARDS ==========
export const categoryCardsData = [
  {
    id: 'category-hoodies',
    title: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop',
    alt: 'Premium Hoodies Collection',
    category: 'hoodies'
  },
  {
    id: 'category-tees',
    title: 'Tees',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    alt: 'Essential Tees Collection',
    category: 'tees'
  }
];

// ========== HORIZONTAL PRODUCTS ==========
export const horizontalProductsData = [
  {
    id: 'horizontal-1',
    title: 'DISXCORE Gaming Hoodie',
    price: '$59.99',
    description: 'Premium quality hoodie featuring the iconic DISXCORE design. Perfect for gaming sessions and casual wear. Made with ultra-soft cotton blend for maximum comfort.',
    features: [
      { label: 'Material', value: '80% Cotton, 20% Polyester' },
      { label: 'Fit', value: 'Unisex Relaxed' },
      { label: 'Care', value: 'Machine Wash Cold' },
      { label: 'Origin', value: 'Responsibly Sourced' }
    ],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=400&fit=crop',
    alt: 'DISXCORE Gaming Hoodie'
  },
  {
    id: 'horizontal-2',
    title: 'Discord Premium Wireless Mouse',
    price: '$89.99',
    description: 'High-performance wireless gaming mouse with Discord-themed RGB lighting. Featuring precision tracking and customizable buttons for the ultimate gaming experience.',
    features: [
      { label: 'DPI', value: 'Up to 16,000' },
      { label: 'Connection', value: 'Wireless 2.4GHz' },
      { label: 'Battery', value: '70+ Hours' },
      { label: 'Compatibility', value: 'PC, Mac, Console' }
    ],
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=400&fit=crop',
    alt: 'Discord Premium Wireless Mouse'
  },
  {
    id: 'horizontal-3',
    title: 'Wumpus Collectible Figure',
    price: '$34.99',
    description: 'Limited edition Wumpus collectible figure with premium packaging. A must-have for Discord fans and collectors. Features articulated joints and authentic details.',
    features: [
      { label: 'Height', value: '6 inches (15cm)' },
      { label: 'Material', value: 'High-grade PVC' },
      { label: 'Edition', value: 'Limited (5000 units)' },
      { label: 'Packaging', value: 'Premium Collector Box' }
    ],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop',
    alt: 'Wumpus Collectible Figure'
  }
];

// ========== CONFIGURACIÓN Y TEXTOS ==========
export const appConfig = {
  CAROUSEL_AUTO_PLAY_INTERVAL: 4000,
  DEFAULT_CART_ITEMS_COUNT: 3,
  SEARCH_DEBOUNCE_DELAY: 300,
  DROPDOWN_CLOSE_DELAY: 150,
};

export const appTexts = {
  SEARCH_PLACEHOLDER: 'Buscar productos...',
  NEWSLETTER_TITLE: 'Subscribe to the Latest and Greatest.',
  NEWSLETTER_SUBTITLE: 'Official Discord merch news, contests and updates!',
  EMAIL_PLACEHOLDER: 'Enter your email',
  SIGNUP_BUTTON: 'Sign up',
  FEATURED_PRODUCTS_TITLE: 'Featured Products',
  COLLECTIONS_TITLE: 'Current Collections',
  COPYRIGHT_TEXT: '© 2025 Discord Inc. All rights reserved. DISCORD, the Discord logo, DISXCORE and related marks and logos are trademarks of Discord Inc.',
  COMPANY_INFO: 'Discord Store is the official merchandise store for Discord. High-quality apparel, accessories, and collectibles for the Discord community.',
  NO_IMAGES_MESSAGE: 'No hay imágenes disponibles',
  SHOP_NOW: 'Shop Now',
  QUICK_BUY: 'Quick Buy',
};