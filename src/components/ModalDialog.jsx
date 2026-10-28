import React, { useState, useEffect, useRef } from 'react';

export default function ModalDialog({ isAccessible }) {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Accessible keyboard trap and Escape handler
  useEffect(() => {
    if (!isAccessible || !isOpen) return;

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        openButtonRef.current?.focus();
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isAccessible, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (isAccessible) {
      // Restore focus to trigger
      openButtonRef.current?.focus();
    }
  };

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests keyboard focus containment, ARIA dialog roles, modal labeling, and Escape key handling.
      </p>

      {/* Trigger Button */}
      {isAccessible ? (
        <button
          ref={openButtonRef}
          type="button"
          className="btn btn-primary"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
        >
          Open Account Deletion Modal
        </button>
      ) : (
        /* Inaccessible: div with onclick, no type, no keyboard handler */
        <div
          ref={openButtonRef}
          className="btn btn-primary"
          onClick={() => setIsOpen(true)}
          style={{ display: 'inline-block', cursor: 'pointer' }}
        >
          Open Account Deletion Modal
        </div>
      )}

      {/* Modal Dialog Rendering */}
      {isOpen && (
        <>
          {isAccessible ? (
            /* ACCESSIBLE MODAL */
            <div className="modal-backdrop" onClick={handleClose}>
              <div
                ref={modalRef}
                className="modal-container"
                role="dialog"
                aria-modal="true"
                aria-labelledby="accessible-modal-title"
                aria-describedby="accessible-modal-desc"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3 id="accessible-modal-title" className="modal-title">
                    Confirm Account Deletion
                  </h3>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="modal-close-btn"
                    onClick={handleClose}
                    aria-label="Close confirmation dialog"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p id="accessible-modal-desc">
                    Are you sure you want to permanently delete your account? This action cannot be undone.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      alert('Account deleted.');
                      handleClose();
                    }}
                  >
                    Yes, Delete My Account
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* INACCESSIBLE MODAL:
               - No role="dialog" or aria-modal="true"
               - No aria-labelledby
               - Focus escapes modal into page behind
               - Escape key does nothing
               - Close button is an unlabelled span with onclick
            */
            <div className="modal-backdrop">
              <div className="modal-container">
                <div className="modal-header">
                  <div className="modal-title" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    Confirm Account Deletion
                  </div>
                  {/* Inaccessible close button: span with no role, no tabindex, no aria-label */}
                  <span
                    className="modal-close-btn"
                    onClick={handleClose}
                    style={{ cursor: 'pointer' }}
                  >
                    &times;
                  </span>
                </div>
                <div className="modal-body">
                  <div>
                    Are you sure you want to permanently delete your account? This action cannot be undone.
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="btn btn-secondary" onClick={handleClose} style={{ cursor: 'pointer' }}>
                    Cancel
                  </div>
                  <div
                    className="btn btn-danger"
                    onClick={() => {
                      alert('Account deleted.');
                      handleClose();
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Yes, Delete My Account
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
