import React, { useState } from 'react';

export default function ProductDetailPage({
  product,
  isAccessible,
  highlightIssues,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onNavigate,
}) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');

  if (!product) {
    return (
      <div className="product-detail-empty">
        <h2>No Product Selected</h2>
        <button type="button" className="btn-primary" onClick={() => onNavigate('products')}>
          Back to Products Catalog
        </button>
      </div>
    );
  }

  const isLowStock = product.stockStatus === 'low-stock';

  return (
    <div className="product-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="page-breadcrumbs" aria-label={isAccessible ? 'Breadcrumb' : undefined}>
        <div className="breadcrumbs-container">
          <button
            type="button"
            className="breadcrumb-link"
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <span className="breadcrumb-separator" aria-hidden="true">/</span>
          <button
            type="button"
            className="breadcrumb-link"
            onClick={() => onNavigate('products')}
          >
            Products
          </button>
          <span className="breadcrumb-separator" aria-hidden="true">/</span>
          <span className="breadcrumb-current" aria-current={isAccessible ? 'page' : undefined}>
            {product.name}
          </span>
        </div>
      </nav>

      <div className="product-detail-container">
        {/* Top Back Action */}
        <div className="detail-top-bar">
          <button
            type="button"
            className="btn-secondary back-btn"
            onClick={() => onNavigate('products')}
          >
            ← Back to Products List
          </button>
        </div>

        {/* Product Details Grid */}
        <div className="detail-main-grid">
          {/* Left Column: Media */}
          <div className="detail-media-column">
            <div className="detail-image-box">
              <img
                src={product.image}
                alt={isAccessible ? product.altAccessible : product.altInaccessible}
                className="detail-large-img"
              />
              {highlightIssues && !isAccessible && (
                <span className="a11y-pill-tag tag-top-left" title={`WCAG 1.1.1: Inaccessible image alt="${product.altInaccessible || '(omitted)'}"`}>
                  [Bad Alt Text]
                </span>
              )}
            </div>

            <div className="detail-badges-row">
              <span className="detail-category-badge">{product.category}</span>
              {/* Stock Status: WCAG 1.4.1 issue in flawed mode */}
              {isAccessible ? (
                <span className={`stock-status ${isLowStock ? 'stock-low' : 'stock-ok'}`}>
                  ● {isLowStock ? `Urgent: Only ${product.stockCount} units remaining` : 'In Stock & Ready to Ship'}
                </span>
              ) : (
                <div className="stock-indicator-inaccessible">
                  <span className={`stock-dot-only ${isLowStock ? 'dot-red' : 'dot-green'}`}></span>
                  {highlightIssues && (
                    <span className="a11y-pill-tag tag-micro" title="WCAG 1.4.1: Stock status indicated exclusively via color dot with no text">
                      [Color Only]
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Information, Options, Purchase */}
          <div className="detail-info-column">
            <h1 className="detail-product-title">{product.name}</h1>

            {/* Ratings */}
            <div className="detail-rating-row">
              {isAccessible ? (
                <div
                  className="rating-accessible"
                  role="img"
                  aria-label={`Rated ${product.rating} out of 5 stars based on ${product.reviewsCount} customer reviews`}
                >
                  <span className="stars-fill" aria-hidden="true">★★★★★</span>
                  <span className="rating-score">({product.rating})</span>
                  <span className="rating-count">({product.reviewsCount} reviews)</span>
                </div>
              ) : (
                <div className="rating-inaccessible">
                  <span className="stars-fill">★★★★★</span>
                  <span className="rating-score">({product.rating})</span>
                  {highlightIssues && (
                    <span className="a11y-pill-tag tag-micro" title="WCAG 1.1.1: Missing text alternative for star rating">
                      [No Star Alt]
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Price Row */}
            <div className="detail-price-strip">
              <span className="detail-current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="detail-original-price">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.badge && (
                <span className="detail-sale-badge">{product.badge}</span>
              )}
            </div>

            <p className="detail-lead-desc">{product.description}</p>

            {/* Color Swatch Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="detail-options-block">
                <span className="option-heading">
                  Color Finish: <strong>{selectedColor}</strong>
                </span>
                <div className="detail-swatches-row" role={isAccessible ? 'group' : undefined} aria-label={isAccessible ? 'Color Options' : undefined}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`detail-swatch-circle ${selectedColor === c.name ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={isAccessible ? `Select ${c.name} color variant` : undefined}
                      aria-pressed={isAccessible ? selectedColor === c.name : undefined}
                    >
                      {selectedColor === c.name && <span className="swatch-check" aria-hidden="true">✓</span>}
                    </button>
                  ))}
                  {highlightIssues && !isAccessible && (
                    <span className="a11y-pill-tag tag-micro" title="WCAG 4.1.2: Color swatches lack aria-label or accessible names">
                      [No Swatch Names]
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="detail-options-block">
              <span className="option-heading">Quantity:</span>
              <div className="quantity-stepper">
                {isAccessible ? (
                  <>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity by 1"
                    >
                      −
                    </button>
                    <span className="stepper-value" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity by 1"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      className="stepper-btn fake-stepper-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      −
                    </div>
                    <span className="stepper-value">{quantity}</span>
                    <div
                      className="stepper-btn fake-stepper-btn"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Purchase CTA Strip */}
            <div className="detail-cta-row">
              <button
                type="button"
                className="btn-primary detail-add-btn"
                onClick={() => onAddToCart(product, selectedColor, quantity)}
                aria-label={isAccessible ? `Add ${quantity}x ${product.name} to cart for $${(product.price * quantity).toFixed(2)}` : undefined}
              >
                Add to Cart • ${(product.price * quantity).toFixed(2)}
              </button>

              <button
                type="button"
                className={`btn-secondary detail-wish-btn ${isWishlisted ? 'wishlisted' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isAccessible ? (isWishlisted ? 'Remove from wishlist' : 'Save to wishlist') : undefined}
              >
                {isWishlisted ? '❤️ Saved' : '🤍 Add to Wishlist'}
              </button>
            </div>

            {/* Guarantees Box */}
            <div className="detail-guarantees-strip">
              <div className="guarantee-item">
                <span aria-hidden="true">📦</span>
                <span>Free 2-day delivery</span>
              </div>
              <div className="guarantee-item">
                <span aria-hidden="true">🛡️</span>
                <span>2-year warranty included</span>
              </div>
              <div className="guarantee-item">
                <span aria-hidden="true">🔄</span>
                <span>30-day money back returns</span>
              </div>
            </div>

            {/* Tabbed Info (Overview, Specifications, Reviews) */}
            <div className="detail-tabs-wrapper">
              {isAccessible ? (
                <div role="tablist" aria-label="Detailed Product Specifications" className="accessible-tablist">
                  <button
                    type="button"
                    role="tab"
                    id="d-tab-overview"
                    aria-selected={activeTab === 'overview'}
                    aria-controls="d-panel-overview"
                    tabIndex={activeTab === 'overview' ? 0 : -1}
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') setActiveTab('specs');
                    }}
                  >
                    Features
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="d-tab-specs"
                    aria-selected={activeTab === 'specs'}
                    aria-controls="d-panel-specs"
                    tabIndex={activeTab === 'specs' ? 0 : -1}
                    className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('specs')}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') setActiveTab('overview');
                      if (e.key === 'ArrowRight') setActiveTab('reviews');
                    }}
                  >
                    Technical Specs
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="d-tab-reviews"
                    aria-selected={activeTab === 'reviews'}
                    aria-controls="d-panel-reviews"
                    tabIndex={activeTab === 'reviews' ? 0 : -1}
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') setActiveTab('specs');
                    }}
                  >
                    Customer Reviews ({product.reviewsCount})
                  </button>
                </div>
              ) : (
                <div className="fake-tablist">
                  <a
                    href="#overview"
                    className={`fake-tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('overview');
                    }}
                  >
                    Features
                  </a>
                  <a
                    href="#specs"
                    className={`fake-tab ${activeTab === 'specs' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('specs');
                    }}
                  >
                    Technical Specs
                  </a>
                  <a
                    href="#reviews"
                    className={`fake-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('reviews');
                    }}
                  >
                    Customer Reviews
                  </a>
                  {highlightIssues && (
                    <span className="a11y-pill-tag tag-micro" title="WCAG 2.1.1: Links used as tabs without ARIA roles or arrow key navigation">
                      [Fake Tabs]
                    </span>
                  )}
                </div>
              )}

              <div className="detail-tab-content">
                {activeTab === 'overview' && (
                  <div
                    id="d-panel-overview"
                    role={isAccessible ? 'tabpanel' : undefined}
                    aria-labelledby={isAccessible ? 'd-tab-overview' : undefined}
                    tabIndex={isAccessible ? 0 : undefined}
                  >
                    <ul className="detail-features-list">
                      {product.features?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div
                    id="d-panel-specs"
                    role={isAccessible ? 'tabpanel' : undefined}
                    aria-labelledby={isAccessible ? 'd-tab-specs' : undefined}
                    tabIndex={isAccessible ? 0 : undefined}
                  >
                    <div className="detail-specs-table">
                      {Object.entries(product.specs || {}).map(([k, v]) => (
                        <div key={k} className="spec-row">
                          <span className="spec-key">{k.toUpperCase()}:</span>
                          <span className="spec-val">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div
                    id="d-panel-reviews"
                    role={isAccessible ? 'tabpanel' : undefined}
                    aria-labelledby={isAccessible ? 'd-tab-reviews' : undefined}
                    tabIndex={isAccessible ? 0 : undefined}
                  >
                    <div className="quick-review-item">
                      <div className="review-stars">★★★★★ 5.0</div>
                      <strong>"Exceeded expectations in build quality and comfort."</strong>
                      <p className="review-text">
                        I use these for 8 hours daily at my workstation. The battery life is unbelievable and the finish is premium.
                      </p>
                      <span className="review-author">— Verified Buyer, Jordan K.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
