import type { ProductData, CarouselImage, Collection } from '../types';

export const productCards: ProductData[] = [
  {
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop',
    alt: 'Hoodies Collection',
    title: 'Hoodies',
    url: '/products/hoodies'
  },
  {
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop',
    alt: 'Tees Collection',
    title: 'Tees',
    url: '/products/tees'
  }
];

export const featuredProducts: ProductData[] = [
  {
    title: 'DISXCORE Gaming Hoodie',
    price: '$89.99',
    description: 'Premium quality hoodie designed for Discord gamers. Made with ultra-soft cotton blend fabric, featuring the exclusive DISXCORE design. Perfect for gaming sessions or casual wear.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
    alt: 'DISXCORE Gaming Hoodie',
    specifications: [
      { label: 'Material', value: '80% Cotton, 20% Polyester' },
      { label: 'Fit', value: 'Unisex Regular Fit' },
      { label: 'Care', value: 'Machine Wash Cold' },
      { label: 'Origin', value: 'Made in USA' },
      { label: 'Sizes', value: 'XS - 3XL Available' }
    ]
  },
  {
    title: 'daydream doodles Tee',
    price: '$34.99',
    description: 'Express your creativity with this unique daydream doodles design. Soft, breathable fabric perfect for everyday wear. Limited edition design exclusively available on Discord merch store.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    alt: 'daydream doodles Tee',
    specifications: [
      { label: 'Material', value: '100% Organic Cotton' },
      { label: 'Fit', value: 'Relaxed Fit' },
      { label: 'Care', value: 'Machine Wash Warm' },
      { label: 'Origin', value: 'Ethically Sourced' },
      { label: 'Print', value: 'Water-based Eco Ink' }
    ]
  }
];

export const carouselImages: CarouselImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
    alt: 'DISXCORE Collection',
    title: 'DISXCORE',
    url: '/collections/disxcore'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=500&fit=crop',
    alt: 'daydream doodles Collection',
    title: 'daydream doodles',
    url: '/collections/daydream-doodles'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=500&fit=crop',
    alt: 'Gaming Gear Collection',
    title: 'Gaming Gear',
    url: '/collections/gaming-gear'
  }
];

export const currentCollections: Collection[] = [
  {
    id: '1',
    name: 'DISXCORE',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=250&fit=crop',
    alt: 'DISXCORE Collection',
    url: '/collections/disxcore'
  },
  {
    id: '2',
    name: 'Discord Developers',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=250&fit=crop',
    alt: 'Discord Developers Collection',
    url: '/collections/discord-developers'
  },
  {
    id: '3',
    name: 'daydream doodles',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=250&fit=crop',
    alt: 'daydream doodles Collection',
    url: '/collections/daydream-doodles'
  },
  {
    id: '4',
    name: 'Idle Nights',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=250&fit=crop',
    alt: 'Idle Nights Collection',
    url: '/collections/idle-nights'
  },
  {
    id: '5',
    name: 'Camp Wumpus',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=250&fit=crop',
    alt: 'Camp Wumpus Collection',
    url: '/collections/camp-wumpus'
  },
  {
    id: '6',
    name: '@everyone',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    alt: '@everyone Collection',
    url: '/collections/everyone'
  },
  {
    id: '7',
    name: '@here',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=250&fit=crop',
    alt: '@here Collection',
    url: '/collections/here'
  },
  {
    id: '8',
    name: 'Adorable Add-Ons',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
    alt: 'Adorable Add-Ons Collection',
    url: '/collections/adorable-add-ons'
  }
];