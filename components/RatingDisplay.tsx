import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number; // Scale of 1-10 (from DB) or 0.5-5.0
  isDbScale?: boolean; // Default true (1-10 scale)
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  isDbScale = true,
  showNumber = true,
  size = 'md',
  className = '',
}) => {
  // Convert 1-10 DB integer rating to 0.5 - 5.0 scale
  const starRating = isDbScale ? Math.round(rating) / 2 : rating;

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-bold',
    lg: 'text-2xl font-bold text-display',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showNumber && (
        <span className={`${textSizes[size]} text-[#1F1C18]`}>
          {starRating.toFixed(1)}
        </span>
      )}
      <div className="flex gap-0.5 text-[#FFC857] items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = starRating >= star;
          const isHalf = starRating === star - 0.5;

          return (
            <div key={star} className="relative">
              <Star
                className={`${starSizes[size]} ${
                  isFull
                    ? 'fill-[#FFC857] text-[#FFC857]'
                    : isHalf
                    ? 'fill-[#FFC857]/50 text-[#FFC857]'
                    : 'text-black/15'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
