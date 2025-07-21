'use client'

import { useQuery } from '@tanstack/react-query'
import { adminAPI } from '@/lib/adminAPI'

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: adminAPI.getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useSalesData(period: '7d' | '30d' | '90d' = '30d') {
  return useQuery({
    queryKey: ['sales-data', period],
    queryFn: () => adminAPI.getSalesData(period),
    staleTime: 5 * 60 * 1000,
  })
}

export function useTopProducts() {
  return useQuery({
    queryKey: ['top-products'],
    queryFn: adminAPI.getTopProducts,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export function useRecentOrders() {
  return useQuery({
    queryKey: ['recent-orders'],
    queryFn: adminAPI.getRecentOrders,
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

export function useAllUsers() {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: adminAPI.getAllUsers,
    staleTime: 5 * 60 * 1000,
  })
}
