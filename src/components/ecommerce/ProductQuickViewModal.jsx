import React, { useState, useEffect, useRef } from 'react';

export default function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  isAccessible,
  highlightIssues,
  onAddToCart,
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);

  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Focus management & Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    if (isAccessible) {
      // Store current focus so we can restore it on close
      previouslyFocusedElement.current = document.activeElement;

      // Focus first focusable element inside modal
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      }, 50);

      const handleKeyDown = (e) => {
        // WCAG 2.1.1: Escape key closes modal in accessible mode
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        // WCAG 2.1.2: Strict keyboard focus trap
        if (e.key === 'Tab') {
          if (!modalRef.current) return;
          const focusable = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const firstElem = focusable[0];
          const lastElem = focusable[focusable.length - 1];

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElem) {
              e.preventDefault();
              lastElem.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElem) {
              e.preventDefault();
              firstElem.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
        // WCAG 2.4.3: Restore focus to trigger element
        if (previouslyFocusedElement.current && previouslyFocusedElement.current.focus) {
          previouslyFocusedElement.current.focus();
        }
      };
    } else {
      // In Inaccessible mode: Focus is NOT trapped, Escape key does NOT close,
      // and focus is NOT restored on exit. (Deliberate WCAG 2.1.2 & 2.4.3 failure)
    }
  }, [isOpen, isAccessible, onClose]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    onClose();
  };

  return (
    <div
      className={`modal-backdrop ${isAccessible ? 'modal-accessible-wrap' : 'modal-inaccessible-wrap'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && isAccessible) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className={`modal-container ${highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''}`}
        role={isAccessible ? 'dialog' : undefined}
        aria-modal={isAccessible ? 'true' : undefined}
        aria-labelledby={isAccessible ? 'modal-quick-title' : undefined}
      >
        {/* Modal Header / Close */}
        <div className="modal-header">
          {highlightIssues && !isAccessible && (
            <div className="a11y-pill-tag tag-banner">
              [WCAG 2.1.2 Violation: No Focus Trap • Esc Disabled • Fake &lt;span&gt; Close]
            </div>
          )}

          {isAccessible ? (
            /* Accessible: Semantic button with clear aria-label */
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close product quick view dialog"
            >
              ✕
            </button>
          ) : (
            /* Inaccessible: Unlabelled <span> without tabindex (WCAG 2.1.1 & 4.1.2) */
            <span
              className="modal-close-fake-span"
              onClick={onClose}
            >
              ✕
            </span>
          )}
        </div>

        <div className="modal-body-grid">
          {/* Product Media Column */}
          <div className="modal-gallery">
            <img
              src={product.image}
              alt={isAccessible ? product.altAccessible : product.altInaccessible}
              className="modal-main-img"
            />
            <div className="modal-meta-chips">
              <span className="modal-chip">Category: {product.category}</span>
              <span className="modal-chip">Stock: {product.stockCount} units</span>
            </div>
          </div>

          {/* Product Info Column */}
          <div className="modal-info">
            <h2 id={isAccessible ? 'modal-quick-title' : undefined} className="modal-product-title">
              {product.name}
            </h2>

            <div className="modal-price-strip">
              <span className="modal-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="modal-original-price">${product.originalPrice.toFixed(2)}</span>
              )}
              <span className="modal-rating">★★★★★ {product.rating} ({product.reviewsCount} reviews)</span>
            </div>

            {/* Color Selection */}
            {product.colors && (
              <div className="modal-option-group">
                <span className="option-label">Color Variant: <strong>{selectedColor}</strong></span>
                <div className="modal-swatches">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`swatch-btn ${selectedColor === c.name ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={isAccessible ? `Select ${c.name} color` : undefined}
                      aria-pressed={isAccessible ? selectedColor === c.name : undefined}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="modal-option-group">
              <span className="option-label">Quantity:</span>
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

            {/* Interactive Tabs: Overview, Specs, Reviews */}
            <div className="modal-tabs-section">
              {isAccessible ? (
                /* Accessible WAI-ARIA Tabs pattern (WCAG 2.1.1 & 4.1.2) */
                <div role="tablist" aria-label="Product Information Tabs" className="accessible-tablist">
                  <button
                    type="button"
                    role="tab"
                    id="tab-overview"
                    aria-selected={activeTab === 'overview'}
                    aria-controls="panel-overview"
                    tabIndex={activeTab === 'overview' ? 0 : -1}
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') setActiveTab('specs');
                    }}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-specs"
                    aria-selected={activeTab === 'specs'}
                    aria-controls="panel-specs"
                    tabIndex={activeTab === 'specs' ? 0 : -1}
                    className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('specs')}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') setActiveTab('overview');
                      if (e.key === 'ArrowRight') setActiveTab('reviews');
                    }}
                  >
                    Specifications
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-reviews"
                    aria-selected={activeTab === 'reviews'}
                    aria-controls="panel-reviews"
                    tabIndex={activeTab === 'reviews' ? 0 : -1}
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') setActiveTab('specs');
                    }}
                  >
                    Customer Reviews
                  </button>
                </div>
              ) : (
                /* Inaccessible: Plain <a> tags without tab roles or arrow key navigation */
                <div className="fake-tablist">
                  <a
                    href="#tab-overview"
                    className={`fake-tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('overview');
                    }}
                  >
                    Overview
                  </a>
                  <a
                    href="#tab-specs"
                    className={`fake-tab ${activeTab === 'specs' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('specs');
                    }}
                  >
                    Specifications
                  </a>
                  <a
                    href="#tab-reviews"
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

              {/* Tab Panels */}
              <div className="tab-panels-content">
                {activeTab === 'overview' && (
                  <div
                    id="panel-overview"
                    role={isAccessible ? 'tabpanel' : undefined}
                    aria-labelledby={isAccessible ? 'tab-overview' : undefined}
                    tabIndex={isAccessible ? 0 : undefined}
                  >
                    <p className="tab-desc">{product.description}</p>
                    <ul className="tab-features-list">
                      {product.features?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div
                    id="panel-specs"
                    role={isAccessible ? 'tabpanel' : undefined}
                    aria-labelledby={isAccessible ? 'tab-specs' : undefined}
                    tabIndex={isAccessible ? 0 : undefined}
                  >
                    <div className="specs-grid-quick">
                      {Object.entries(product.specs || {}).map(([key, val]) => (
                        <div key={key} className="spec-row">
                          <span className="spec-key">{key.toUpperCase()}:</span>
                          <span className="spec-val">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div
                    id="panel-reviews"
                    role={isAccessible ? 'tabpanel' : undefined}
                    aria-labelledby={isAccessible ? 'tab-reviews' : undefined}
                    tabIndex={isAccessible ? 0 : undefined}
                  >
                    <div className="quick-review-item">
                      <div className="review-stars">★★★★★</div>
                      <strong>"Phenomenal build quality and sound separation"</strong>
                      <p className="review-text">
                        The battery easily lasts all week and the noise cancellation is whisper quiet during flights.
                      </p>
                      <span className="review-author">— Verified Buyer, Marcus T.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-cta-row">
              <button
                type="button"
                className="btn-primary modal-add-btn"
                onClick={handleAdd}
                aria-label={isAccessible ? `Add ${quantity} ${product.name} to cart for $${(product.price * quantity).toFixed(2)}` : undefined}
              >
                Add {quantity} to Cart • ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
