export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface RarityStyle {
  label: string;
  color: string;
  bg: string;
  border: string;
  glow?: string;
  gradient?: string;
}

// design.md §2 — Rarity Tier Colors
export const RARITY_STYLES: Record<Rarity, RarityStyle> = {
  Common: {
    label: 'Common',
    color: '#71717A',
    bg: 'rgba(113, 113, 122, 0.14)',
    border: 'rgba(113, 113, 122, 0.35)',
  },
  Rare: {
    label: 'Rare',
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.16)',
    border: 'rgba(6, 182, 212, 0.4)',
    glow: '0 0 18px rgba(6, 182, 212, 0.25)',
  },
  Epic: {
    label: 'Epic',
    color: '#8338EC',
    bg: 'rgba(131, 56, 236, 0.18)',
    border: 'rgba(131, 56, 236, 0.45)',
    glow: '0 0 20px rgba(131, 56, 236, 0.3)',
    gradient: 'linear-gradient(135deg, #8338EC, #D946EF)',
  },
  Legendary: {
    label: 'Legendary',
    color: '#FFB703',
    bg: 'rgba(255, 183, 3, 0.18)',
    border: 'rgba(255, 183, 3, 0.55)',
    glow: '0 0 26px rgba(255, 183, 3, 0.45)',
    gradient:
      'linear-gradient(120deg, #FFB703 0%, #FF8C42 30%, #FFD54F 55%, #FFF4E0 80%, #FFB703 100%)',
  },
};

export const rarityBadgeClass = (rarity: Rarity): string => {
  const s = RARITY_STYLES[rarity] || RARITY_STYLES.Common;
  return `text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full backdrop-blur-md border`;
};