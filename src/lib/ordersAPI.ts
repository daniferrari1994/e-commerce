import { Address, PaymentMethod, Order, OrderItem, ShippingOption } from '@/types/orders'

// Mock data para el sistema de pedidos
export const ordersAPI = {
  // Obtener direcciones del usuario
  getUserAddresses: async (userId: string): Promise<Address[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return [
      {
        id: 'addr_1',
        type: 'shipping',
        firstName: 'Ana',
        lastName: 'García',
        address1: 'Calle Mayor 123',
        address2: 'Piso 2, Puerta A',
        city: 'Madrid',
        state: 'Madrid',
        postalCode: '28001',
        country: 'España',
        phone: '+34 600 123 456',
        isDefault: true
      },
      {
        id: 'addr_2',
        type: 'billing',
        firstName: 'Ana',
        lastName: 'García',
        company: 'Tech Solutions S.L.',
        address1: 'Avenida de la Paz 45',
        city: 'Barcelona',
        state: 'Cataluña',
        postalCode: '08001',
        country: 'España',
        phone: '+34 600 123 456',
        isDefault: false
      }
    ]
  },

  // Obtener métodos de pago del usuario
  getUserPaymentMethods: async (userId: string): Promise<PaymentMethod[]> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return [
      {
        id: 'pm_1',
        type: 'card',
        provider: 'visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2027,
        brand: 'Visa',
        isDefault: true
      },
      {
        id: 'pm_2',
        type: 'paypal',
        provider: 'paypal',
        isDefault: false
      },
      {
        id: 'pm_3',
        type: 'cash_on_delivery',
        provider: 'cod',
        isDefault: false
      }
    ]
  },

  // Obtener opciones de envío
  getShippingOptions: async (): Promise<ShippingOption[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return [
      {
        id: 'standard',
        name: 'Envío Estándar',
        description: 'Entrega en 3-5 días laborables',
        price: 4.99,
        estimatedDays: '3-5 días',
        icon: '📦'
      },
      {
        id: 'express',
        name: 'Envío Express',
        description: 'Entrega en 1-2 días laborables',
        price: 9.99,
        estimatedDays: '1-2 días',
        icon: '⚡'
      },
      {
        id: 'premium',
        name: 'Envío Premium',
        description: 'Entrega en 24 horas',
        price: 19.99,
        estimatedDays: '24 horas',
        icon: '🚀'
      },
      {
        id: 'pickup',
        name: 'Recogida en Tienda',
        description: 'Recoge tu pedido gratis en nuestras tiendas',
        price: 0,
        estimatedDays: '2-3 días',
        icon: '🏪'
      }
    ]
  },

  // Crear nuevo pedido
  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const order: Order = {
      ...orderData,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Guardar en localStorage para simular persistencia
    const existingOrders = JSON.parse(localStorage.getItem('user-orders') || '[]')
    existingOrders.push(order)
    localStorage.setItem('user-orders', JSON.stringify(existingOrders))
    
    return order
  },

  // Obtener pedidos del usuario
  getUserOrders: async (userId: string): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const orders = JSON.parse(localStorage.getItem('user-orders') || '[]')
    return orders.filter((order: Order) => order.userId === userId)
  },

  // Obtener pedido por ID
  getOrderById: async (orderId: string): Promise<Order | null> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const orders = JSON.parse(localStorage.getItem('user-orders') || '[]')
    return orders.find((order: Order) => order.id === orderId) || null
  },

  // Actualizar estado del pedido
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const orders = JSON.parse(localStorage.getItem('user-orders') || '[]')
    const orderIndex = orders.findIndex((order: Order) => order.id === orderId)
    
    if (orderIndex === -1) {
      throw new Error('Pedido no encontrado')
    }
    
    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()
    
    // Simular tracking number cuando se envía
    if (status === 'shipped' && !orders[orderIndex].trackingNumber) {
      orders[orderIndex].trackingNumber = `TRK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      orders[orderIndex].estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    }
    
    localStorage.setItem('user-orders', JSON.stringify(orders))
    return orders[orderIndex]
  },

  // Cancelar pedido
  cancelOrder: async (orderId: string, reason?: string): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const orders = JSON.parse(localStorage.getItem('user-orders') || '[]')
    const orderIndex = orders.findIndex((order: Order) => order.id === orderId)
    
    if (orderIndex === -1) {
      throw new Error('Pedido no encontrado')
    }
    
    orders[orderIndex].status = 'cancelled'
    orders[orderIndex].updatedAt = new Date().toISOString()
    if (reason) {
      orders[orderIndex].notes = (orders[orderIndex].notes || '') + `\nCancelado: ${reason}`
    }
    
    localStorage.setItem('user-orders', JSON.stringify(orders))
    return orders[orderIndex]
  },

  // Calcular impuestos y costos
  calculateOrderTotals: (items: OrderItem[], shippingCost: number = 0): {
    subtotal: number
    tax: number
    shipping: number
    discount: number
    total: number
  } => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const taxRate = 0.21 // 21% IVA en España
    const tax = Math.round((subtotal * taxRate) * 100) / 100
    const discount = 0 // Por ahora sin descuentos
    const total = subtotal + tax + shippingCost - discount
    
    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shippingCost * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      total: Math.round(total * 100) / 100
    }
  }
}
