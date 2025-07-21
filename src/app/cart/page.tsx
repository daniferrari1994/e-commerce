'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getItemCount, getTotal } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)

  const total = getTotal()

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    // Simular proceso de checkout
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Aquí se redirigiría a la página de checkout
    alert('Redirigiendo al checkout...')
  }

  const shippingCost = total > 50 ? 0 : 9.99
  const totalWithShipping = total + shippingCost

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            Descubre nuestros productos y añade algunos a tu carrito
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
          <h1 className="text-3xl font-bold text-gray-900">Carrito de compras</h1>
          <p className="text-gray-600 mt-1">
            {getItemCount()} {getItemCount() === 1 ? 'artículo' : 'artículos'} en tu carrito
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Seguir comprando
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Productos</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vaciar carrito
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0] || '/placeholder-product.jpg'}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        €{item.product.price.toFixed(2)} cada uno
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Item Total */}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({getItemCount()} artículos)</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                  {shippingCost === 0 ? 'Gratis' : `€${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              {total < 50 && (
                <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  Añade €{(50 - total).toFixed(2)} más para envío gratuito
                </div>
              )}
              
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>€{totalWithShipping.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-6"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'Proceder al pago'}
            </Button>

            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Pago seguro con SSL</p>
              <p className="mt-1">Aceptamos todas las tarjetas principales</p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">¿Por qué comprar con nosotros?</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Envío gratuito en pedidos superiores a €50
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Devoluciones gratuitas durante 30 días
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Garantía de 2 años en todos los productos
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Soporte técnico 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
