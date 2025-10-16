import { Nav, SecondaryNav, Carousel, ProductShowcase, CollectionsGrid, Footer } from './components';
import { useAppHandlers } from './hooks';
import { productCards, featuredProducts, carouselImages, currentCollections } from './data';
import { APP_CONFIG, APP_TEXTS } from './constants';

function App() {
  const {
    // Navigation handlers
    handleSearch,
    handleCountryChange,
    handleUserMenuClick,
    handleCartClick,
    
    // Secondary navigation handlers
    handleCollectionSelect,
    handleCategorySelect,
    handleShopAllClick,
    handleMoreSelect,
    
    // Carousel handlers
    handleImageClick,
    handleShopNowClick,
    
    // Product handlers
    handleProductAction,
    handleCollectionClick,
  } = useAppHandlers();

  return (
    <div>
      <Nav 
        cartItemsCount={APP_CONFIG.DEFAULT_CART_ITEMS_COUNT} 
        onSearch={handleSearch}
        onCountryChange={handleCountryChange}
        onUserMenuClick={handleUserMenuClick}
        onCartClick={handleCartClick}
      />
      <SecondaryNav
        onCollectionSelect={handleCollectionSelect}
        onCategorySelect={handleCategorySelect}
        onShopAllClick={handleShopAllClick}
        onMoreSelect={handleMoreSelect}
      />
      <Carousel
        images={carouselImages}
        autoPlay={true}
        autoPlayInterval={APP_CONFIG.CAROUSEL_AUTO_PLAY_INTERVAL}
        onImageClick={handleImageClick}
        onShopNowClick={handleShopNowClick}
      />
      <ProductShowcase
        products={productCards}
        variant="cards"
        onActionClick={handleProductAction}
      />
      <main>
        <h1>{APP_TEXTS.FEATURED_PRODUCTS_TITLE}</h1>
      </main>
      <ProductShowcase
        products={featuredProducts}
        variant="featured"
        onActionClick={handleProductAction}
      />
      <section style={{ textAlign: 'center', margin: '4rem 0 2rem 0' }}>
        <h1>{APP_TEXTS.COLLECTIONS_TITLE}</h1>
      </section>
      <CollectionsGrid
        collections={currentCollections}
        onCollectionClick={handleCollectionClick}
      />
      <Footer />
    </div>
  )
}

export default App
