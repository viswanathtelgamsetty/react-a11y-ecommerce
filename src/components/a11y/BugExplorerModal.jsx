import React, { useState } from 'react';
import { WCAG_BUGS } from '../../data/wcagBugs';

export default function BugExplorerModal({ isOpen, onClose }) {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [filterImpact, setFilterImpact] = useState('ALL');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredBugs = WCAG_BUGS.filter((b) => {
    if (filterLevel !== 'ALL' && b.level !== filterLevel) return false;
    if (filterImpact !== 'ALL' && b.impact !== filterImpact) return false;
    if (
      search &&
      !b.title.toLowerCase().includes(search.toLowerCase()) &&
      !b.wcag.toLowerCase().includes(search.toLowerCase()) &&
      !b.area.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bug-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bug-modal-card" role="dialog" aria-modal="true" aria-labelledby="bug-explorer-title">
        {/* Header */}
        <div className="bug-modal-header">
          <div>
            <div className="bug-modal-eyebrow">AUDIT SPECIFICATION & TESTING GUIDE</div>
            <h2 id="bug-explorer-title" className="bug-modal-title">
              🐞 Catalog of 15 Planted E-Commerce Accessibility Issues
            </h2>
            <p className="bug-modal-subtitle">
              Detailed breakdown of deliberate WCAG 2.1 / 2.2 violations across the AuraStore application,
              with exact instructions for testing via Keyboard, VoiceOver / Screen Readers, and Automated Scanners.
            </p>
          </div>
          <button type="button" className="bug-modal-close" onClick={onClose} aria-label="Close Bug Directory">
            ✕
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bug-filters-bar">
          <input
            type="search"
            className="bug-search-input"
            placeholder="Search by bug title, component, or WCAG rule (e.g. 1.1.1, contrast, modal)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="bug-filter-pills">
            <span className="filter-label">Level:</span>
            {['ALL', 'A', 'AA'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`bug-filter-btn ${filterLevel === lvl ? 'active' : ''}`}
                onClick={() => setFilterLevel(lvl)}
              >
                {lvl}
              </button>
            ))}

            <span className="filter-label" style={{ marginLeft: '12px' }}>Impact:</span>
            {['ALL', 'Critical', 'Serious', 'Moderate'].map((imp) => (
              <button
                key={imp}
                type="button"
                className={`bug-filter-btn ${filterImpact === imp ? 'active' : ''}`}
                onClick={() => setFilterImpact(imp)}
              >
                {imp}
              </button>
            ))}
          </div>
        </div>

        {/* Bug Cards List */}
        <div className="bug-cards-scroll">
          {filteredBugs.length === 0 ? (
            <div className="bug-empty">No accessibility issues match your filter criteria.</div>
          ) : (
            filteredBugs.map((bug, index) => (
              <div key={bug.id} className="bug-detail-card">
                <div className="bug-card-top">
                  <div className="bug-badge-row">
                    <span className="bug-num">#{index + 1}</span>
                    <span className="bug-area-tag">{bug.area}</span>
                    <span className="bug-wcag-tag">WCAG {bug.wcag}</span>
                    <span className="bug-level-tag">Level {bug.level}</span>
                    <span className={`bug-impact-tag impact-${bug.impact.toLowerCase()}`}>
                      {bug.impact}
                    </span>
                  </div>
                  <h3 className="bug-title-heading">{bug.title}</h3>
                </div>

                <div className="bug-card-body">
                  <div className="bug-section">
                    <strong className="bug-sec-title">⚠️ Flawed Inaccessible Behavior:</strong>
                    <p className="bug-text">{bug.flawedBehavior}</p>
                  </div>

                  <div className="bug-section">
                    <strong className="bug-sec-title">🧪 How to Test & Reproduce:</strong>
                    <ul className="bug-test-steps">
                      {bug.testingSteps.keyboard && (
                        <li>
                          <strong>⌨️ Keyboard:</strong> {bug.testingSteps.keyboard}
                        </li>
                      )}
                      {bug.testingSteps.screenReader && (
                        <li>
                          <strong>🗣️ Screen Reader (VoiceOver):</strong> {bug.testingSteps.screenReader}
                        </li>
                      )}
                      {bug.testingSteps.automated && (
                        <li>
                          <strong>⚡ Automated Scan:</strong> {bug.testingSteps.automated}
                        </li>
                      )}
                      {bug.testingSteps.visual && (
                        <li>
                          <strong>👁️ Visual / Contrast:</strong> {bug.testingSteps.visual}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="bug-section">
                    <strong className="bug-sec-title">✅ Remediated Accessible Solution:</strong>
                    <p className="bug-text-fix">{bug.remediation}</p>
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
