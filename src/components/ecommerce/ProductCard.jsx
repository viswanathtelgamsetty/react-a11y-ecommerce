import React, { useState } from 'react';

export default function ProductCard({
  product,
  isAccessible,
  highlightIssues,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const isLowStock = product.stockStatus === 'low-stock';

  return (
    <article
      className={`product-card ${isAccessible ? 'card-accessible' : 'card-inaccessible'} ${
        highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''
      }`}
      aria-labelledby={isAccessible ? `product-title-${product.id}` : undefined}
    >
      {/* Product Image Frame */}
      <div className="product-card-media">
        <img
          src={product.image}
          alt={isAccessible ? product.altAccessible : product.altInaccessible}
          className="product-card-img"
          loading="lazy"
        />

        {highlightIssues && !isAccessible && (
          <span
            className="a11y-pill-tag tag-top-left"
            title={`WCAG 1.1.1: Inaccessible image alt="${product.altInaccessible || '(omitted)'}"`}
          >
            [Bad Alt Text]
          </span>
        )}

        {/* Badge: e.g. Best Seller, 15% Off */}
        {product.badge && (
          <span
            className={`product-badge ${isAccessible ? 'badge-accessible' : 'badge-inaccessible'}`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Button */}
        {isAccessible ? (
          <button
            type="button"
            className={`card-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={() => onToggleWishlist(product.id)}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWishlisted}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className={`card-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={() => onToggleWishlist(product.id)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {highlightIssues && (
              <span className="a11y-pill-tag tag-micro" title="WCAG 4.1.2: Wishlist button missing aria-label">
                [No Name]
              </span>
            )}
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="product-card-body">
        {/* Category & Stock Indicator */}
        <div className="product-meta-row">
          <span className="product-card-category">{product.category}</span>

          {/* Stock Status: WCAG 1.4.1 Color-only indication in inaccessible mode */}
          <div className="stock-indicator-wrapper">
            {isAccessible ? (
              <span className={`stock-status ${isLowStock ? 'stock-low' : 'stock-ok'}`}>
                <span className="stock-dot" aria-hidden="true">●</span>
                <span>{isLowStock ? `Only ${product.stockCount} left` : 'In Stock'}</span>
              </span>
            ) : (
              <div className="stock-indicator-inaccessible" title={isLowStock ? 'Low Stock' : 'In Stock'}>
                <span className={`stock-dot-only ${isLowStock ? 'dot-red' : 'dot-green'}`}></span>
                {highlightIssues && (
                  <span className="a11y-pill-tag" title="WCAG 1.4.1: Stock status indicated exclusively via color dot with no text">
                    [Color Only]
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Title */}
        <h3 className="product-card-title" id={isAccessible ? `product-title-${product.id}` : undefined}>
          {product.name}
        </h3>

        {/* Rating Stars: Screen reader accessible in accessible mode */}
        <div className="product-rating-row">
          {isAccessible ? (
            <div
              className="rating-accessible"
              role="img"
              aria-label={`Rated ${product.rating} out of 5 stars based on ${product.reviewsCount} verified customer reviews`}
            >
              <span className="stars-fill" aria-hidden="true">★★★★★</span>
              <span className="rating-score">({product.rating})</span>
              <span className="rating-count">({product.reviewsCount})</span>
            </div>
          ) : (
            <div className="rating-inaccessible">
              <span className="stars-fill">★★★★★</span>
              <span className="rating-score">({product.rating})</span>
              {highlightIssues && (
                <span className="a11y-pill-tag tag-micro" title="WCAG 1.1.1: Star rating lacks text alternative for screen readers">
                  [No Star Alt]
                </span>
              )}
            </div>
          )}
        </div>

        {/* Color Swatches: WCAG 1.4.1 & 4.1.2 */}
        {product.colors && product.colors.length > 0 && (
          <div
            className="product-swatches-row"
            role={isAccessible ? 'group' : undefined}
            aria-label={isAccessible ? `Color options for ${product.name}` : undefined}
          >
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                className={`swatch-circle ${selectedColorIndex === idx ? 'selected' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setSelectedColorIndex(idx)}
                aria-label={isAccessible ? `Select ${c.name} color variant` : undefined}
                aria-pressed={isAccessible ? selectedColorIndex === idx : undefined}
              >
                {selectedColorIndex === idx && <span className="swatch-check" aria-hidden="true">✓</span>}
              </button>
            ))}
            {highlightIssues && !isAccessible && (
              <span className="a11y-pill-tag tag-micro" title="WCAG 4.1.2: Color swatches lack aria-label or accessible names">
                [No Swatch Names]
              </span>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="product-price-row">
          <span className="product-price-current">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="product-price-original">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Card Actions: Quick View & Add to Cart */}
        <div className="product-card-actions">
          {/* Quick View Button: Deliberate ambiguous link purpose "Details" in inaccessible mode */}
          {isAccessible ? (
            <button
              type="button"
              className="btn-secondary card-quick-btn"
              onClick={() => onQuickView(product)}
              aria-label={`Quick preview for ${product.name}`}
            >
              Quick View
            </button>
          ) : (
            <div className="quick-btn-inaccessible-wrap">
              <button
                type="button"
                className="btn-secondary card-quick-btn"
                onClick={() => onQuickView(product)}
              >
                Details
              </button>
              {highlightIssues && (
                <span className="a11y-pill-tag tag-micro" title="WCAG 2.4.4: Ambiguous action text 'Details' lacking product context">
                  [Ambiguous]
                </span>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          {isAccessible ? (
            <button
              type="button"
              className="btn-primary card-cart-btn"
              onClick={() => onAddToCart(product, product.colors[selectedColorIndex]?.name || 'Standard')}
              aria-label={`Add ${product.name} to cart for $${product.price.toFixed(2)}`}
            >
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary card-cart-btn"
              onClick={() => onAddToCart(product, product.colors[selectedColorIndex]?.name || 'Standard')}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
