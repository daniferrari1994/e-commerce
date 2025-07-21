export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  USERS: '/users',
  ORDERS: '/orders',
  CART: '/cart',
} as const

// Mock API functions for development
export const api = {
  products: {
    getAll: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        data: [
          {
            id: '1',
            name: 'Smartphone Pro Max',
            description: 'El último smartphone con las mejores características y rendimiento excepcional.',
            price: 999.99,
            originalPrice: 1299.99,
            images: ['/placeholder-product.jpg'],
            category: 'electronics',
            tags: ['smartphone', 'premium', 'flagship'],
            rating: 4.8,
            reviewCount: 1247,
            inStock: true,
            stockQuantity: 50,
            featured: true,
            slug: 'smartphone-pro-max',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Laptop Gaming Elite',
            description: 'Laptop de alto rendimiento para gaming y trabajo profesional.',
            price: 1599.99,
            images: ['/placeholder-product.jpg'],
            category: 'electronics',
            tags: ['laptop', 'gaming', 'high-performance'],
            rating: 4.6,
            reviewCount: 892,
            inStock: true,
            stockQuantity: 25,
            featured: false,
            slug: 'laptop-gaming-elite',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '3',
            name: 'Auriculares Wireless Pro',
            description: 'Auriculares inalámbricos con cancelación de ruido y calidad premium.',
            price: 299.99,
            originalPrice: 399.99,
            images: ['/placeholder-product.jpg'],
            category: 'electronics',
            tags: ['headphones', 'wireless', 'noise-cancelling'],
            rating: 4.7,
            reviewCount: 654,
            inStock: true,
            stockQuantity: 100,
            featured: true,
            slug: 'auriculares-wireless-pro',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ]
      }
    },
    
    getById: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      // Return mock product based on ID
      return { data: null } // Implement based on needs
    },
    
    getByCategory: async (category: string) => {
      await new Promise(resolve => setTimeout(resolve, 800))
      // Return filtered products
      return { data: [] } // Implement based on needs
    }
  },
  
  categories: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return {
        data: [
          {
            id: '1',
            name: 'Electrónicos',
            slug: 'electronics',
            description: 'Dispositivos electrónicos y gadgets modernos',
            image: '/placeholder-category.jpg'
          },
          {
            id: '2',
            name: 'Ropa',
            slug: 'clothing',
            description: 'Moda y vestimenta para todas las ocasiones',
            image: '/placeholder-category.jpg'
          },
          {
            id: '3',
            name: 'Hogar',
            slug: 'home',
            description: 'Productos para el hogar y decoración',
            image: '/placeholder-category.jpg'
          }
        ]
      }
    }
  }
}
