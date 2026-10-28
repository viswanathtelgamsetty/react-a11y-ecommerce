import React, { useState, useEffect, useRef } from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  isAccessible,
  highlightIssues,
  discountPercent,
  onApplyCoupon,
}) {
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState('');
  const drawerRef = useRef(null);

  // Focus trap & Escape listener for accessible mode
  useEffect(() => {
    if (!isOpen) return;

    if (isAccessible) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          if (!drawerRef.current) return;
          const focusable = drawerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isAccessible, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'A11Y20') {
      onApplyCoupon(20);
      setCouponFeedback('✅ 20% Discount applied successfully!');
    } else {
      setCouponFeedback('❌ Invalid code. Try "A11Y20"');
    }
  };

  return (
    <div
      className={`cart-drawer-overlay ${isAccessible ? 'cart-accessible-wrap' : 'cart-inaccessible-wrap'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && isAccessible) {
          onClose();
        }
      }}
    >
      <div
        ref={drawerRef}
        className={`cart-drawer-panel ${highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''}`}
        role={isAccessible ? 'dialog' : undefined}
        aria-modal={isAccessible ? 'true' : undefined}
        aria-label={isAccessible ? 'Your Shopping Cart' : undefined}
      >
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-title-row">
            <span className="cart-header-icon" aria-hidden="true">🛒</span>
            <h2 className="cart-header-title">
              Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>

          {isAccessible ? (
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close cart drawer"
            >
              ✕
            </button>
          ) : (
            <span
              className="drawer-close-fake-span"
              onClick={onClose}
            >
              ✕
            </span>
          )}
        </div>

        {highlightIssues && !isAccessible && (
          <div className="a11y-pill-tag tag-banner">
            [WCAG 2.1.2: Drawer does not trap focus; Tab bleeds into background page]
          </div>
        )}

        {/* Cart Item List */}
        <div className="cart-items-container">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-cart-icon" aria-hidden="true">🛍️</span>
              <p>Your shopping bag is empty.</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
              >
                Browse Audio & Wearables
              </button>
            </div>
          ) : (
            <ul className="cart-items-list" role={isAccessible ? 'list' : undefined}>
              {items.map((item) => (
                <li
                  key={`${item.id}-${item.selectedColor}`}
                  className="cart-item-card"
                  role={isAccessible ? 'listitem' : undefined}
                >
                  <img
                    src={item.image}
                    alt={isAccessible ? `${item.name} in ${item.selectedColor}` : ''}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-variant">Variant: {item.selectedColor}</div>
                    <div className="cart-item-price">${item.price.toFixed(2)} each</div>

                    {/* Quantity controls */}
                    <div className="cart-item-actions">
                      <div className="cart-stepper">
                        <button
                          type="button"
                          className="stepper-sub-btn"
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                          aria-label={isAccessible ? `Decrease quantity of ${item.name}` : undefined}
                        >
                          −
                        </button>
                        <span className="stepper-num" aria-live={isAccessible ? 'polite' : undefined}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="stepper-add-btn"
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                          aria-label={isAccessible ? `Increase quantity of ${item.name}` : undefined}
                        >
                          +
                        </button>
                      </div>

                      {/* Trash / Delete button */}
                      {isAccessible ? (
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => onRemoveItem(item.id, item.selectedColor)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          🗑️
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => onRemoveItem(item.id, item.selectedColor)}
                        >
                          🗑️
                          {highlightIssues && (
                            <span className="a11y-pill-tag tag-micro" title="WCAG 4.1.2: Remove button missing aria-label">
                              [No Label]
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with Totals, Coupon, and Checkout */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo code form */}
            <form onSubmit={handleApplyCoupon} className="coupon-form">
              {isAccessible ? (
                <>
                  <label htmlFor="drawer-coupon-input" className="visually-hidden">
                    Promotional Coupon Code
                  </label>
                  <div className="coupon-input-group">
                    <input
                      id="drawer-coupon-input"
                      type="text"
                      className="coupon-input"
                      placeholder="Coupon Code (A11Y20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="btn-secondary coupon-apply-btn">
                      Apply
                    </button>
                  </div>
                </>
              ) : (
                <div className="coupon-input-group">
                  <input
                    type="text"
                    className="coupon-input"
                    placeholder="Coupon Code (A11Y20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  {highlightIssues && (
                    <span className="a11y-pill-tag tag-micro" title="WCAG 3.3.2: Missing <label> for coupon input">
                      [No Label]
                    </span>
                  )}
                  <button type="submit" className="btn-secondary coupon-apply-btn">
                    Apply
                  </button>
                </div>
              )}
              {couponFeedback && (
                <div
                  className={`coupon-feedback ${couponFeedback.includes('✅') ? 'feedback-good' : 'feedback-bad'}`}
                  role={isAccessible ? 'status' : undefined}
                  aria-live={isAccessible ? 'polite' : undefined}
                >
                  {couponFeedback}
                </div>
              )}
            </form>

            {/* Price breakdown */}
            <div className="cart-price-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Estimated Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total-row">
                <strong>Estimated Total:</strong>
                <strong className="total-figure">${total.toFixed(2)}</strong>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary checkout-trigger-btn"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              aria-label={isAccessible ? `Proceed to checkout, total is $${total.toFixed(2)}` : undefined}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
