// Configuración de la aplicación
export const APP_CONFIG = {
  CAROUSEL_AUTO_PLAY_INTERVAL: 4000,
  DEFAULT_CART_ITEMS_COUNT: 3,
  SEARCH_DEBOUNCE_DELAY: 300,
  DROPDOWN_CLOSE_DELAY: 150,
} as const;

// Textos de la aplicación
export const APP_TEXTS = {
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
} as const;

// URLs y rutas
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  COLLECTIONS: '/collections',
  CATEGORIES: '/categories',
  CART: '/cart',
  PROFILE: '/profile',
  ORDERS: '/orders',
  WISHLIST: '/wishlist',
  SETTINGS: '/settings',
} as const;

// Tamaños de imagen estándar (para optimización)
export const IMAGE_SIZES = {
  CAROUSEL: { width: 1200, height: 500 },
  PRODUCT_CARD: { width: 600, height: 400 },
  FEATURED_PRODUCT: { width: 500, height: 500 },
  COLLECTION: { width: 400, height: 250 },
} as const;

// Colores del tema Discord (para referencia en CSS)
export const DISCORD_COLORS = {
  PRIMARY: '#5865F2',
  PRIMARY_HOVER: '#4752C4',
  SECONDARY: '#4F545C',
  DARK: '#36393F',
  DARKER: '#2C2F36',
  TEXT_LIGHT: '#B9BBBE',
  TEXT_MUTED: '#72767D',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
} as const;

// Breakpoints para responsive design
export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE_DESKTOP: '1200px',
} as const;

// Configuraciones específicas de componentes
export const COMPONENT_CONFIG = {
  CAROUSEL: {
    TRANSITION_DURATION: '0.5s',
    EASING: 'ease-in-out',
  },
  DROPDOWN: {
    ANIMATION_DURATION: '0.3s',
    Z_INDEX: 1000,
  },
  FOOTER: {
    COLUMNS: {
      MOBILE: 1,
      TABLET: 2,
      DESKTOP: 3,
    },
  },
} as const;