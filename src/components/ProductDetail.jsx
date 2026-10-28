import React, { useState } from 'react';

const PRODUCT_DATA = {
  id: 'soundmax-pro',
  name: 'Aura SoundMax Pro Wireless ANC Headphones',
  tagline: 'Studio-Grade 40mm Beryllium Drivers with Hybrid 45dB Active Noise Cancellation',
  price: 249.99,
  originalPrice: 299.99,
  rating: 4.8,
  reviewCount: 128,
  stockStatus: 'in-stock',
  stockCount: 4,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
  ],
  colors: [
    { name: 'Matte Black', hex: '#1e293b' },
    { name: 'Platinum Silver', hex: '#cbd5e1' },
    { name: 'Midnight Navy', hex: '#1e3a8a' },
  ],
  specs: [
    { label: 'Acoustic Driver', aura: '40mm Custom Beryllium', competitor: '40mm Standard Mylar' },
    { label: 'Active Noise Cancellation', aura: 'Hybrid 4-Mic (45dB)', competitor: 'Standard 2-Mic (28dB)' },
    { label: 'Battery Life', aura: '55 Hours (ANC On)', competitor: '30 Hours' },
    { label: 'Wireless Connectivity', aura: 'Bluetooth 5.3 + LDAC', competitor: 'Bluetooth 5.0 (SBC only)' },
    { label: 'Fast Charge', aura: '10 min = 5 hours', competitor: '15 min = 2 hours' },
    { label: 'Weight & Ergonomics', aura: '250g Memory Foam', competitor: '290g Synthetic Foam' },
  ],
  reviews: [
    {
      author: 'Marcus Vance',
      date: 'October 14, 2026',
      rating: 5,
      title: 'Flawless soundstage and incredible isolation',
      comment: 'The noise cancellation completely blocks subway rumble and chatter. Beryllium drivers make classical strings and deep bass crisp.',
    },
    {
      author: 'Elena Rostova',
      date: 'October 21, 2026',
      rating: 5,
      title: 'Best productivity headset for remote work',
      comment: 'Multipoint Bluetooth switches seamlessly between my MacBook and iPhone. Battery lasts over a full week of daily Zoom meetings.',
    },
    {
      author: 'David Chen',
      date: 'October 24, 2026',
      rating: 4,
      title: 'Remarkable comfort, very plush ear cushions',
      comment: 'No clamping pressure on glasses. Highly recommend picking up the travel hardcase as well.',
    },
  ],
};

export default function ProductDetail({ onAddToCart }) {
  const [selectedImage, setSelectedImage] = useState(PRODUCT_DATA.images[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCT_DATA.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [showToast, setShowToast] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [formErrors, setFormErrors] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerEmail.trim() || !reviewText.trim()) {
      setFormErrors(true);
      return;
    }
    setFormErrors(false);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setReviewSubmitted(false);
      setReviewerName('');
      setReviewerEmail('');
      setReviewText('');
    }, 1800);
  };

  return (
    <main className="product-detail-main">
      {showToast && (
        <div className="cart-toast-banner">
          <span className="toast-icon">✓</span>
          <span className="toast-msg">Aura SoundMax Pro added to your cart!</span>
        </div>
      )}

      <div className="product-breadcrumbs">
        <span className="breadcrumb-item">Home</span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-item">Audio</span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current">Aura SoundMax Pro</span>
      </div>

      <div className="product-layout-grid">
        <div className="product-gallery-col">
          <div className="main-image-container">
            <img src={selectedImage} alt="image" className="main-image" />
          </div>

          <div className="thumbnails-row">
            {PRODUCT_DATA.images.map((img, idx) => (
              <div
                key={idx}
                className={`thumb-wrapper ${selectedImage === img ? 'thumb-active' : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} className="thumbnail-img" />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info-col">
          <h1 className="product-title">{PRODUCT_DATA.name}</h1>
          <h4 className="product-tagline">{PRODUCT_DATA.tagline}</h4>

          <div className="rating-container">
            <span className="rating-stars">★★★★☆</span>
            <span className="rating-score">4.8</span>
            <span className="rating-count">({PRODUCT_DATA.reviewCount} customer reviews)</span>
          </div>

          <div className="pricing-box">
            <span className="price-current">${PRODUCT_DATA.price}</span>
            <span className="price-original">${PRODUCT_DATA.originalPrice}</span>
            <span className="price-badge">Save $50</span>
          </div>

          <div className="stock-status-row">
            <span className="stock-status-dot dot-green"></span>
            <span className="stock-status-text">In Stock & Ready to Ship</span>
          </div>

          <hr className="divider-line" />

          <div className="color-section">
            <div className="section-label">Color: {selectedColor}</div>
            <div className="swatches-list">
              {PRODUCT_DATA.colors.map((c) => (
                <div
                  key={c.name}
                  className={`color-swatch ${selectedColor === c.name ? 'swatch-selected' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColor(c.name)}
                ></div>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <div className="section-label">Quantity:</div>
            <div className="stepper-box">
              <div
                className="stepper-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </div>
              <span className="stepper-value">{quantity}</span>
              <div
                className="stepper-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </div>
            </div>
          </div>

          <div className="action-buttons-group">
            <button
              type="button"
              className="btn-add-cart"
              onClick={handleAddToCart}
            >
              Add to Cart • ${(PRODUCT_DATA.price * quantity).toFixed(2)}
            </button>

            <button type="button" className="btn-buy-now">
              Buy Now
            </button>
          </div>

          <div className="secondary-actions">
            <button
              type="button"
              className="btn-text-action"
              onClick={() => setIsModalOpen(true)}
            >
              ✍️ Write a Customer Review
            </button>
            <span className="action-dot">•</span>
            <a href="#warranty" className="btn-text-link">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="product-tabs-wrapper">
        <div className="tabs-nav-bar">
          <a
            href="#overview"
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
            }}
          >
            Overview & Features
          </a>
          <a
            href="#specs"
            className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('specs');
            }}
          >
            Technical Specifications
          </a>
          <a
            href="#reviews"
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('reviews');
            }}
          >
            Customer Reviews ({PRODUCT_DATA.reviewCount})
          </a>
        </div>

        <div className="tab-panels-container">
          <div className={`tab-panel ${activeTab === 'overview' ? 'panel-visible' : 'panel-ghost'}`}>
            <h3 className="tab-heading">Architected for Acoustic Perfection</h3>
            <p className="tab-paragraph">
              The Aura SoundMax Pro sets a new benchmark for wireless consumer audio. Engineered with custom 40mm beryllium-coated dynamic transducers, it yields visceral sub-bass depth while preserving pristine high-frequency shimmer with under 0.05% total harmonic distortion.
            </p>
            <ul className="features-checklist">
              <li>✓ Quad-microphone hybrid Active Noise Cancellation silences up to 45dB of ambient noise</li>
              <li>✓ Advanced multipoint pairing keeps you connected to your laptop and mobile device simultaneously</li>
              <li>✓ Memory foam ear cushions upholstered in breathable protein leather for all-day comfort</li>
              <li>✓ 55 hours continuous playback on single charge; fast charge gives 5 hours in 10 minutes</li>
            </ul>
            <div className="tab-links-row">
              <a href="#download" className="ambiguous-link">Click Here</a>
              <a href="#manual" className="ambiguous-link">Download</a>
              <a href="#compare" className="ambiguous-link">Details</a>
            </div>
          </div>

          <div className={`tab-panel ${activeTab === 'specs' ? 'panel-visible' : 'panel-ghost'}`}>
            <h3 className="tab-heading">Hardware Benchmark & Specifications</h3>
            
            <div className="div-table-wrapper">
              <div className="div-table-header">
                <div className="div-th-cell col-feature">Hardware Feature</div>
                <div className="div-th-cell col-aura">Aura SoundMax Pro</div>
                <div className="div-th-cell col-comp">Industry Competitors</div>
              </div>

              {PRODUCT_DATA.specs.map((s, idx) => (
                <div key={idx} className="div-table-row">
                  <div className="div-td-cell col-feature">{s.label}</div>
                  <div className="div-td-cell col-aura">{s.aura}</div>
                  <div className="div-td-cell col-comp">{s.competitor}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`tab-panel ${activeTab === 'reviews' ? 'panel-visible' : 'panel-ghost'}`}>
            <div className="reviews-header-strip">
              <div>
                <h3 className="tab-heading">Verified Buyer Testimonials</h3>
                <p className="reviews-sub">Average Rating: 4.8 / 5.0 based on 128 verified purchases</p>
              </div>
              <button
                type="button"
                className="btn-secondary-action"
                onClick={() => setIsModalOpen(true)}
              >
                Write a Review
              </button>
            </div>

            <div className="reviews-list">
              {PRODUCT_DATA.reviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-top-line">
                    <span className="reviewer-name">{r.author}</span>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <div className="review-stars">★★★★★</div>
                  <h4 className="review-title">{r.title}</h4>
                  <p className="review-body">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog-box">
            <div className="modal-header">
              <span className="modal-heading-text">Write a Customer Review</span>
              <div
                className="modal-close-icon"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </div>
            </div>

            {reviewSubmitted ? (
              <div className="modal-success-state">
                <span className="success-icon">✓</span>
                <p>Thank you! Your verified review has been submitted for approval.</p>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleReviewSubmit}>
                <div className="modal-field">
                  <input
                    type="text"
                    className={`modal-input ${formErrors && !reviewerName.trim() ? 'input-error' : ''}`}
                    placeholder="Your Full Name *"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                  />
                </div>

                <div className="modal-field">
                  <input
                    type="email"
                    className={`modal-input ${formErrors && !reviewerEmail.trim() ? 'input-error' : ''}`}
                    placeholder="Your Email Address *"
                    value={reviewerEmail}
                    onChange={(e) => setReviewerEmail(e.target.value)}
                  />
                </div>

                <div className="modal-field">
                  <textarea
                    rows={4}
                    className={`modal-textarea ${formErrors && !reviewText.trim() ? 'input-error' : ''}`}
                    placeholder="Share your thoughts on sound quality, comfort, and battery life... *"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  ></textarea>
                </div>

                <div className="modal-actions-row">
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-modal-submit">
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
