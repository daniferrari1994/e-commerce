'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronLeft, ChevronRight, CreditCard, Truck, MapPin, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import { useAuth } from '@/components/providers/AuthProvider'
import { useUserAddresses, useShippingOptions, useUserPaymentMethods, useCreateOrder } from '@/hooks/useOrders'
import { ordersAPI } from '@/lib/ordersAPI'
import { LoadingSpinner } from '@/components/ui/Loading'

export default function CheckoutPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { items, getTotal, clearCart } = useCartStore()
  const { 
    currentStep, 
    steps, 
    shippingAddress, 
    selectedShipping, 
    selectedPayment, 
    orderNotes,
    setCurrentStep, 
    setShippingAddress, 
    setSelectedShipping, 
    setSelectedPayment, 
    setOrderNotes,
    completeStep, 
    canProceedToStep,
    resetCheckout 
  } = useCheckoutStore()

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Hooks para datos
  const { data: addresses } = useUserAddresses(user?.id || '')
  const { data: shippingOptions } = useShippingOptions()
  const { data: paymentMethods } = useUserPaymentMethods(user?.id || '')
  const createOrderMutation = useCreateOrder()

  // Redireccionar si no está autenticado o no hay items
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/cart')
      return
    }
    if (items.length === 0) {
      router.push('/cart')
      return
    }
  }, [isAuthenticated, items.length, router])

  // Calcular totales
  const orderTotals = ordersAPI.calculateOrderTotals(
    items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity
    })),
    selectedShipping?.price || 0
  )

  const handleNextStep = () => {
    if (currentStep < 5 && canProceedToStep(currentStep + 1)) {
      completeStep(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitOrder = async () => {
    if (!user || !shippingAddress || !selectedShipping || !selectedPayment) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const orderData = {
        userId: user.id,
        customerInfo: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: shippingAddress.phone
        },
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.images[0],
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity
        })),
        subtotal: orderTotals.subtotal,
        tax: orderTotals.tax,
        shipping: orderTotals.shipping,
        discount: orderTotals.discount,
        total: orderTotals.total,
        status: 'pending' as const,
        paymentStatus: 'pending' as const,
        paymentMethod: selectedPayment,
        shippingAddress,
        billingAddress: shippingAddress, // Por ahora usar la misma
        notes: orderNotes
      }

      const order = await createOrderMutation.mutateAsync(orderData)
      
      // Limpiar carrito y checkout
      clearCart()
      resetCheckout()
      
      // Redireccionar a página de éxito
      router.push(`/checkout/success?orderId=${order.id}`)
      
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Error al procesar el pedido. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated || items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step.completed 
                  ? 'bg-green-600 text-white' 
                  : step.current 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {step.completed ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <span className={`mt-2 text-xs font-medium ${
                step.current ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block absolute w-full h-0.5 top-5 left-1/2 transform -translate-x-1/2 ${
                  step.completed ? 'bg-green-600' : 'bg-gray-200'
                }`} style={{ width: 'calc(100% - 5rem)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Step 1: Dirección de Envío */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Dirección de Envío
                </h2>
                
                <div className="space-y-4">
                  {addresses?.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        shippingAddress?.id === address.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setShippingAddress(address)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">
                            {address.firstName} {address.lastName}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {address.address1}
                            {address.address2 && `, ${address.address2}`}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          <p className="text-gray-600 text-sm">{address.country}</p>
                          {address.phone && (
                            <p className="text-gray-600 text-sm">{address.phone}</p>
                          )}
                        </div>
                        {address.isDefault && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Por defecto
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    + Agregar nueva dirección
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Método de Envío */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Método de Envío
                </h2>
                
                <div className="space-y-4">
                  {shippingOptions?.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedShipping?.id === option.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedShipping(option)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{option.icon}</span>
                          <div>
                            <h3 className="font-medium">{option.name}</h3>
                            <p className="text-gray-600 text-sm">{option.description}</p>
                            <p className="text-blue-600 text-sm font-medium">
                              Entrega: {option.estimatedDays}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">
                            {option.price === 0 ? 'Gratis' : `€${option.price.toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Método de Pago */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Método de Pago
                </h2>
                
                <div className="space-y-4">
                  {paymentMethods?.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPayment?.id === method.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment(method)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                            {method.type === 'card' && method.brand === 'Visa' && (
                              <span className="text-xs font-bold text-blue-600">VISA</span>
                            )}
                            {method.type === 'paypal' && (
                              <span className="text-xs font-bold text-blue-500">PP</span>
                            )}
                            {method.type === 'cash_on_delivery' && (
                              <span className="text-xs font-bold">💰</span>
                            )}
                          </div>
                          <div>
                            {method.type === 'card' && (
                              <>
                                <h3 className="font-medium">
                                  {method.brand} terminada en {method.last4}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  Expira: {method.expiryMonth?.toString().padStart(2, '0')}/{method.expiryYear}
                                </p>
                              </>
                            )}
                            {method.type === 'paypal' && (
                              <h3 className="font-medium">PayPal</h3>
                            )}
                            {method.type === 'cash_on_delivery' && (
                              <h3 className="font-medium">Pago contra reembolso</h3>
                            )}
                          </div>
                        </div>
                        {method.isDefault && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Por defecto
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    + Agregar nuevo método de pago
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Revisar Pedido */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Revisar Pedido
                </h2>
                
                <div className="space-y-6">
                  {/* Resumen de direcciones */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Dirección de Envío</h3>
                    {shippingAddress && (
                      <p className="text-sm text-gray-600">
                        {shippingAddress.firstName} {shippingAddress.lastName}<br />
                        {shippingAddress.address1}<br />
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                      </p>
                    )}
                  </div>

                  {/* Método de envío */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Método de Envío</h3>
                    {selectedShipping && (
                      <p className="text-sm text-gray-600">
                        {selectedShipping.name} - €{selectedShipping.price.toFixed(2)}<br />
                        {selectedShipping.description}
                      </p>
                    )}
                  </div>

                  {/* Método de pago */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Método de Pago</h3>
                    {selectedPayment && (
                      <p className="text-sm text-gray-600">
                        {selectedPayment.type === 'card' && 
                          `${selectedPayment.brand} terminada en ${selectedPayment.last4}`
                        }
                        {selectedPayment.type === 'paypal' && 'PayPal'}
                        {selectedPayment.type === 'cash_on_delivery' && 'Pago contra reembolso'}
                      </p>
                    )}
                  </div>

                  {/* Notas del pedido */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notas del pedido (opcional)
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Instrucciones especiales de entrega, comentarios, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={handleNextStep}
                  disabled={!canProceedToStep(currentStep + 1)}
                  className="flex items-center"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting || !canProceedToStep(5)}
                  className="flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Procesando...
                    </>
                  ) : (
                    'Realizar Pedido'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
            <h3 className="text-lg font-semibold mb-4">Resumen del Pedido</h3>
            
            {/* Items */}
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>€{orderTotals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>€{orderTotals.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IVA</span>
                <span>€{orderTotals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span>€{orderTotals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
