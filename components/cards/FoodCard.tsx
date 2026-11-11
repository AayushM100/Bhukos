'use client';

import React, { useState } from 'react';
import { Star, Sparkles, Flame, Bookmark, Check } from 'lucide-react';
import { FoodItem } from '../../types';
import { VibrantFoodPoster } from './VibrantFoodPoster';

interface FoodCardProps {
  food: FoodItem;
  onLog?: (rating: number) => void;
  onWishlist?: () => void;
  onClick?: () => void;
}

const rarityColors = {
  Common: 'border-slate-300 bg-[#FFFDF9]',
  Rare: 'border-blue-400 bg-[#FFFDF9]',
  Epic: 'border-purple-400 bg-[#FFFDF9]',
  Legendary: 'border-amber-400 bg-[#FFFDF9] shadow-[0_0_25px_rgba(251,191,36,0.3)]',
};

export const FoodCard: React.FC<FoodCardProps> = ({ food, onLog, onWishlist, onClick }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // rating is 0.5 to 5.0 (step 0.5)
  const handleStarClick = (starIndex: number, isHalf: boolean) => {
    const val = isHalf ? starIndex - 0.5 : starIndex;
    setRating(val);
    setIsLogged(true);
    if (onLog) onLog(val);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onWishlist) onWishlist();
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-80 rounded-3xl overflow-hidden border-2 ${rarityColors[food.rarity]} shadow-xl flex flex-col justify-between p-6 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group`}
    >
      {/* Top Banner: Brand and Rarity */}
      <div className="flex justify-between items-center z-10 mb-4">
        <span className="text-xs uppercase tracking-wider font-extrabold bg-black/5 px-3 py-1 rounded-full text-[#1F1C18]">
          {food.brand}
        </span>
        <div className="flex items-center gap-1 bg-black/5 px-3 py-1 rounded-full text-xs font-bold text-[#C04A33]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>{food.rarity}</span>
        </div>
      </div>

      {/* Vibrant Vector Poster */}
      <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-inner border border-black/10 my-1">
        <VibrantFoodPoster foodId={food.id} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 pointer-events-none">
          <p className="text-xs italic text-white/90 line-clamp-1 font-serif">"{food.quote}"</p>
        </div>
      </div>

      {/* Title & Description */}
      <div className="z-10 mt-4 flex-1">
        <h3 className="serif-heading font-bold text-xl leading-snug text-[#1F1C18] line-clamp-1 group-hover:text-[#C04A33] transition-colors">{food.name}</h3>
        <p className="text-xs text-[#1F1C18]/70 mt-1.5 line-clamp-2 leading-relaxed">{food.description}</p>
      </div>

      {/* Flavors Badge */}
      {food.flavors && food.flavors.length > 0 && (
        <div className="flex flex-wrap gap-1.5 my-3.5 z-10">
          {food.flavors.map((flavor, index) => (
            <span
              key={index}
              className="text-[10px] bg-black/5 text-[#1F1C18] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
            >
              {flavor}
            </span>
          ))}
        </div>
      )}

      {/* Interactive Section: Half-Star Rating & Actions */}
      <div className="mt-2 pt-4 border-t border-black/10 flex flex-col gap-3 z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-[#1F1C18]/80">
            {isLogged ? `Rating: ${rating} ★` : 'Rate Experience'}
          </span>
          <div className="flex gap-1 relative">
            {[1, 2, 3, 4, 5].map((star) => {
              const activeVal = hoverRating || rating;
              const isFull = activeVal >= star;
              const isHalf = activeVal === star - 0.5;

              return (
                <div key={star} className="relative w-4 h-4 cursor-pointer">
                  {/* Left half clickable */}
                  <div
                    className="absolute inset-y-0 left-0 w-1/2 z-20"
                    onMouseEnter={() => setHoverRating(star - 0.5)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(star, true)}
                  />
                  {/* Right half clickable */}
                  <div
                    className="absolute inset-y-0 right-0 w-1/2 z-20"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(star, false)}
                  />

                  {/* Star Graphic */}
                  <Star
                    className={`w-4 h-4 transition-transform ${
                      isFull
                        ? 'fill-amber-400 text-amber-400'
                        : isHalf
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'text-black/20'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons for Log Status & Wishlist */}
        <div className="flex gap-2">
          <button
            onClick={() => handleStarClick(5, false)}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              isLogged
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C04A33] text-white hover:bg-[#a93e28]'
            }`}
          >
            {isLogged ? <Check className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5 text-yellow-300" />}
            {isLogged ? 'Logged' : 'Log It'}
          </button>

          <button
            onClick={handleWishlist}
            className={`p-2.5 rounded-xl border border-black/10 transition-colors ${
              isWishlisted ? 'bg-amber-400 text-black border-transparent' : 'bg-black/5 text-[#1F1C18] hover:bg-black/10'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
