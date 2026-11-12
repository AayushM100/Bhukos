'use client';

import React, { useState, useEffect } from 'react';
import { Search, Flame, Bookmark, Compass, Trophy, User, Star, Check, Plus, BookOpen, ArrowRight, LogOut, Award, Sparkles, X } from 'lucide-react';
import { mockFoodItems, mockTrivia } from '../data/mockFoods';
import { FoodItem, FoodLog, Profile } from '../types';
import { FoodCard } from '../components/cards/FoodCard';
import { LogTasteExperience } from '../components/LogTasteExperience';
import { LoginRequiredModal } from '../components/LoginRequiredModal';
import { SubmitProductModal } from '../components/SubmitProductModal';
import { RatingDisplay } from '../components/RatingDisplay';
import { VibrantFoodPoster } from '../components/cards/VibrantFoodPoster';
import {
  getFoodItems,
  getUserProfile,
  calculateStreak,
  getUserLogs,
  logFoodTaste,
  deleteLog,
  getUserWishlistIds,
  toggleWishlist,
  submitNewFood,
  signInWithGoogle,
  signOut
} from '../lib/api';
import { createClient } from '../lib/supabase-browser';

export default function BhukosApp() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'wishlist' | 'binder' | 'log' | 'profile'>('home');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems);
  const [userLogs, setUserLogs] = useState<FoodLog[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [formattedDate, setFormattedDate] = useState<string>('');

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleProtectedAction = (action: () => void) => {
    if (!session?.user) {
      setIsLoginModalOpen(true);
      return;
    }
    action();
  };

  const handleSaveLog = async (data: { foodItemId: string; rating: number; review: string; consumedDate: string }) => {
    if (!session?.user) {
      setIsLoginModalOpen(true);
      return;
    }

    const result = await logFoodTaste({
      userId: session.user.id,
      foodItemId: data.foodItemId,
      rating: data.rating,
      review: data.review,
      consumedAt: new Date(data.consumedDate).toISOString(),
    });

    if (result) {
      setUserLogs([result, ...userLogs]);
      const newStreak = await calculateStreak(session.user.id);
      setStreak(newStreak);
      setActiveTab('binder');
    }
  };

  const handleWishlistToggle = async (foodId: string) => {
    if (!session?.user) {
      setIsLoginModalOpen(true);
      return;
    }
    const isAdded = await toggleWishlist(session.user.id, foodId);
    if (isAdded) {
      setWishlistIds([...wishlistIds, foodId]);
    } else {
      setWishlistIds(wishlistIds.filter((id) => id !== foodId));
    }
  };

  const handleProductSubmission = async (data: Partial<FoodItem>) => {
    if (!session?.user) {
      setIsLoginModalOpen(true);
      return;
    }
    await submitNewFood({
      submitted_by: session.user.id,
      name: data.name || '',
      brand: data.brand || '',
      category: data.category || 'Other Packaged Snacks',
      description: data.description || '',
      image_url: data.poster_url || '',
    });
  };

  const filteredFoodItems = foodItems.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1C18] font-sans selection:bg-[#C04A33] selection:text-white flex flex-col">
      {/* Top Header */}
      <header className="border-b border-black/10 px-8 py-4 flex items-center justify-between sticky top-0 bg-[#FAF6EE]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-12">
          <h1 className="serif-heading text-3xl font-bold tracking-tighter cursor-pointer" onClick={() => setActiveTab('home')}>
            Bhukos
          </h1>
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <button onClick={() => setActiveTab('home')} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'home' ? 'text-[#C04A33] underline underline-offset-8 font-bold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('discover')} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'discover' ? 'text-[#C04A33] underline underline-offset-8 font-bold' : ''}`}>Discover</button>
            <button onClick={() => handleProtectedAction(() => setActiveTab('wishlist'))} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'wishlist' ? 'text-[#C04A33] underline underline-offset-8 font-bold' : ''}`}>Wishlist</button>
            <button onClick={() => handleProtectedAction(() => setActiveTab('binder'))} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'binder' ? 'text-[#C04A33] underline underline-offset-8 font-bold' : ''}`}>My collection</button>
            <button onClick={() => handleProtectedAction(() => setActiveTab('log'))} className={`hover:text-[#C04A33] transition-colors ${activeTab === 'log' ? 'text-[#C04A33] underline underline-offset-8 font-bold' : ''}`}>Log a taste</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-[#FFFDF9] border border-black/10 rounded-full px-4 py-2 w-72 shadow-sm">
            <Search className="w-4 h-4 text-black/40 mr-2" />
            <input
              type="text"
              placeholder="Search pantry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-[#1F1C18] placeholder-black/40 font-medium"
            />
          </div>

          <button
            onClick={() => handleProtectedAction(() => setIsSubmitModalOpen(true))}
            className="bg-[#FFFDF9] border border-black/10 text-[#1F1C18] px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-black/5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#C04A33]" /> Submit a snack
          </button>

          <button
            onClick={() => handleProtectedAction(() => setActiveTab('log'))}
            className="bg-[#C04A33] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#a93e28] shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Log a taste
          </button>

          {session ? (
            <button onClick={() => setActiveTab('profile')} className="w-10 h-10 rounded-full overflow-hidden border-2 border-black/25 hover:scale-105 transition-transform shadow-sm">
              <img src={profile?.avatar_url || session.user.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} alt="Profile" className="w-full h-full object-cover" />
            </button>
          ) : (
            <button onClick={() => setIsLoginModalOpen(true)} className="bg-[#1F1C18] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all shadow-sm">
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

            {/* Product Discovery Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="serif-heading text-3xl font-bold">Featured Pantry</h3>
                  <p className="text-sm opacity-60 mt-1">Browse India's top packaged snacks and beverages.</p>
                </div>
                <span onClick={() => setActiveTab('discover')} className="text-sm font-bold text-[#C04A33] cursor-pointer hover:underline flex items-center gap-1">
                  Explore all <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {filteredFoodItems.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onClick={() => setSelectedFood(food)}
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
            <div>
              <h2 className="serif-heading text-4xl font-bold">Discover Pantry</h2>
              <p className="opacity-80 mt-1">Explore India's packaged delights across all vibrant brands and flavours.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {filteredFoodItems.map((food) => (
                <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
              ))}
            </div>
          </div>
        )}

        {/* LOG A TASTE TAB */}
        {activeTab === 'log' && (
          <LogTasteExperience
            foodItems={foodItems}
            wishlistIds={wishlistIds}
            onSaveLog={handleSaveLog}
            onWishlistToggle={handleWishlistToggle}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div>
              <h2 className="serif-heading text-4xl font-bold">My Wishlist</h2>
              <p className="opacity-80 mt-1">Flavours waiting to be tasted and added to your collection.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {foodItems.filter((f) => wishlistIds.includes(f.id)).length > 0 ? (
                foodItems
                  .filter((f) => wishlistIds.includes(f.id))
                  .map((food) => <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />)
              ) : (
                <div className="col-span-full py-16 text-center space-y-4">
                  <p className="opacity-60 text-base">Your wishlist is empty.</p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="bg-[#C04A33] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:bg-[#a93e28]"
                  >
                    Discover Snacks to Save
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MY COLLECTION TAB */}
        {activeTab === 'binder' && (
          <div className="space-y-6">
            <div>
              <h2 className="serif-heading text-4xl font-bold">My Collection</h2>
              <p className="opacity-80 mt-1">Products you have logged and reviewed in your diary history.</p>
            </div>
            {userLogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {userLogs.map((log) => {
                  const food = foodItems.find((f) => f.id === log.food_item_id);
                  if (!food) return null;
                  return (
                    <div key={log.id} className="flex flex-col gap-2 w-full max-w-[280px]">
                      <FoodCard
                        food={food}
                        onClick={() => setSelectedFood(food)}
                        showUserRating={log.rating}
                        consumedDate={log.created_at}
                      />
                      {log.review && (
                        <div className="bg-[#FFFDF9] border border-black/5 p-3 rounded-2xl text-xs italic text-black/70 line-clamp-2">
                          "{log.review}"
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="col-span-full py-16 text-center space-y-4">
                <p className="opacity-60 text-base">You haven't logged any tastes yet.</p>
                <button
                  onClick={() => setActiveTab('log')}
                  className="bg-[#C04A33] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:bg-[#a93e28]"
                >
                  Log Your First Taste
                </button>
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-8 max-w-3xl mx-auto w-full">
            <div className="bg-[#FFFDF9] border border-black/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 shadow-sm relative">
              <img src={profile?.avatar_url || session?.user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"} alt="User" className="w-28 h-28 rounded-full object-cover border-4 border-[#C04A33]" />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="serif-heading text-4xl font-bold">{profile?.full_name || session?.user?.user_metadata?.full_name || 'Foodie Explorer'}</h2>
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-600" /> Contributor
                  </span>
                </div>
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
            <div className="bg-[#FAF6EE] border border-black/10 rounded-[3rem] max-w-4xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedFood(null)} className="absolute top-6 right-6 font-bold text-lg w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">×</button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: Poster View */}
                <div className="flex justify-center">
                  <div className="relative aspect-[3/4] w-full max-w-[300px] rounded-[2rem] overflow-hidden shadow-xl border border-black/10">
                    <VibrantFoodPoster foodId={selectedFood.id} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Right: Details & Community Rating */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C04A33]">{selectedFood.category}</span>
                    <h2 className="serif-heading text-4xl font-bold mt-1">{selectedFood.name}</h2>
                    <p className="text-xs font-bold text-black/50 uppercase tracking-wider mt-1">{selectedFood.brand}</p>
                    <p className="text-sm opacity-80 mt-4 leading-relaxed">{selectedFood.description}</p>

                    {/* Community Rating (Centralized RatingDisplay) */}
                    <div className="flex items-center gap-4 mt-6 bg-[#FFFDF9] p-4 rounded-2xl border border-black/10">
                      <RatingDisplay rating={9} isDbScale={true} size="lg" />
                      <span className="text-xs opacity-60">Community average score</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4 border-t border-black/10">
                    <button
                      onClick={() => handleProtectedAction(() => {
                        setSelectedFood(null);
                        setActiveTab('log');
                      })}
                      className="flex-1 bg-[#C04A33] text-white py-3.5 rounded-2xl font-bold hover:bg-[#a93e28] transition-colors shadow-md text-sm"
                    >
                      + Log a taste
                    </button>
                    <button
                      onClick={() => handleProtectedAction(() => handleWishlistToggle(selectedFood.id))}
                      className={`px-6 py-3.5 rounded-2xl border font-bold text-sm transition-colors ${
                        wishlistIds.includes(selectedFood.id)
                          ? 'bg-amber-400 text-black border-transparent'
                          : 'border-black/20 hover:bg-black/5'
                      }`}
                    >
                      {wishlistIds.includes(selectedFood.id) ? 'Wishlisted ✓' : '+ Wishlist'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBMIT PRODUCT MODAL */}
        {isSubmitModalOpen && (
          <SubmitProductModal
            onClose={() => setIsSubmitModalOpen(false)}
            onSubmit={handleProductSubmission}
          />
        )}

        {/* LOGIN REQUIRED MODAL */}
        {isLoginModalOpen && (
          <LoginRequiredModal
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}

      </main>
    </div>
  );
}
