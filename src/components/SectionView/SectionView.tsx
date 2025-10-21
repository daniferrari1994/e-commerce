import React from 'react';
import type { SectionViewProps } from '../../types';
import './SectionView.css';

// Componente de vista de sección reutilizable con breadcrumbs, banner, filtros y contenido
const SectionView: React.FC<SectionViewProps> = ({
  breadcrumbs,        // Migas de pan para navegación
  title,              // Título principal de la sección
  banner,             // Banner opcional con imagen y título
  showDropdowns = false,  // Si mostrar o no los dropdowns de filtros
  leftDropdowns,      // Dropdowns del lado izquierdo (filtros)
  rightDropdown,      // Dropdown del lado derecho (ordenamiento)
  productCount,       // Número de productos encontrados
  children,           // Contenido de la sección (grid de productos)
  onBreadcrumbClick   // Callback para navegación por breadcrumbs
}) => {
  // Manejador para clicks en breadcrumbs
  const handleBreadcrumbClick = (path: string) => {
    if (onBreadcrumbClick) {
      onBreadcrumbClick(path);
    }
  };

  return (
    <div className="section-view">
      {/* Navegación de migas de pan - siempre visible */}
      <nav className="section-breadcrumb">
        <ol className="breadcrumb-list">
          {breadcrumbs.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              {/* Si tiene path, es un enlace clickeable */}
              {item.path ? (
                <button
                  className="breadcrumb-link"
                  onClick={() => handleBreadcrumbClick(item.path!)}
                >
                  {item.label}
                </button>
              ) : (
                /* Si no tiene path, es el elemento actual */
                <span className="breadcrumb-current">{item.label}</span>
              )}
              {/* Separador entre elementos (excepto el último) */}
              {index < breadcrumbs.length - 1 && (
                <span className="breadcrumb-separator">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Banner opcional con imagen y título superpuesto */}
      {banner && (
        <div className="section-banner">
          <div className="section-banner-container">
            <img
              src={banner.image}
              alt={banner.alt}
              className="section-banner-image"
            />
            {/* Overlay con título si está disponible */}
            {banner.title && (
              <div className="section-banner-overlay">
                <h1 className="section-banner-title">{banner.title}</h1>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Título principal de la sección */}
      <div className="section-header">
        <h1 className="section-title">{title}</h1>
      </div>

      {/* Controles de filtrado y ordenamiento (opcionales) */}
      {showDropdowns && (
        <div className="section-controls">
          <div className="section-controls-container">
            
            {/* Dropdowns de filtrado (lado izquierdo) */}
            <div className="left-dropdowns">
              {/* Primer dropdown de filtro */}
              {leftDropdowns?.dropdown1 && (
                <div className="dropdown-container">
                  <label className="dropdown-label">
                    {leftDropdowns.dropdown1.label}
                  </label>
                  <select
                    className="dropdown-select"
                    value={leftDropdowns.dropdown1.value}
                    onChange={(e) => leftDropdowns.dropdown1.onChange(e.target.value)}
                  >
                    {leftDropdowns.dropdown1.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Segundo dropdown de filtro */}
              {leftDropdowns?.dropdown2 && (
                <div className="dropdown-container">
                  <label className="dropdown-label">
                    {leftDropdowns.dropdown2.label}
                  </label>
                  <select
                    className="dropdown-select"
                    value={leftDropdowns.dropdown2.value}
                    onChange={(e) => leftDropdowns.dropdown2.onChange(e.target.value)}
                  >
                    {leftDropdowns.dropdown2.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Dropdown de ordenamiento (lado derecho) */}
            <div className="right-dropdown">
              {rightDropdown && (
                <div className="dropdown-container">
                  <label className="dropdown-label">
                    {rightDropdown.label}
                  </label>
                  <select
                    className="dropdown-select"
                    value={rightDropdown.value}
                    onChange={(e) => rightDropdown.onChange(e.target.value)}
                  >
                    {rightDropdown.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Contador de productos - visible solo con dropdowns */}
      {showDropdowns && typeof productCount === 'number' && (
        <div className="section-product-count">
          <p className="product-count-text">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </p>
        </div>
      )}

      {/* Área principal de contenido (grid de productos u otro contenido) */}
      <div className="section-content">
        {children}
      </div>
    </div>
  );
};

export default SectionView;