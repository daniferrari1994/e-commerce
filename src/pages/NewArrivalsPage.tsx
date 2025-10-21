import React, { useState } from 'react';
import { ProductCard, SectionView } from '../components';
import { 
  sortOptions, 
  categoryFilterOptions, 
  viewOptions, 
  sectionBanners,
  getAllProducts,
  type Product
} from '../data';
import type { BreadcrumbItem } from '../types';

interface NewArrivalsPageProps {
  onBreadcrumbClick?: (path: string) => void;
}

const NewArrivalsPage: React.FC<NewArrivalsPageProps> = ({
  onBreadcrumbClick
}) => {
  const [sortBy, setSortBy] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewType, setViewType] = useState('grid');

  // Obtener productos nuevos (simulamos con los últimos productos del array)
  const allProducts = getAllProducts();
  const newProducts = allProducts.slice(-8); // Últimos 8 productos como "nuevos"
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'New Arrivals' }
  ];

  return (
    <SectionView
      breadcrumbs={breadcrumbs}
      title="New Arrivals"
      banner={sectionBanners.new}
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
      productCount={newProducts.length}
      onBreadcrumbClick={onBreadcrumbClick}
    >
      {/* Grid de productos con ProductCard */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem',
        padding: '2rem 0'
      }}>
        {newProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionView>
  );
};

export default NewArrivalsPage;