import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  isAccessible,
  highlightIssues,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  selectedCategory,
  searchQuery,
  onResetFilters,
}) {
  return (
    <section
      className="product-catalog-section"
      aria-label={isAccessible ? 'Product Catalog' : undefined}
    >
      <div className="catalog-header">
        <div>
          <h2 className="catalog-heading">
            {selectedCategory === 'All' ? 'Curated Essentials & Hardware' : `${selectedCategory} Collection`}
          </h2>
          <p className="catalog-subheading">
            Engineered acoustics, precision input devices, and modern lifestyle wearables tested to the highest standards.
          </p>
        </div>

        {searchQuery && (
          <div className="active-search-chip">
            <span>Filtering by: "<strong>{searchQuery}</strong>"</span>
            <button
              type="button"
              className="clear-search-btn"
              onClick={onResetFilters}
              aria-label={isAccessible ? 'Clear search filter' : undefined}
            >
              ✕ Clear
            </button>
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div className="empty-catalog-state" role={isAccessible ? 'status' : undefined}>
          <div className="empty-icon" aria-hidden="true">🔍</div>
          <h3>No matching gear found</h3>
          <p>We couldn't find any products matching your current filters or search term.</p>
          <button type="button" className="btn-secondary" onClick={onResetFilters}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAccessible={isAccessible}
              highlightIssues={highlightIssues}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
