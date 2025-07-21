'use client'

import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ui/ProductCard'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, getItemCount } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  const handleAddAllToCart = () => {
    items.forEach(product => {
      addToCart(product)
    })
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu lista de favoritos está vacía</h1>
          <p className="text-gray-600 mb-8">
            Explora nuestros productos y añade algunos a tu lista de favoritos para verlos más tarde
          </p>
          <Link href="/products">
            <Button size="lg">
              Explorar productos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Heart className="h-8 w-8 mr-3 text-red-500" />
            Lista de favoritos
          </h1>
          <p className="text-gray-600 mt-1">
            {getItemCount()} {getItemCount() === 1 ? 'producto' : 'productos'} en tu lista de favoritos
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Seguir comprando
          </Button>
        </Link>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleAddAllToCart}
              className="flex items-center"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Añadir todo al carrito
            </Button>
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar lista
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            Total estimado: <span className="font-semibold">
              €{items.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} />
            
            {/* Remove from wishlist button */}
            <button
              onClick={() => removeItem(product.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
              title="Eliminar de favoritos"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          También te podría interesar
        </h2>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">
            Basado en tus productos favoritos, estos productos podrían gustarte
          </p>
          <Link href="/products">
            <Button variant="outline">
              Ver recomendaciones
            </Button>
          </Link>
        </div>
      </div>

      {/* Sharing Options */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comparte tu lista de favoritos
        </h3>
        <p className="text-gray-600 mb-4">
          Comparte tu lista de favoritos con amigos y familia
        </p>
        <div className="flex space-x-4">
          <Button variant="outline" size="sm">
            Copiar enlace
          </Button>
          <Button variant="outline" size="sm">
            Compartir por email
          </Button>
        </div>
      </div>
    </div>
  )
}
