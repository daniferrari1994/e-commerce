export interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalUsers: number
  totalProducts: number
  salesGrowth: number
  ordersGrowth: number
  usersGrowth: number
  productsGrowth: number
}

export interface SalesData {
  date: string
  sales: number
  orders: number
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

export interface RecentOrder {
  id: string
  customerName: string
  email: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
}

export interface AdminUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'user' | 'admin'
  emailVerified: boolean
  createdAt: string
  lastLogin: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive' | 'banned'
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  stock: number
  images: string[]
  specifications: Record<string, string>
  tags: string[]
  featured: boolean
  active: boolean
}
