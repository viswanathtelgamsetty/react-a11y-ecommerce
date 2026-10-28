import React, { useState } from 'react';

export default function IconButtonBar({ isAccessible }) {
  const [activeActions, setActiveActions] = useState({ liked: false, saved: false, shared: false });

  const toggleAction = (key) => {
    setActiveActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests icon-only buttons (WCAG 4.1.2 accessible name), visible focus rings (WCAG 2.4.7), and decorative icon handling (`aria-hidden`).
      </p>

      <div className="icon-toolbar">
        {isAccessible ? (
          /* ACCESSIBLE ICON BUTTONS */
          <>
            <button
              type="button"
              className={`icon-btn-accessible ${activeActions.liked ? 'is-active' : ''}`}
              aria-label={activeActions.liked ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={activeActions.liked}
              onClick={() => toggleAction('liked')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={activeActions.liked ? '#ef4444' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button
              type="button"
              className={`icon-btn-accessible ${activeActions.saved ? 'is-active' : ''}`}
              aria-label={activeActions.saved ? 'Remove bookmark' : 'Bookmark this article'}
              aria-pressed={activeActions.saved}
              onClick={() => toggleAction('saved')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={activeActions.saved ? '#3b82f6' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            <button
              type="button"
              className="icon-btn-accessible"
              aria-label="Share article via link"
              onClick={() => alert('Link copied to clipboard!')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </>
        ) : (
          /* INACCESSIBLE ICON BUTTONS:
             - Buttons with only SVGs, no text, no aria-label or title
             - Focus outline explicitly suppressed (outline: none)
             - SVGs lack aria-hidden
          */
          <>
            <button
              type="button"
              className="icon-btn-inaccessible"
              onClick={() => toggleAction('liked')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button
              type="button"
              className="icon-btn-inaccessible"
              onClick={() => toggleAction('saved')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            <button
              type="button"
              className="icon-btn-inaccessible"
              onClick={() => alert('Link copied to clipboard!')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
