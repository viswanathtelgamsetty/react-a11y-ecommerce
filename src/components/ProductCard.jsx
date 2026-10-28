import React from 'react';

export default function ProductCard({ isAccessible }) {
  // Inline SVG for headphones product image
  const svgImage = (
    <svg
      width="100%"
      height="140"
      viewBox="0 0 200 140"
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: '#f1f5f9', borderRadius: '8px' }}
      role={isAccessible ? 'img' : undefined}
      aria-label={isAccessible ? 'Studio Pro noise-cancelling wireless headphones in obsidian black' : undefined}
    >
      <path
        d="M50 80 C50 35 150 35 150 80"
        stroke="#475569"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="40" y="70" width="20" height="35" rx="8" fill="#334155" />
      <rect x="140" y="70" width="20" height="35" rx="8" fill="#334155" />
      <circle cx="100" cy="115" r="4" fill="#64748b" />
      <text x="100" y="130" textAnchor="middle" fontSize="10" fill="#64748b">
        AudioPro 900
      </text>
    </svg>
  );

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests image alternative text (WCAG 1.1.1), color contrast ratio (WCAG 1.4.3), ambiguous link wording (WCAG 2.4.4), and nested interactive elements.
      </p>

      <div style={{ maxWidth: '360px' }}>
        {isAccessible ? (
          /* ACCESSIBLE PRODUCT CARD */
          <div className="product-card card-accessible">
            {svgImage}
            <div className="card-content">
              <span className="badge badge-success">In Stock</span>
              <h3 className="card-title">Studio Pro Wireless Headphones</h3>
              <p className="card-desc high-contrast">
                Active noise cancellation with 40-hour battery life and spatial audio support.
              </p>
              <div className="card-price-row">
                <span className="card-price">$249.00</span>
                <span className="visually-hidden">Original price was </span>
                <span className="card-price-strike">$299.00</span>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                aria-label="Add Studio Pro Wireless Headphones to Cart"
                onClick={() => alert('Added to cart!')}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          /* INACCESSIBLE PRODUCT CARD:
             - Low contrast text (#9ca3af on white = 2.4:1 contrast ratio)
             - Missing descriptive alt text
             - Ambiguous link "Click here"
             - Nested interactive anchor around button
          */
          <div className="product-card card-inaccessible">
            {/* Image without alt or proper role */}
            <div className="inaccessible-image-wrapper">
              <img
                src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23cbd5e1'/></svg>"
                alt="image"
                style={{ width: '100%', height: '120px', objectFit: 'cover' }}
              />
            </div>
            <div className="card-content">
              <div style={{ color: '#aaa', fontSize: '12px' }}>In Stock</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#888' /* Low contrast */ }}>
                Studio Pro Wireless Headphones
              </div>
              {/* Very low contrast: light gray on white */}
              <p style={{ color: '#b5b5b5', fontSize: '13px', margin: '8px 0' }}>
                Active noise cancellation with 40-hour battery life and spatial audio support.
              </p>
              <div style={{ color: '#999', fontSize: '14px', marginBottom: '10px' }}>
                $249.00 <span style={{ textDecoration: 'line-through', color: '#ccc' }}>$299.00</span>
              </div>
              {/* Nested interactive element: <a> wrapping <button> + ambiguous text "Click here" */}
              <a href="#buy" style={{ textDecoration: 'none' }}>
                <button type="button" className="btn btn-primary btn-block">
                  Click here
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
