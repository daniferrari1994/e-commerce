import { Nav, SecondaryNav, Carousel } from './components';

function App() {
  const handleSearch = (query: string) => {
    console.log('Búsqueda:', query);
  };

  const handleCountryChange = (country: any) => {
    console.log('País seleccionado:', country);
  };

  const handleUserMenuClick = (action: string) => {
    console.log('Acción del usuario:', action);
  };

  const handleCartClick = () => {
    console.log('Carrito clickeado');
  };

  const handleCollectionSelect = (collection: string) => {
    console.log('Colección seleccionada:', collection);
  };

  const handleCategorySelect = (category: string) => {
    console.log('Categoría seleccionada:', category);
  };

  const handleShopAllClick = () => {
    console.log('Shop All clickeado');
  };

  const handleMoreSelect = (option: string) => {
    console.log('Opción More seleccionada:', option);
  };

  const handleImageClick = (image: any, index: number) => {
    console.log('Imagen clickeada:', image, 'índice:', index);
  };

  const carouselImages = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
      alt: 'Promoción 1',
      title: 'Nueva Colección DISXCORE'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=500&fit=crop',
      alt: 'Promoción 2',
      title: 'Discord Developers Gear'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=500&fit=crop',
      alt: 'Promoción 3',
      title: 'Camp Wumpus Collection'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=500&fit=crop',
      alt: 'Promoción 4',
      title: 'Gaming Accessories'
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=500&fit=crop',
      alt: 'Promoción 5',
      title: 'Special Offers'
    }
  ];

  return (
    <div>
      <Nav 
        cartItemsCount={3} 
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
        autoPlayInterval={4000}
        onImageClick={handleImageClick}
      />
    </div>
  )
}

export default App
