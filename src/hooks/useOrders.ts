'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersAPI } from '@/lib/ordersAPI'
import { Order } from '@/types/orders'

export function useOrderById(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersAPI.getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useUserAddresses(userId: string) {
  return useQuery({
    queryKey: ['user-addresses', userId],
    queryFn: () => ordersAPI.getUserAddresses(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useUserPaymentMethods(userId: string) {
  return useQuery({
    queryKey: ['user-payment-methods', userId],
    queryFn: () => ordersAPI.getUserPaymentMethods(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useShippingOptions() {
  return useQuery({
    queryKey: ['shipping-options'],
    queryFn: ordersAPI.getShippingOptions,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export function useUserOrders(userId: string) {
  return useQuery({
    queryKey: ['user-orders', userId],
    queryFn: () => ordersAPI.getUserOrders(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersAPI.getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 1 * 60 * 1000, // 1 minuto
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ordersAPI.createOrder,
    onSuccess: (newOrder) => {
      // Invalidar cache de pedidos del usuario
      queryClient.invalidateQueries({ 
        queryKey: ['user-orders', newOrder.userId] 
      })
    },
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: Order['status'] }) =>
      ordersAPI.updateOrderStatus(orderId, status),
    onSuccess: (updatedOrder) => {
      // Actualizar cache del pedido específico
      queryClient.setQueryData(['order', updatedOrder.id], updatedOrder)
      
      // Invalidar cache de pedidos del usuario
      queryClient.invalidateQueries({ 
        queryKey: ['user-orders', updatedOrder.userId] 
      })
    },
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason?: string }) =>
      ordersAPI.cancelOrder(orderId, reason),
    onSuccess: (cancelledOrder) => {
      // Actualizar cache del pedido específico
      queryClient.setQueryData(['order', cancelledOrder.id], cancelledOrder)
      
      // Invalidar cache de pedidos del usuario
      queryClient.invalidateQueries({ 
        queryKey: ['user-orders', cancelledOrder.userId] 
      })
    },
  })
}
