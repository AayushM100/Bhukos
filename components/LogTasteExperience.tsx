'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Calendar, Bookmark, Check, X, Search, ChevronDown } from 'lucide-react';
import { FoodItem } from '@/types';
import { VibrantFoodPoster } from '@/components/cards/VibrantFoodPoster';

interface LogTasteExperienceProps {
  foodItems: FoodItem[];
  wishlistIds: string[];
  onSaveLog: (data: { foodItemId: string; rating: number; review: string; consumedDate: string }) => Promise<void>;
  onWishlistToggle: (foodId: string) => void;
  onCancel?: () => void;
}

export const LogTasteExperience: React.FC<LogTasteExperienceProps> = ({
  foodItems,
  wishlistIds,
  onSaveLog,
  onWishlistToggle,
  onCancel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem>(foodItems[0] || null);
  const [rating, setRating] = useState<number>(4.0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [consumedDate, setConsumedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B35]">Letterboxd-Inspired Diary</span>
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Product Poster & Dynamic Search */}
        <div className="lg:col-span-5 space-y-6">
          {/* Dynamic Product Selector */}
          <div className="relative dropdown-container">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2 block">Select Product</label>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-[#DED7E4] rounded-2xl p-4 text-sm font-semibold flex items-center justify-between cursor-pointer shadow-sm hover:border-[#FF6B35]/40 transition-all"
            >
              <span className="truncate">{selectedFood ? `${selectedFood.name} (${selectedFood.brand})` : 'Search pantry...'}</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DED7E4] rounded-2xl shadow-xl z-30 overflow-hidden max-h-80 flex flex-col">
                <div className="p-3 border-b border-[#F0EAE1]">
                  <div className="flex items-center bg-[#FFF9F0] rounded-xl px-3 py-2 border border-[#F0EAE1]">
                    <Search className="w-4 h-4 text-[#6B6675]/60 mr-2" />
                    <input
                      type="text"
                      placeholder="Type product or brand..."
                      className="bg-transparent text-xs w-full outline-none font-medium text-[#24212A]"
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
                      className="px-4 py-3 hover:bg-[#FEF7FF] cursor-pointer flex items-center gap-3 border-b border-[#F0EAE1] last:border-0"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-black/5">
                        <VibrantFoodPoster foodId={f.id} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-[#24212A] truncate">{f.name}</div>
                        <div className="text-[10px] opacity-60 uppercase">{f.brand} • {f.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Product Poster */}
          {selectedFood && (
            <div className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-[#DED7E4] bg-white">
              <VibrantFoodPoster foodId={selectedFood.id} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#FF6B35] shadow-md">
                {selectedFood.rarity}
              </div>
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
                  ? 'bg-[#FFC857] text-[#24212A] border-transparent shadow-md'
                  : 'bg-white border-[#DED7E4] hover:bg-[#FEF7FF]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isWishlisted ? 'Saved in Wishlist ✓' : 'Add to Wishlist'}
            </button>
          )}
        </div>

        {/* Right Column: Rating, Consumed Date, Review, Save */}
        <div className="lg:col-span-7 space-y-8 bg-white border border-[#DED7E4] rounded-[3rem] p-8 lg:p-10 shadow-sm">
          {/* Consumed Date */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" /> Consumed on
            </label>
            <input
              type="date"
              value={consumedDate}
              onChange={(e) => setConsumedDate(e.target.value)}
              className="w-full bg-[#FFF9F0] border border-[#DED7E4] rounded-2xl p-4 text-sm font-semibold outline-none focus:border-[#FF6B35] transition-colors"
            />
          </div>

          {/* Half-Star Rating System */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Your Rating</label>
              <span className="text-display font-bold text-2xl text-[#FF6B35]">{rating.toFixed(1)} ★</span>
            </div>

            <div className="flex gap-2 text-[#FFC857] items-center bg-[#FFF9F0] p-4 rounded-2xl border border-[#DED7E4] justify-between">
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
                    <Star
                      className={`w-7 h-7 transition-transform ${
                        isFull
                          ? 'fill-[#FFC857] text-[#FFC857] scale-105'
                          : isHalf
                          ? 'fill-[#FFC857]/50 text-[#FFC857] scale-105'
                          : 'text-[#6B6675]/30'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Written Experience (Letterboxd Review Style) */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Written Experience</label>
            <textarea
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="How was it? Describe the flavour, texture, aroma and your overall experience..."
              className="w-full bg-[#FFF9F0] border border-[#DED7E4] rounded-2xl p-4 text-sm outline-none focus:border-[#FF6B35] resize-none transition-colors leading-relaxed font-medium text-[#24212A]"
            />
          </div>

          {/* Save Action */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedFood}
            className="w-full bg-[#FF6B35] text-white py-4 rounded-2xl font-bold hover:bg-[#FF6B35] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 text-base"
          >
            {isSubmitting ? 'Saving to Diary...' : 'Save Taste Log'}
          </button>
        </div>
      </form>
    </div>
  );
};