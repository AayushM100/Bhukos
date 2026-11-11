'use client';

import React, { useState } from 'react';
import { Search, Flame, Bookmark, Compass, Trophy, User, Star, Check, Plus, BookOpen, ArrowRight } from 'lucide-react';
import { mockFoodItems, mockTrivia } from '../data/mockFoods';
import { FoodItem } from '../types';
import { FoodCard } from '../components/cards/FoodCard';
import { VibrantFoodPoster } from '../components/cards/VibrantFoodPoster';

export default function BhukosApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'wishlist' | 'binder' | 'profile'>('home');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [streak, setStreak] = useState(7);
  const [tastedCount, setTastedCount] = useState(24);

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

          <button onClick={() => setIsLogModalOpen(true)} className="bg-[#C04A33] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#a93e28] shadow-md transition-all">
            <Plus className="w-4 h-4" /> Log a taste
          </button>

          <button onClick={() => setActiveTab('profile')} className="w-10 h-10 rounded-full overflow-hidden border-2 border-black/25 hover:scale-105 transition-transform shadow-sm">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
          </button>
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
                Monday, 09 November / Your Daily Flavour
              </span>
              <h2 className="serif-heading text-5xl font-bold tracking-tight">
                Good afternoon, Aditi.
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {mockFoodItems.map((food) => (
                  <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {mockFoodItems.map((food) => (
                <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
              ))}
            </div>
          </div>
        )}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="serif-heading text-4xl font-bold">My Wishlist</h2>
            <p className="opacity-80">Flavours waiting to be tasted and added to your collection.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {mockFoodItems.slice(1, 4).map((food) => (
                <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
              ))}
            </div>
          </div>
        )}

        {/* MY BINDER TAB */}
        {activeTab === 'binder' && (
          <div className="space-y-6">
            <h2 className="serif-heading text-4xl font-bold">My Binder & Cards</h2>
            <p className="opacity-80">Your collected food cards, rarity badges, and achievements.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {mockFoodItems.map((food) => (
                <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div className="bg-[#FFFDF9] border border-black/10 rounded-3xl p-8 flex items-center gap-8 shadow-sm">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" alt="Aditi" className="w-28 h-28 rounded-full object-cover border-4 border-[#C04A33]" />
              <div className="space-y-2">
                <h2 className="serif-heading text-4xl font-bold">Aditi Sharma</h2>
                <p className="text-sm opacity-70">Foodie & Collector • Delhi NCR</p>
                <div className="flex gap-6 pt-2 font-semibold text-sm">
                  <div><span className="font-bold text-lg">{tastedCount}</span> Tasted</div>
                  <div><span className="font-bold text-lg">{streak}</span> Streak</div>
                  <div><span className="font-bold text-lg">14</span> Binder Cards</div>
                </div>
              </div>
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
                  <FoodCard food={selectedFood} />
                </div>

                {/* Right: Details & Rating */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C04A33]">{selectedFood.category}</span>
                    <h2 className="serif-heading text-4xl font-bold mt-1">{selectedFood.name}</h2>
                    <p className="text-sm opacity-80 mt-2 leading-relaxed">{selectedFood.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-4 mt-6">
                      <span className="text-3xl font-bold serif-heading">4.2</span>
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-5 h-5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs opacity-60">1,284 taste records</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4 border-t border-black/10">
                    <button onClick={() => setIsLogModalOpen(true)} className="flex-1 bg-[#C04A33] text-white py-3 rounded-2xl font-bold hover:bg-[#a93e28] transition-colors shadow-md">
                      + Log this taste
                    </button>
                    <button className="px-6 py-3 rounded-2xl border border-black/20 font-bold hover:bg-black/5 transition-colors">
                      + Wishlist
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
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">Select food or drink</label>
                  <select className="w-full bg-[#FFFDF9] border border-black/20 rounded-2xl p-3 text-sm outline-none">
                    {mockFoodItems.map((f) => (
                      <option key={f.id} value={f.id}>{f.name} ({f.brand})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">Your Rating</label>
                  <div className="flex gap-2 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">Tasting Note / Review</label>
                  <textarea rows={3} placeholder="What did it taste like? Any memories?" className="w-full bg-[#FFFDF9] border border-black/20 rounded-2xl p-3 text-sm outline-none resize-none"></textarea>
                </div>
                <button onClick={() => { setIsLogModalOpen(false); setTastedCount(tastedCount + 1); }} className="w-full bg-[#C04A33] text-white py-3.5 rounded-2xl font-bold hover:bg-[#a93e28] shadow-lg transition-all">
                  Save to Diary
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
