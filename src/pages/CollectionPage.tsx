import React, { useState } from 'react';
import { ProductCard, SectionView } from '../components';
import { 
  sortOptions, 
  categoryFilterOptions, 
  viewOptions, 
  sectionBanners,
  getProductsByCollection,
  type Product
} from '../data';
import type { BreadcrumbItem } from '../types';

interface CollectionPageProps {
  collectionId: 'disxcore' | 'daydream-doodles' | 'gaming-gear' | 'camp-wumpus' | 'everyone' | 'here' | 'misc-misc';
  onBreadcrumbClick?: (path: string) => void;
}

const COLLECTION_TITLES: Record<string, string> = {
  'disxcore': 'DISXCORE',
  'daydream-doodles': 'daydream doodles',
  'gaming-gear': 'Gaming Gear',
  'camp-wumpus': 'Camp Wumpus',
  'everyone': '@everyone',
  'here': '@here',
  'misc-misc': 'Misc Misc'
};

const CollectionPage: React.FC<CollectionPageProps> = ({
  collectionId,
  onBreadcrumbClick
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewType, setViewType] = useState('grid');

  // Obtener productos de la colección
  const collectionProducts = getProductsByCollection(COLLECTION_TITLES[collectionId] || collectionId);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: COLLECTION_TITLES[collectionId] || collectionId }
  ];

  const collectionTitle = COLLECTION_TITLES[collectionId] || collectionId;
  const banner = sectionBanners[collectionId];

  return (
    <SectionView
      breadcrumbs={breadcrumbs}
      title={collectionTitle}
      banner={banner}
      showDropdowns={true}
      leftDropdowns={{
        dropdown1: {
          label: 'Sort by',
          options: sortOptions,
          value: sortBy,
          onChange: setSortBy
        },
        dropdown2: {
          label: 'Category',
          options: categoryFilterOptions,
          value: categoryFilter,
          onChange: setCategoryFilter
        }
      }}
      rightDropdown={{
        label: 'View',
        options: viewOptions,
        value: viewType,
        onChange: setViewType
      }}
      productCount={collectionProducts.length}
      onBreadcrumbClick={onBreadcrumbClick}
    >
      {/* Grid de productos con ProductCard */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem',
        padding: '2rem 0'
      }}>
        {collectionProducts.slice(0, 6).map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionView>
  );
};

export default CollectionPage;