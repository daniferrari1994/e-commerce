import './CollectionsGrid.css';

interface CollectionItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  url: string;
}

interface CollectionsGridProps {
  collections: CollectionItem[];
  onCollectionClick?: (collection: CollectionItem) => void;
  className?: string;
}

const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collections,
  onCollectionClick,
  className = ""
}) => {
  const handleCollectionClick = (collection: CollectionItem) => {
    if (onCollectionClick) {
      onCollectionClick(collection);
    }
  };

  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <div className={`collections-grid ${className}`}>
      <div className="collections-container">
        {collections.map((collection) => (
          <div key={collection.id} className="collection-item">
            <div className="collection-image-container">
              <img
                src={collection.image}
                alt={collection.alt}
                className="collection-image"
              />
            </div>
            <div className="collection-link-container">
              <a
                href={collection.url}
                className="collection-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleCollectionClick(collection);
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