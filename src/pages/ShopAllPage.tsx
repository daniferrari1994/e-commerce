import React, { useState } from 'react';
import { ProductCard, SectionView } from '../components';
import { 
  getAllProducts, 
  sortOptions, 
  categoryFilterOptions, 
  viewOptions,
  type Product 
} from '../data';
import type { BreadcrumbItem } from '../types';

interface ShopAllPageProps {
  onBreadcrumbClick?: (path: string) => void;
}

const ShopAllPage: React.FC<ShopAllPageProps> = ({
  onBreadcrumbClick
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewType, setViewType] = useState('grid');
  
  // Obtener todos los productos
  const allProducts = getAllProducts();
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Shop All' }
  ];

  return (
    <SectionView
      breadcrumbs={breadcrumbs}
      title="All Products"
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
      productCount={allProducts.length}
      onBreadcrumbClick={onBreadcrumbClick}
    >
      {/* Grid de productos con ProductCard */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem',
        padding: '2rem 0'
      }}>
        {allProducts.slice(0, 12).map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionView>
  );
};

export default ShopAllPage;