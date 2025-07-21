'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ui/ProductCard'
import { Product } from '@/types'

// Mock data - En producción vendría de una API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'El iPhone más avanzado con chip A17 Pro y cámara de 48MP',
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
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Smartphone premium con S Pen y cámara de 200MP',
    price: 1099.99,
    originalPrice: 1199.99,
    images: ['/products/galaxy-s24.jpg'],
    category: 'smartphones',
    subcategory: 'samsung',
    tags: ['android', 'spen', 'ultra'],
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    stockQuantity: 15,
    featured: true,
    slug: 'samsung-galaxy-s24-ultra',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    description: 'Laptop profesional con chip M3 Pro y pantalla Liquid Retina XDR',
    price: 2499.99,
    images: ['/products/macbook-pro.jpg'],
    category: 'laptops',
    subcategory: 'apple',
    tags: ['m3', 'pro', 'creative'],
    rating: 4.9,
    reviewCount: 567,
    inStock: true,
    stockQuantity: 8,
    featured: false,
    slug: 'macbook-pro-16',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: '4',
    name: 'Dell XPS 13',
    description: 'Ultrabook compacto con Intel Core i7 y pantalla InfinityEdge',
    price: 1299.99,
    originalPrice: 1499.99,
    images: ['/products/dell-xps13.jpg'],
    category: 'laptops',
    subcategory: 'dell',
    tags: ['ultrabook', 'portable', 'business'],
    rating: 4.6,
    reviewCount: 423,
    inStock: true,
    stockQuantity: 12,
    featured: false,
    slug: 'dell-xps-13',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    description: 'Tablet profesional con chip M2 y pantalla Liquid Retina XDR',
    price: 1099.99,
    images: ['/products/ipad-pro.jpg'],
    category: 'tablets',
    subcategory: 'apple',
    tags: ['m2', 'pro', 'creative'],
    rating: 4.8,
    reviewCount: 234,
    inStock: false,
    stockQuantity: 0,
    featured: false,
    slug: 'ipad-pro-12-9',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: '6',
    name: 'AirPods Pro 2',
    description: 'Auriculares inalámbricos con cancelación de ruido adaptativa',
    price: 249.99,
    originalPrice: 279.99,
    images: ['/products/airpods-pro.jpg'],
    category: 'audio',
    subcategory: 'apple',
    tags: ['wireless', 'anc', 'premium'],
    rating: 4.7,
    reviewCount: 1856,
    inStock: true,
    stockQuantity: 45,
    featured: true,
    slug: 'airpods-pro-2',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  }
]

const categories = [
  { id: 'all', name: 'Todas las categorías', count: mockProducts.length },
  { id: 'smartphones', name: 'Smartphones', count: mockProducts.filter(p => p.category === 'smartphones').length },
  { id: 'laptops', name: 'Laptops', count: mockProducts.filter(p => p.category === 'laptops').length },
  { id: 'tablets', name: 'Tablets', count: mockProducts.filter(p => p.category === 'tablets').length },
  { id: 'audio', name: 'Audio', count: mockProducts.filter(p => p.category === 'audio').length }
]

const priceRanges = [
  { id: 'all', name: 'Todos los precios', min: 0, max: Infinity },
  { id: 'under-500', name: 'Menos de €500', min: 0, max: 500 },
  { id: '500-1000', name: '€500 - €1,000', min: 500, max: 1000 },
  { id: '1000-2000', name: '€1,000 - €2,000', min: 1000, max: 2000 },
  { id: 'over-2000', name: 'Más de €2,000', min: 2000, max: Infinity }
]

const sortOptions = [
  { id: 'featured', name: 'Destacados', value: 'featured' },
  { id: 'price-low', name: 'Precio: menor a mayor', value: 'price-asc' },
  { id: 'price-high', name: 'Precio: mayor a menor', value: 'price-desc' },
  { id: 'name', name: 'Nombre A-Z', value: 'name-asc' },
  { id: 'rating', name: 'Mejor valorados', value: 'rating-desc' }
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filtrar por rango de precio
    if (selectedPriceRange !== 'all') {
      const range = priceRanges.find(r => r.id === selectedPriceRange)
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price <= range.max
        )
      }
    }

    // Ordenar
    switch (sortBy) {
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
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Productos</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Categorías</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <span className="text-gray-700">
                      {category.name} ({category.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Precio</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.id}
                      checked={selectedPriceRange === range.id}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <span className="text-gray-700">{range.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-gray-600">
              Mostrando {filteredAndSortedProducts.length} productos
            </p>
            
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  className={viewMode === 'list' ? 'flex flex-row max-w-none' : ''}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No se encontraron productos que coincidan con tus criterios
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedPriceRange('all')
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
