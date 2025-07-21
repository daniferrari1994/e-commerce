export interface Address {
  id: string
  type: 'shipping' | 'billing'
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery'
  provider: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  brand?: string
  isDefault: boolean
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  total: number
}

export interface Order {
  id: string
  userId: string
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone?: string
  }
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: PaymentMethod
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  estimatedDelivery?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CheckoutStep {
  id: number
  title: string
  completed: boolean
  current: boolean
}

export interface ShippingOption {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: string
  icon: string
}

export interface OrderSummary {
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
}
