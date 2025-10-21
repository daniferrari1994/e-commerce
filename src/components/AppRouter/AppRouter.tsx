import React from 'react';
import { 
  CollectionPage, 
  CategoryPage, 
  ShopAllPage, 
  NewArrivalsPage
} from '../../pages';

export type RouteType = 
  | { type: 'home' }                                              // Página principal
  | { type: 'collection'; collectionId: string }                 // Página de colección específica
  | { type: 'category'; category: 'apparel' | 'goods' }         // Página de categoría (ropa o productos)
  | { type: 'shopall' }                                          // Página de todos los productos
  | { type: 'new-arrivals' }                                     // Página de nuevos productos
  | { type: 'simple'; pageType: 'about' | 'contact' | 'support' | 'careers' };  // Páginas simples

interface AppRouterProps {
  currentRoute: RouteType;                      // Ruta actual activa
  onNavigate: (route: RouteType) => void;      // Función para cambiar de ruta
  homeContent: React.ReactNode;                // Contenido a mostrar en la página principal
}

const AppRouter: React.FC<AppRouterProps> = ({
  currentRoute,
  onNavigate,
  homeContent
}) => {
  // Manejador para clicks en breadcrumbs - navega de vuelta al home
  const handleBreadcrumbClick = (path: string) => {
    if (path === '/') {
      onNavigate({ type: 'home' });
    }
    // Solo manejamos el path al home, ya que todos los breadcrumbs solo tienen Home → Página actual
  };

  // Switch que renderiza el componente correspondiente según la ruta actual
  switch (currentRoute.type) {
    case 'collection':
      // Página de colección específica
      return (
        <CollectionPage
          collectionId={currentRoute.collectionId as any}
          onBreadcrumbClick={handleBreadcrumbClick}
        />
      );
    
    case 'category':
      // Página de categoría (apparel o goods)
      return (
        <CategoryPage
          category={currentRoute.category}
          onBreadcrumbClick={handleBreadcrumbClick}
        />
      );
    
    case 'shopall':
      // Página con todos los productos
      return (
        <ShopAllPage
          onBreadcrumbClick={handleBreadcrumbClick}
        />
      );
    
    case 'new-arrivals':
      // Página de nuevos productos
      return (
        <NewArrivalsPage
          onBreadcrumbClick={handleBreadcrumbClick}
        />
      );
    
    case 'home':
    default:
      // Página principal - renderiza el contenido del home
      return <>{homeContent}</>;
  }
};

export default AppRouter;