import { FoodItem } from '../types';

export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Amul Butter (Utterly Butterly Delicious)',
    brand: 'Amul',
    category: 'Dairy',
    rarity: 'Common',
    poster_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400',
    description: 'The iconic salted butter that has been part of Indian breakfasts for generations.',
    flavors: ['Classic Salted'],
    quote: 'Taste of India'
  },
  {
    id: '2',
    name: 'Haldiram Bhujia Sev',
    brand: "Haldiram's",
    category: 'Snacks',
    rarity: 'Common',
    poster_url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400',
    description: 'Crispy, spicy chickpea flour strands seasoned with authentic Indian spices.',
    flavors: ['Spicy', 'Tangy'],
    quote: 'Always authentic, always crispy!'
  },
  {
    id: '3',
    name: 'Old Monk Rum (Aged)',
    brand: 'Mohan Meakin',
    category: 'Beverages',
    rarity: 'Legendary',
    poster_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400',
    description: 'The iconic dark rum aged for 7 years, beloved by generations of foodies and connoisseurs.',
    flavors: ['Vanilla', 'Spiced Oak', 'Caramel'],
    quote: 'Not just a drink, a emotion.'
  },
  {
    id: '4',
    name: 'Maggi 2-Minute Masala Noodles',
    brand: 'Nestlé',
    category: 'Instant Food',
    rarity: 'Epic',
    poster_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=400',
    description: 'The ultimate late-night snack for Indian students, travelers, and food lovers.',
    flavors: ['Classic Masala', 'Atta', 'Special Masala'],
    quote: 'Fast to make, impossible to forget.'
  },
  {
    id: '5',
    name: 'Paper Boat Aamras',
    brand: 'Paper Boat',
    category: 'Beverages',
    rarity: 'Rare',
    poster_url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400',
    description: 'Rich, thick mango nectar crafted to bring back childhood summer memories.',
    flavors: ['Alphonso Mango'],
    quote: 'Memories in a pouch.'
  }
];
