// Tipos para productos
export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductData {
  id: string;
  title: string;
  price: string;
  description: string;
  stock: number;
  category: string;
  subcategory: string;
  collection?: string;
  specifications?: ProductSpecification[];
  image: string;
  alt: string;
  url?: string;
  featured?: boolean;
  tags?: string[];
}

// Tipos para carousels
export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  url?: string;
}

// Tipos para colecciones
export interface Collection {
  id: string;
  name: string;
  image: string;
  alt: string;
  url: string;
}

// Tipos para países y monedas
export interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
}

// Tipos para usuarios
export interface User {
  name: string;
  email: string;
  avatar?: string;
}

// Tipos para dropdowns y opciones
export interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

// Tipos para handlers de eventos comunes
export type SearchHandler = (query: string) => void;
export type CountryChangeHandler = (country: Country) => void;
export type MenuClickHandler = (action: string) => void;
export type ProductActionHandler = (product: ProductData, action: 'shop' | 'buy') => void;
export type CollectionClickHandler = (collection: Collection | string) => void;

// Props comunes que se repiten
export interface BaseComponentProps {
  className?: string;
}

export interface CallbackProps {
  onSearch?: SearchHandler;
  onCountryChange?: CountryChangeHandler;
  onUserMenuClick?: MenuClickHandler;
  onCartClick?: () => void;
}

// Tipos para configuración de la aplicación
export interface AppConfiguration {
  autoPlayInterval: number;
  defaultCountry: Country;
  defaultCartItemsCount: number;
}

// Tipos utilitarios
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Exportar tipos de SectionView
export * from './sectionView';