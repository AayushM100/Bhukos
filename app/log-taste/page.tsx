'use client';

import React, { useEffect, useState } from 'react';
import { Search, Star, Calendar } from 'lucide-react';
import { FoodItem } from '@/types';

export default function LogTastePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<FoodItem | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [consumedDate, setConsumedDate] = useState('');
  const [review, setReview] = useState('');

  // Set current date after component mounts (client-side only)
  useEffect(() => {
    setConsumedDate(new Date().toISOString().split('T')[0]);
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans flex flex-col pb-24 lg:pb-0">
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8 lg:gap-10 pb-20 lg:pb-8">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terra">Letterboxd-Inspired Diary</span>
          <h1 className="text-display text-4xl font-bold">Log a taste</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Product Selection & Poster - design.md §11 (Desktop w-5/12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-[#6B6675]/40" />
              <input
                type="text"
                placeholder="Search for a snack or beverage..."
                className="w-full bg-surface-low border border-ledger-nav rounded-2xl py-4 pl-12 pr-4 text-lg outline-none shadow-sm focus:border-terra transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="aspect-[4/5] bg-surface-low rounded-3xl flex items-center justify-center border-2 border-dashed border-ledger-nav overflow-hidden">
              {selectedProduct ? (
                <img src={selectedProduct.poster_url} alt={selectedProduct.name} className="w-full h-full object-cover rounded-3xl" />
              ) : (
                <p className="text-[#6B6675]/60 font-medium italic">Search and select a product to begin</p>
              )}
            </div>
          </div>

          {/* Right: Logging Controls - design.md §11 (Desktop w-7/12) */}
          <div className="lg:col-span-7 space-y-8 bg-surface-low border border-ledger-nav rounded-[3rem] p-6 lg:p-10 shadow-sm">
            {/* Product Info */}
            {selectedProduct && (
              <div>
                <h2 className="text-display text-3xl font-bold text-ink">{selectedProduct.name}</h2>
                <p className="text-sm text-[#5E544E] font-medium">{selectedProduct.brand}</p>
              </div>
            )}

            {/* Consumed Date - design.md §11 */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-terra" /> Consumed on
              </label>
              <input
                type="date"
                value={consumedDate}
                onChange={(e) => setConsumedDate(e.target.value)}
                className="w-full bg-surface-med border border-ledger-nav rounded-2xl p-4 text-sm font-semibold outline-none focus:border-terra transition-colors"
              />
            </div>

            {/* Rating - design.md §11 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Your Rating</label>
                <span className="text-display font-bold text-2xl text-terra">{rating || '0'} ★</span>
              </div>
              <div className="flex gap-2 text-[#FFC857] items-center bg-surface-med p-4 rounded-2xl border border-ledger-nav justify-between">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="relative w-8 h-8 cursor-pointer">
                    <div className="absolute inset-y-0 left-0 w-1/2 z-20" onMouseEnter={() => setHoverRating(s - 0.5)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s - 0.5)} />
                    <div className="absolute inset-y-0 right-0 w-1/2 z-20" onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)} />
                    <Star className={`w-7 h-7 transition-transform ${
                      (hoverRating || rating) >= s ? 'fill-[#FFC857] text-[#FFC857] scale-105' :
                      (hoverRating || rating) === s - 0.5 ? 'fill-[#FFC857]/50 text-[#FFC857] scale-105' :
                      'text-[#6B6675]/30'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Written Experience - design.md §11 */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">How was it?</label>
              <textarea
                rows={6}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Describe the flavour, texture, aroma and your overall experience..."
                className="w-full bg-surface-med border border-ledger-nav rounded-2xl p-4 text-sm outline-none focus:border-terra resize-none transition-colors leading-relaxed font-medium text-ink"
              />
            </div>

            <button className="w-full bg-terra text-white py-4 rounded-2xl font-bold hover:bg-[#A62B14] transition-all shadow-lg">
              Save Log
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}