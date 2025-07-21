'use client'

import { useState } from 'react'
import { Star, ThumbsUp, User, CheckCircle, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Review, ReviewStats } from '@/types'
import { useAuth } from '@/components/providers/AuthProvider'

interface ReviewsSectionProps {
  productId: string
  reviews: Review[]
  stats: ReviewStats
}

interface ReviewFormData {
  rating: number
  title: string
  comment: string
}

export default function ReviewsSection({ productId, reviews, stats }: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest')
  const [filterBy, setFilterBy] = useState<number | 'all'>('all')
  const { user, isAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 5,
    title: '',
    comment: ''
  })

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      default:
        return 0
    }
  }).filter(review => filterBy === 'all' || review.rating === filterBy)

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para escribir una reseña')
      return
    }

    // En producción, esto enviaría la reseña a la API
    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      userId: user!.id,
      userName: `${user!.firstName} ${user!.lastName}`,
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      verified: true,
      helpful: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setShowReviewForm(false)
    setFormData({ rating: 5, title: '', comment: '' })
    alert('¡Reseña enviada correctamente!')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const RatingStars = ({ rating, size = 'sm' }: { rating: number, size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    }

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {stats.averageRating.toFixed(1)}
            </div>
            <RatingStars rating={Math.round(stats.averageRating)} size="lg" />
            <p className="text-gray-600 mt-2">
              Basado en {stats.totalReviews} reseñas
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0
              
              return (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-12">{rating} estrellas</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filters and Write Review */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="highest">Mejor valorados</option>
            <option value="lowest">Peor valorados</option>
          </select>

          {/* Filter By Rating */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas las estrellas</option>
            <option value="5">5 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="2">2 estrellas</option>
            <option value="1">1 estrella</option>
          </select>
        </div>

        {/* Write Review Button */}
        <Button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Escribir reseña
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Escribir una reseña</h3>
          
          {!isAuthenticated ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Debes iniciar sesión para escribir una reseña
              </p>
              <Button>Iniciar sesión</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating <= formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 hover:text-yellow-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título de la reseña
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resumen de tu experiencia"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tu reseña
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cuéntanos qué opinas sobre este producto..."
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  Enviar reseña
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {filterBy === 'all' 
                ? 'Aún no hay reseñas para este producto'
                : `No hay reseñas con ${filterBy} estrella${filterBy !== 1 ? 's' : ''}`
              }
            </p>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <div key={review.id} className="bg-white border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {review.userAvatar ? (
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{review.userName}</h4>
                      {review.verified && (
                        <div title="Compra verificada">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <RatingStars rating={review.rating} />
              </div>

              <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
              <p className="text-gray-700 mb-4">{review.comment}</p>

              <div className="flex items-center justify-between">
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Útil ({review.helpful})</span>
                </button>
                
                {review.verified && (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    Compra verificada
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
