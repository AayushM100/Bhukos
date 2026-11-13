"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, Bookmark, Check, X, Search, ChevronDown } from 'lucide-react';
import { FoodItem } from '@/types';
import { VibrantFoodPoster } from '@/components/cards/VibrantFoodPoster';
import { RARITY_BADGE_STYLES, RARITY_STYLES } from '@/lib/rarity';

interface LogTasteExperienceProps {
  foodItems: FoodItem[];
  wishlistIds: string[];
  onSaveLog: (data: { foodItemId: string; rating: number; review: string; consumedDate: string }) => Promise<void>;
  onWishlistToggle: (foodId: string) => void;
  onCancel?: () => void;
}

// design.md §11 — Letterboxd-Inspired "Log a Taste" Experience
export const LogTasteExperience: React.FC<LogTasteExperienceProps> = ({
  foodItems,
  wishlistIds,
  onSaveLog,
  onWishlistToggle,
  onCancel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(foodItems[0] || null);
  const [rating, setRating] = useState<number>(4.0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [consumedDate, setConsumedDate] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Set current date after component mounts (client-side only)
  useEffect(() => {
    setConsumedDate(new Date().toISOString().split('T')[0]);
  }, []);

  const filteredFoods = foodItems.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isWishlisted = selectedFood ? wishlistIds.includes(selectedFood.id) : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFood) return;

    setIsSubmitting(true);
    await onSaveLog({
      foodItemId: selectedFood.id,
      rating,
      review,
      consumedDate,
    });
    setIsSubmitting(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-300">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terra">Letterboxd-Inspired Diary</span>
          <h2 className="text-display text-4xl font-bold mt-1">Log a taste experience</h2>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Poster & Dynamic Search - design.md §11 (Desktop w-5/12) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Dynamic Product Selector */}
          <div className="relative dropdown-container">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2 block">Select Product</label>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-ledger-nav rounded-2xl p-4 text-sm font-semibold flex items-center justify-between cursor-pointer shadow-sm hover:border-terra/40 transition-all"
            >
              <span className="truncate">{selectedFood ? `${selectedFood.name} (${selectedFood.brand})` : 'Search pantry...'}</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-ledger-nav rounded-2xl shadow-xl z-30 overflow-hidden max-h-80 flex flex-col">
                <div className="p-3 border-b border-ledger-nav-soft">
                  <div className="flex items-center bg-surface-med rounded-xl px-3 py-2 border border-ledger-nav-soft">
                    <Search className="w-4 h-4 text-[#5E544E]/60 mr-2" />
                    <input
                      type="text"
                      placeholder="Type product or brand..."
                      className="bg-transparent text-xs w-full outline-none font-medium text-ink"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="overflow-y-auto flex-1">
                  {filteredFoods.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => {
                        setSelectedFood(f);
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-surface-med cursor-pointer flex items-center gap-3 border-b border-ledger-nav-soft last:border-0"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-black/5">
                        <VibrantFoodPoster foodId={f.id} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-ink truncate">{f.name}</div>
                        <div className="text-[10px] opacity-60 uppercase">{f.brand} • {f.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Product Poster - design.md §11.A dark gradient background plate */}
          {selectedFood && (
            <div className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-ledger-nav bg-ink">
              <VibrantFoodPoster foodId={selectedFood.id} className="w-full h-full object-cover" />

              {/* Rarity Badge in top right corner - design.md §11.A */}
              <div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-terra shadow-md border"
                style={{
                  color: RARITY_STYLES[selectedFood.rarity].color,
                  background: `rgba(255, 255, 255, 0.9)`,
                }}
              >
                {selectedFood.rarity}
              </div>

              {/* Bottom tag with brand and name */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">{selectedFood.brand}</div>
                <div className="text-display font-bold text-xl leading-tight">{selectedFood.name}</div>
              </div>
            </div>
          )}

          {/* Wishlist Toggle from Log a Taste */}
          {selectedFood && (
            <button
              type="button"
              onClick={() => onWishlistToggle(selectedFood.id)}
              className={`w-full py-3.5 px-6 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                isWishlisted
                  ? 'bg-amber text-ink border-transparent shadow-md'
                  : 'bg-white border-ledger-nav hover:bg-surface-med'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isWishlisted ? 'Saved in Wishlist ✓' : 'Add to Wishlist'}
            </button>
          )}
        </div>

        {/* Right Column: Rating, Consumed Date, Review, Save - design.md §11 (Desktop w-7/12) */}
        <div className="lg:col-span-7 space-y-8 bg-white border border-ledger-nav rounded-[3rem] p-6 lg:p-10 shadow-sm">
          {/* Consumed Date - design.md §11 */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-terra" /> Consumed on
            </label>
            <input
              type="date"
              value={consumedDate}
              onChange={(e) => setConsumedDate(e.target.value)}
              className="w-full bg-surface-med border border-ledger-nav rounded-2xl p-4 text-sm font-semibold outline-none focus:border-terra transition-colors"
            />
          </div>

          {/* Half-Star Rating System - design.md §11 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Your Rating</label>
              <span className="text-display font-bold text-2xl text-terra">{rating.toFixed(1)} ★</span>
            </div>

            <div className="flex gap-2 text-[#FFC857] items-center bg-surface-med p-4 rounded-2xl border border-ledger-nav justify-between">
              {[1, 2, 3, 4, 5].map((star) => {
                const activeVal = hoverRating || rating;
                const isFull = activeVal >= star;
                const isHalf = activeVal === star - 0.5;

                return (
                  <div key={star} className="relative w-8 h-8 cursor-pointer flex items-center justify-center">
                    <div
                      className="absolute inset-y-0 left-0 w-1/2 z-20"
                      onMouseEnter={() => setHoverRating(star - 0.5)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star - 0.5)}
                    />
                    <div
                      className="absolute inset-y-0 right-0 w-1/2 z-20"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    />
                    <svg
                      className="w-7 h-7 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 16.5 13.97 18.18 20.73 12 17.77 5.82 20.73 7.5 13.97 2 9.27 8.91 8.26 12 2"
                        fill={isFull ? '#FFC857' : isHalf ? 'rgba(255, 200, 87, 0.5)' : 'transparent'}
                        stroke={isFull || isHalf ? 'transparent' : '#6B6675'}
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Written Experience - Letterboxd Review Style */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Written Experience</label>
            <textarea
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="How was it? Describe the flavour, texture, aroma and your overall experience..."
              className="w-full bg-surface-med border border-ledger-nav rounded-2xl p-4 text-sm outline-none focus:border-terra resize-none transition-colors leading-relaxed font-medium text-ink"
            />
          </div>

          {/* Save Action - design.md §11 */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedFood}
            className="w-full bg-terra text-white py-4 rounded-2xl font-bold hover:bg-[#A62B14] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 text-base"
          >
            {isSubmitting ? 'Saving to Diary...' : 'Save Taste Log'}
          </button>
        </div>
      </form>
    </div>
  );
};