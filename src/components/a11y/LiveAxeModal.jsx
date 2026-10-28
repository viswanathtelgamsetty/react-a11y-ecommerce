import React from 'react';

export default function LiveAxeModal({
  isOpen,
  onClose,
  auditResults,
  isScanning,
  onRerun,
  isAccessibleMode,
}) {
  if (!isOpen) return null;

  const violations = auditResults?.violations || [];
  const passes = auditResults?.passes || [];

  const critical = violations.filter((v) => v.impact === 'critical');
  const serious = violations.filter((v) => v.impact === 'serious');
  const moderate = violations.filter((v) => v.impact === 'moderate');
  const minor = violations.filter((v) => v.impact === 'minor');

  return (
    <div className="axe-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="axe-modal-card" role="dialog" aria-modal="true" aria-labelledby="axe-report-title">
        {/* Header */}
        <div className="axe-modal-header">
          <div>
            <div className="axe-modal-eyebrow">AUTOMATED ACCESSIBILITY AUDIT ENGINE</div>
            <h2 id="axe-report-title" className="axe-modal-title">
              ⚡ Axe-Core v4.14 Live Page Audit Report
            </h2>
            <p className="axe-modal-subtitle">
              Current Mode: <strong className={isAccessibleMode ? 'text-accessible-green' : 'text-flawed-red'}>
                {isAccessibleMode ? '✅ Remediated (Accessible Storefront)' : '⚠️ Flawed (Inaccessible Storefront)'}
              </strong>
            </p>
          </div>

          <div className="axe-modal-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={onRerun}
              disabled={isScanning}
            >
              {isScanning ? 'Auditing DOM...' : '🔄 Re-Run Audit'}
            </button>
            <button
              type="button"
              className="axe-modal-close"
              onClick={onClose}
              aria-label="Close Audit Report"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Severity Count Summary Strip */}
        <div className="axe-summary-strip">
          <div className="axe-stat-box stat-total">
            <span className="stat-value">{violations.length}</span>
            <span className="stat-label">Total Violations</span>
          </div>
          <div className="axe-stat-box stat-critical">
            <span className="stat-value">{critical.length}</span>
            <span className="stat-label">Critical</span>
          </div>
          <div className="axe-stat-box stat-serious">
            <span className="stat-value">{serious.length}</span>
            <span className="stat-label">Serious</span>
          </div>
          <div className="axe-stat-box stat-moderate">
            <span className="stat-value">{moderate.length}</span>
            <span className="stat-label">Moderate</span>
          </div>
          <div className="axe-stat-box stat-passes">
            <span className="stat-value">{passes.length}</span>
            <span className="stat-label">Rules Passed</span>
          </div>
        </div>

        {/* Violations List */}
        <div className="axe-violations-scroll">
          {violations.length === 0 ? (
            <div className="axe-zero-pass">
              <span className="zero-icon">🎉</span>
              <h3>Zero Accessibility Violations Detected!</h3>
              <p>
                All audited elements conform to WCAG 2.1 Level A and AA standards under Axe-Core rule engine.
              </p>
            </div>
          ) : (
            violations.map((violation) => (
              <div key={violation.id} className="violation-item-card">
                <div className="violation-header">
                  <div className="violation-tags">
                    <span className={`impact-badge impact-${violation.impact || 'minor'}`}>
                      {(violation.impact || 'minor').toUpperCase()}
                    </span>
                    <code className="rule-code">{violation.id}</code>
                    {violation.tags
                      ?.filter((t) => t.startsWith('wcag'))
                      .map((t) => (
                        <span key={t} className="wcag-tag-pill">{t}</span>
                      ))}
                  </div>
                  <h4 className="violation-help-title">{violation.help}</h4>
                </div>

                <p className="violation-desc">{violation.description}</p>
                <div className="violation-help-link">
                  <a href={violation.helpUrl} target="_blank" rel="noopener noreferrer">
                    Read Deque University documentation for {violation.id} ↗
                  </a>
                </div>

                {/* Affected DOM Nodes */}
                <div className="violation-nodes-box">
                  <span className="nodes-title">
                    Affected DOM Nodes ({violation.nodes?.length || 0}):
                  </span>
                  <div className="nodes-list">
                    {violation.nodes?.slice(0, 4).map((node, i) => (
                      <div key={i} className="node-snippet-item">
                        <div className="node-target">
                          Selector: <code>{node.target.join(' > ')}</code>
                        </div>
                        <pre className="node-html">
                          <code>{node.html}</code>
                        </pre>
                        {node.failureSummary && (
                          <div className="node-failure-summary">
                            {node.failureSummary}
                          </div>
                        )}
                      </div>
                    ))}
                    {violation.nodes?.length > 4 && (
                      <div className="nodes-more">
                        + {violation.nodes.length - 4} more matching DOM elements
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
