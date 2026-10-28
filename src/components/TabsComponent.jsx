import React, { useState, useRef } from 'react';

const TABS = [
  {
    id: 'general',
    label: 'General Profile',
    content: 'Manage your public display name, email preferences, and personal biography.',
  },
  {
    id: 'security',
    label: 'Security & Auth',
    content: 'Two-factor authentication (2FA), active login sessions, and password management.',
  },
  {
    id: 'billing',
    label: 'Billing & Plans',
    content: 'Current subscription tier, payment methods, downloadable invoices, and usage quotas.',
  },
];

export default function TabsComponent({ isAccessible }) {
  const [activeTab, setActiveTab] = useState('general');
  const tabRefs = useRef([]);

  const activeIdx = TABS.findIndex((t) => t.id === activeTab);

  const handleKeyDown = (e, index) => {
    if (!isAccessible) return;

    let targetIdx = index;
    if (e.key === 'ArrowRight') {
      targetIdx = (index + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft') {
      targetIdx = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === 'Home') {
      targetIdx = 0;
    } else if (e.key === 'End') {
      targetIdx = TABS.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(TABS[targetIdx].id);
    tabRefs.current[targetIdx]?.focus();
  };

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests ARIA tabs pattern: roving tabIndex, Arrow Left/Right key navigation, `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
      </p>

      {isAccessible ? (
        /* ACCESSIBLE TABS */
        <div className="tabs-container">
          <div role="tablist" aria-label="Account Settings Sections" className="tabs-list">
            {TABS.map((tab, idx) => {
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`tab-btn ${isSelected ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {TABS.map((tab) => {
            const isSelected = tab.id === activeTab;
            return (
              <div
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                tabIndex={0}
                hidden={!isSelected}
                className="tab-panel"
              >
                <h4>{tab.label}</h4>
                <p>{tab.content}</p>
                <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: '8px' }}>
                  Edit {tab.label}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* INACCESSIBLE TABS:
           - Links without tablist or tab roles
           - Tab key forces navigating every tab
           - Arrow keys do not work
           - Panels are simple divs without role="tabpanel"
        */
        <div className="tabs-container">
          <ul className="tabs-list-inaccessible">
            {TABS.map((tab) => (
              <li key={tab.id} style={{ display: 'inline-block' }}>
                <a
                  href="#dummy"
                  className={`tab-btn ${tab.id === activeTab ? 'tab-btn-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.id);
                  }}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="tab-panel">
            <h4>{TABS[activeIdx]?.label}</h4>
            <p>{TABS[activeIdx]?.content}</p>
            <div
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-block', marginTop: '8px', cursor: 'pointer' }}
            >
              Edit {TABS[activeIdx]?.label}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
