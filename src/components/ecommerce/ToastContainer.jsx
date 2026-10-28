import React from 'react';

export default function ToastContainer({ toasts, onDismiss, isAccessible, highlightIssues }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className={`toast-container ${isAccessible ? 'toast-wrap-accessible' : 'toast-wrap-inaccessible'}`}
      role={isAccessible ? 'status' : undefined}
      aria-live={isAccessible ? 'polite' : undefined}
      aria-atomic={isAccessible ? 'true' : undefined}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item ${highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''}`}
        >
          <span className="toast-icon" aria-hidden="true">
            {toast.type === 'success' ? '✅' : 'ℹ️'}
          </span>
          <span className="toast-msg">{toast.message}</span>

          {highlightIssues && !isAccessible && (
            <span className="a11y-pill-tag tag-micro" title="WCAG 4.1.3: Message not announced to screen readers (missing role='status' / aria-live)">
              [No Live Region]
            </span>
          )}

          {isAccessible ? (
            <button
              type="button"
              className="toast-dismiss-btn"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          ) : (
            <span
              className="toast-dismiss-fake"
              onClick={() => onDismiss(toast.id)}
            >
              ✕
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
