import React, { useState } from 'react';

export default function A11yControlBar({
  isAccessible,
  onToggleAccessible,
  highlightIssues,
  onToggleHighlight,
  onOpenBugExplorer,
  onRunAxeAudit,
  isScanningAxe,
  axeSummary,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`a11y-suite-bar ${collapsed ? 'bar-collapsed' : ''}`}
      aria-label="Accessibility Testing Toolbar"
    >
      {collapsed ? (
        <button
          type="button"
          className="suite-reopen-btn"
          onClick={() => setCollapsed(false)}
          title="Open Accessibility Testing Suite Controls"
        >
          🛠️ A11y Test Controls
          {axeSummary && (
            <span className="badge-mini-count">{axeSummary.violationsCount}</span>
          )}
        </button>
      ) : (
        <div className="suite-bar-container">
          {/* Brand & Status */}
          <div className="suite-title-group">
            <span className="suite-icon" aria-hidden="true">♿</span>
            <div>
              <div className="suite-heading">A11y Testing Control Suite</div>
              <div className="suite-caption">
                Auditing Real E-Commerce Storefront
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="suite-mode-switch-group">
            <span className="switch-label">Storefront State:</span>
            <div className="mode-toggle-pill">
              <button
                type="button"
                className={`toggle-option ${!isAccessible ? 'active-flawed' : ''}`}
                onClick={() => onToggleAccessible(false)}
                title="Enable deliberate WCAG 2.1 / 2.2 accessibility violations for testing"
              >
                ⚠️ Flawed (Inaccessible)
              </button>
              <button
                type="button"
                className={`toggle-option ${isAccessible ? 'active-clean' : ''}`}
                onClick={() => onToggleAccessible(true)}
                title="Enable remediated WCAG-compliant accessible implementations"
              >
                ✅ Remediated (Accessible)
              </button>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="suite-actions-group">
            {/* Run Live Axe Audit */}
            <button
              type="button"
              className="suite-tool-btn btn-audit"
              onClick={onRunAxeAudit}
              disabled={isScanningAxe}
            >
              {isScanningAxe ? '⏳ Auditing DOM...' : '⚡ Run Live Axe Audit'}
              {axeSummary && !isScanningAxe && (
                <span className={`suite-badge ${axeSummary.violationsCount > 0 ? 'badge-danger' : 'badge-success'}`}>
                  {axeSummary.violationsCount} violations
                </span>
              )}
            </button>

            {/* A11y Bug Directory / Manual */}
            <button
              type="button"
              className="suite-tool-btn btn-directory"
              onClick={onOpenBugExplorer}
            >
              🐞 Bug Directory (15 Issues)
            </button>

            {/* Highlight Defect Badges */}
            <button
              type="button"
              className={`suite-tool-btn btn-highlight ${highlightIssues ? 'active' : ''}`}
              onClick={onToggleHighlight}
              title="Show or hide visual badges on elements containing accessibility defects"
            >
              🎯 {highlightIssues ? 'Hide Defect Badges' : 'Show Defect Badges'}
            </button>

            {/* Collapse Toolbar */}
            <button
              type="button"
              className="suite-collapse-btn"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse accessibility testing bar"
              title="Collapse toolbar for unobstructed viewport testing"
            >
              ▲ Minimize
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
