'use client';

import React from 'react';

interface PosterProps {
  foodId: string;
  className?: string;
}

export const VibrantFoodPoster: React.FC<PosterProps> = ({ foodId, className = "w-full h-full" }) => {
  switch (foodId) {
    case '1': // Maaza
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#FF9900] via-[#FF5500] to-[#E6005C] flex flex-col items-center justify-between p-4 shadow-inner ${className}`}>
          {/* Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35)_0%,transparent_70%)]" />

          {/* Top Brand Logo */}
          <div className="z-10 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-md">
            <span className="font-extrabold tracking-wider text-xl text-[#E6005C] font-display">Maaza</span>
          </div>

          {/* Central Artwork */}
          <div className="z-10 my-auto flex flex-col items-center relative">
            <svg className="w-36 h-36 drop-shadow-2xl" viewBox="0 0 100 100" fill="none">
              {/* Mango Body */}
              <path d="M50 15C30 15 15 35 20 65C23 80 40 90 60 85C78 80 85 60 80 40C75 22 65 15 50 15Z" fill="url(#mangoGrad)" />
              {/* Mango Highlight */}
              <ellipse cx="42" cy="38" rx="14" ry="22" fill="#FFE600" opacity="0.6" transform="rotate(-20 42 38)" />
              {/* Leaf */}
              <path d="M50 15C55 5 70 2 75 10C75 20 60 22 50 15Z" fill="#00C853" />
              <path d="M52 16C62 10 70 12 73 10" stroke="#007E33" strokeWidth="2" strokeLinecap="round" />
              {/* Juice Splash */}
              <circle cx="22" cy="75" r="4" fill="#FFE600" />
              <circle cx="78" cy="70" r="6" fill="#FFE600" />
              <circle cx="82" cy="55" r="3" fill="#FFF" />
              <defs>
                <linearGradient id="mangoGrad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFEB3B" />
                  <stop offset="0.5" stopColor="#FF9800" />
                  <stop offset="1" stopColor="#F44336" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Bottom Tagline Badge */}
          <div className="z-10 bg-black/30 backdrop-blur-sm text-white px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
            Mango Delight
          </div>
        </div>
      );

    case '2': // Haldiram's Aloo Bhujia
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#FFD700] via-[#FF8C00] to-[#D50000] flex flex-col items-center justify-between p-4 shadow-inner ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]" />

          <div className="z-10 bg-[#D50000] text-white px-5 py-1 rounded-full shadow-lg border border-yellow-300">
            <span className="font-extrabold text-sm tracking-widest uppercase">Haldiram's</span>
          </div>

          <div className="z-10 my-auto relative">
            <svg className="w-36 h-36 drop-shadow-2xl" viewBox="0 0 100 100">
              {/* Bowl */}
              <ellipse cx="50" cy="65" rx="38" ry="18" fill="#B71C1C" />
              <ellipse cx="50" cy="62" rx="36" ry="15" fill="#D50000" />
              {/* Golden Bhujia Strands */}
              <path d="M20 58 Q30 40 45 55 T70 45 T80 58" stroke="#FFE082" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M25 52 Q40 35 55 50 T75 42 T78 52" stroke="#FFCA28" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M30 48 Q50 30 65 48 T70 38" stroke="#FFB300" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="45" cy="42" r="3" fill="#4CAF50" />
              <circle cx="58" cy="46" r="2.5" fill="#4CAF50" />
              <circle cx="38" cy="50" r="2" fill="#D50000" />
            </svg>
          </div>

          <div className="z-10 bg-black/30 backdrop-blur-sm text-yellow-200 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
            Aloo Bhujia
          </div>
        </div>
      );

    case '3': // Parle-G
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#7B1FA2] via-[#E91E63] to-[#FF5722] flex flex-col items-center justify-between p-4 shadow-inner ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]" />

          {/* Parle-G Header Banner */}
          <div className="z-10 bg-[#D50000] text-white px-6 py-1 rounded-xl shadow-lg border-2 border-yellow-300">
            <span className="font-extrabold text-lg tracking-widest font-display">Parle-G</span>
          </div>

          {/* Parle Girl & Biscuit Artwork */}
          <div className="z-10 my-auto flex items-center justify-center gap-2">
            <svg className="w-40 h-32 drop-shadow-2xl" viewBox="0 0 120 90">
              {/* Biscuit */}
              <rect x="25" y="15" width="70" height="55" rx="8" fill="#D7CCC8" stroke="#5D4037" strokeWidth="3" />
              <rect x="30" y="20" width="60" height="45" rx="5" fill="#FFE0B2" stroke="#8D6E63" strokeWidth="2" />
              {/* Inner Biscuit Pattern */}
              <text x="60" y="48" textAnchor="middle" fill="#5D4037" fontSize="11" fontWeight="900" fontFamily="serif">PARLE-G</text>
              <circle cx="36" cy="26" r="2" fill="#8D6E63" />
              <circle cx="84" cy="26" r="2" fill="#8D6E63" />
              <circle cx="36" cy="58" r="2" fill="#8D6E63" />
              <circle cx="84" cy="58" r="2" fill="#8D6E63" />
            </svg>
          </div>

          <div className="z-10 bg-white/20 backdrop-blur-md text-white px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
            Original Glucose
          </div>
        </div>
      );

    case '4': // Paper Boat Aam Panna
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#00E676] via-[#00B0FF] to-[#6200EA] flex flex-col items-center justify-between p-4 shadow-inner ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35)_0%,transparent_70%)]" />

          <div className="z-10 bg-white text-[#00B0FF] px-4 py-1 rounded-full shadow-lg">
            <span className="font-extrabold text-sm tracking-wider">paper boat</span>
          </div>

          <div className="z-10 my-auto">
            <svg className="w-36 h-36 drop-shadow-2xl" viewBox="0 0 100 100">
              {/* Pouch */}
              <path d="M35 25 L65 25 L72 80 C72 85 65 88 50 88 C35 88 28 85 28 80 Z" fill="#76FF03" stroke="#33691E" strokeWidth="3" />
              <path d="M42 25 L42 18 L58 18 L58 25 Z" fill="#FFFFFF" stroke="#B0BEC5" strokeWidth="2" />
              {/* Raw Mango Illustration on Pouch */}
              <circle cx="50" cy="55" r="14" fill="#CCFF90" />
              <path d="M50 41 C55 35 65 35 62 45 Z" fill="#00E676" />
            </svg>
          </div>

          <div className="z-10 bg-black/30 backdrop-blur-sm text-white px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
            Aam Panna
          </div>
        </div>
      );

    case '5': // Old Monk
    default:
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#311B92] via-[#B71C1C] to-[#FF6F00] flex flex-col items-center justify-between p-4 shadow-inner ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.3)_0%,transparent_70%)]" />

          <div className="z-10 bg-amber-400 text-black px-4 py-1 rounded-full shadow-lg border border-amber-200">
            <span className="font-extrabold text-sm tracking-widest font-display">OLD MONK</span>
          </div>

          <div className="z-10 my-auto">
            <svg className="w-36 h-36 drop-shadow-2xl" viewBox="0 0 100 100">
              {/* Bottle */}
              <path d="M42 20 L58 20 L58 30 L65 38 L65 82 C65 86 60 88 50 88 C40 88 35 86 35 82 L35 38 L42 30 Z" fill="#3E2723" stroke="#FFD54F" strokeWidth="3" />
              {/* Amber Rum Liquid */}
              <path d="M37 45 L63 45 L63 80 C63 83 58 85 50 85 C42 85 37 83 37 80 Z" fill="#FF8F00" opacity="0.85" />
              {/* Gold Label */}
              <rect x="40" y="50" width="20" height="22" rx="3" fill="#FFD54F" />
              <text x="50" y="64" textAnchor="middle" fill="#3E2723" fontSize="8" fontWeight="bold" fontFamily="serif">7 YRS</text>
            </svg>
          </div>

          <div className="z-10 bg-black/40 backdrop-blur-sm text-amber-300 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
            Legendary Rum
          </div>
        </div>
      );
  }
};
