export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  tags: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity: number
  featured: boolean
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  verified: boolean
  helpful: number
  createdAt: string
  updatedAt: string
}

export interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

export interface CartItem {
  product: Product
  quantity: number
  selectedVariant?: ProductVariant
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  priceModifier?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  subcategories?: Category[]
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  addresses: Address[]
  preferences: UserPreferences
}

export interface Address {
  id: string
  type: "shipping" | "billing"
  fullName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  currency: string
  language: string
  emailNotifications: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
}
