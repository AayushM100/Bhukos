export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface RarityStyle {
  label: string;
  color: string;
  bg: string;
  border: string;
  glow?: string;
  gradient?: string;
  accent?: string;
  shadow?: string;
}

// design.md §3 — Rarity Tier Colors (integrated into top right of collectible cards)
export const RARITY_STYLES: Record<Rarity, RarityStyle> = {
  Common: {
    label: 'COMMON',
    color: '#E2D8D3',
    bg: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  Rare: {
    label: 'RARE',
    color: '#FAD59A',
    bg: 'rgba(217, 130, 43, 0.2)',
    border: '1px solid rgba(217, 130, 43, 0.5)',
    glow: '0 0 12px rgba(217, 130, 43, 0.35)',
    accent: '#D9822B',
  },
  Epic: {
    label: 'EPIC',
    color: '#E8BAFF',
    bg: 'rgba(138, 58, 185, 0.25)',
    border: '1px solid rgba(179, 102, 235, 0.55)',
    accent: '#8A3AB9',
  },
  Legendary: {
    label: 'LEGENDARY',
    color: '#FFE299',
    bg: 'linear-gradient(135deg, rgba(212, 163, 71, 0.35) 0%, rgba(200, 56, 29, 0.3) 100%)',
    border: '1px solid #D4A347',
    glow: '0 0 12px rgba(212, 163, 71, 0.35)',
    shadow: '0 0 12px rgba(212, 163, 71, 0.35)',
  },
};

// Utility class for rarity badges
export const rarityBadgeClass = (rarity: Rarity): string => {
  const s = RARITY_STYLES[rarity] || RARITY_STYLES.Common;
  return `text-rarity font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md border`;
};

// Get the appropriate CSS class for a rarity badge
export function rarityBadgeStyle(rarity: Rarity): string {
  const s = RARITY_STYLES[rarity] || RARITY_STYLES.Common;

  if (rarity === 'Legendary') {
    return `bg-legendary-badgegradient text-legendary-text border-legendary-border text-xs font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full`;
  }

  if (rarity === 'Epic') {
    return `bg-epic-bg text-epic-text border-epic-border text-xs font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full`;
  }

  if (rarity === 'Rare') {
    return `bg-rare-bg text-rare-text border-rare-border text-xs font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full`;
  }

  // Common
  return `bg-common-bg text-common-text border-common-border text-xs font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full`;
};

// New style definitions based on design.md colors
export const RARITY_BADGE_STYLES = {
  Common: 'bg-[rgba(255,255,255,0.15)] text-[#E2D8D3] border-[1px solid rgba(255,255,255,0.2)]',
  Rare: 'bg-[rgba(217,130,43,0.2)] text-[#FAD59A] border-[1px solid rgba(217,130,43,0.5)]',
  Epic: 'bg-[rgba(138,58,185,0.25)] text-[#E8BAFF] border-[1px solid rgba(179,102,235,0.55)]',
  Legendary: 'bg-[linear-gradient(135deg,rgba(212,163,71,0.35)_0%,rgba(200,56,29,0.3)_100%)] text-[#FFE299] border-[1px_solid_#D4A347] shadow-[0_0_12px_rgba(212,163,71,0.35)]',
};