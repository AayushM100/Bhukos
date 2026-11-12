'use client';

import React from 'react';
import { Star, Sparkles, Plus } from 'lucide-react';
import { FoodItem, Rarity } from '../../types';
import { VibrantFoodPoster } from './VibrantFoodPoster';

interface FoodCardProps {
  food: FoodItem;
  onClick?: () => void;
  showUserRating?: number;
  consumedDate?: string;
}

const rarityStyles: Record<Rarity, { border: string; bg: string; text: string; shadow?: string }> = {
  Common: { border: 'border-slate-200', bg: 'bg-slate-50', text: 'text-slate-600' },
  Rare: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-600' },
  Epic: { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-600' },
  Legendary: { border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-600', shadow: 'shadow-[0_0_20px_rgba(251,191,36,0.2)]' },
};

export const FoodCard: React.FC<FoodCardProps> = ({ food, onClick, showUserRating, consumedDate }) => {
  const style = rarityStyles[food.rarity] || rarityStyles.Common;

  return (
    <div
      onClick={onClick}
      className="group relative w-full max-w-[280px] flex flex-col gap-4 p-4 rounded-[2rem] bg-white border border-black/5 hover:border-black/10 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image/Poster */}
      <div className="relative aspect-[3/4] w-full rounded-[1.5rem] overflow-hidden shadow-sm border border-black/5 group-hover:shadow-md transition-shadow">
        <VibrantFoodPoster foodId={food.id} className="w-full h-full object-cover" />

        {/* Rarity Badge Overlay */}
        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${style.bg}/80 ${style.border} ${style.text} ${style.shadow}`}>
          <Sparkles className="w-3 h-3" />
          {food.rarity}
        </div>

        {/* User Rating Overlay (if provided, for Collection) */}
        {showUserRating !== undefined && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold">{showUserRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C04A33] opacity-80">
            {food.brand}
          </span>
          {consumedDate && (
            <span className="text-[10px] font-medium opacity-40">
              {new Date(consumedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>

        <h3 className="serif-heading font-bold text-xl leading-tight text-[#1F1C18] group-hover:text-[#C04A33] transition-colors line-clamp-1">
          {food.name}
        </h3>

        <span className="text-[10px] font-semibold text-black/40 uppercase tracking-wider">
          {food.category}
        </span>

        <p className="text-xs text-black/60 line-clamp-2 leading-relaxed mt-1">
          {food.description}
        </p>

        {food.flavors && food.flavors.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {food.flavors.slice(0, 2).map((flavor) => (
              <span key={flavor} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/5 text-black/50 uppercase tracking-tighter">
                {flavor}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
