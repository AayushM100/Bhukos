"use client";

import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

// design.md §6 — Page Title (H1): 36px – 48px, Serif SemiBold, 1.2 line-height
export function PageTitle({ children, className = "", as = "h1" }: TypographyProps) {
  const Tag = as;
  return (
    <Tag
      className={`text-display font-display-medium text-heading-1 ${className}`}
    >
      {children}
    </Tag>
  );
}

// design.md §6 — Section Title (H2): 24px – 32px, Serif SemiBold, 1.25 line-height
export function SectionTitle({ children, className = "", as = "h2" }: TypographyProps) {
  const Tag = as;
  return (
    <Tag
      className={`text-heading-2 font-display-medium text-[#2A221E] ${className}`}
    >
      {children}
    </Tag>
  );
}

// design.md §6 — Card Title (H3): 18px – 22px, Serif or Bold Sans, 1.3 line-height
export function CardTitle({ children, className = "", as = "h3" }: TypographyProps) {
  const Tag = as;
  return (
    <Tag
      className={`text-heading-3 font-display-medium text-[#2A221E] ${className}`}
    >
      {children}
    </Tag>
  );
}

// Body text: 14-16px, Sans-Serif, 1.55 line-height
export function Body({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-body text-[#2A221E] ${className}`}>
      {children}
    </p>
  );
}

// Metadata / Badges: 10-12px, Monospace Uppercase, 1.4 line-height
export function Meta({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-meta font-mono-int uppercase tracking-widest text-[#5E544E] ${className}`}>
      {children}
    </span>
  );
}

// Rarity Badge: 10-12px, Monospace SemiBold, tracking-widest
export function RarityLabel({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-rarity font-mono-int font-bold tracking-widest ${className}`}>
      {children}
    </span>
  );
}

// Date display format
export function DateDisplay({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`text-xs text-[#5E544E] ${className}`}>
      {children}
    </span>
  );
}