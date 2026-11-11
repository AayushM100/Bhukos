'use client';

import React, { useState } from 'react';
import { FoodCard } from '../components/cards/FoodCard';
import { mockFoodItems } from '../data/mockFoods';
import { Sparkles, Flame, Trophy, Compass, Bookmark, Search, User } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'feed' | 'wishlist' | 'trivia'>('feed');
  const [streak, setStreak] = useState<number>(4);
  const [loggedCount, setLoggedCount] = useState<number>(12);

  const handleLogFood = (rating: number) => {
    setLoggedCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Bhukos
            </span>
            <span className="hidden sm:inline text-xs ml-2 text-slate-400 font-medium">Letterboxd for Foodies</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-2 w-96 focus-within:border-purple-500 transition-colors">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search Indian snacks, beverages, brands..."
            className="bg-transparent text-sm w-full outline-none text-slate-200 placeholder-slate-500"
          />
        </div>

        {/* User Stats / Profile Pill */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-full text-orange-400 font-bold text-xs">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>{streak} Day Streak</span>
          </div>

          <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-full text-purple-300 font-bold text-xs">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span>{loggedCount} Tasted</span>
          </div>

          <button className="h-9 w-9 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-700 transition">
            <User className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-8">
        {/* Hero Section / Daily Spotlight Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-500/20 p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Today's Trivia Drop</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Did you know how Amul Butter got its blue-haired girl?
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Created in 1966 by Sylvester da Cunha, the Amul girl was designed to respond directly to daily national events with witty puns!
            </p>
          </div>
          <button className="z-10 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all">
            Play Food Trivia
          </button>
        </section>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-slate-800 pb-2 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 pb-2 transition-colors border-b-2 ${
              activeTab === 'feed'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            Trending Collectibles
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 pb-2 transition-colors border-b-2 ${
              activeTab === 'wishlist'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            My Food Wishlist
          </button>
        </div>

        {/* Food Cards Grid */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Popular Indian Bites</h3>
              <p className="text-xs text-slate-400">Collect rare cards, log your tastings, and leave your ratings!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {mockFoodItems.map((food) => (
              <FoodCard key={food.id} food={food} onLog={handleLogFood} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
