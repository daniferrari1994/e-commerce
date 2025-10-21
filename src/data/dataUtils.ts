import productsData from './products.json';
import type { ProductData } from '../types';

// Re-exportar el tipo ProductData para conveniencia
export type Product = ProductData;

// Opciones para los dropdowns
export const sortOptions = [
  { id: 'featured', value: 'featured', label: 'Featured' },
  { id: 'newest', value: 'newest', label: 'Newest' },
  { id: 'price-low-high', value: 'price-low-high', label: 'Price: Low to High' },
  { id: 'price-high-low', value: 'price-high-low', label: 'Price: High to Low' },
  { id: 'alphabetical', value: 'alphabetical', label: 'Alphabetical' },
];

export const categoryFilterOptions = [
  { id: 'all', value: 'all', label: 'All Categories' },
  { id: 'apparel', value: 'apparel', label: 'Apparel' },
  { id: 'goods', value: 'goods', label: 'Goods' },
];

export const priceFilterOptions = [
  { id: 'all', value: 'all', label: 'All Prices' },
  { id: '0-25', value: '0-25', label: '$0 - $25' },
  { id: '25-50', value: '25-50', label: '$25 - $50' },
  { id: '50-100', value: '50-100', label: '$50 - $100' },
  { id: '100+', value: '100+', label: '$100+' },
];

export const viewOptions = [
  { id: 'grid', value: 'grid', label: 'Grid View' },
  { id: 'list', value: 'list', label: 'List View' },
];

// Banners para las secciones
export const sectionBanners = {
  apparel: {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop',
    alt: 'Apparel Collection Banner'
  },
  goods: {
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=300&fit=crop',
    alt: 'Goods Collection Banner'
  },
  disxcore: {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop',
    alt: 'DISXCORE Collection Banner'
  },
  'daydream-doodles': {
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=300&fit=crop',
    alt: 'Daydream Doodles Collection Banner'
  },
  'gaming-gear': {
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=300&fit=crop',
    alt: 'Gaming Gear Collection Banner'
  },
  'camp-wumpus': {
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=300&fit=crop',
    alt: 'Camp Wumpus Collection Banner'
  },
  everyone: {
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=300&fit=crop',
    alt: '@everyone Collection Banner'
  },
  here: {
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&h=300&fit=crop',
    alt: '@here Collection Banner'
  },
  'misc-misc': {
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&h=300&fit=crop',
    alt: 'Misc Misc Collection Banner'
  },
  new: {
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=300&fit=crop',
    alt: 'New Arrivals Banner'
  }
};

// Función para convertir los productos del JSON al formato esperado
function flattenProducts(): Product[] {
  const products: Product[] = [];
  
  // Procesar apparel
  if (productsData.apparel) {
    Object.entries(productsData.apparel).forEach(([subcategory, items]) => {
      if (Array.isArray(items)) {
        items.forEach(item => {
          products.push({
            ...item,
            category: 'apparel',
            subcategory,
            specifications: item.specifications || []
          });
        });
      }
    });
  }
  
  // Procesar goods
  if (productsData.goods) {
    Object.entries(productsData.goods).forEach(([subcategory, items]) => {
      if (Array.isArray(items)) {
        items.forEach(item => {
          products.push({
            ...item,
            category: 'goods',
            subcategory,
            specifications: item.specifications || []
          });
        });
      }
    });
  }
  
  return products;
}

// Funciones para obtener productos
export function getAllProducts(): Product[] {
  return flattenProducts();
}

export function getProductsByCategory(category: 'apparel' | 'goods'): Product[] {
  return getAllProducts().filter(product => product.category === category);
}

export function getProductsByCollection(collection: string): Product[] {
  const collectionMap: Record<string, string> = {
    'DISXCORE': 'DISXCORE',
    'daydream doodles': 'Daydream Doodles',
    'Gaming Gear': 'Discord Developers', // Mapeo especial para gaming gear
    'Camp Wumpus': 'Camp Wumpus',
    '@everyone': '@everyone',
    '@here': '@here',
    'Misc Misc': 'Idle Nights' // Mapeo por defecto
  };
  
  const targetCollection = collectionMap[collection] || collection;
  return getAllProducts().filter(product => 
    product.collection === targetCollection || 
    (product.collection && product.collection.toLowerCase().includes(targetCollection.toLowerCase()))
  );
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter(product => product.featured === true);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return getAllProducts().filter(product => product.subcategory === subcategory);
}

// Función de búsqueda
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return getAllProducts().filter(product =>
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
    (product.collection && product.collection.toLowerCase().includes(searchTerm))
  );
}

// Función para aplicar filtros y ordenamiento
export function filterAndSortProducts(
  products: Product[],
  sortBy: string = 'featured',
  categoryFilter: string = 'all',
  priceFilter: string = 'all'
): Product[] {
  let filtered = [...products];
  
  // Aplicar filtro de categoría
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(product => product.category === categoryFilter);
  }
  
  // Aplicar filtro de precio
  if (priceFilter !== 'all') {
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price.replace('$', ''));
      switch (priceFilter) {
        case '0-25':
          return price <= 25;
        case '25-50':
          return price > 25 && price <= 50;
        case '50-100':
          return price > 50 && price <= 100;
        case '100+':
          return price > 100;
        default:
          return true;
      }
    });
  }
  
  // Aplicar ordenamiento
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      case 'newest':
        return b.id.localeCompare(a.id); // Asumiendo que IDs más altos = más nuevos
      case 'price-low-high':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high-low':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  
  return filtered;
}