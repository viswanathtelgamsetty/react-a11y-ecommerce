import React, { useState, useMemo } from 'react';
import axe from 'axe-core';
import { PRODUCTS, CATEGORIES } from './data/products';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

// E-commerce store components
import AnnouncementBar from './components/ecommerce/AnnouncementBar';
import Navbar from './components/ecommerce/Navbar';
import Footer from './components/ecommerce/Footer';
import ProductQuickViewModal from './components/ecommerce/ProductQuickViewModal';
import CartDrawer from './components/ecommerce/CartDrawer';
import CheckoutModal from './components/ecommerce/CheckoutModal';
import ToastContainer from './components/ecommerce/ToastContainer';

// A11y testing suite components
import A11yControlBar from './components/a11y/A11yControlBar';
import BugExplorerModal from './components/a11y/BugExplorerModal';
import LiveAxeModal from './components/a11y/LiveAxeModal';
import FocusVisualizer from './components/a11y/FocusVisualizer';

import './App.css';

export default function App() {
  // Accessibility Testing Mode:
  // false = Inaccessible (Flawed E-Commerce Store with real WCAG violations for testing)
  // true = Accessible (Remediated WCAG-compliant Store)
  const [isAccessible, setIsAccessible] = useState(false);
  const [highlightIssues, setHighlightIssues] = useState(false);

  // Active page routing: 'home' | 'products' | 'product-detail'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Catalog filters & search state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      price: PRODUCTS[0].price,
      image: PRODUCTS[0].image,
      selectedColor: 'Matte Black',
      quantity: 1,
    },
  ]);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState(['prod-1', 'prod-4']);

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBugExplorerOpen, setIsBugExplorerOpen] = useState(false);
  const [isLiveAxeOpen, setIsLiveAxeOpen] = useState(false);

  // Axe-Core live scanning state
  const [isScanningAxe, setIsScanningAxe] = useState(false);
  const [axeResults, setAxeResults] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Run live in-browser Axe scan
  const handleRunAxeAudit = async () => {
    setIsScanningAxe(true);
    try {
      const res = await axe.run(document.body, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      });
      setAxeResults(res);
      setIsLiveAxeOpen(true);
    } catch (err) {
      console.error('Axe audit error:', err);
    } finally {
      setIsScanningAxe(false);
    }
  };

  // Navigation handler
  const handleNavigate = (page, options = {}) => {
    if (options.category) {
      setSelectedCategory(options.category);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.stockStatus === 'in-stock');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, inStockOnly, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product, selectedColor = 'Standard', quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedColor,
          quantity,
        },
      ];
    });

    addToast(`Added ${quantity}x "${product.name}" (${selectedColor}) to your cart!`, 'success');
  };

  const handleUpdateQuantity = (productId, selectedColor, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, selectedColor);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId, selectedColor) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.selectedColor === selectedColor))
    );
    addToast('Item removed from cart.', 'info');
  };

  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      const isSaved = prev.includes(productId);
      const next = isSaved ? prev.filter((id) => id !== productId) : [...prev, productId];
      const prod = PRODUCTS.find((p) => p.id === productId);
      addToast(
        isSaved ? `Removed ${prod?.name} from wishlist.` : `Saved ${prod?.name} to wishlist!`,
        'info'
      );
      return next;
    });
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setDiscountPercent(0);
    addToast('Order confirmed! Receipt sent to your email.', 'success');
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountTotal = (cartSubtotal * discountPercent) / 100;
  const shippingCharge = cartSubtotal > 50 || cartSubtotal === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, cartSubtotal - discountTotal + shippingCharge);

  return (
    <div className={`store-app ${isAccessible ? 'mode-accessible' : 'mode-inaccessible'}`}>
      {/* Skip Link (WCAG 2.4.1) */}
      {isAccessible && (
        <a href="#main-store-page-content" className="skip-link">
          Skip to main page content
        </a>
      )}

      {/* Announcement Ticker */}

      {/* Top Promotional Announcement Ticker */}
      <AnnouncementBar
        isAccessible={isAccessible}
        highlightIssues={highlightIssues}
      />

      {/* Store Navigation Bar (Header) */}
      <Navbar
        isAccessible={isAccessible}
        highlightIssues={highlightIssues}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          handleNavigate('products');
          addToast(`You have ${wishlistIds.length} items in your wishlist!`, 'info');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={CATEGORIES}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area Rendering Current Page */}
      <main id="main-store-page-content">
        {currentPage === 'home' && (
          <HomePage
            featuredProducts={PRODUCTS}
            isAccessible={isAccessible}
            highlightIssues={highlightIssues}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            products={filteredProducts}
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            inStockOnly={inStockOnly}
            onToggleInStock={setInStockOnly}
            searchQuery={searchQuery}
            onResetFilters={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setInStockOnly(false);
              setSortBy('featured');
            }}
            isAccessible={isAccessible}
            highlightIssues={highlightIssues}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct || PRODUCTS[0]}
            isAccessible={isAccessible}
            highlightIssues={highlightIssues}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct?.id || PRODUCTS[0].id)}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Store Footer */}
      <Footer
        isAccessible={isAccessible}
        highlightIssues={highlightIssues}
        onSubscribe={(email) => {
          addToast(`Subscribed ${email} to AuraStore newsletter!`, 'success');
        }}
      />

      {/* Interactive Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isAccessible={isAccessible}
        highlightIssues={highlightIssues}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        isAccessible={isAccessible}
        highlightIssues={highlightIssues}
        discountPercent={discountPercent}
        onApplyCoupon={(pct) => setDiscountPercent(pct)}
      />

      {/* 3-Step Checkout Flow Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        totalAmount={grandTotal}
        isAccessible={isAccessible}
        highlightIssues={highlightIssues}
        onOrderComplete={handleOrderComplete}
      />

      {/* Floating Bug Directory Modal */}
      <BugExplorerModal
        isOpen={isBugExplorerOpen}
        onClose={() => setIsBugExplorerOpen(false)}
      />

      {/* Live In-Browser Axe Audit Modal */}
      <LiveAxeModal
        isOpen={isLiveAxeOpen}
        onClose={() => setIsLiveAxeOpen(false)}
        auditResults={axeResults}
        isScanning={isScanningAxe}
        onRerun={handleRunAxeAudit}
        isAccessibleMode={isAccessible}
      />


      {/* Dynamic Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
        isAccessible={isAccessible}
        highlightIssues={highlightIssues}
      />
    </div>
  );
}
