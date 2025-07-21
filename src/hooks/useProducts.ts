'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '@/types'

// Mock API functions - En producción serían llamadas reales a la API
const api = {
  getProducts: async (params?: {
    category?: string
    search?: string
    sort?: string
    page?: number
    limit?: number
  }): Promise<{ products: Product[], total: number }> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock data - En producción vendría de una API real
    const allProducts: Product[] = [
      {
        id: '1',
        name: 'iPhone 15 Pro Max',
        description: 'El iPhone más avanzado con chip A17 Pro',
        price: 1199.99,
        originalPrice: 1299.99,
        images: ['/products/iphone-15.jpg'],
        category: 'smartphones',
        subcategory: 'apple',
        tags: ['5g', 'pro', 'premium'],
        rating: 4.8,
        reviewCount: 1247,
        inStock: true,
        stockQuantity: 25,
        featured: true,
        slug: 'iphone-15-pro-max',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
      },
      // ... más productos mock
    ]
    
    let filtered = allProducts
    
    // Filtrar por categoría
    if (params?.category) {
      filtered = filtered.filter(p => p.category === params.category)
    }
    
    // Filtrar por búsqueda
    if (params?.search) {
      const search = params.search.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      )
    }
    
    // Ordenar
    switch (params?.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    
    // Paginación
    const page = params?.page || 1
    const limit = params?.limit || 12
    const start = (page - 1) * limit
    const paginatedProducts = filtered.slice(start, start + limit)
    
    return {
      products: paginatedProducts,
      total: filtered.length
    }
  },
  
  getProduct: async (slug: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Mock - En producción buscaría en la base de datos
    const product: Product = {
      id: '1',
      name: 'iPhone 15 Pro Max',
      description: 'El iPhone más avanzado jamás creado',
      price: 1199.99,
      originalPrice: 1299.99,
      images: [
        '/products/iphone-15-1.jpg',
        '/products/iphone-15-2.jpg'
      ],
      category: 'smartphones',
      subcategory: 'apple',
      tags: ['5g', 'pro', 'premium'],
      rating: 4.8,
      reviewCount: 1247,
      inStock: true,
      stockQuantity: 25,
      featured: true,
      slug: 'iphone-15-pro-max',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
    
    return product.slug === slug ? product : null
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const { products } = await api.getProducts()
    return products.filter(p => p.featured).slice(0, 6)
  }
}

// Hook para obtener productos con filtros
export function useProducts(params?: {
  category?: string
  search?: string
  sort?: string
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => api.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
}

// Hook para obtener un producto específico
export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.getProduct(slug),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    enabled: !!slug,
  })
}

// Hook para productos destacados
export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: api.getFeaturedProducts,
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  })
}

// Hook para buscar productos (con debounce)
export function useProductSearch(searchTerm: string, delay = 500) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [searchTerm, delay])
  
  return useQuery({
    queryKey: ['products', 'search', debouncedSearch],
    queryFn: () => api.getProducts({ search: debouncedSearch }),
    enabled: debouncedSearch.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

// Hook para invalidar cache de productos
export function useInvalidateProducts() {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }
}

// Hook para prefetch de productos relacionados
export function usePrefetchRelatedProducts() {
  const queryClient = useQueryClient()
  
  return (category: string) => {
    queryClient.prefetchQuery({
      queryKey: ['products', { category }],
      queryFn: () => api.getProducts({ category }),
      staleTime: 5 * 60 * 1000,
    })
  }
}
