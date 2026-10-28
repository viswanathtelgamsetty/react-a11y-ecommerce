import React, { useState } from 'react';

export default function Footer({ isAccessible, highlightIssues, onSubscribe }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    if (onSubscribe) onSubscribe(email);
  };

  return (
    <footer
      className={`store-footer ${isAccessible ? 'footer-accessible' : 'footer-inaccessible'} ${
        highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''
      }`}
      role={isAccessible ? 'contentinfo' : undefined}
    >
      <div className="footer-top-grid">
        {/* Brand & Newsletter Column */}
        <div className="footer-col footer-brand-col">
          <div className="footer-logo">⚡ AuraStore</div>
          <p className="footer-bio">
            Pioneering premium consumer audio, ergonomic hardware, and wellness wearables. Designed for discerning sound engineers and digital creators.
          </p>

          <div className="newsletter-box">
            <h4 className="newsletter-title">Subscribe to The Aura Insider</h4>
            <p className="newsletter-desc">Get weekly acoustic deep-dives, firmware updates, and private 25% member discounts.</p>

            {subscribed ? (
              <div className="newsletter-success" role={isAccessible ? 'status' : undefined}>
                ✅ Thank you for joining our community!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                {isAccessible ? (
                  <>
                    <label htmlFor="footer-newsletter-input" className="visually-hidden">
                      Email address for newsletter subscription
                    </label>
                    <div className="newsletter-input-wrap">
                      <input
                        id="footer-newsletter-input"
                        type="email"
                        className="newsletter-input"
                        placeholder="Enter your email address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-required="true"
                        autoComplete="email"
                      />
                      <button
                        type="submit"
                        className="btn-primary newsletter-btn"
                        aria-label="Subscribe to newsletter"
                      >
                        Join
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="newsletter-input-wrap">
                    <input
                      type="text"
                      className="newsletter-input"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {highlightIssues && (
                      <span className="a11y-pill-tag tag-micro" title="WCAG 3.3.2: Missing <label> or aria-label on newsletter input">
                        [No Label]
                      </span>
                    )}
                    <button type="submit" className="btn-primary newsletter-btn">
                      Join
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Shop Hardware</h4>
          <ul className="footer-links-list">
            <li><a href="#audio">Over-Ear ANC Headphones</a></li>
            <li><a href="#earbuds">True Wireless Earbuds</a></li>
            <li><a href="#speakers">Waterproof Bluetooth Speakers</a></li>
            <li><a href="#smartwatches">Health & Bio Sensor Watches</a></li>
            <li><a href="#keyboards">Ergonomic Mechanical Keyboards</a></li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Customer Support</h4>
          <ul className="footer-links-list">
            <li><a href="#shipping">Track Order & Delivery Status</a></li>
            <li><a href="#trial">30-Day Risk-Free Trial Info</a></li>
            <li><a href="#warranty">2-Year Manufacturer Warranty</a></li>
            <li><a href="#faq">Frequently Asked Questions</a></li>
            <li><a href="#contact">Contact Audio Engineering Team</a></li>
          </ul>
        </div>

        {/* Social & Policies Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Connect & Community</h4>
          <p className="social-text">Follow our acoustic lab research and community discussions:</p>

          <div className="footer-social-row">
            {isAccessible ? (
              <>
                <a href="#twitter" className="social-icon-btn" aria-label="AuraStore on Twitter / X">
                  𝕏
                </a>
                <a href="#youtube" className="social-icon-btn" aria-label="AuraStore on YouTube sound demonstrations">
                  ▶
                </a>
                <a href="#instagram" className="social-icon-btn" aria-label="AuraStore on Instagram photography">
                  📷
                </a>
                <a href="#github" className="social-icon-btn" aria-label="AuraStore Open Source Audio SDK on GitHub">
                  🐙
                </a>
              </>
            ) : (
              <>
                <a href="#twitter" className="social-icon-btn">𝕏</a>
                <a href="#youtube" className="social-icon-btn">▶</a>
                <a href="#instagram" className="social-icon-btn">📷</a>
                <a href="#github" className="social-icon-btn">🐙</a>
                {highlightIssues && (
                  <span className="a11y-pill-tag tag-micro" title="WCAG 4.1.2: Social icon links lack aria-label or accessible text">
                    [No Social Labels]
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom / Copyright */}
      <div className="footer-bottom-bar">
        <div className={`copyright-text ${isAccessible ? 'text-accessible-contrast' : 'text-low-contrast'}`}>
          © 2026 AuraStore Technologies Inc. All rights reserved. Deliberate accessibility testing sandbox.
        </div>
        {highlightIssues && !isAccessible && (
          <span className="a11y-pill-tag tag-micro" title="WCAG 1.4.3: Low contrast footer text (3.1:1 ratio, failing AA 4.5:1)">
            [Low Contrast]
          </span>
        )}

        <div className="footer-legal-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#accessibility">Accessibility Statement</a>
        </div>
      </div>
    </footer>
  );
}
