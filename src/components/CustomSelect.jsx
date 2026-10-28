import React, { useState, useRef, useEffect } from 'react';

const OPTIONS = [
  { value: 'us', label: 'United States (+1)' },
  { value: 'uk', label: 'United Kingdom (+44)' },
  { value: 'ca', label: 'Canada (+1)' },
  { value: 'de', label: 'Germany (+49)' },
  { value: 'in', label: 'India (+91)' },
  { value: 'jp', label: 'Japan (+81)' },
];

export default function CustomSelect({ isAccessible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const triggerRef = useRef(null);
  const listboxRef = useRef(null);

  const selectedOption = OPTIONS[selectedIdx];

  // Accessible keyboard handler
  const handleKeyDown = (e) => {
    if (!isAccessible) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          setSelectedIdx(highlightedIdx);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIdx((prev) => (prev < OPTIONS.length - 1 ? prev + 1 : prev));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIdx((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIdx(selectedIdx);
    }
  }, [isOpen, selectedIdx]);

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests custom interactive controls: keyboard navigation (Arrow Up/Down, Enter, Esc), ARIA combobox pattern, focus management, and screen reader announcements.
      </p>

      <div className="custom-select-container">
        {isAccessible ? (
          /* ACCESSIBLE SELECT WITH ARIA COMBOBOX / LISTBOX */
          <>
            <label id="country-select-label" className="form-label">
              Select Your Country Region
            </label>
            <div className="select-wrapper">
              <button
                ref={triggerRef}
                type="button"
                id="country-select-btn"
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-labelledby="country-select-label country-select-btn"
                aria-controls="country-listbox"
                className="select-trigger"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
              >
                <span>{selectedOption.label}</span>
                <span aria-hidden="true" className="select-arrow">
                  {isOpen ? '▲' : '▼'}
                </span>
              </button>

              {isOpen && (
                <ul
                  id="country-listbox"
                  ref={listboxRef}
                  role="listbox"
                  aria-labelledby="country-select-label"
                  tabIndex={-1}
                  className="select-options-list"
                >
                  {OPTIONS.map((opt, idx) => (
                    <li
                      key={opt.value}
                      id={`option-${idx}`}
                      role="option"
                      aria-selected={idx === selectedIdx}
                      className={`select-option ${idx === highlightedIdx ? 'option-highlighted' : ''} ${
                        idx === selectedIdx ? 'option-selected' : ''
                      }`}
                      onClick={() => {
                        setSelectedIdx(idx);
                        setIsOpen(false);
                        triggerRef.current?.focus();
                      }}
                      onMouseEnter={() => setHighlightedIdx(idx)}
                    >
                      {opt.label}
                      {idx === selectedIdx && <span aria-hidden="true"> ✓</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          /* INACCESSIBLE SELECT:
             - Uses <div> with onClick
             - Not focusable (no tabindex)
             - No keyboard support (arrows don't work, enter doesn't work)
             - No role="combobox", no role="listbox", no role="option"
             - No aria-expanded or aria-selected
          */
          <>
            <div className="form-label-fake">Select Your Country Region</div>
            <div className="select-wrapper">
              <div
                className="select-trigger"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer' }}
              >
                <span>{selectedOption.label}</span>
                <span className="select-arrow">{isOpen ? '▲' : '▼'}</span>
              </div>

              {isOpen && (
                <div className="select-options-list">
                  {OPTIONS.map((opt, idx) => (
                    <div
                      key={opt.value}
                      className="select-option"
                      onClick={() => {
                        setSelectedIdx(idx);
                        setIsOpen(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
