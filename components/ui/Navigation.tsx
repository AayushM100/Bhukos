"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  House,
  Compass,
  Bookmark,
  Grid,
  LogOut,
  Plus,
  Star,
  Crown,
  Menu,
  X,
  Search,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
}

// design.md §5.A — Desktop Chrome (≥ 1024px)
// Sticky Top Bar: h-18 (72px), bg-[#FFF8F5]/90 backdrop-blur-md
export function DesktopNav({
  activeTab,
  onTabChange,
  onLogout,
  onLogin,
  level = 1,
  avatarUrl,
  onProfileClick,
  onLogTaste,
  onAddProduct,
  searchQuery,
  onSearchChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
  onLogin?: () => void;
  level?: number;
  avatarUrl?: string;
  onProfileClick?: () => void;
  onLogTaste?: () => void;
  onAddProduct?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}) {
  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: House, onClick: () => onTabChange("home") },
    { id: "discover", label: "Discover", icon: Compass, onClick: () => onTabChange("discover") },
    { id: "wishlist", label: "Wishlist", icon: Bookmark, onClick: () => onTabChange("wishlist") },
    { id: "binder", label: "My Collection", icon: Grid, onClick: () => onTabChange("binder") },
    { id: "log", label: "Log a taste", icon: Star, onClick: () => onTabChange("log") },
  ];

  return (
    <header className="hidden lg:flex sticky top-0 h-18 px-6 md:px-10 py-4 items-center justify-between w-full bg-canvas/90 backdrop-blur-md border-b border-ledger-nav scroll-locked z-40">
      {/* Brand lockup left */}
      <div className="flex items-center gap-10">
        <Link href="/" className="cursor-pointer">
          <h1 className="text-display font-display-bold tracking-tight text-bhukos-gradient">
            Bhukos
          </h1>
        </Link>
        <nav className="flex items-center gap-7 font-semibold text-sm text-[#6B6675]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`hover:text-terra transition-colors ${
                activeTab === item.id ? "text-terra font-bold" : ""
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="border-2 border-terra rounded-full block h-1.5 w-1.5 -bottom-1 left-1/2 -translate-x-1/2"></span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Center: Search pill */}
      <div className="hidden lg:flex items-center bg-white/80 border border-[#DED7E4] rounded-full px-4 py-2 w-72 shadow-sm">
        <Search className="w-4 h-4 text-[#6B6675] mr-2" />
        <input
          type="text"
          placeholder="Search pantry..."
          value={searchQuery || ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="bg-transparent text-sm w-full outline-none text-[#24212A] placeholder:text-[#6B6675] font-medium"
        />
        <span className="text-xs text-[#6B6675]/60 ml-2">⌘K</span>
      </div>

      {/* Action right */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAddProduct}
          className="hidden sm:flex items-center gap-2 bg-white border border-[#DED7E4] text-[#24212A] px-4 py-2.5 rounded-full text-sm font-bold hover:bg-[#FEF7FF] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#FF6B35]" />
          Submit a snack
        </button>

        <button
          onClick={onLogTaste}
          className="bg-[var(--terra)] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:shadow-[0_12px_32px_-4px_rgba(255,107,53,0.4)] transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          Log a taste
        </button>

        {avatarUrl ? (
          <button
            onClick={onProfileClick}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white border border-[#DED7E4] hover:shadow-md transition-all"
          >
            <span className="bg-gradient-to-r from-[#8338EC] to-[#D946EF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              LVL {String(level).padStart(2, "0")}
            </span>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FF6B35]/40">
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="bg-[#24212A] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#FF6B35] transition-all shadow-sm"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}

// design.md §5.B — Mobile Chrome (< 1024px / Small Screens)
// Top Header Bar: h-14 (56px) sticky bar
export function MobileHeader({
  onMenuOpen,
  level = 1,
  avatarUrl,
  onProfileClick,
}: {
  onMenuOpen?: () => void;
  level?: number;
  avatarUrl?: string;
  onProfileClick?: () => void;
}) {
  return (
    <header className="lg:hidden sticky top-0 h-14 flex items-center justify-between px-4 bg-canvas/90 backdrop-blur-md border-b border-ledger-nav z-40">
      <div className="flex items-center gap-2">
        <button onClick={onMenuOpen} className="lg:hidden p-2 rounded-full hover:bg-white/5">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-display-bold text-ink">
          <span className="text-ink">Bhukos </span>
          <span className="text-xs font-mono-int bg-amber text-white px-1.5 py-0.5 rounded-full">
            LVL {String(level).padStart(2, "0")}
          </span>
        </h1>
      </div>

      {avatarUrl && onProfileClick ? (
        <button onClick={onProfileClick} className="w-8 h-8 rounded-full overflow-hidden border-2 border-terra">
          <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
        </button>
      ) : (
        <button
          onClick={onMenuOpen}
          className="px-4 py-2 rounded-full text-sm font-bold bg-ink text-white hover:bg-terra transition-all"
        >
          Sign in
        </button>
      )}
    </header>
  );
}

// design.md §5.B — Fixed Bottom Navigation Dock
export function BottomNav({
  activeTab,
  onTabChange,
  onLogTaste,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogTaste?: () => void;
}) {
  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: House, onClick: () => onTabChange("home") },
    { id: "discover", label: "Discover", icon: Compass, onClick: () => onTabChange("discover") },
    { id: "wishlist", label: "Wishlist", icon: Bookmark, onClick: () => onTabChange("wishlist") },
    { id: "binder", label: "Collection", icon: Grid, onClick: () => onTabChange("binder") },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-canvas/95 backdrop-blur-lg border-t border-ledger-nav safe-area-bottom">
      <div className="grid grid-cols-5 h-full items-center">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-xs font-medium text-[#5E544E] hover:text-ink transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}

        {/* Elevated Floating Button for Log a Taste */}
        <button
          onClick={onLogTaste}
          className="relative flex flex-col items-center justify-center w-12 h-12 -mb-5 rounded-full bg-terra text-white shadow-lg border-4 border-canvas hover:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

// Mobile Menu Drawer
export function MobileMenu({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  onLogout,
  onLogin,
  level = 1,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
  onLogin?: () => void;
  level?: number;
}) {
  const menuItems: NavItem[] = [
    { id: "home", label: "Home", icon: House, onClick: () => { onTabChange("home"); onClose(); } },
    { id: "discover", label: "Discover", icon: Compass, onClick: () => { onTabChange("discover"); onClose(); } },
    { id: "wishlist", label: "Wishlist", icon: Bookmark, onClick: () => { onTabChange("wishlist"); onClose(); } },
    { id: "binder", label: "My Collection", icon: Grid, onClick: () => { onTabChange("binder"); onClose(); } },
    { id: "log", label: "Log a Taste", icon: Star, onClick: () => { onTabChange("log"); onClose(); } },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-canvas border-l border-ledger-nav z-[81] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-ledger-nav">
          <h2 className="text-heading-2 font-display-bold">Menu</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === item.id
                  ? "bg-amber/10 text-amber"
                  : "hover:bg-white/5 text-ink"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}

          <div className="pt-2 mt-4 border-t border-ledger-nav">
            <button
              onClick={onLogin}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-ink hover:bg-white/5 transition-all"
            >
              <Star className="w-5 h-5" />
              Sign in
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all mt-2"
            >
              <LogOut className="w-5 h-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}