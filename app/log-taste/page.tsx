'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, Calendar } from 'lucide-react';

export default function LogTastePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [consumedDate, setConsumedDate] = useState(new Date().toISOString().split('T')[0]);
  const [review, setReview] = useState('');

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1C18] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="serif-heading text-5xl font-bold mb-12">Log a taste</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Product Selection & Poster */}
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-black/40" />
              <input
                type="text"
                placeholder="Search for a snack or beverage..."
                className="w-full bg-[#FFFDF9] border border-black/10 rounded-2xl py-4 pl-12 pr-4 text-lg outline-none shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="aspect-[4/5] bg-black/5 rounded-3xl flex items-center justify-center border-2 border-dashed border-black/10">
                {selectedProduct ? (
                    <img src={selectedProduct.poster_url} alt={selectedProduct.name} className="w-full h-full object-cover rounded-3xl" />
                ) : (
                    <p className="text-black/40 font-medium italic">Search and select a product to begin</p>
                )}
            </div>
          </div>

          {/* Right: Logging Controls */}
          <div className="space-y-8">
            {/* Product Info */}
            {selectedProduct && (
                <div>
                    <h2 className="text-3xl font-bold serif-heading">{selectedProduct.name}</h2>
                    <p className="text-sm opacity-70">{selectedProduct.brand}</p>
                </div>
            )}

            {/* Consumed Date */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Consumed on</label>
                <input
                    type="date"
                    value={consumedDate}
                    onChange={(e) => setConsumedDate(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-black/10 rounded-2xl p-4 text-sm outline-none"
                />
            </div>

            {/* Rating */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Your Rating</label>
                <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="relative w-8 h-8 cursor-pointer">
                            <div className="absolute inset-y-0 left-0 w-1/2 z-20" onMouseEnter={() => setHoverRating(s - 0.5)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s - 0.5)} />
                            <div className="absolute inset-y-0 right-0 w-1/2 z-20" onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)} />
                            <Star className={`w-8 h-8 ${ (hoverRating || rating) >= s ? 'fill-amber-400 text-amber-400' : (hoverRating || rating) === s - 0.5 ? 'fill-amber-400/50 text-amber-400' : 'text-black/20' }`} />
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
                    className="w-full bg-[#FFFDF9] border border-black/10 rounded-2xl p-4 text-sm outline-none resize-none"
                />
            </div>

            <button className="w-full bg-[#C04A33] text-white py-4 rounded-2xl font-bold hover:bg-[#a93e28] transition-all shadow-lg">
                Save Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
