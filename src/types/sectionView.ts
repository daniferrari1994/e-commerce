import type { DropdownOption } from './index';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface SectionBanner {
  image: string;
  alt: string;
  title?: string;
}

export interface SectionViewProps {
  // Breadcrumb - siempre presente
  breadcrumbs: BreadcrumbItem[];
  
  // Título de la sección - siempre presente
  title: string;
  
  // Banner opcional (Collections, Categories, "New" en More)
  banner?: SectionBanner;
  
  // Dropdowns opcionales (Collections, Categories, "New" en More, Shop all)
  showDropdowns?: boolean;
  leftDropdowns?: {
    dropdown1: {
      label: string;
      options: DropdownOption[];
      value: string;
      onChange: (value: string) => void;
    };
    dropdown2: {
      label: string;
      options: DropdownOption[];
      value: string;
      onChange: (value: string) => void;
    };
  };
  rightDropdown?: {
    label: string;
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
  };
  
  // Contador de productos - para secciones con dropdowns
  productCount?: number;
  
  // Contenido del área de productos (children)
  children?: React.ReactNode;
  
  // Callbacks opcionales
  onBreadcrumbClick?: (path: string) => void;
}