import { useState, useEffect, useRef } from 'react';
import './Carousel.css';

interface CarouselImage {
  id: string;        // Identificador único de la imagen
  src: string;       // URL de la imagen
  alt: string;       // Texto alternativo para accesibilidad
  title?: string;    // Título opcional que se muestra como overlay
  url?: string;      // URL opcional para navegación al hacer clic en "Shop Now"
}

interface CarouselProps {
  images: CarouselImage[];                                              // Array de imágenes a mostrar
  autoPlay?: boolean;                                                   // Si el carrusel debe avanzar automáticamente
  autoPlayInterval?: number;                                            // Intervalo en milisegundos para el autoplay
  onImageClick?: (image: CarouselImage, index: number) => void;        // Callback cuando se hace clic en una imagen
  onShopNowClick?: (url: string, title: string) => void;               // Callback cuando se hace clic en "Shop Now"
  className?: string;                                                   // Clases CSS adicionales
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  onImageClick,
  onShopNowClick,
  className = ""
}) => {
  // Estado para el índice actual del carrusel (inicia en 1 porque agregamos imagen duplicada al inicio)
  const [currentIndex, setCurrentIndex] = useState(1);
  // Estado para controlar si está en transición (evita clicks rápidos)
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Referencia al contenedor de las imágenes para manipular transiciones
  const trackRef = useRef<HTMLDivElement>(null);

  // Creamos un array extendido con imágenes duplicadas al inicio y final
  // Esto permite el efecto de loop infinito sin cortes visuales
  const extendedImages = images.length > 0 ? [
    images[images.length - 1], // Última imagen al inicio
    ...images,                 // Todas las imágenes originales
    images[0]                  // Primera imagen al final
  ] : [];

  // Effect para manejar el autoplay del carrusel
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1); // Avanza al siguiente slide
      }, autoPlayInterval);

      // Cleanup: limpiar el intervalo cuando el componente se desmonte
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  // Función para ir al slide anterior
  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  // Función para ir al siguiente slide
  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  // Función para ir a un slide específico (desde los dots)
  const goToSlide = (index: number) => {
    if (isTransitioning) return; // Previene clicks durante transiciones
    
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // +1 porque el array extendido tiene un offset
  };

  // Manejador para los clicks en las flechas de navegación
  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (isTransitioning) return; // Previene clicks durante transiciones
    
    if (direction === 'prev') {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  // Effect para manejar el loop infinito del carrusel
  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      
      // Si llegamos al primer slide (duplicado), saltamos al último real sin transición
      if (currentIndex === 0) {
        if (trackRef.current) {
          trackRef.current.style.transition = 'none'; // Quita la transición
          setCurrentIndex(images.length);             // Salta al último slide real
          trackRef.current.offsetHeight;              // Fuerza un reflow del DOM
          trackRef.current.style.transition = 'transform 0.5s ease-in-out'; // Restaura la transición
        }
      } 
      // Si llegamos al último slide (duplicado), saltamos al primero real sin transición
      else if (currentIndex === extendedImages.length - 1) {
        if (trackRef.current) {
          trackRef.current.style.transition = 'none'; // Quita la transición
          setCurrentIndex(1);                         // Salta al primer slide real
          trackRef.current.offsetHeight;              // Fuerza un reflow del DOM
          trackRef.current.style.transition = 'transform 0.5s ease-in-out'; // Restaura la transición
        }
      }
    };

    const track = trackRef.current;
    if (track) {
      track.addEventListener('transitionend', handleTransitionEnd);
      return () => track.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [currentIndex, extendedImages.length, images.length]);

  // Manejador para clicks en las imágenes del carrusel
  const handleImageClick = () => {
    if (onImageClick) {
      // Calcula el índice real de la imagen (sin contar las duplicadas)
      const realIndex = currentIndex === 0 ? images.length - 1 : 
                      currentIndex === extendedImages.length - 1 ? 0 : 
                      currentIndex - 1;
      onImageClick(images[realIndex], realIndex);
    }
  };

  // Función para obtener el índice correcto para los dots de navegación
  const getDotsIndex = () => {
    if (currentIndex === 0) return images.length - 1;        // Si estamos en el duplicado del inicio
    if (currentIndex === extendedImages.length - 1) return 0; // Si estamos en el duplicado del final
    return currentIndex - 1;                                  // Índice normal menos el offset
  };

  // Manejador para el botón "Shop Now" del overlay
  const handleShopNowButtonClick = (url?: string, title?: string) => {
    if (onShopNowClick && url && title) {
      onShopNowClick(url, title);
    }
  }

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel-container">
        {/* Contenedor principal de las imágenes */}
        <div className="carousel-images-wrapper">
          <div 
            ref={trackRef}
            className="carousel-images-track"
            style={{
              // Mueve el carrusel basado en el índice actual
              transform: `translateX(-${currentIndex * 100}%)`,
              // Aplica transición solo cuando está en movimiento
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
            }}
          >
            {/* Renderiza todas las imágenes del array extendido */}
            {extendedImages.map((image, index) => (
              <div key={`${image.id}-${index}`} className="carousel-slide">
                <div className="carousel-image-container">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="carousel-image"
                    onClick={handleImageClick}
                  />
                  
                  {/* Overlay con título y botón "Shop Now" (solo si hay título) */}
                  {image.title && (
                    <div className="carousel-overlay">
                      <div className="carousel-overlay-content">
                        <h2 className="carousel-overlay-title">{image.title}</h2>
                        <button 
                          className="carousel-shop-button"
                          onClick={() => handleShopNowButtonClick(image.url, image.title)}
                        >
                          Shop Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Controles de navegación */}
        <div className="carousel-controls">
          {/* Flecha izquierda */}
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={() => handleArrowClick('prev')}
            aria-label="Imagen anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 18L9 12L15 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          {/* Dots de navegación */}
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === getDotsIndex() ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Flecha derecha */}
          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={() => handleArrowClick('next')}
            aria-label="Imagen siguiente"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M9 18L15 12L9 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;