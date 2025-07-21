import { DashboardStats, SalesData, TopProduct, RecentOrder, AdminUser } from '@/types/admin'
import { Product } from '@/types'

// Mock data para el dashboard
export const adminAPI = {
  // Obtener estadísticas del dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return {
      totalSales: 156420.50,
      totalOrders: 1247,
      totalUsers: 3456,
      totalProducts: 89,
      salesGrowth: 12.5,
      ordersGrowth: 8.3,
      usersGrowth: 15.2,
      productsGrowth: 4.1
    }
  },

  // Obtener datos de ventas para gráficos
  getSalesData: async (period: '7d' | '30d' | '90d' = '30d'): Promise<SalesData[]> => {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // Generar datos mock para los últimos 30 días
    const data: SalesData[] = []
    const now = new Date()
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      data.push({
        date: date.toISOString().split('T')[0],
        sales: Math.floor(Math.random() * 5000) + 2000,
        orders: Math.floor(Math.random() * 50) + 20
      })
    }
    
    return data
  },

  // Obtener productos más vendidos
  getTopProducts: async (): Promise<TopProduct[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        sales: 156,
        revenue: 187200,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'
      },
      {
        id: '2',
        name: 'MacBook Air M3',
        sales: 89,
        revenue: 123450,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
      },
      {
        id: '3',
        name: 'AirPods Pro',
        sales: 234,
        revenue: 65520,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c7e52d?w=400'
      },
      {
        id: '4',
        name: 'iPad Pro 12.9"',
        sales: 67,
        revenue: 89760,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
      },
      {
        id: '5',
        name: 'Apple Watch Series 9',
        sales: 145,
        revenue: 72500,
        image: 'https://images.unsplash.com/photo-1434493651900-67b7c6ec4d96?w=400'
      }
    ]
  },

  // Obtener pedidos recientes
  getRecentOrders: async (): Promise<RecentOrder[]> => {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return [
      {
        id: 'ORD-001',
        customerName: 'Ana García',
        email: 'ana@email.com',
        total: 1299.99,
        status: 'pending',
        date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
        items: [
          { productId: '1', productName: 'iPhone 15 Pro', quantity: 1, price: 1299.99 }
        ]
      },
      {
        id: 'ORD-002',
        customerName: 'Carlos López',
        email: 'carlos@email.com',
        total: 2567.98,
        status: 'processing',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        items: [
          { productId: '2', productName: 'MacBook Air M3', quantity: 1, price: 1389.99 },
          { productId: '3', productName: 'AirPods Pro', quantity: 4, price: 294.50 }
        ]
      },
      {
        id: 'ORD-003',
        customerName: 'María Rodríguez',
        email: 'maria@email.com',
        total: 899.99,
        status: 'shipped',
        date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
        items: [
          { productId: '4', productName: 'iPad Pro 12.9"', quantity: 1, price: 899.99 }
        ]
      },
      {
        id: 'ORD-004',
        customerName: 'Pedro Martín',
        email: 'pedro@email.com',
        total: 1149.99,
        status: 'delivered',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        items: [
          { productId: '5', productName: 'Apple Watch Series 9', quantity: 2, price: 574.99 }
        ]
      }
    ]
  },

  // Obtener todos los usuarios (admin)
  getAllUsers: async (): Promise<AdminUser[]> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return [
      {
        id: '1',
        firstName: 'Ana',
        lastName: 'García',
        email: 'ana@email.com',
        role: 'user',
        emailVerified: true,
        createdAt: '2024-01-15',
        lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        totalOrders: 12,
        totalSpent: 3456.78,
        status: 'active'
      },
      {
        id: '2',
        firstName: 'Carlos',
        lastName: 'López',
        email: 'carlos@email.com',
        role: 'user',
        emailVerified: true,
        createdAt: '2024-02-20',
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        totalOrders: 8,
        totalSpent: 2156.90,
        status: 'active'
      },
      {
        id: '3',
        firstName: 'María',
        lastName: 'Rodríguez',
        email: 'maria@email.com',
        role: 'user',
        emailVerified: false,
        createdAt: '2024-03-10',
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        totalOrders: 3,
        totalSpent: 789.45,
        status: 'active'
      },
      {
        id: '4',
        firstName: 'Admin',
        lastName: 'TechStore',
        email: 'admin@techstore.com',
        role: 'admin',
        emailVerified: true,
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
        status: 'active'
      }
    ]
  },

  // Actualizar estado de pedido
  updateOrderStatus: async (orderId: string, status: RecentOrder['status']): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // En producción aquí se actualizaría la base de datos
    console.log(`Order ${orderId} updated to ${status}`)
  },

  // Actualizar estado de usuario
  updateUserStatus: async (userId: string, status: AdminUser['status']): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // En producción aquí se actualizaría la base de datos
    console.log(`User ${userId} updated to ${status}`)
  }
}
