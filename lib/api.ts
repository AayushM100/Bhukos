import { supabase } from './supabase';
import { FoodItem, FoodLog, Wishlist, Trivia, Profile } from '../types';

/**
 * Fetch all food items from Supabase
 */
export async function getFoodItems(): Promise<FoodItem[]> {
  const { data, error } = await supabase
    .from('food_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching food items:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetch single food item by ID
 */
export async function getFoodItemById(id: string): Promise<FoodItem | null> {
  const { data, error } = await supabase
    .from('food_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching food item ${id}:`, error);
    return null;
  }
  return data;
}

/**
 * Log a food tasting with rating and optional review
 * Rating is converted to 1-10 scale for half-star precision
 */
export async function logFoodTaste(params: {
  userId: string;
  foodItemId: string;
  rating: number; // 0.5 - 5.0
  review?: string;
}): Promise<FoodLog | null> {
  const ratingScale = Math.round(params.rating * 2); // converts 3.5 -> 7, 5 -> 10

  const { data, error } = await supabase
    .from('logs')
    .insert([
      {
        user_id: params.userId,
        food_item_id: params.foodItemId,
        rating: ratingScale,
        review: params.review,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error logging food taste:', error);
    return null;
  }
  return data;
}

/**
 * Add or remove food item from wishlist
 */
export async function toggleWishlist(userId: string, foodItemId: string): Promise<boolean> {
  // Check if already in wishlist
  const { data: existing } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', userId)
    .eq('food_item_id', foodItemId)
    .single();

  if (existing) {
    // Remove from wishlist
    await supabase.from('wishlist').delete().eq('id', existing.id);
    return false;
  } else {
    // Add to wishlist
    await supabase.from('wishlist').insert([{ user_id: userId, food_item_id: foodItemId }]);
    return true;
  }
}

/**
 * Fetch today's food trivia lore
 */
export async function getDailyTrivia(): Promise<Trivia | null> {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('trivia')
    .select('*')
    .eq('active_date', today)
    .single();

  if (error || !data) {
    // Fallback trivia if no entry for today
    return {
      id: 'default',
      fact: 'The best part of a biscuit? The two seconds before it meets chai.',
      source: "From the community's very unofficial snack wisdom.",
      active_date: today,
    };
  }
  return data;
}

/**
 * Initiate Google Authentication sign-in
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    throw error;
  }
  return data;
}

/**
 * Sign out current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
}
