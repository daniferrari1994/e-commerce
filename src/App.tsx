import { useState } from 'react';
import { Carousel, CollectionsGrid, Footer, Nav, SecondaryNav, AppRouter, HorizontalProductCard, type HorizontalProductData, CategoryCard, type CategoryCardData } from './components';
import { APP_CONFIG, APP_TEXTS } from './constants';
import { carouselData, collectionsData, horizontalProductsData, categoryCardsData } from './data/centralData';
import { useAppHandlers } from './hooks';
import type { RouteType } from './components/AppRouter/AppRouter';

function App() {
  // Estado para manejar la ruta actual
  const [currentRoute, setCurrentRoute] = useState<RouteType>({ type: 'home' });

  const {
    // Navigation handlers
    handleSearch,
    handleCountryChange,
    handleUserMenuClick,
    handleCartClick,
    
    // Carousel handlers
    handleImageClick,
    handleShopNowClick,
  } = useAppHandlers();

  // Handlers para navegación desde SecondaryNav
  const handleCollectionSelect = (collectionId: string) => {
    setCurrentRoute({ type: 'collection', collectionId });
  };

  const handleCategorySelect = (category: 'apparel' | 'goods') => {
    setCurrentRoute({ type: 'category', category });
  };

  const handleShopAllClick = () => {
    setCurrentRoute({ type: 'shopall' });
  };

  const handleNewArrivalsClick = () => {
    setCurrentRoute({ type: 'new-arrivals' });
  };

  // Handler para click en logo (ir al home)
  const handleLogoClick = () => {
    setCurrentRoute({ type: 'home' });
  };

  // Handler para el componente HorizontalProductCard
  const handleQuickBuy = (product: HorizontalProductData) => {
    console.log('Quick buy clicked for:', product.title);
    // TODO: Implementar lógica de compra rápida
  };

  // Handler para el componente CategoryCard
  const handleCategoryCardShopNow = (category: CategoryCardData) => {
    console.log('Shop now clicked for category:', category.title);
    // Navegar a la categoría correspondiente
    if (category.category === 'hoodies' || category.category === 'tees') {
      setCurrentRoute({ type: 'category', category: 'apparel' });
    } else {
      setCurrentRoute({ type: 'category', category: 'goods' });
    }
  };

  // Contenido de la página principal
  const homeContent = (
    <>
      <Carousel
        images={carouselData}
        autoPlay={true}
        autoPlayInterval={APP_CONFIG.CAROUSEL_AUTO_PLAY_INTERVAL}
        onImageClick={handleImageClick}
        onShopNowClick={handleShopNowClick}
      />
      <main>
        <section style={{ padding: '2rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            {categoryCardsData.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onShopNow={handleCategoryCardShopNow}
              />
            ))}
          </div>
        </section>
        <h1>{APP_TEXTS.FEATURED_PRODUCTS_TITLE}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem 0' }}>
          {horizontalProductsData.map((product) => (
            <HorizontalProductCard
              key={product.id}
              product={product}
              hoverEffect="zoom"
              onQuickBuy={handleQuickBuy}
            />
          ))}
        </div>
      </main>
      <section style={{ textAlign: 'center', margin: '4rem 0 2rem 0' }}>
        <h1>{APP_TEXTS.COLLECTIONS_TITLE}</h1>
      </section>
      <CollectionsGrid
        collections={collectionsData}
        onCollectionClick={(collection) => {
          const collectionId = typeof collection === 'string' ? collection : collection.id;
          handleCollectionSelect(collectionId);
        }}
      />
    </>
  );

  return (
    <div>
      <Nav 
        cartItemsCount={APP_CONFIG.DEFAULT_CART_ITEMS_COUNT} 
        onSearch={handleSearch}
        onCountryChange={handleCountryChange}
        onUserMenuClick={handleUserMenuClick}
        onCartClick={handleCartClick}
        onLogoClick={handleLogoClick}
      />
      <SecondaryNav
        onCollectionSelect={handleCollectionSelect}
        onCategorySelect={handleCategorySelect}
        onShopAllClick={handleShopAllClick}
        onNewArrivalsClick={handleNewArrivalsClick}
      />
      
      <AppRouter
        currentRoute={currentRoute}
        onNavigate={setCurrentRoute}
        homeContent={homeContent}
      />
      
      <Footer />
    </div>
  )
}

export default App