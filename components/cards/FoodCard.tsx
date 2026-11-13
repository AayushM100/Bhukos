"use client";

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { FoodItem } from '../../types';
import { VibrantFoodPoster } from './VibrantFoodPoster';
import { RARITY_BADGE_STYLES, RARITY_STYLES } from '../../lib/rarity';

interface FoodCardProps {
  food: FoodItem;
  onClick?: () => void;
  showUserRating?: number;
  consumedDate?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

// design.md §11.A — Collectible Pantry Snack Cards with Rarity Badges
export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  onClick,
  showUserRating,
  consumedDate,
  isSelected = false,
  onSelect
}) => {
  const rarityStyle = RARITY_STYLES[food.rarity] || RARITY_STYLES.Common;
  const badgeStyle = RARITY_BADGE_STYLES[food.rarity] || RARITY_BADGE_STYLES.Common;
  const isLegendary = food.rarity === 'Legendary';
  const isEpic = food.rarity === 'Epic';

  return (
    <div
      onClick={onClick}
      onSelect={onSelect}
      className={`group relative w-full max-w-[280px] flex flex-col gap-4 p-4 md:p-5 rounded-[20px] bg-surface-low border border-ledger-nav hover:border-terra hover:shadow-[0_12px_32px_-4px_rgba(255,107,53,0.12),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer ${
        isLegendary ? 'shadow-[0_0_12px_rgba(212,163,71,0.35)]' : ''
      }`}
    >
      {/* Product Image/Poster — 3:4 trading-card format */}
      <div
        className={`relative aspect-[3/4] w-full rounded-[16px] overflow-hidden shadow-sm border border-black/5 group-hover:shadow-md transition-shadow ${
          isLegendary ? 'ring-1 ring-[#FFB703]/60' : ''
        }`}
      >
        <VibrantFoodPoster foodId={food.id} className="w-full h-full object-cover" />

        {/* Rarity Badge Overlay — design.md §11.A top right */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border text-xs"
          style={{
            color: rarityStyle.color,
            background: rarityStyle.bg,
            borderColor: rarityStyle.border,
            ...(rarityStyle.glow && { boxShadow: rarityStyle.glow })
          }}
        >
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
          <Meta className="text-terra">
            {food.brand}
          </Meta>
          {consumedDate && (
            <DateDisplay className="text-xs">
              {new Date(consumedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </DateDisplay>
          )}
        </div>

        <h3 className="text-display font-bold text-xl leading-tight text-ink group-hover:text-terra transition-colors line-clamp-1">
          {food.name}
        </h3>

        <span className="text-xs font-semibold text-[#5E544E] uppercase tracking-wider">
          {food.category}
        </span>

        <p className="text-xs text-[#5E544E] line-clamp-2 leading-relaxed mt-1">
          {food.description}
        </p>

        {food.flavors && food.flavors.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {food.flavors.slice(0, 2).map((flavor) => (
              <span
                key={flavor}
                className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#FFC857]/10 text-[#FF6B35] uppercase tracking-tighter"
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

// Import Typography components
import { Meta, DateDisplay } from '../ui/Typography';