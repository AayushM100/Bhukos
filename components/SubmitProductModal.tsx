'use client';

import React, { useState } from 'react';
import { Star, Sparkles, Flame, Bookmark, Check, X, Upload, Loader2 } from 'lucide-react';
import { FoodItem } from '@/types';

interface SubmitProductModalProps {
  onClose: () => void;
  onSubmit: (data: Partial<FoodItem>) => Promise<void>;
}

export const SubmitProductModal: React.FC<SubmitProductModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Chips & Crisps',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Chips & Crisps',
    'Namkeen & Bhujia',
    'Biscuits & Cookies',
    'Chocolates & Candies',
    'Instant Noodles',
    'Packaged Indian Snacks',
    'Cold Drinks & Soft Drinks',
    'Juices & Fruit Drinks',
    'Dairy-based Beverages',
    'Other Packaged Snacks',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.brand) return;

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-[#FAF6EE] border border-black/10 rounded-[32px] max-w-xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C04A33]">Community Contribution</span>
          <h2 className="serif-heading text-4xl font-bold mt-2">Submit a snack</h2>
          <p className="text-sm opacity-70 mt-1">Found something missing in our pantry? Help the club grow.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-1">Product Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Magic Masala"
                className="w-full bg-[#FFFDF9] border border-black/10 rounded-2xl p-4 text-sm outline-none focus:border-[#C04A33] transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-1">Brand</label>
              <input
                required
                type="text"
                placeholder="e.g. Lay's"
                className="w-full bg-[#FFFDF9] border border-black/10 rounded-2xl p-4 text-sm outline-none focus:border-[#C04A33] transition-colors"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-1">Category</label>
            <select
              className="w-full bg-[#FFFDF9] border border-black/10 rounded-2xl p-4 text-sm outline-none focus:border-[#C04A33] appearance-none transition-colors"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 ml-1">Description (Optional)</label>
            <textarea
              rows={3}
              placeholder="What makes this snack special?"
              className="w-full bg-[#FFFDF9] border border-black/10 rounded-2xl p-4 text-sm outline-none focus:border-[#C04A33] resize-none transition-colors"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1F1C18] text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit for Review'
              )}
            </button>
            <p className="text-[10px] text-center mt-4 opacity-50 font-medium">
              Submissions are reviewed by the taste club before joining the public pantry.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
