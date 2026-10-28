import React, { useState, useEffect } from 'react';

const MESSAGES = [
  '⚡ Flash Sale: Use coupon code A11Y20 for 20% off your entire order!',
  '📦 Free Expedited 2-Day Shipping on all orders over $50 in the US',
  '🛡️ 30-Day Risk-Free In-Home Audio Trial + 2-Year Full Manufacturer Warranty',
];

export default function AnnouncementBar({ isAccessible, highlightIssues }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // In inaccessible mode, always auto-rotates with no pause control
    if (isAccessible && isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAccessible, isPaused]);

  return (
    <div
      className={`announcement-bar ${isAccessible ? 'announcement-accessible' : 'announcement-inaccessible'} ${
        highlightIssues && !isAccessible ? 'a11y-flagged-border' : ''
      }`}
      onMouseEnter={() => isAccessible && setIsPaused(true)}
      onMouseLeave={() => isAccessible && setIsPaused(false)}
      onFocus={() => isAccessible && setIsPaused(true)}
      onBlur={() => isAccessible && setIsPaused(false)}
      role={isAccessible ? 'region' : undefined}
      aria-label={isAccessible ? 'Promotions Announcement' : undefined}
    >
      <div className="announcement-content">
        <span className="announcement-icon" aria-hidden={isAccessible ? 'true' : undefined}>
          📢
        </span>
        <p
          className="announcement-text"
          aria-live={isAccessible ? 'polite' : undefined}
          aria-atomic={isAccessible ? 'true' : undefined}
        >
          {MESSAGES[currentIndex]}
        </p>

        {/* Accessible Mode includes Pause/Play button (WCAG 2.2.2 Pause, Stop, Hide) */}
        {isAccessible ? (
          <button
            type="button"
            className="announcement-pause-btn"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume auto-rotating promotional messages' : 'Pause auto-rotating promotional messages'}
          >
            {isPaused ? '▶ Play' : '⏸ Pause'}
          </button>
        ) : highlightIssues ? (
          <span className="a11y-badge a11y-badge-warning" title="WCAG 2.2.2: Auto-rotating with no pause control, and WCAG 1.4.3: Low contrast">
            [No Pause / Low Contrast]
          </span>
        ) : null}
      </div>
    </div>
  );
}
