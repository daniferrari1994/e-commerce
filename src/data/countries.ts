import type { Country } from '../types';

export const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', currency: 'EUR' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD' }
];

export const defaultCountry: Country = countries[0];

export const paymentMethods = [
  'Amex', 'Apple Pay', 'Diners Club', 'Discover', 
  'Google Pay', 'Mastercard', 'Shop Pay', 'Visa'
];