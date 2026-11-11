'use client';

import React, { useState, useEffect } from 'react';
import { Search, Flame, Bookmark, Compass, Trophy, User, Star, Check, Plus, BookOpen, ArrowRight, LogOut } from 'lucide-react';
import { mockFoodItems, mockTrivia } from '../data/mockFoods';
import { FoodItem, FoodLog, Profile } from '../types';
import { FoodCard } from '../components/cards/FoodCard';
import {
  getFoodItems,
  getUserProfile,
  calculateStreak,
  getUserLogs,
  logFoodTaste,
  deleteLog,
  getUserWishlistIds,
  toggleWishlist,
  signInWithGoogle,
  signOut
} from '../lib/api';
import { createClient } from '../lib/supabase-browser';

export default function BhukosApp() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'wishlist' | 'binder' | 'profile'>('home');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems);
  const [userLogs, setUserLogs] = useState<FoodLog[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [formattedDate, setFormattedDate] = useState<string>('');

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logModalFoodId, setLogModalFoodId] = useState<string>('');
  const [logRating, setLogRating] = useState<number>(5);
  const [logReview, setLogReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    setFormattedDate(new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }));

    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setSession(session);
      if (session?.user) {
        loadUserData(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setSession(session);
      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        setProfile(null);
        setUserLogs([]);
        setWishlistIds([]);
        setStreak(0);
      }
    });

    // Load pantry items
    getFoodItems().then((items) => {
      if (items.length > 0) setFoodItems(items);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId: string) => {
    const prof = await getUserProfile(userId);
    setProfile(prof);

    const logs = await getUserLogs(userId);
    setUserLogs(logs);

    const calculatedStreak = await calculateStreak(userId);
    setStreak(calculatedStreak);

    const wIds = await getUserWishlistIds(userId);
    setWishlistIds(wIds);
  };

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      signInWithGoogle();
      return;
    }
    if (!logModalFoodId) return;

    setIsSubmitting(true);
    const result = await logFoodTaste({
      userId: session.user.id,
      foodItemId: logModalFoodId,
      rating: logRating,
      review: logReview,
    });

    if (result) {
      setUserLogs([result, ...userLogs]);
      const newStreak = await calculateStreak(session.user.id);
      setStreak(newStreak);
      setIsLogModalOpen(false);
      setLogReview('');
    }
    setIsSubmitting(false);
  };

  const handleWishlistToggle = async (foodId: string) => {
    if (!session?.user) {
      signInWithGoogle();
      return;
    }
    const isAdded = await toggleWishlist(session.user.id, foodId);
    if (isAdded) {
      setWishlistIds([...wishlistIds, foodId]);
    } else {
      setWishlistIds(wishlistIds.filter((id) => id !== foodId));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1C18] font-sans selection:bg-[#C04A33] selection:text-white flex flex-col">
      {/* Top Header */}
      <header className="border-b border-black/10 px-8 py-4 flex items-center justify-between sticky top-0 bg-[#FAF6EE]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-12">
          <h1 className="serif-heading text-3xl font-bold tracking-tighter cursor-pointer" onClick={() => setActiveTab('home')}>
            Bhukos
          </h1>
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <button onClick={() => setActiveTab('home')} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'home' ? 'text-[#C04A33] underline underline-offset-8' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('discover')} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'discover' ? 'text-[#C04A33] underline underline-offset-8' : ''}`}>Discover</button>
            <button onClick={() => setActiveTab('wishlist')} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'wishlist' ? 'text-[#C04A33] underline underline-offset-8' : ''}`}>Wishlist</button>
            <button onClick={() => setActiveTab('binder')} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'binder' ? 'text-[#C04A33] underline underline-offset-8' : ''}`}>My binder</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-[#FFFDF9] border border-black/10 rounded-full px-4 py-2 w-72 shadow-sm">
            <Search className="w-4 h-4 text-black/40 mr-2" />
            <input type="text" placeholder="Search the pantry" className="bg-transparent text-sm w-full outline-none text-[#1F1C18] placeholder-black/40" />
          </div>

          <button onClick={() => { setLogModalFoodId(foodItems[0]?.id || ''); setIsLogModalOpen(true); }} className="bg-[#C04A33] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#a93e28] shadow-md transition-all">
            <Plus className="w-4 h-4" /> Log a taste
          </button>

          {session ? (
            <button onClick={() => setActiveTab('profile')} className="w-10 h-10 rounded-full overflow-hidden border-2 border-black/25 hover:scale-105 transition-transform shadow-sm">
              <img src={profile?.avatar_url || session.user.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} alt="Profile" className="w-full h-full object-cover" />
            </button>
          ) : (
            <button onClick={() => signInWithGoogle()} className="bg-[#1F1C18] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all">
              Sign in
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 flex flex-col gap-10">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            {/* Greeting & Streak Header */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C04A33]">
                {formattedDate || 'Today'} / Your Daily Flavour
              </span>
              <h2 className="serif-heading text-5xl font-bold tracking-tight">
                Good afternoon, {profile?.full_name?.split(' ')[0] || session?.user?.user_metadata?.full_name?.split(' ')[0] || 'Foodie'}.
              </h2>
              <p className="text-lg opacity-80">
                Something familiar. Something you haven’t tried. Something worth a card.
              </p>

              {/* Streak Badge */}
              <div className="inline-flex items-center gap-4 bg-[#FFFDF9] border border-black/10 px-6 py-3 rounded-2xl shadow-sm">
                <div className="bg-[#C04A33] text-white font-bold text-lg px-3.5 py-1 rounded-xl">
                  {streak}
                </div>
                <div>
                  <div className="font-bold text-sm tracking-wide">DAY TASTE STREAK</div>
                  <div className="text-xs opacity-70">Keep the streak. Try a new flavour today →</div>
                </div>
              </div>
            </div>

            {/* Recently Tasted Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="serif-heading text-3xl font-bold">Recently tasted</h3>
                <span onClick={() => setActiveTab('binder')} className="text-sm font-bold text-[#C04A33] cursor-pointer hover:underline flex items-center gap-1">
                  Your diary <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {foodItems.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onClick={() => setSelectedFood(food)}
                    onWishlist={() => handleWishlistToggle(food.id)}
                    onLog={async (rating) => {
                      if (!session?.user) {
                        signInWithGoogle();
                        return;
                      }
                      await logFoodTaste({ userId: session.user.id, foodItemId: food.id, rating });
                      const updatedLogs = await getUserLogs(session.user.id);
                      setUserLogs(updatedLogs);
                      const newStreak = await calculateStreak(session.user.id);
                      setStreak(newStreak);
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Food Trivia Box */}
            <section className="bg-[#FFFDF9] border border-black/10 rounded-3xl p-8 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C04A33]">A Little Food Lore</span>
              <p className="serif-heading text-2xl italic">"{mockTrivia.fact}"</p>
              <p className="text-xs opacity-70">{mockTrivia.source}</p>
            </section>
          </>
        )}

        {/* DISCOVER TAB */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <h2 className="serif-heading text-4xl font-bold">Discover Pantry</h2>
            <p className="opacity-80">Explore India's packaged delights across all vibrant brands and flavours.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {foodItems.map((food) => (
                <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} onWishlist={() => handleWishlistToggle(food.id)} />
              ))}
            </div>
          </div>
        )}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="serif-heading text-4xl font-bold">My Wishlist</h2>
            <p className="opacity-80">Flavours waiting to be tasted and added to your collection.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {foodItems.filter((f) => wishlistIds.includes(f.id)).length > 0 ? (
                foodItems
                  .filter((f) => wishlistIds.includes(f.id))
                  .map((food) => <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} onWishlist={() => handleWishlistToggle(food.id)} />)
              ) : (
                <p className="opacity-60 col-span-full py-12 text-center">Your wishlist is empty. Bookmark cards to see them here.</p>
              )}
            </div>
          </div>
        )}

        {/* MY BINDER TAB */}
        {activeTab === 'binder' && (
          <div className="space-y-6">
            <h2 className="serif-heading text-4xl font-bold">My Binder & Diary</h2>
            <p className="opacity-80">All items you have tasted and recorded.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {foodItems
                .filter((f) => userLogs.some((l) => l.food_item_id === f.id))
                .map((food) => (
                  <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} onWishlist={() => handleWishlistToggle(food.id)} />
                ))}
              {userLogs.length === 0 && (
                <p className="opacity-60 col-span-full py-12 text-center">You haven't logged any tastes yet. Click "Log a taste" to start your diary!</p>
              )}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-8 max-w-3xl mx-auto w-full">
            <div className="bg-[#FFFDF9] border border-black/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 shadow-sm">
              <img src={profile?.avatar_url || session?.user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"} alt="User" className="w-28 h-28 rounded-full object-cover border-4 border-[#C04A33]" />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h2 className="serif-heading text-4xl font-bold">{profile?.full_name || session?.user?.user_metadata?.full_name || 'Foodie Explorer'}</h2>
                <p className="text-sm opacity-70">@{profile?.username || session?.user?.email?.split('@')[0] || 'foodie'} • India</p>
                <div className="flex gap-6 pt-2 font-semibold text-sm justify-center sm:justify-start">
                  <div><span className="font-bold text-lg">{userLogs.length}</span> Tasted</div>
                  <div><span className="font-bold text-lg">{streak}</span> Streak</div>
                  <div><span className="font-bold text-lg">{Array.from(new Set(userLogs.map(l => l.food_item_id))).length}</span> Cards</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="serif-heading text-2xl font-bold">Account Settings</h3>
              <button onClick={() => signOut()} className="bg-red-500/10 text-red-600 px-5 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-red-500/20 transition-colors">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        )}

        {/* FOOD DETAIL MODAL */}
        {selectedFood && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#FAF6EE] border border-black/10 rounded-3xl max-w-4xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedFood(null)} className="absolute top-6 right-6 font-bold text-lg w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20">×</button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: Card View */}
                <div className="flex justify-center">
                  <FoodCard food={selectedFood} onWishlist={() => handleWishlistToggle(selectedFood.id)} />
                </div>

                {/* Right: Details & Rating */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C04A33]">{selectedFood.category}</span>
                    <h2 className="serif-heading text-4xl font-bold mt-1">{selectedFood.name}</h2>
                    <p className="text-sm opacity-80 mt-2 leading-relaxed">{selectedFood.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-4 mt-6">
                      <span className="text-3xl font-bold serif-heading">4.5</span>
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-5 h-5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs opacity-60">Community tasting records</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4 border-t border-black/10">
                    <button onClick={() => { setLogModalFoodId(selectedFood.id); setIsLogModalOpen(true); setSelectedFood(null); }} className="flex-1 bg-[#C04A33] text-white py-3 rounded-2xl font-bold hover:bg-[#a93e28] transition-colors shadow-md">
                      + Log this taste
                    </button>
                    <button onClick={() => handleWishlistToggle(selectedFood.id)} className="px-6 py-3 rounded-2xl border border-black/20 font-bold hover:bg-black/5 transition-colors">
                      {wishlistIds.includes(selectedFood.id) ? 'Wishlisted ✓' : '+ Wishlist'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOG A TASTE MODAL */}
        {isLogModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#FAF6EE] border border-black/10 rounded-3xl max-w-md w-full p-8 shadow-2xl relative space-y-6">
              <button onClick={() => setIsLogModalOpen(false)} className="absolute top-6 right-6 font-bold text-lg w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">×</button>
              <h3 className="serif-heading text-3xl font-bold">Log a taste</h3>
              <form onSubmit={handleLogSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">Select food or drink</label>
                  <select
                    value={logModalFoodId}
                    onChange={(e) => setLogModalFoodId(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-black/20 rounded-2xl p-3 text-sm outline-none font-medium"
                  >
                    {foodItems.map((f) => (
                      <option key={f.id} value={f.id}>{f.name} ({f.brand})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">Your Rating (1-5)</label>
                  <div className="flex gap-2 text-amber-500 items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        onClick={() => setLogRating(s)}
                        className={`w-8 h-8 cursor-pointer hover:scale-110 transition-transform ${logRating >= s ? 'fill-amber-400 text-amber-400' : 'text-black/20'}`}
                      />
                    ))}
                    <span className="ml-2 font-bold text-lg">{logRating}.0</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">Tasting Note / Review</label>
                  <textarea
                    rows={3}
                    value={logReview}
                    onChange={(e) => setLogReview(e.target.value)}
                    placeholder="What did it taste like? Any memories?"
                    className="w-full bg-[#FFFDF9] border border-black/20 rounded-2xl p-3 text-sm outline-none resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C04A33] text-white py-3.5 rounded-2xl font-bold hover:bg-[#a93e28] shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : session ? 'Save to Diary' : 'Sign in with Google to Log'}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
