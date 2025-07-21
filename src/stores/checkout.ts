'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Address, PaymentMethod, ShippingOption, CheckoutStep } from '@/types/orders'

interface CheckoutState {
  currentStep: number
  steps: CheckoutStep[]
  shippingAddress: Address | null
  billingAddress: Address | null
  selectedShipping: ShippingOption | null
  selectedPayment: PaymentMethod | null
  orderNotes: string
  
  // Actions
  setCurrentStep: (step: number) => void
  setShippingAddress: (address: Address) => void
  setBillingAddress: (address: Address) => void
  setSelectedShipping: (shipping: ShippingOption) => void
  setSelectedPayment: (payment: PaymentMethod) => void
  setOrderNotes: (notes: string) => void
  completeStep: (step: number) => void
  resetCheckout: () => void
  canProceedToStep: (step: number) => boolean
}

const initialSteps: CheckoutStep[] = [
  { id: 1, title: 'Dirección de Envío', completed: false, current: true },
  { id: 2, title: 'Método de Envío', completed: false, current: false },
  { id: 3, title: 'Método de Pago', completed: false, current: false },
  { id: 4, title: 'Revisar Pedido', completed: false, current: false },
  { id: 5, title: 'Confirmación', completed: false, current: false }
]

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      steps: initialSteps,
      shippingAddress: null,
      billingAddress: null,
      selectedShipping: null,
      selectedPayment: null,
      orderNotes: '',

      setCurrentStep: (step) => {
        set((state) => {
          const newSteps = state.steps.map(s => ({
            ...s,
            current: s.id === step
          }))
          return { currentStep: step, steps: newSteps }
        })
      },

      setShippingAddress: (address) => {
        set({ shippingAddress: address })
        // Si no hay dirección de facturación, usar la misma
        const { billingAddress } = get()
        if (!billingAddress) {
          set({ billingAddress: { ...address, type: 'billing' } })
        }
      },

      setBillingAddress: (address) => {
        set({ billingAddress: address })
      },

      setSelectedShipping: (shipping) => {
        set({ selectedShipping: shipping })
      },

      setSelectedPayment: (payment) => {
        set({ selectedPayment: payment })
      },

      setOrderNotes: (notes) => {
        set({ orderNotes: notes })
      },

      completeStep: (step) => {
        set((state) => {
          const newSteps = state.steps.map(s => ({
            ...s,
            completed: s.id <= step ? true : s.completed
          }))
          return { steps: newSteps }
        })
      },

      canProceedToStep: (step) => {
        const state = get()
        
        switch (step) {
          case 1:
            return true
          case 2:
            return !!state.shippingAddress
          case 3:
            return !!state.shippingAddress && !!state.selectedShipping
          case 4:
            return !!state.shippingAddress && !!state.selectedShipping && !!state.selectedPayment
          case 5:
            return !!state.shippingAddress && !!state.selectedShipping && !!state.selectedPayment
          default:
            return false
        }
      },

      resetCheckout: () => {
        set({
          currentStep: 1,
          steps: initialSteps,
          shippingAddress: null,
          billingAddress: null,
          selectedShipping: null,
          selectedPayment: null,
          orderNotes: ''
        })
      }
    }),
    {
      name: 'checkout-storage',
      partialize: (state) => ({
        shippingAddress: state.shippingAddress,
        billingAddress: state.billingAddress,
        selectedShipping: state.selectedShipping,
        selectedPayment: state.selectedPayment,
        orderNotes: state.orderNotes
      })
    }
  )
)
