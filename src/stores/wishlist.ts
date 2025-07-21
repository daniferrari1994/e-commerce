import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  getItemCount: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        set((state) => {
          const isAlreadyInWishlist = state.items.some(item => item.id === product.id)
          
          if (isAlreadyInWishlist) {
            return state // No agregar si ya está
          }
          
          return {
            items: [...state.items, product]
          }
        })
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },
      
      isInWishlist: (productId: string) => {
        const state = get()
        return state.items.some(item => item.id === productId)
      },
      
      clearWishlist: () => {
        set({ items: [] })
      },
      
      getItemCount: () => {
        const state = get()
        return state.items.length
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
)
