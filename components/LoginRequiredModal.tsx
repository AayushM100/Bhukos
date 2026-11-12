'use client';

import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { signInWithGoogle } from '@/lib/api';

interface LoginRequiredModalProps {
  onClose: () => void;
}

export const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF6EE] border border-black/10 rounded-[32px] max-w-md w-full p-8 shadow-2xl relative text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-[#C04A33]/10 text-[#C04A33] rounded-full flex items-center justify-center mx-auto mb-2">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="serif-heading text-3xl font-bold">Your food journey starts here!</h3>
          <p className="text-sm opacity-70 leading-relaxed px-2">
            Sign in to log your favourite snacks, rate products, build your collection and save flavours to your wishlist.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => signInWithGoogle()}
            className="w-full bg-[#1F1C18] text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </button>

          <button
            onClick={onClose}
            className="w-full bg-transparent text-black/60 py-3 rounded-2xl font-bold hover:text-black hover:bg-black/5 transition-colors text-sm"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};
