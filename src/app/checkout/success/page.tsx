'use client'

import { CheckCircle, Package, Truck, Mail, ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useOrderById } from '@/hooks/useOrders'
import { LoadingSpinner } from '@/components/ui/Loading'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  
  const { data: order, isLoading, error } = useOrderById(orderId || '')

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Cargando información del pedido...</p>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-red-600 mb-4">
          <Package className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-gray-600 mt-2">No se pudo cargar la información del pedido</p>
        </div>
        <Link href="/products">
          <Button>Volver a la tienda</Button>
        </Link>
      </div>
    )
  }

  const nextSteps = [
    {
      icon: Mail,
      title: 'Confirmación por email',
      description: 'Te hemos enviado la confirmación del pedido a tu correo electrónico',
      status: 'completed'
    },
    {
      icon: Package,
      title: 'Preparación del pedido',
      description: 'Estamos preparando tu pedido en nuestro almacén',
      status: order.status === 'pending' ? 'current' : 'completed'
    },
    {
      icon: Truck,
      title: 'Envío',
      description: 'Tu pedido será enviado en las próximas 24 horas',
      status: ['shipped', 'delivered'].includes(order.status) ? 'completed' : 'pending'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Pedido confirmado!
        </h1>
        <p className="text-lg text-gray-600">
          Gracias por tu compra. Tu pedido ha sido procesado correctamente.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Detalles del pedido
          </h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Número de pedido
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {order.id}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Email de confirmación
              </h3>
              <p className="text-lg text-gray-900">{order.customerInfo.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Total del pedido
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                €{order.total.toFixed(2)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Entrega estimada
              </h3>
              <p className="text-lg text-gray-900">2-3 días laborables</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Productos pedidos
          </h2>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <h3 className="font-medium text-gray-900">{item.productName}</h3>
                  <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  €{item.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Próximos pasos
          </h2>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : step.status === 'current'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <step.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    step.status === 'completed' || step.status === 'current'
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {step.description}
                  </p>
                </div>
                {step.status === 'completed' && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Descargar factura
        </Button>
        <Button variant="outline" className="w-full">
          <Package className="h-4 w-4 mr-2" />
          Seguir pedido
        </Button>
        <Button variant="outline" className="w-full">
          <Mail className="h-4 w-4 mr-2" />
          Contactar soporte
        </Button>
      </div>

      {/* Continue Shopping */}
      <div className="text-center space-y-4">
        <p className="text-gray-600">
          ¿Necesitas algo más? Continúa explorando nuestros productos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg">
              Seguir comprando
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>

      {/* Support Info */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          ¿Necesitas ayuda?
        </h3>
        <p className="text-gray-600 mb-4">
          Nuestro equipo de atención al cliente está disponible 24/7 para ayudarte.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <div className="flex items-center justify-center">
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            <span>soporte@techstore.com</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-gray-500 mr-2">📞</span>
            <span>+34 900 123 456</span>
          </div>
        </div>
      </div>
    </div>
  )
}
