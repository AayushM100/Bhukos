import { FoodItem } from '../types';

export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Maaza Mango Drink',
    brand: 'Coca-Cola',
    category: 'Drinks',
    rarity: 'Common',
    poster_url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400',
    description: 'Thick mango, sunny afternoons and the kind of nostalgia that doesn’t need a special occasion.',
    flavors: ['Sweet', 'Mango', 'Rich'],
    quote: 'A little sip of an Indian summer.',
  },
  {
    id: '2',
    name: 'Aloo Bhujia',
    brand: "Haldiram's",
    category: 'Snacks',
    rarity: 'Rare',
    poster_url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400',
    description: 'Classic masala and potato crunch that pairs with every cup of chai.',
    flavors: ['Classic Masala', 'Crunchy', 'Spicy'],
    quote: 'The crunch that always delivers.',
  },
  {
    id: '3',
    name: 'Parle-G Glucose Biscuit',
    brand: 'Parle',
    category: 'Biscuits',
    rarity: 'Common',
    poster_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400',
    description: 'The undisputed king of tea-time. Dunk for exactly two seconds for peak bliss.',
    flavors: ['Sweet', 'Malt', 'Buttery'],
    quote: 'Genius everyday snacking.',
  },
  {
    id: '4',
    name: 'Aam Panna',
    brand: 'Paper Boat',
    category: 'Beverages',
    rarity: 'Epic',
    poster_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
    description: 'Raw mango cooler laced with roasted cumin and black salt.',
    flavors: ['Sour', 'Tangy', 'Cumin'],
    quote: 'Summer in a pouch.',
  },
  {
    id: '5',
    name: 'Old Monk 7-Year Rum',
    brand: 'Mohan Meakin',
    category: 'Spirits',
    rarity: 'Legendary',
    poster_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400',
    description: 'Dark, vanilla-kissed legendary rum that fuels decades of college stories.',
    flavors: ['Vanilla', 'Oak', 'Caramel'],
    quote: 'Not just a drink, an emotion.',
  }
];

export const mockTrivia = {
  fact: "The best part of a biscuit? The two seconds before it meets chai.",
  source: "From the community's very unofficial snack wisdom.",
};
