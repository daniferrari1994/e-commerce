import './CollectionsGrid.css';

interface CollectionItem {
  id: string;      // Identificador único de la colección
  name: string;    // Nombre descriptivo de la colección
  image: string;   // URL de la imagen representativa
  alt: string;     // Texto alternativo para accesibilidad
  url: string;     // URL de destino al hacer clic
}

interface CollectionsGridProps {
  collections: CollectionItem[];                              // Array de colecciones a mostrar
  onCollectionClick?: (collection: CollectionItem) => void;  // Callback opcional al hacer clic en una colección
  className?: string;                                         // Clases CSS adicionales
}

const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collections,
  onCollectionClick,
  className = ""
}) => {
  // Manejador de clicks en colecciones que ejecuta el callback si está disponible
  const handleCollectionClick = (collection: CollectionItem) => {
    if (onCollectionClick) {
      onCollectionClick(collection);
    }
  };

  // Renderiza null si no hay colecciones o el array está vacío
  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <div className={`collections-grid ${className}`}>
      <div className="collections-container">
        {/* Mapea cada colección para crear los elementos del grid */}
        {collections.map((collection) => (
          <div key={collection.id} className="collection-item">
            {/* Contenedor de la imagen de la colección */}
            <div className="collection-image-container">
              <img
                src={collection.image}
                alt={collection.alt}
                className="collection-image"
              />
            </div>
            
            {/* Contenedor del enlace de la colección */}
            <div className="collection-link-container">
              <a
                href={collection.url}
                className="collection-link"
                onClick={(e) => {
                  e.preventDefault();  // Previene la navegación por defecto
                  handleCollectionClick(collection);  // Ejecuta el callback personalizado
                }}
              >
                {collection.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsGrid;