import React, { useState, useRef, useEffect } from 'react';

export default function Navbar({
  isAccessible,
  highlightIssues,
  cartCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  currentPage,
  onNavigate,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isAccessible) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAccessible]);

  const handleKeyDown = (e) => {
    if (isAccessible && e.key === 'Escape' && dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  return (
    <nav
      className={`store-navbar ${isAccessible ? 'nav-accessible' : 'nav-inaccessible'} ${
        highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''
      }`}
      role={isAccessible ? 'navigation' : undefined}
      aria-label={isAccessible ? 'Main Store Navigation' : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className="nav-container">
        {/* Brand Logo */}
        <div className="nav-brand">
          <button
            type="button"
            className="brand-link-btn"
            onClick={() => onNavigate('home')}
            aria-label={isAccessible ? 'AuraStore Home Page' : undefined}
          >
            <span className="brand-logo-icon" aria-hidden={isAccessible ? 'true' : undefined}>
              ⚡
            </span>
            <span className="brand-name">AuraStore</span>
          </button>
        </div>

        {/* Page Nav Links: Home & Products Catalog */}
        <div className="nav-page-links">
          <button
            type="button"
            className={`nav-page-link-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-page-link-btn ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => onNavigate('products')}
          >
            Products
          </button>
        </div>

        {/* Categories Dropdown */}
        <div className="nav-categories" ref={dropdownRef}>
          {isAccessible ? (
            <div className="accessible-dropdown">
              <button
                type="button"
                className="category-trigger-btn"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="category-dropdown-list"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Category: <strong>{selectedCategory}</strong></span>
                <span className="dropdown-caret" aria-hidden="true">▾</span>
              </button>

              {dropdownOpen && (
                <ul
                  id="category-dropdown-list"
                  className="category-dropdown-menu"
                  role="menu"
                  aria-label="Product Categories"
                >
                  {categories.map((cat) => (
                    <li key={cat} role="none">
                      <button
                        type="button"
                        role="menuitem"
                        className={`category-item-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => {
                          onSelectCategory(cat);
                          onNavigate('products', { category: cat });
                          setDropdownOpen(false);
                        }}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="hover-only-dropdown">
              <div className="hover-trigger-fake">
                <span>Categories ▾</span>
                {highlightIssues && (
                  <span className="a11y-pill-tag" title="WCAG 2.1.1: Hover-only dropdown cannot be opened via Tab/Keyboard">
                    [Hover Only]
                  </span>
                )}
              </div>
              <div className="hover-menu-pane">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`hover-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('products', { category: cat });
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="nav-search-wrapper">
          {isAccessible ? (
            <form
              className="search-form"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                onNavigate('products');
              }}
            >
              <label htmlFor="store-search-field" className="visually-hidden">
                Search products in catalog
              </label>
              <input
                id="store-search-field"
                type="search"
                className="search-input"
                placeholder="Search headphones, smartwatches, gear..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'products') onNavigate('products');
                }}
                autoComplete="off"
              />
              <button
                type="submit"
                className="search-btn"
                aria-label="Submit product search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          ) : (
            <div className="search-form-inaccessible">
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'products') onNavigate('products');
                }}
              />
              {highlightIssues && (
                <span className="a11y-pill-tag" title="WCAG 1.3.1 & 3.3.2: Missing <label> or aria-label">
                  [No Label]
                </span>
              )}
              <button
                type="button"
                className="search-btn"
                onClick={() => onNavigate('products')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                {highlightIssues && (
                  <span className="a11y-pill-tag" title="WCAG 4.1.2: Button has no accessible text name">
                    [No Name]
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons: Wishlist & Cart */}
        <div className="nav-actions">
          {/* Wishlist Button */}
          {isAccessible ? (
            <button
              type="button"
              className="action-icon-btn"
              onClick={onOpenWishlist}
              aria-label="Saved items wishlist, 2 items saved"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="action-pill-count">2</span>
            </button>
          ) : (
            <button
              type="button"
              className="action-icon-btn"
              onClick={onOpenWishlist}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="action-pill-count">2</span>
              {highlightIssues && (
                <span className="a11y-pill-tag" title="WCAG 4.1.2: Icon-only button lacking accessible name">
                  [No Label]
                </span>
              )}
            </button>
          )}

          {/* Cart Button */}
          {isAccessible ? (
            <button
              type="button"
              className="action-cart-btn"
              onClick={onOpenCart}
              aria-label={`Open shopping cart drawer, contains ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-text">Cart</span>
              <span className="cart-count-badge">{cartCount}</span>
            </button>
          ) : (
            <div
              className="action-cart-btn fake-div-btn"
              onClick={onOpenCart}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-text">Cart</span>
              <span className="cart-count-badge">{cartCount}</span>
              {highlightIssues && (
                <span className="a11y-pill-tag" title="WCAG 4.1.2 & 2.1.1: <div> used instead of <button>; cannot receive keyboard focus or announce role">
                  [&lt;div&gt; Button]
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
