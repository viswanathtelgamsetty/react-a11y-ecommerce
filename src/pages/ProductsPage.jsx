import React from 'react';
import ProductFilters from '../components/ecommerce/ProductFilters';
import ProductCard from '../components/ecommerce/ProductCard';

export default function ProductsPage({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  searchQuery,
  onResetFilters,
  isAccessible,
  highlightIssues,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigate,
}) {
  return (
    <div className="products-page">
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
          <span className="breadcrumb-current" aria-current={isAccessible ? 'page' : undefined}>
            Products
          </span>
          {selectedCategory !== 'All' && (
            <>
              <span className="breadcrumb-separator" aria-hidden="true">/</span>
              <span className="breadcrumb-current">{selectedCategory}</span>
            </>
          )}
        </div>
      </nav>

      <div className="products-page-container">
        {/* Page Header */}
        <div className="page-header-strip">
          <div>
            <h1 className="page-title">
              {selectedCategory === 'All' ? 'All Hardware & Gear' : `${selectedCategory} Collection`}
            </h1>
            <p className="page-description">
              Browse our complete catalog of audio monitors, smart wearables, developer mechanical keyboards, and precision accessories.
            </p>
          </div>
        </div>

        {/* Filters and Sorting Toolbar */}
        <ProductFilters
          isAccessible={isAccessible}
          highlightIssues={highlightIssues}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          sortBy={sortBy}
          onSortChange={onSortChange}
          inStockOnly={inStockOnly}
          onToggleInStock={onToggleInStock}
          productCount={products.length}
        />

        {/* Empty State or Product Grid */}
        {products.length === 0 ? (
          <div className="empty-catalog-state" role={isAccessible ? 'status' : undefined}>
            <div className="empty-icon" aria-hidden="true">🔍</div>
            <h3>No products match your current filters</h3>
            <p>Try resetting the category filter or clearing your search term.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={onResetFilters}
            >
              Reset Filters
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
                onQuickView={() => onSelectProduct(product)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
