import React, { useState } from 'react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-container">
        <div className="footer-newsletter-col">
          <span className="footer-brand-title">AuraStore Audio</span>
          <p className="footer-newsletter-desc">
            Subscribe to our weekly audiophile newsletter for insider firmware updates, acoustic engineering papers, and exclusive VIP promotions.
          </p>

          <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className="footer-email-input"
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button type="submit" className="footer-submit-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          {subscribed && (
            <p className="newsletter-success">✓ You have been subscribed to VIP audio drops!</p>
          )}
        </div>

        <div className="footer-links-col">
          <p className="footer-col-header">Products & Gear</p>
          <ul className="footer-links-list">
            <li><a href="#wireless" className="footer-link">Wireless Headphones</a></li>
            <li><a href="#earbuds" className="footer-link">Active Noise Cancelling</a></li>
            <li><a href="#dacs" className="footer-link">Studio Reference DACs</a></li>
            <li><a href="#cables" className="footer-link">Audiophile Cables</a></li>
            <li><a href="#cases" className="footer-link">Hard Shell Travel Cases</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <p className="footer-col-header">Support & Service</p>
          <ul className="footer-links-list">
            <li><a href="#warranty" className="footer-link">2-Year Limited Warranty</a></li>
            <li><a href="#shipping" className="footer-link">Free Worldwide Shipping</a></li>
            <li><a href="#firmware" className="footer-link">Firmware Downloads</a></li>
            <li><a href="#support" className="footer-link">Support</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <p className="footer-col-header">Company</p>
          <ul className="footer-links-list">
            <li><a href="#about" className="footer-link">Acoustic Lab Heritage</a></li>
            <li><a href="#sustainability" className="footer-link">Carbon Neutral Packaging</a></li>
            <li><a href="#careers" className="footer-link">Careers in Audio Engineering</a></li>
            <li><a href="#privacy" className="footer-link">Privacy</a></li>
            <li><a href="#terms" className="footer-link">Terms</a></li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom-container">
        <p className="footer-copyright-text">
          © 2026 AuraStore Audio Labs Inc. All rights reserved. Precision crafted in California.
        </p>

        <div className="region-selector-box">
          <span className="region-current">🇺🇸 USD ($) ▾</span>
          <div className="region-dropdown-menu">
            <span className="region-option">🇪🇺 EUR (€)</span>
            <span className="region-option">🇬🇧 GBP (£)</span>
            <span className="region-option">🇯🇵 JPY (¥)</span>
            <span className="region-option">🇨🇦 CAD ($)</span>
          </div>
        </div>

        <div className="footer-social-row">
          <a href="#" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="#" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
          <a href="#" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
