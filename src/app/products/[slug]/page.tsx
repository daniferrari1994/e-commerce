'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { Product, Review, ReviewStats } from '@/types'
import ReviewsSection from '@/components/ui/ReviewsSection'

// Mock data - En producción vendría de una API basada en el slug
const mockProduct: Product = {
  id: '1',
  name: 'iPhone 15 Pro Max',
  description: 'El iPhone más avanzado jamás creado. Con el revolucionario chip A17 Pro, sistema de cámaras Pro de vanguardia y diseño en titanio ultraliviano.',
  price: 1199.99,
  originalPrice: 1299.99,
  images: [
    '/products/iphone-15-1.jpg',
    '/products/iphone-15-2.jpg',
    '/products/iphone-15-3.jpg',
    '/products/iphone-15-4.jpg'
  ],
  category: 'smartphones',
  subcategory: 'apple',
  tags: ['5g', 'pro', 'premium', 'titanium'],
  rating: 4.8,
  reviewCount: 1247,
  inStock: true,
  stockQuantity: 25,
  featured: true,
  slug: 'iphone-15-pro-max',
  createdAt: '2024-01-15',
  updatedAt: '2024-01-15'
}

const specifications = [
  { name: 'Pantalla', value: '6.7" Super Retina XDR OLED' },
  { name: 'Procesador', value: 'Apple A17 Pro' },
  { name: 'Almacenamiento', value: '256GB / 512GB / 1TB' },
  { name: 'Cámara', value: '48MP Principal + 12MP Ultra Angular + 12MP Teleobjetivo' },
  { name: 'Batería', value: 'Hasta 29 horas de reproducción de video' },
  { name: 'Conectividad', value: '5G, Wi-Fi 6E, Bluetooth 5.3' },
  { name: 'Material', value: 'Titanio con Ceramic Shield' },
  { name: 'Resistencia', value: 'IP68 hasta 6 metros por 30 minutos' }
]

const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    userName: 'Carlos M.',
    rating: 5,
    title: 'Excepcional calidad y rendimiento',
    comment: 'Increíble calidad de cámara y rendimiento. El diseño en titanio es espectacular y la batería dura todo el día.',
    verified: true,
    helpful: 12,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Ana R.',
    rating: 5,
    title: 'La mejor compra que he hecho',
    comment: 'La batería dura todo el día sin problemas. Muy satisfecha con la compra. Las fotos quedan increíbles.',
    verified: true,
    helpful: 8,
    createdAt: '2024-01-18T15:30:00Z',
    updatedAt: '2024-01-18T15:30:00Z'
  },
  {
    id: '3',
    productId: '1',
    userId: '3',
    userName: 'David L.',
    rating: 4,
    title: 'Muy bueno pero caro',
    comment: 'Excelente teléfono, aunque el precio es elevado. Vale la pena por la calidad pero no es para todos los bolsillos.',
    verified: true,
    helpful: 5,
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T09:15:00Z'
  }
]

const reviewStats: ReviewStats = {
  averageRating: 4.8,
  totalReviews: 1247,
  ratingDistribution: {
    1: 12,
    2: 23,
    3: 89,
    4: 234,
    5: 889
  }
}

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(mockProduct)
    }
  }

  const discountPercentage = mockProduct.originalPrice 
    ? Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={mockProduct.images[selectedImage] || '/placeholder-product.jpg'}
              alt={mockProduct.name}
              fill
              className="object-cover"
              priority
            />
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                -{discountPercentage}%
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {mockProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={image || '/placeholder-product.jpg'}
                  alt={`${mockProduct.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockProduct.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(mockProduct.rating) ? 'fill-current' : 'stroke-current fill-transparent'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {mockProduct.rating} ({mockProduct.reviewCount} reseñas)
                </span>
              </div>
              <span className="text-green-600 text-sm font-medium">
                {mockProduct.inStock ? `${mockProduct.stockQuantity} en stock` : 'Agotado'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                €{mockProduct.price.toFixed(2)}
              </span>
              {mockProduct.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  €{mockProduct.originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  Ahorra {discountPercentage}%
                </span>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Cantidad:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= mockProduct.stockQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!mockProduct.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {mockProduct.inStock ? 'Añadir al carrito' : 'Agotado'}
            </Button>
            
            <Button variant="outline" size="lg" className="w-full">
              <Heart className="h-5 w-5 mr-2" />
              Añadir a favoritos
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Envío gratis</p>
                <p className="text-xs text-gray-600">En 24-48h</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Garantía</p>
                <p className="text-xs text-gray-600">2 años</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Devoluciones</p>
                <p className="text-xs text-gray-600">30 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'description' && 'Descripción'}
                {tab === 'specifications' && 'Especificaciones'}
                {tab === 'reviews' && 'Reseñas'}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {mockProduct.description}
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-4">Características destacadas:</h3>
              <ul className="space-y-2">
                <li>• Chip A17 Pro con GPU de 6 núcleos para un rendimiento excepcional</li>
                <li>• Sistema de cámaras Pro con zoom óptico 5x</li>
                <li>• Pantalla Super Retina XDR de 6.7" con ProMotion</li>
                <li>• Diseño en titanio resistente y ultraliviano</li>
                <li>• Botón de Acción personalizable</li>
                <li>• Conectividad 5G ultrarrápida</li>
                <li>• iOS 17 con nuevas funciones de productividad</li>
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">{spec.name}</span>
                  <span className="text-gray-600">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <ReviewsSection
              productId={mockProduct.id}
              reviews={reviews}
              stats={reviewStats}
            />
          )}
        </div>
      </div>
    </div>
  )
}
