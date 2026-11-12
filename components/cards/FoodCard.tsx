'use client';

import React from 'react';
import { Star, Sparkles, Gem } from 'lucide-react';
import { FoodItem } from '../../types';
import { VibrantFoodPoster } from './VibrantFoodPoster';
import { RARITY_STYLES } from '../../lib/rarity';

interface FoodCardProps {
  food: FoodItem;
  onClick?: () => void;
  showUserRating?: number;
  consumedDate?: string;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onClick, showUserRating, consumedDate }) => {
  const style = RARITY_STYLES[food.rarity] || RARITY_STYLES.Common;
  const isLegendary = food.rarity === 'Legendary';

  return (
    <div
      onClick={onClick}
      className={`group relative w-full max-w-[280px] flex flex-col gap-4 p-4 rounded-[20px] bg-white border border-[#DED7E4] hover:border-[#FF6B35] hover:shadow-[0_12px_32px_-4px_rgba(255,107,53,0.12),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer ${
        isLegendary ? 'foil-glow' : ''
      }`}
    >
      {/* Product Image/Poster — 3:4 trading-card format */}
      <div
        className={`relative aspect-[3/4] w-full rounded-[16px] overflow-hidden shadow-sm border border-black/5 group-hover:shadow-md transition-shadow ${
          isLegendary ? 'ring-1 ring-[#FFB703]/60' : ''
        }`}
      >
        <VibrantFoodPoster foodId={food.id} className="w-full h-full object-cover" />

        {/* Rarity Badge Overlay — frosted glass pill */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border"
          style={{ color: style.color, background: style.bg, borderColor: style.border }}
        >
          {food.rarity === 'Legendary' ? (
            <Gem className="w-3 h-3" />
          ) : (
            <Sparkles className="w-3 h-3" />
          )}
          {food.rarity}
        </div>

        {/* User Rating Overlay (Collection binder) */}
        {showUserRating !== undefined && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10">
            <Star className="w-3.5 h-3.5 fill-[#FFC857] text-[#FFC857]" />
            <span className="text-xs font-bold">{showUserRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF6B35]">
            {food.brand}
          </span>
          {consumedDate && (
            <span className="text-[10px] font-medium text-[#6B6675]">
              {new Date(consumedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>

        <h3 className="text-display font-bold text-xl leading-tight text-[#24212A] group-hover:text-[#FF6B35] transition-colors line-clamp-1">
          {food.name}
        </h3>

        <span className="text-[10px] font-semibold text-[#6B6675] uppercase tracking-wider">
          {food.category}
        </span>

        <p className="text-xs text-[#6B6675] line-clamp-2 leading-relaxed mt-1">
          {food.description}
        </p>

        {food.flavors && food.flavors.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {food.flavors.slice(0, 2).map((flavor) => (
              <span
                key={flavor}
                className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#FF6B35]/10 text-[#FF6B35] uppercase tracking-tighter"
              >
                {flavor}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};