import React from 'react';

export default function HeroBanner({ isAccessible, highlightIssues, onShopNow }) {
  return (
    <section
      className={`hero-banner ${isAccessible ? 'hero-accessible' : 'hero-inaccessible'} ${
        highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''
      }`}
      aria-label={isAccessible ? 'Featured Product Promotion' : undefined}
    >
      <div className="hero-grid">
        <div className="hero-content">
          {/* Discount Pill: Inaccessible has failing contrast (WCAG 1.4.3) */}
          <div className="hero-badge-wrapper">
            <span
              className={`hero-deal-pill ${isAccessible ? 'deal-pill-accessible' : 'deal-pill-inaccessible'}`}
            >
              🔥 2026 AUDIO INNOVATION AWARD WINNER
            </span>
            {highlightIssues && !isAccessible && (
              <span className="a11y-pill-tag" title="WCAG 1.4.3: Low contrast text (2.6:1 ratio, failing AA 4.5:1)">
                [Low Contrast]
              </span>
            )}
          </div>

          <h1 className="hero-title">
            Pure Acoustic Precision. <br />
            <span className="hero-gradient-text">Zero Compromise.</span>
          </h1>

          <p className="hero-subtitle">
            Immerse yourself in lossless spatial audio powered by 40mm custom beryllium drivers and
            adaptive 45dB hybrid noise cancellation. Engineered for creators, audiophiles, and daily commuters.
          </p>

          <div className="hero-actions">
            {isAccessible ? (
              <button
                type="button"
                className="btn-primary hero-cta-btn"
                onClick={onShopNow}
                aria-label="Shop Aura SoundMax Wireless Headphones collection"
              >
                Shop SoundMax Collection →
              </button>
            ) : (
              /* Inaccessible: Ambiguous link purpose "Click Here" (WCAG 2.4.4) */
              <div className="hero-cta-inaccessible-wrapper">
                <button
                  type="button"
                  className="btn-primary hero-cta-btn"
                  onClick={onShopNow}
                >
                  Click Here
                </button>
                {highlightIssues && (
                  <span className="a11y-pill-tag" title="WCAG 2.4.4: Non-descriptive link purpose 'Click Here'">
                    [Ambiguous Text]
                  </span>
                )}
              </div>
            )}

            <div className="hero-coupon-chip">
              <span className="coupon-label">Coupon Code:</span>
              <strong className="coupon-code">A11Y20</strong>
              <span className="coupon-discount">(Save 20%)</span>
            </div>
          </div>

          <div className="hero-features-strip">
            <div className="hero-feat-item">
              <span className="feat-check" aria-hidden="true">✓</span>
              <span>55-Hour Playtime</span>
            </div>
            <div className="hero-feat-item">
              <span className="feat-check" aria-hidden="true">✓</span>
              <span>Beryllium Drivers</span>
            </div>
            <div className="hero-feat-item">
              <span className="feat-check" aria-hidden="true">✓</span>
              <span>Multipoint BT 5.3</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=80"
              alt={isAccessible ? 'Aura Studio headphones displayed on a minimalist wooden pedestal with studio lighting' : ''}
              className="hero-img"
            />
            {highlightIssues && !isAccessible && (
              <span className="a11y-pill-tag hero-img-tag" title="WCAG 1.1.1: Missing alternative text on promotional hero image">
                [Missing Alt]
              </span>
            )}
            <div className="hero-floating-badge">
              <span className="badge-rating">★★★★★ 4.9</span>
              <span className="badge-caption">Over 2,400+ 5-Star Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
