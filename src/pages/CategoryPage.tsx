import React, { useState } from 'react';
import { ProductCard, SectionView } from '../components';
import { 
  sortOptions, 
  priceFilterOptions, 
  viewOptions, 
  sectionBanners,
  getProductsByCategory,
  type Product
} from '../data';
import type { BreadcrumbItem } from '../types';

interface CategoryPageProps {
  category: 'apparel' | 'goods';
  onBreadcrumbClick?: (path: string) => void;
}

const CATEGORY_TITLES: Record<string, string> = {
  'apparel': 'Apparel',
  'goods': 'Goods'
};

const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  onBreadcrumbClick
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');
  const [viewType, setViewType] = useState('grid');

  // Obtener productos de la categoría
  const categoryProducts = getProductsByCategory(category);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: CATEGORY_TITLES[category] }
  ];

  const categoryTitle = CATEGORY_TITLES[category];
  const banner = sectionBanners[category];

  return (
    <SectionView
      breadcrumbs={breadcrumbs}
      title={categoryTitle}
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
          label: 'Price Range',
          options: priceFilterOptions,
          value: priceFilter,
          onChange: setPriceFilter
        }
      }}
      rightDropdown={{
        label: 'View',
        options: viewOptions,
        value: viewType,
        onChange: setViewType
      }}
      productCount={categoryProducts.length}
      onBreadcrumbClick={onBreadcrumbClick}
    >
      {/* Grid de productos con ProductCard */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem',
        padding: '2rem 0'
      }}>
        {categoryProducts.slice(0, 8).map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionView>
  );
};

export default CategoryPage;