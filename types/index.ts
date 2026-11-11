export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  streak_count: number;
  last_login?: string;
  created_at: string;
}

export interface FoodItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  rarity: Rarity;
  poster_url: string;
  description: string;
  flavors?: string[];
  quote?: string;
}

export interface FoodLog {
  id: string;
  user_id: string;
  food_item_id: string;
  rating: number; // 1 to 5 stars
  review?: string;
  created_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  food_item_id: string;
  created_at: string;
}

export interface UserCard {
  id: string;
  user_id: string;
  food_item_id: string;
  quantity: number;
  acquired_at: string;
}

export interface Trivia {
  id: string;
  fact: string;
  source?: string;
  active_date: string;
}
