import { createClient } from './supabase-browser';
import { FoodItem, FoodLog, Wishlist, Trivia, Profile, ProductSubmission } from '../types';
import { mockFoodItems } from '../data/mockFoods';

/**
 * Fetch all food items (combines Supabase + fallback mock items)
 */
export async function getFoodItems(): Promise<FoodItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('food_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return mockFoodItems;
  }
  return data as FoodItem[];
}

/**
 * Fetch user profile
 */
export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  return data as Profile;
}

/**
 * Calculate user's active streak based on local calendar dates
 */
export async function calculateStreak(userId: string): Promise<number> {
  const supabase = createClient();
  const { data: logs, error } = await supabase
    .from('logs')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error || !logs || logs.length === 0) return 0;

  // Extract unique local dates (YYYY-MM-DD)
  const uniqueDates = Array.from(
    new Set(
      logs.map((log: { created_at: string }) => {
        const d = new Date(log.created_at);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
          d.getDate()
        ).padStart(2, '0')}`;
      })
    )
  ).sort().reverse();

  if (uniqueDates.length === 0) return 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // If most recent log wasn't today or yesterday, streak is reset to 0
  if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
    return 0;
  }

  let streak = 0;
  let currentDate = new Date(uniqueDates[0] as string);

  for (let i = 0; i < uniqueDates.length; i++) {
    const logDate = new Date(uniqueDates[i] as string);
    const diffTime = Math.abs(currentDate.getTime() - logDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (i === 0 || diffDays === 1) {
      streak++;
      currentDate = logDate;
    } else if (diffDays === 0) {
      continue;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Fetch all logs for a user
 */
export async function getUserLogs(userId: string): Promise<FoodLog[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user logs:', error);
    return [];
  }
  return (data || []) as FoodLog[];
}

/**
 * Log or Edit a food tasting
 */
export async function logFoodTaste(params: {
  userId: string;
  foodItemId: string;
  rating: number; // 0.5 - 5.0
  review?: string;
  consumedAt?: string;
  existingLogId?: string;
}): Promise<FoodLog | null> {
  const supabase = createClient();
  const ratingScale = Math.round(params.rating * 2); // 0.5->1, 5.0->10

  if (params.existingLogId) {
    const { data, error } = await supabase
      .from('logs')
      .update({
        rating: ratingScale,
        review: params.review,
        created_at: params.consumedAt || undefined,
      })
      .eq('id', params.existingLogId)
      .eq('user_id', params.userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating log:', error);
      return null;
    }
    return data as FoodLog;
  }

  const { data, error } = await supabase
    .from('logs')
    .insert([
      {
        user_id: params.userId,
        food_item_id: params.foodItemId,
        rating: ratingScale,
        review: params.review,
        created_at: params.consumedAt || new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error inserting log:', error);
    return null;
  }
  return data as FoodLog;
}

/**
 * Delete a log
 */
export async function deleteLog(userId: string, logId: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('logs')
    .delete()
    .eq('id', logId)
    .eq('user_id', userId);

  return !error;
}

/**
 * Fetch Wishlist food IDs for a user
 */
export async function getUserWishlistIds(userId: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('wishlist')
    .select('food_item_id')
    .eq('user_id', userId);

  if (error || !data) return [];
  return data.map((item: { food_item_id: string }) => item.food_item_id);
}

/**
 * Toggle Wishlist item safely
 */
export async function toggleWishlist(userId: string, foodItemId: string): Promise<boolean> {
  const supabase = createClient();
  const { data: existing } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', userId)
    .eq('food_item_id', foodItemId)
    .single();

  if (existing) {
    await supabase.from('wishlist').delete().eq('id', existing.id);
    return false;
  } else {
    await supabase.from('wishlist').insert([{ user_id: userId, food_item_id: foodItemId }]);
    return true;
  }
}

/**
 * Submit a new food item
 */
export async function submitNewFood(submission: Omit<ProductSubmission, 'id' | 'status' | 'created_at'>): Promise<ProductSubmission | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('product_submissions')
    .insert([submission])
    .select()
    .single();

  if (error) {
    console.error('Error submitting product:', error);
    return null;
  }
  return data as ProductSubmission;
}

/**
 * Initiate Google Sign-in
 */
export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Google Auth Error:', error.message);
    throw error;
  }
  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Sign out error:', error.message);
}
