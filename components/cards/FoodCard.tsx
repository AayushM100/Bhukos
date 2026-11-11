'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Flame, Bookmark, Check } from 'lucide-react';
import { FoodItem } from '../../types';

interface FoodCardProps {
  food: FoodItem;
  onLog?: (rating: number) => void;
  onWishlist?: () => void;
}

const rarityColors = {
  Common: 'from-slate-400 to-slate-600 border-slate-300 text-slate-100',
  Rare: 'from-blue-500 to-indigo-600 border-blue-300 text-blue-100',
  Epic: 'from-purple-500 to-pink-600 border-purple-300 text-purple-100',
  Legendary: 'from-amber-400 to-orange-500 border-amber-200 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.5)]',
};

export const FoodCard: React.FC<FoodCardProps> = ({ food, onLog, onWishlist }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const handleRating = (value: number) => {
    setRating(value);
    setIsLogged(true);
    if (onLog) onLog(value);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (onWishlist) onWishlist();
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative w-80 rounded-3xl overflow-hidden border-2 bg-gradient-to-b ${rarityColors[food.rarity]} shadow-xl flex flex-col justify-between p-4 bg-opacity-95`}
    >
      {/* Top Banner: Brand and Rarity */}
      <div className="flex justify-between items-center z-10">
        <span className="text-xs uppercase tracking-wider font-extrabold bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white">
          {food.brand}
        </span>
        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-semibold text-white">
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span>{food.rarity}</span>
        </div>
      </div>

      {/* Poster Image / Artwork */}
      <div className="relative my-3 h-48 w-full rounded-2xl overflow-hidden shadow-inner bg-black/20">
        <img
          src={food.poster_url}
          alt={food.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
          <p className="text-xs italic text-gray-200 line-clamp-1">"{food.quote}"</p>
        </div>
      </div>

      {/* Title & Description */}
      <div className="z-10 flex-1">
        <h3 className="font-bold text-lg leading-snug text-white line-clamp-1">{food.name}</h3>
        <p className="text-xs text-white/80 mt-1 line-clamp-2 leading-relaxed">{food.description}</p>
      </div>

      {/* Flavors Badge */}
      {food.flavors && food.flavors.length > 0 && (
        <div className="flex flex-wrap gap-1 my-2 z-10">
          {food.flavors.map((flavor, index) => (
            <span
              key={index}
              className="text-[10px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-medium"
            >
              {flavor}
            </span>
          ))}
        </div>
      )}

      {/* Interactive Section: 5-Star Rating & Actions */}
      <div className="mt-3 pt-3 border-t border-white/20 flex flex-col gap-2 z-10">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-white/90">
            {isLogged ? 'Your Rating' : 'Rate Experience'}
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-125"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(star)}
              >
                <Star
                  className={`w-4 h-4 ${
                    (hoverRating || rating) >= star
                      ? 'fill-amber-300 text-amber-300'
                      : 'text-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Buttons for Log Status & Wishlist */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => handleRating(rating || 5)}
            className={`flex-1 py-1.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isLogged
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            {isLogged ? <Check className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5 text-orange-500" />}
            {isLogged ? 'Logged' : 'Log It'}
          </button>

          <button
            onClick={handleWishlist}
            className={`p-1.5 rounded-xl border border-white/30 backdrop-blur-sm transition-colors ${
              isWishlisted ? 'bg-amber-400 text-black border-transparent' : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
