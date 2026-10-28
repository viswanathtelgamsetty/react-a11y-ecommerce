import React from 'react';
import HeroBanner from '../components/ecommerce/HeroBanner';
import ProductCard from '../components/ecommerce/ProductCard';
import ProductComparisonTable from '../components/ecommerce/ProductComparisonTable';
import StoreFaqAccordion from '../components/ecommerce/StoreFaqAccordion';

export default function HomePage({
  featuredProducts,
  isAccessible,
  highlightIssues,
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) {
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <HeroBanner
        isAccessible={isAccessible}
        highlightIssues={highlightIssues}
        onShopNow={() => onNavigate('products')}
      />

      <div className="home-content-container">
        {/* Category Discovery Cards */}
        <section className="home-section categories-showcase" aria-label={isAccessible ? 'Product Categories' : undefined}>
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">EXPLORE ECOSYSTEM</span>
              <h2 className="section-main-heading">Featured Categories</h2>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onNavigate('products')}
            >
              Browse All Products →
            </button>
          </div>

          <div className="categories-grid">
            {[
              { name: 'Audio', icon: '🎧', count: '18 Products', desc: 'Over-ear headphones, studio monitors & DACs' },
              { name: 'Wearables', icon: '⌚', count: '12 Products', desc: 'Continuous heart & health tracking smartwatches' },
              { name: 'Computing', icon: '⌨️', count: '14 Products', desc: 'Ergonomic mechanical keyboards & 4K webcams' },
              { name: 'Accessories', icon: '⚡', count: '22 Products', desc: 'MagSafe fast chargers & CNC laptop risers' },
            ].map((cat) => (
              <div
                key={cat.name}
                className="category-card"
                onClick={() => onNavigate('products', { category: cat.name })}
                role={isAccessible ? 'button' : undefined}
                tabIndex={isAccessible ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isAccessible && (e.key === 'Enter' || e.key === ' ')) {
                    onNavigate('products', { category: cat.name });
                  }
                }}
              >
                <div className="category-card-icon" aria-hidden="true">{cat.icon}</div>
                <h3 className="category-card-title">{cat.name}</h3>
                <span className="category-card-count">{cat.count}</span>
                <p className="category-card-desc">{cat.desc}</p>
                <span className="category-card-link">Shop {cat.name} →</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Showcase */}
        <section className="home-section" aria-label={isAccessible ? 'Featured Products' : undefined}>
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">HANDPICKED FOR AUDIOPHILES</span>
              <h2 className="section-main-heading">Best Selling Hardware</h2>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onNavigate('products')}
            >
              View Full Catalog ({featuredProducts.length}+)
            </button>
          </div>

          <div className="products-grid">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAccessible={isAccessible}
                highlightIssues={highlightIssues}
                onQuickView={() => onSelectProduct(product)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        </section>

        {/* Why Choose Aura Store Value Props */}
        <section className="home-section value-props-section" aria-label={isAccessible ? 'Store Guarantees' : undefined}>
          <div className="value-props-grid">
            <div className="value-prop-card">
              <span className="prop-icon" aria-hidden="true">🚀</span>
              <h3>Free 2-Day Shipping</h3>
              <p>Complimentary expedited courier shipping on all orders over $50 nationwide.</p>
            </div>
            <div className="value-prop-card">
              <span className="prop-icon" aria-hidden="true">🎧</span>
              <h3>30-Day Acoustic Trial</h3>
              <p>Test the sound quality in your home. Love it or return it for 100% money back.</p>
            </div>
            <div className="value-prop-card">
              <span className="prop-icon" aria-hidden="true">🛡️</span>
              <h3>2-Year Hardware Warranty</h3>
              <p>Comprehensive manufacturer warranty covering acoustic drivers, batteries, and materials.</p>
            </div>
            <div className="value-prop-card">
              <span className="prop-icon" aria-hidden="true">🔒</span>
              <h3>Bank-Grade Security</h3>
              <p>256-bit encrypted checkout supporting Apple Pay, Google Pay, and major cards.</p>
            </div>
          </div>
        </section>

        {/* Hardware Comparison Table */}
        <ProductComparisonTable
          isAccessible={isAccessible}
          highlightIssues={highlightIssues}
        />

        {/* Frequently Asked Questions */}
        <StoreFaqAccordion
          isAccessible={isAccessible}
          highlightIssues={highlightIssues}
        />
      </div>
    </div>
  );
}
