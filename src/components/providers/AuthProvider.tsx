'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthContextType, LoginCredentials, RegisterCredentials } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock API functions - En producción serían llamadas reales
const authAPI = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simular validación
    if (credentials.email === 'admin@techstore.com' && credentials.password === 'admin123') {
      return {
        id: '1',
        email: 'admin@techstore.com',
        firstName: 'Admin',
        lastName: 'TechStore',
        role: 'admin',
        emailVerified: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    }
    
    if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
      return {
        id: '2',
        email: 'user@example.com',
        firstName: 'Usuario',
        lastName: 'Demo',
        role: 'user',
        emailVerified: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    }
    
    throw new Error('Credenciales inválidas')
  },
  
  register: async (data: RegisterCredentials): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simular registro
    if (data.email === 'existing@example.com') {
      throw new Error('El email ya está registrado')
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'user',
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Simular obtener usuario actual desde token
    const savedUser = localStorage.getItem('auth-user')
    return savedUser ? JSON.parse(savedUser) : null
  },
  
  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const savedUser = localStorage.getItem('auth-user')
    if (!savedUser) throw new Error('Usuario no encontrado')
    
    const user = JSON.parse(savedUser)
    const updatedUser = { ...user, ...data, updatedAt: new Date().toISOString() }
    
    localStorage.setItem('auth-user', JSON.stringify(updatedUser))
    return updatedUser
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    // Verificar si hay un usuario logueado al cargar
    const initAuth = async () => {
      try {
        const currentUser = await authAPI.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const user = await authAPI.login(credentials)
      setUser(user)
      localStorage.setItem('auth-user', JSON.stringify(user))
      localStorage.setItem('auth-token', 'mock-jwt-token') // En producción sería un JWT real
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterCredentials) => {
    setIsLoading(true)
    try {
      const user = await authAPI.register(data)
      setUser(user)
      localStorage.setItem('auth-user', JSON.stringify(user))
      localStorage.setItem('auth-token', 'mock-jwt-token')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth-user')
    localStorage.removeItem('auth-token')
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('No hay usuario logueado')
    
    setIsLoading(true)
    try {
      const updatedUser = await authAPI.updateProfile(user.id, data)
      setUser(updatedUser)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
