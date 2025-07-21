'use client'

import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: number
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'purple' | 'orange'
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    text: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    text: 'text-green-600'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    text: 'text-purple-600'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    text: 'text-orange-600'
  }
}

export function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const isPositive = change > 0
  const classes = colorClasses[color]

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${classes.bg}`}>
            <Icon className={`h-6 w-6 ${classes.icon}`} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`flex items-center text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  )
}

interface StatsGridProps {
  stats: {
    totalSales: number
    totalOrders: number
    totalUsers: number
    totalProducts: number
    salesGrowth: number
    ordersGrowth: number
    usersGrowth: number
    productsGrowth: number
  }
}

export function StatsGrid({ stats }: StatsGridProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num)
  }

  const statsData = [
    {
      title: 'Ventas Totales',
      value: formatCurrency(stats.totalSales),
      change: stats.salesGrowth,
      icon: DollarSign,
      color: 'green' as const
    },
    {
      title: 'Pedidos',
      value: formatNumber(stats.totalOrders),
      change: stats.ordersGrowth,
      icon: ShoppingCart,
      color: 'blue' as const
    },
    {
      title: 'Usuarios',
      value: formatNumber(stats.totalUsers),
      change: stats.usersGrowth,
      icon: Users,
      color: 'purple' as const
    },
    {
      title: 'Productos',
      value: formatNumber(stats.totalProducts),
      change: stats.productsGrowth,
      icon: Package,
      color: 'orange' as const
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
}
