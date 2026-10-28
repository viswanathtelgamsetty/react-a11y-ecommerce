import React, { useState } from 'react';
import axe from 'axe-core';

export default function AxeAuditPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const runAudit = async () => {
    setIsRunning(true);
    try {
      // Run axe on the current page DOM
      const res = await axe.run(document.body, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      });
      setResults(res);
      setIsOpen(true);
    } catch (err) {
      console.error('Axe audit failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const getImpactBadgeClass = (impact) => {
    switch (impact) {
      case 'critical':
        return 'badge-critical';
      case 'serious':
        return 'badge-serious';
      case 'moderate':
        return 'badge-warning';
      default:
        return 'badge-minor';
    }
  };

  const violations = results?.violations || [];
  const criticalCount = violations.filter((v) => v.impact === 'critical').length;
  const seriousCount = violations.filter((v) => v.impact === 'serious').length;
  const moderateCount = violations.filter((v) => v.impact === 'moderate').length;
  const minorCount = violations.filter((v) => v.impact === 'minor').length;

  return (
    <div className="axe-panel-wrapper">
      <div className="axe-toolbar">
        <div className="axe-toolbar-left">
          <span className="axe-logo-icon">🔍</span>
          <div>
            <strong>Automated Axe-Core A11y Scanner</strong>
            <p className="axe-subtitle">Audit the current page in real time with rules from WCAG 2.1 &amp; 2.2</p>
          </div>
        </div>

        <div className="axe-toolbar-right">
          <button
            type="button"
            className="btn btn-audit"
            onClick={runAudit}
            disabled={isRunning}
          >
            {isRunning ? 'Auditing DOM...' : '⚡ Run Live Axe Audit'}
          </button>
          {results && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? 'Collapse Report' : `View Report (${violations.length})`}
            </button>
          )}
        </div>
      </div>

      {results && (
        <div className="axe-summary-bar">
          <div className="summary-stat stat-total">
            <span className="stat-num">{violations.length}</span>
            <span className="stat-label">Total Violations</span>
          </div>
          <div className="summary-stat stat-critical">
            <span className="stat-num">{criticalCount}</span>
            <span className="stat-label">Critical</span>
          </div>
          <div className="summary-stat stat-serious">
            <span className="stat-num">{seriousCount}</span>
            <span className="stat-label">Serious</span>
          </div>
          <div className="summary-stat stat-moderate">
            <span className="stat-num">{moderateCount}</span>
            <span className="stat-label">Moderate</span>
          </div>
          <div className="summary-stat stat-minor">
            <span className="stat-num">{minorCount}</span>
            <span className="stat-label">Minor</span>
          </div>
        </div>
      )}

      {isOpen && results && (
        <div className="axe-results-container">
          {violations.length === 0 ? (
            <div className="axe-empty-state">
              🎉 No accessibility violations detected! All active components comply with WCAG standards.
            </div>
          ) : (
            <div className="axe-violation-list">
              {violations.map((violation, i) => (
                <div key={i} className="axe-violation-card">
                  <div className="violation-header">
                    <span className={`impact-badge ${getImpactBadgeClass(violation.impact)}`}>
                      {violation.impact?.toUpperCase() || 'INFO'}
                    </span>
                    <span className="violation-id">{violation.id}</span>
                    <a
                      href={violation.helpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="violation-link"
                    >
                      Axe Rule Docs &rarr;
                    </a>
                  </div>
                  <h4 className="violation-help">{violation.help}</h4>
                  <p className="violation-desc">{violation.description}</p>

                  <div className="violation-nodes">
                    <div className="nodes-title">Failing Elements ({violation.nodes.length}):</div>
                    {violation.nodes.map((node, nIdx) => (
                      <div key={nIdx} className="node-item">
                        <code className="node-selector">{node.target.join(' ')}</code>
                        <div className="node-html-snippet">
                          <code>{node.html}</code>
                        </div>
                        {node.failureSummary && (
                          <div className="node-failure-summary">{node.failureSummary}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="violation-tags">
                    {violation.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="wcag-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
