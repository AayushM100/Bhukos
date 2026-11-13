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

  useEffect(() => {
    setConsumedDate(new Date().toISOString().split('T')[0]);
  }, []);
  const [review, setReview] = useState('');

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#24212A] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-display text-5xl font-bold mb-12">Log a taste</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Product Selection & Poster */}
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-[#6B6675]/40" />
              <input
                type="text"
                placeholder="Search for a snack or beverage..."
                className="w-full bg-white border border-[#DED7E4] rounded-2xl py-4 pl-12 pr-4 text-lg outline-none shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="aspect-[4/5] bg-black/5 rounded-3xl flex items-center justify-center border-2 border-dashed border-[#DED7E4]">
                {selectedProduct ? (
                    <img src={selectedProduct.poster_url} alt={selectedProduct.name} className="w-full h-full object-cover rounded-3xl" />
                ) : (
                    <p className="text-[#6B6675]/60 font-medium italic">Search and select a product to begin</p>
                )}
            </div>
          </div>

          {/* Right: Logging Controls */}
          <div className="space-y-8">
            {/* Product Info */}
            {selectedProduct && (
                <div>
                    <h2 className="text-3xl font-bold text-display">{selectedProduct.name}</h2>
                    <p className="text-sm text-[#6B6675]">{selectedProduct.brand}</p>
                </div>
            )}

            {/* Consumed Date */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Consumed on</label>
                <input
                    type="date"
                    value={consumedDate}
                    onChange={(e) => setConsumedDate(e.target.value)}
                    className="w-full bg-white border border-[#DED7E4] rounded-2xl p-4 text-sm outline-none"
                />
            </div>

            {/* Rating */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Your Rating</label>
                <div className="flex gap-1 text-[#FFC857]">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="relative w-8 h-8 cursor-pointer">
                            <div className="absolute inset-y-0 left-0 w-1/2 z-20" onMouseEnter={() => setHoverRating(s - 0.5)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s - 0.5)} />
                            <div className="absolute inset-y-0 right-0 w-1/2 z-20" onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)} />
                            <Star className={`w-8 h-8 ${(hoverRating || rating) >= s ? 'fill-[#FFC857] text-[#FFC857]' : (hoverRating || rating) === s - 0.5 ? 'fill-[#FFC857]/50 text-[#FFC857]' : 'text-[#6B6675]/20'}`} />
                        </div>
                    ))}
                    <span className="ml-4 font-bold text-xl">{rating || '0'}</span>
                </div>
            </div>

            {/* Written Experience */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">How was it?</label>
                <textarea
                    rows={6}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Describe the flavour, texture, aroma and your overall experience..."
                    className="w-full bg-white border border-[#DED7E4] rounded-2xl p-4 text-sm outline-none resize-none"
                />
            </div>

            <button className="w-full bg-[#FF6B35] text-white py-4 rounded-2xl font-bold hover:bg-[#e65a26] transition-all shadow-lg">
                Save Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}