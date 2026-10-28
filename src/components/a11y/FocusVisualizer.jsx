import React, { useState, useEffect } from 'react';

export default function FocusVisualizer({ enabled = true }) {
  const [focusedInfo, setFocusedInfo] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    const handleFocusIn = (e) => {
      const el = e.target;
      if (!el || el === document.body) {
        setFocusedInfo(null);
        return;
      }

      const tagName = el.tagName.toLowerCase();
      const role = el.getAttribute('role') || 'implicit';
      const id = el.id ? `#${el.id}` : '';
      const ariaLabel = el.getAttribute('aria-label');
      const textContent = (el.innerText || el.textContent || '').trim().slice(0, 40);
      const accessibleName = ariaLabel || textContent || (el.placeholder ? `Placeholder: "${el.placeholder}"` : 'None');

      setFocusedInfo({
        tag: tagName,
        id,
        role,
        accessibleName,
        hasNoName: !ariaLabel && !textContent && !el.getAttribute('aria-labelledby') && !el.title,
      });
    };

    const handleFocusOut = () => {
      // Small timeout in case focus moves immediately to another element
      setTimeout(() => {
        if (!document.activeElement || document.activeElement === document.body) {
          setFocusedInfo(null);
        }
      }, 100);
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, [enabled]);

  if (!enabled || !focusedInfo) return null;

  return (
    <div className="focus-tracker-pill" aria-hidden="true">
      <span className="tracker-label">⌨️ Active Focus:</span>
      <code className="tracker-tag">&lt;{focusedInfo.tag}{focusedInfo.id}&gt;</code>
      <span className="tracker-role">role: {focusedInfo.role}</span>
      <span className={`tracker-name ${focusedInfo.hasNoName ? 'name-missing' : ''}`}>
        Name: "{focusedInfo.accessibleName}"
      </span>
      {focusedInfo.hasNoName && (
        <span className="tracker-warning" title="Element has no accessible name for assistive technology!">
          ⚠️ Missing Accessible Name
        </span>
      )}
    </div>
  );
}
