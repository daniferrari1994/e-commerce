import { Nav, SecondaryNav } from './components';

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
      <main>
        <h1>E-Commerce Discord</h1>
        <p>¡Bienvenido a nuestro e-commerce!</p>
      </main>
    </div>
  )
}

export default App
