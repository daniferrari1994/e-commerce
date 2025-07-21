'use client'

import Image from 'next/image'
import { TopProduct } from '@/types/admin'

interface TopProductsProps {
  products: TopProduct[]
}

export function TopProducts({ products }: TopProductsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h3>
        <p className="text-sm text-gray-600">Top 5 productos con mejor rendimiento</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-shrink-0 w-16 h-16 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-grow min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {product.sales} unidades vendidas
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">
                  {formatCurrency(product.revenue)}
                </p>
                <p className="text-xs text-gray-500">Ingresos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
