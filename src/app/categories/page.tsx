'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Grid, List, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    description: 'Los últimos modelos de iPhone, Samsung, Google y más',
    image: '/categories/smartphones.jpg',
    productCount: 156,
    featured: true
  },
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'Portátiles para trabajo, gaming y uso personal',
    image: '/categories/laptops.jpg',
    productCount: 89,
    featured: true
  },
  {
    id: 'tablets',
    name: 'Tablets',
    description: 'iPads, tablets Android y dispositivos 2-en-1',
    image: '/categories/tablets.jpg',
    productCount: 67,
    featured: true
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Auriculares, altavoces y equipos de sonido',
    image: '/categories/audio.jpg',
    productCount: 234,
    featured: true
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Consolas, juegos y accesorios para gamers',
    image: '/categories/gaming.jpg',
    productCount: 178,
    featured: false
  },
  {
    id: 'smart-home',
    name: 'Hogar Inteligente',
    description: 'Dispositivos IoT y automatización del hogar',
    image: '/categories/smart-home.jpg',
    productCount: 145,
    featured: false
  },
  {
    id: 'wearables',
    name: 'Wearables',
    description: 'Smartwatches, fitness trackers y más',
    image: '/categories/wearables.jpg',
    productCount: 92,
    featured: false
  },
  {
    id: 'accessories',
    name: 'Accesorios',
    description: 'Cables, cargadores, fundas y más',
    image: '/categories/accessories.jpg',
    productCount: 456,
    featured: false
  },
  {
    id: 'cameras',
    name: 'Cámaras',
    description: 'Cámaras digitales, lentes y equipo fotográfico',
    image: '/categories/cameras.jpg',
    productCount: 78,
    featured: false
  }
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAll, setShowAll] = useState(false)

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const displayedCategories = showAll 
    ? filteredCategories 
    : filteredCategories.filter(cat => cat.featured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Categorías</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora nuestra amplia gama de productos organizados por categorías para encontrar 
          exactamente lo que necesitas
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Search */}
        <div className="relative max-w-md w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex items-center space-x-4">
          {/* Show All Toggle */}
          <Button
            variant={showAll ? 'default' : 'outline'}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Mostrar destacadas' : 'Mostrar todas'}
          </Button>

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

      {/* Categories Grid/List */}
      {displayedCategories.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {displayedCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group"
            >
              <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex flex-row h-32' : 'flex flex-col'
              }`}>
                {/* Image */}
                <div className={`relative bg-gray-200 group-hover:scale-105 transition-transform duration-300 ${
                  viewMode === 'list' ? 'w-48 h-full' : 'aspect-video'
                }`}>
                  <Image
                    src={category.image || '/placeholder-category.jpg'}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes={viewMode === 'list' ? '192px' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                  />
                  
                  {/* Overlay with product count */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                      <p className="font-semibold">Ver productos</p>
                      <p className="text-sm">{category.productCount} artículos</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.featured && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        Destacada
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.productCount} productos
                    </span>
                    <span className="text-blue-600 font-medium group-hover:underline">
                      Explorar →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            No se encontraron categorías que coincidan con tu búsqueda
          </p>
          <Button onClick={() => setSearchTerm('')}>
            Limpiar búsqueda
          </Button>
        </div>
      )}

      {/* Popular Categories Section */}
      {!searchTerm && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Categorías más populares
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories
              .filter(cat => cat.featured)
              .slice(0, 4)
              .map((category) => (
                <Link
                  key={`popular-${category.id}`}
                  href={`/products?category=${category.id}`}
                  className="group text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {category.productCount} productos
                  </p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
