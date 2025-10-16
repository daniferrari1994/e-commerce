import { useState, useEffect, useRef } from 'react';
import './Carousel.css';

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface CarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onImageClick?: (image: CarouselImage, index: number) => void;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  onImageClick,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const extendedImages = images.length > 0 ? [
    images[images.length - 1],
    ...images,
    images[0]
  ] : [];

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    if (direction === 'prev') {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      
      if (currentIndex === 0) {
        if (trackRef.current) {
          trackRef.current.style.transition = 'none';
          setCurrentIndex(images.length);
          trackRef.current.offsetHeight;
          trackRef.current.style.transition = 'transform 0.5s ease-in-out';
        }
      } else if (currentIndex === extendedImages.length - 1) {
        if (trackRef.current) {
          trackRef.current.style.transition = 'none';
          setCurrentIndex(1);
          trackRef.current.offsetHeight;
          trackRef.current.style.transition = 'transform 0.5s ease-in-out';
        }
      }
    };

    const track = trackRef.current;
    if (track) {
      track.addEventListener('transitionend', handleTransitionEnd);
      return () => track.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [currentIndex, extendedImages.length, images.length]);

  const handleImageClick = () => {
    if (onImageClick) {
      const realIndex = currentIndex === 0 ? images.length - 1 : 
                      currentIndex === extendedImages.length - 1 ? 0 : 
                      currentIndex - 1;
      onImageClick(images[realIndex], realIndex);
    }
  };

  const getDotsIndex = () => {
    if (currentIndex === 0) return images.length - 1;
    if (currentIndex === extendedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  if (!images || images.length === 0) {
    return (
      <div className={`carousel empty ${className}`}>
        <div className="carousel-placeholder">
          <p>No hay imágenes disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel-container">
        <div className="carousel-images-wrapper">
          <div 
            ref={trackRef}
            className="carousel-images-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
            }}
          >
            {extendedImages.map((image, index) => (
              <div key={`${image.id}-${index}`} className="carousel-slide">
                <div className="carousel-image-container">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="carousel-image"
                    onClick={handleImageClick}
                  />
                  {image.title && (
                    <div className="carousel-image-title">
                      {image.title}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-controls">
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