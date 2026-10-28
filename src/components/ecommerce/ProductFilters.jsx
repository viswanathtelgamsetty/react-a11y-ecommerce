import React from 'react';

export default function ProductFilters({
  isAccessible,
  highlightIssues,
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  productCount,
}) {
  return (
    <div
      className={`filter-toolbar ${isAccessible ? 'filter-accessible' : 'filter-inaccessible'} ${
        highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''
      }`}
      role={isAccessible ? 'region' : undefined}
      aria-label={isAccessible ? 'Product Filters and Sorting' : undefined}
    >
      <div className="filter-left">
        {/* Category Filter Pills */}
        <div className="category-pills" role={isAccessible ? 'group' : undefined} aria-label={isAccessible ? 'Filter by Category' : undefined}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
              aria-pressed={isAccessible ? selectedCategory === cat : undefined}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* In-Stock Only Toggle / Checkbox */}
        <div className="stock-filter-wrapper">
          {isAccessible ? (
            /* Accessible: Semantic native checkbox with linked label */
            <label className="checkbox-label" htmlFor="filter-in-stock">
              <input
                type="checkbox"
                id="filter-in-stock"
                className="semantic-checkbox"
                checked={inStockOnly}
                onChange={(e) => onToggleInStock(e.target.checked)}
              />
              <span>In-stock only</span>
            </label>
          ) : (
            /* Inaccessible: Fake <span> checkbox without role="checkbox" or keyboard access (WCAG 4.1.2 & 2.1.1) */
            <div
              className="fake-checkbox-wrapper"
              onClick={() => onToggleInStock(!inStockOnly)}
            >
              <span className={`fake-checkbox-box ${inStockOnly ? 'checked' : ''}`}>
                {inStockOnly && '✓'}
              </span>
              <span className="fake-checkbox-text">In-stock only</span>
              {highlightIssues && (
                <span className="a11y-pill-tag" title="WCAG 4.1.2: Fake <span> checkbox missing role='checkbox' and keyboard support">
                  [Span Checkbox]
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="filter-right">
        <span className="product-results-count" aria-live={isAccessible ? 'polite' : undefined}>
          Showing <strong>{productCount}</strong> products
        </span>

        {/* Sort Controls */}
        <div className="sort-wrapper">
          {isAccessible ? (
            /* Accessible: Semantic <select> with descriptive aria-label */
            <div className="sort-select-box">
              <label htmlFor="product-sort-select" className="visually-hidden">
                Sort catalog products by
              </label>
              <span className="sort-prefix-label" aria-hidden="true">Sort:</span>
              <select
                id="product-sort-select"
                className="semantic-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          ) : (
            /* Inaccessible: Custom <div> dropdown not focusable via Tab or Arrow keys (WCAG 2.1.1) */
            <div className="fake-sort-dropdown">
              <span className="sort-prefix-label">Sort:</span>
              <div className="fake-sort-trigger">
                <span>
                  {sortBy === 'featured' && 'Featured Picks'}
                  {sortBy === 'price-low' && 'Price: Low to High'}
                  {sortBy === 'price-high' && 'Price: High to Low'}
                  {sortBy === 'rating' && 'Top Customer Rated'}
                </span>
                <span className="caret">▾</span>
              </div>
              {highlightIssues && (
                <span className="a11y-pill-tag" title="WCAG 2.1.1 & 4.1.2: Custom div sort dropdown not keyboard focusable or operable">
                  [Div Select]
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
