import React, { useState } from 'react';

export default function Header({ cartCount = 1, onOpenCart }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="site-header">
      {/* WCAG 2.4.1 Broken Bypass Link: Skips to non-existent ID or lacks tabindex */}
      <a href="#missing-main-target" className="skip-navigation-link">
        Skip to main content
      </a>

      {/* WCAG 2.2.2 & 1.4.3: Auto-moving ticker with no pause/stop control & Low contrast (#94a3b8 on #fef08a = ~2.1:1) */}
      <div className="promo-ticker-bar">
        <div className="ticker-track">
          <span className="ticker-item">
            ⚡ FLASH SALE: 20% OFF ALL AUDIO GEAR WITH CODE A11Y20 • FREE 2-DAY EXPRESS SHIPPING OVER $50 • 30-DAY HASSLE-FREE TRIAL
          </span>
          <span className="ticker-item" aria-hidden="true">
            ⚡ FLASH SALE: 20% OFF ALL AUDIO GEAR WITH CODE A11Y20 • FREE 2-DAY EXPRESS SHIPPING OVER $50 • 30-DAY HASSLE-FREE TRIAL
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-container">
        {/* Brand Logo - WCAG 1.1.1: Missing descriptive alt text (uses generic 'image') */}
        <div className="nav-brand">
          <a href="#" className="brand-logo-link">
            <span className="brand-logo-icon">🎧</span>
            <span className="brand-name">AuraStore</span>
          </a>
        </div>

        {/* Search Bar - WCAG 1.3.1 & 3.3.2: Missing <label> (placeholder only); WCAG 1.1.1 & 4.1.2: Button without accessible name */}
        <div className="nav-search-wrapper">
          <form className="nav-search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search audio, high-res gear, accessories..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button type="submit" className="nav-search-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        {/* Navigation Links - WCAG 2.1.1: Dropdown menu only triggers on CSS :hover, keyboard Tab skips submenu */}
        <nav className="nav-menu">
          <a href="#new" className="nav-link">New Releases</a>
          <a href="#audio" className="nav-link active">Headphones</a>
          
          <div className="nav-dropdown">
            <span className="nav-link dropdown-toggle">Categories ▾</span>
            <div className="dropdown-menu">
              <a href="#wireless" className="dropdown-item">Wireless Earbuds</a>
              <a href="#overear" className="dropdown-item">Over-Ear ANC</a>
              <a href="#dac" className="dropdown-item">Audiophile DACs</a>
              <a href="#cables" className="dropdown-item">Custom Audio Cables</a>
            </div>
          </div>

          <a href="#deals" className="nav-link">Deals</a>
          <a href="#support" className="nav-link">Support</a>
        </nav>

        {/* Action Buttons - WCAG 1.1.1 & 4.1.2: Icon buttons without aria-label */}
        <div className="nav-actions">
          {/* Wishlist Button */}
          <button type="button" className="action-icon-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="badge-count">2</span>
          </button>

          {/* Cart Button */}
          <button type="button" className="action-icon-btn" onClick={onOpenCart}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="badge-count">{cartCount}</span>
          </button>

          {/* User Profile Avatar - WCAG 4.1.2 & 2.1.1: Clickable div without role="button" or tabindex="0" */}
          <div className="user-profile-avatar" onClick={() => alert('Account profile clicked')}>
            <span>JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
