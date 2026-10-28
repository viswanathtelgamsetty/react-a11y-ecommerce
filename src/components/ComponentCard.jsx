import React, { useState } from 'react';

export default function ComponentCard({
  title,
  index,
  wcagTags,
  issuesSummary,
  fixSummary,
  keyboardTips,
  isAccessible,
  onToggleAccessible,
  children,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`comp-card ${isAccessible ? 'comp-card-accessible' : 'comp-card-inaccessible'}`}>
      <div className="comp-card-header">
        <div className="comp-header-main">
          <div className="comp-index-badge">#{index}</div>
          <div>
            <h2 className="comp-title">{title}</h2>
            <div className="comp-tags-row">
              {wcagTags.map((tag, i) => (
                <span key={i} className="wcag-badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="comp-controls">
          <div className="toggle-mode-group">
            <span className={`mode-label ${!isAccessible ? 'mode-active-bad' : ''}`}>
              Inaccessible
            </span>
            <button
              type="button"
              className={`mode-switch-btn ${isAccessible ? 'switch-accessible' : 'switch-inaccessible'}`}
              onClick={onToggleAccessible}
              aria-label={`Toggle accessibility mode for ${title}. Currently ${
                isAccessible ? 'Accessible' : 'Inaccessible'
              }`}
            >
              <span className="mode-switch-handle" />
            </button>
            <span className={`mode-label ${isAccessible ? 'mode-active-good' : ''}`}>
              Accessible
            </span>
          </div>

          <button
            type="button"
            className="btn btn-outline-info btn-xs"
            onClick={() => setShowDetails(!showDetails)}
            aria-expanded={showDetails}
          >
            {showDetails ? 'Hide Guide' : 'A11y Breakdown'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="comp-guide-drawer">
          <div className="guide-grid">
            <div className="guide-column guide-bad">
              <h4>❌ Inaccessible Flaws (Violations)</h4>
              <ul>
                {issuesSummary.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="guide-column guide-good">
              <h4>✅ Accessible Implementation (Fixes)</h4>
              <ul>
                {fixSummary.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {keyboardTips && (
            <div className="guide-keyboard-tips">
              <strong>⌨️ Testing Tips:</strong> {keyboardTips}
            </div>
          )}
        </div>
      )}

      <div className="comp-card-body">{children}</div>
    </div>
  );
}
