"use client";

import React, { useState, useEffect } from 'react';
import { Flame, Bookmark, Grid, LogOut, Plus, Star, Award } from 'lucide-react';
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
  signOut,
} from '../lib/api';
import { createClient } from '../lib/supabase-browser';
import { DesktopNav, MobileHeader, BottomNav, MobileMenu } from '../components/ui/Navigation';
import { PageTitle, SectionTitle, Body, Meta, DateDisplay } from '../components/ui/Typography';

export default function BhukosApp() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'wishlist' | 'binder' | 'log' | 'profile'>('home');
  const handleTabChange = (tab: string) => setActiveTab(tab as typeof activeTab);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems);
  const [userLogs, setUserLogs] = useState<FoodLog[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [formattedDate, setFormattedDate] = useState<string>('');

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    // Set formatted date after mount (client-side only)
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
    <div className="min-h-screen bg-canvas text-ink font-sans flex flex-col pb-24 lg:pb-0">
      {/* Mobile Header */}
      <MobileHeader
        onMenuOpen={() => setIsMobileMenuOpen(true)}
        level={typeof profile?.streak_count === 'number' ? profile.streak_count % 100 : 1}
        avatarUrl={profile?.avatar_url || session?.user?.user_metadata?.avatar_url}
        onProfileClick={() => {
          if (session?.user) setActiveTab('profile');
          setIsMobileMenuOpen(false);
        }}
      />

      {/* Desktop Header */}
      <DesktopNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        level={typeof profile?.streak_count === 'number' ? profile.streak_count % 100 : 1}
        avatarUrl={profile?.avatar_url || session?.user?.user_metadata?.avatar_url}
        onProfileClick={() => {
          if (session?.user) setActiveTab('profile');
        }}
        onLogTaste={() => {
          if (session?.user) setActiveTab('log');
          else setIsLoginModalOpen(true);
        }}
        onAddProduct={() => handleProtectedAction(() => setIsSubmitModalOpen(true))}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={() => signOut()}
        onLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Bottom Nav for mobile */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogTaste={() => {
          if (session?.user) setActiveTab('log');
          else setIsLoginModalOpen(true);
        }}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={() => signOut()}
        onLogin={() => setIsLoginModalOpen(true)}
        level={typeof profile?.streak_count === 'number' ? profile.streak_count % 100 : 1}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8 lg:gap-10 pb-20 lg:pb-8">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            {/* Greeting & Streak Header */}
            <div className="space-y-4">
              <span className="text-meta text-terra font-bold uppercase tracking-[0.2em]">
                {formattedDate || 'Today'} / Your Daily Flavour
              </span>
              <PageTitle className="text-display-hero font-display-bold">
                Good afternoon, {profile?.full_name?.split(' ')[0] || session?.user?.user_metadata?.full_name?.split(' ')[0] || 'Foodie'}.
              </PageTitle>
              <Body className="text-base text-[#5E544E]">
                Something familiar. Something you haven't tried. Something worth a card.
              </Body>

              {/* Streak Badge - design.md §11 */}
              <div className="inline-flex items-center gap-4 bg-white border border-[#DED7E4] px-6 py-3 rounded-2xl shadow-sm">
                <div className="bg-gradient-to-r from-[#FF6B35] to-[#EF476F] text-white font-bold text-lg px-3.5 py-1 rounded-xl">
                  {streak}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#24212A]">DAY TASTE STREAK</div>
                  <div className="text-xs text-[#5E544E]">Keep the streak. Try a new flavour today →</div>
                </div>
              </div>
            </div>

            {/* Product Discovery Section - design.md §10.A */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <SectionTitle className="text-heading-1">Featured Pantry</SectionTitle>
                  <Body className="text-sm text-[#5E544E] mt-1">Browse India's top packaged snacks and beverages.</Body>
                </div>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="text-sm font-bold text-terra hover:underline flex items-center gap-1"
                >
                  Explore all
                </button>
              </div>

              {/* Card Grid - design.md §3 responsive: lg=4 cols, md=2 cols, sm=1 col or carousel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 justify-items-center">
                {filteredFoodItems.slice(0, 8).map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onClick={() => setSelectedFood(food)}
                  />
                ))}
              </div>
            </section>

            {/* Food Trivia Box - design.md §5.F */}
            <section className="bg-white border border-[#DED7E4] rounded-3xl p-6 md:p-8 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terra">A Little Food Lore</span>
              <p className="text-display text-2xl italic text-[#24212A]">"{mockTrivia.fact}"</p>
              <p className="text-xs text-[#5E544E]">{mockTrivia.source}</p>
            </section>
          </>
        )}

        {/* DISCOVER TAB */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div>
              <PageTitle>Discover Pantry</PageTitle>
              <Body className="text-opacity-80 mt-1">Explore India's packaged delights across all vibrant brands and flavours.</Body>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 justify-items-center">
              {filteredFoodItems.map((food) => (
                <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
              ))}
            </div>
          </div>
        )}

        {/* LOG A TASTE TAB - design.md §11 */}
        {activeTab === 'log' && (
          <LogTasteExperience
            foodItems={foodItems}
            wishlistIds={wishlistIds}
            onSaveLog={handleSaveLog}
            onWishlistToggle={handleWishlistToggle}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {/* WISHLIST TAB - design.md §14 */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div>
              <PageTitle>My Wishlist</PageTitle>
              <Body className="text-opacity-80 mt-1">Flavours waiting to be tasted and added to your collection.</Body>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 justify-items-center">
              {foodItems.filter((f) => wishlistIds.includes(f.id)).length > 0 ? (
                foodItems
                  .filter((f) => wishlistIds.includes(f.id))
                  .map((food) => (
                    <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
                  ))
              ) : (
                <div className="col-span-full py-16 text-center space-y-4">
                  <p className="text-base text-opacity-60">Your wishlist is empty.</p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="bg-terra text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-md hover:bg-[#A62B14] transition-all"
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
              <PageTitle>My Collection</PageTitle>
              <Body className="text-opacity-80 mt-1">Products you have logged and reviewed in your diary history.</Body>
            </div>
            {userLogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 justify-items-center">
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
                        <div className="bg-white border border-[#F0EAE1] p-3 rounded-2xl text-xs italic text-[#5E544E]/70 line-clamp-2">
                          "{log.review}"
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="col-span-full py-16 text-center space-y-4">
                <p className="text-base text-opacity-60">You haven't logged any tastes yet.</p>
                <button
                  onClick={() => setActiveTab('log')}
                  className="bg-terra text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-md hover:bg-[#A62B14] transition-all"
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
            <div className="bg-white border border-[#DED7E4] rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 shadow-sm">
              <img
                src={profile?.avatar_url || session?.user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                alt="User"
                className="w-20 h-20 rounded-full object-cover border-4 border-terra"
              />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <PageTitle className="text-ink text-2xl mb-0">{profile?.full_name || session?.user?.user_metadata?.full_name || 'Foodie Explorer'}</PageTitle>
                  <span className="bg-amber text-ink border border-amber text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber" />
                    Contributor
                  </span>
                </div>
                <Body className="text-sm text-opacity-70">@{profile?.username || session?.user?.email?.split('@')[0] || 'foodie'} • India</Body>
                <div className="flex gap-6 pt-2 font-semibold text-sm justify-center sm:justify-start">
                  <div><span className="font-bold text-lg">{userLogs.length}</span> Tasted</div>
                  <div><span className="font-bold text-lg">{streak}</span> Streak</div>
                  <div><span className="font-bold text-lg">{Array.from(new Set(userLogs.map(l => l.food_item_id))).length}</span> Cards</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <SectionTitle>Account Settings</SectionTitle>
              <button
                onClick={() => signOut()}
                className="bg-[#EF476F]/15 text-[#EF476F] px-5 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-[#EF476F]/25 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        )}

        {/* FOOD DETAIL MODAL - design.md §11 */}
        {selectedFood && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
            <div className="bg-canvas border border-ledger-nav rounded-[3rem] max-w-4xl w-full p-6 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedFood(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                ×
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left: Poster View */}
                <div className="flex justify-center">
                  <div className="relative aspect-[3/4] w-full max-w-[300px] rounded-[2rem] overflow-hidden shadow-xl border border-ledger-nav">
                    <VibrantFoodPoster foodId={selectedFood.id} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Right: Details & Community Rating */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div>
                    <Meta className="text-terra uppercase text-xs tracking-wider">{selectedFood.category}</Meta>
                    <PageTitle className="text-display text-4xl font-bold mt-1">{selectedFood.name}</PageTitle>
                    <Body className="text-sm font-bold text-[#5E544E] uppercase tracking-wider mt-1">{selectedFood.brand}</Body>
                    <Body className="text-sm text-opacity-80 mt-4 leading-relaxed">{selectedFood.description}</Body>

                    {/* Community Rating (Centralized RatingDisplay) */}
                    <div className="flex items-center gap-4 mt-6 bg-white p-4 rounded-2xl border border-[#DED7E4]">
                      <RatingDisplay rating={9} isDbScale={true} size="lg" />
                      <span className="text-xs text-opacity-60">Community average score</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4 border-t border-ledger-nav">
                    <button
                      onClick={() => {
                        handleProtectedAction(() => {
                          setSelectedFood(null);
                          setActiveTab('log');
                        });
                      }}
                      className="flex-1 bg-terra text-white py-3.5 rounded-2xl font-bold hover:bg-[#A62B14] transition-colors shadow-md text-sm"
                    >
                      + Log a taste
                    </button>
                    <button
                      onClick={() => handleProtectedAction(() => handleWishlistToggle(selectedFood.id))}
                      className={`px-6 py-3.5 rounded-2xl border font-bold text-sm transition-all flex items-center gap-2 ${
                        wishlistIds.includes(selectedFood.id)
                          ? 'bg-amber text-ink border-transparent shadow-md'
                          : 'bg-white border-ledger-nav hover:bg-[var(--canvas-med)]'
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