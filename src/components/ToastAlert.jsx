import React, { useState, useEffect } from 'react';

export default function ToastAlert({ isAccessible }) {
  const [toast, setToast] = useState(null);

  const showToast = (type) => {
    const newToast = {
      id: Date.now(),
      type,
      message:
        type === 'success'
          ? 'Payment processed successfully! Transaction ID: #88219'
          : 'Security Warning: Unusual login detected from new IP address.',
    };
    setToast(newToast);

    // Inaccessible version auto-dismisses quickly (2 seconds) without pause option
    if (!isAccessible) {
      setTimeout(() => {
        setToast(null);
      }, 2000);
    }
  };

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests dynamic status notifications (WCAG 4.1.3), `aria-live` regions, timing adjustments (WCAG 2.2.1), and dismissible controls.
      </p>

      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => showToast('success')}
        >
          Trigger Success Toast
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={() => showToast('warning')}
        >
          Trigger Warning Toast
        </button>
      </div>

      {/* Accessible live region is always in the DOM so assistive tech listens for updates */}
      {isAccessible ? (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="toast-container"
        >
          {toast && (
            <div className={`toast toast-${toast.type}`}>
              <div className="toast-body">
                <strong>{toast.type === 'success' ? 'Success: ' : 'Warning: '}</strong>
                {toast.message}
              </div>
              <button
                type="button"
                className="toast-close-btn"
                onClick={() => setToast(null)}
                aria-label={`Dismiss ${toast.type} notification`}
              >
                &times;
              </button>
            </div>
          )}
        </div>
      ) : (
        /* INACCESSIBLE TOAST:
           - Injected without aria-live or role="status" / "alert"
           - Auto-disappears in 2s (screen reader never announces)
           - Close button has no role or aria-label
        */
        <div className="toast-container">
          {toast && (
            <div className={`toast toast-${toast.type}`}>
              <div className="toast-body">{toast.message}</div>
              <span
                className="toast-close-btn"
                onClick={() => setToast(null)}
                style={{ cursor: 'pointer' }}
              >
                &times;
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
