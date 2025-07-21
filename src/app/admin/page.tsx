'use client'

import { useDashboardStats, useTopProducts, useRecentOrders } from '@/hooks/useAdmin'
import AdminLayout from '@/components/layout/AdminLayout'
import { StatsGrid } from '@/components/admin/StatsGrid'
import { TopProducts } from '@/components/admin/TopProducts'
import { RecentOrders } from '@/components/admin/RecentOrders'
import { LoadingSpinner } from '@/components/ui/Loading'
import { adminAPI } from '@/lib/adminAPI'
import { useQueryClient } from '@tanstack/react-query'

export default function AdminDashboard() {
  const queryClient = useQueryClient()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: topProducts, isLoading: productsLoading } = useTopProducts()
  const { data: recentOrders, isLoading: ordersLoading } = useRecentOrders()

  const handleUpdateOrderStatus = async (orderId: string, status: any) => {
    try {
      await adminAPI.updateOrderStatus(orderId, status)
      // Invalidar y refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['recent-orders'] })
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  if (statsLoading || productsLoading || ordersLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido al panel de administración de TechStore</p>
        </div>

        {/* Stats Grid */}
        {stats && <StatsGrid stats={stats} />}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <div>
            {topProducts && <TopProducts products={topProducts} />}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                  <div className="text-2xl font-bold text-blue-600">+</div>
                  <div className="text-sm text-gray-700">Nuevo Producto</div>
                </button>
                <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                  <div className="text-2xl font-bold text-green-600">📊</div>
                  <div className="text-sm text-gray-700">Ver Reportes</div>
                </button>
                <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
                  <div className="text-2xl font-bold text-purple-600">👥</div>
                  <div className="text-sm text-gray-700">Gestionar Usuarios</div>
                </button>
                <button className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
                  <div className="text-2xl font-bold text-orange-600">⚙️</div>
                  <div className="text-sm text-gray-700">Configuración</div>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del Sistema</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Servidor</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Base de datos</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Conectada</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pagos</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-sm text-yellow-600">Configurando</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        {recentOrders && (
          <RecentOrders 
            orders={recentOrders} 
            onUpdateStatus={handleUpdateOrderStatus}
          />
        )}
      </div>
    </AdminLayout>
  )
}
