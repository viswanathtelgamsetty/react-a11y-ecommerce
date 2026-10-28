import React, { useState } from 'react';

export default function ToggleSwitch({ isAccessible }) {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests ARIA switch pattern (WCAG 4.1.2), keyboard interaction (Space/Enter), and state indication (`aria-checked`).
      </p>

      <div className="toggle-wrapper">
        {isAccessible ? (
          /* ACCESSIBLE SWITCH */
          <div className="toggle-row">
            <span id="airplane-mode-label" className="toggle-label-text">
              Enable Offline Airplane Mode
            </span>
            <button
              type="button"
              id="airplane-mode-switch"
              role="switch"
              aria-checked={isOn}
              aria-labelledby="airplane-mode-label"
              className={`toggle-track ${isOn ? 'track-on' : 'track-off'}`}
              onClick={toggle}
              onKeyDown={handleKeyDown}
            >
              <span className={`toggle-thumb ${isOn ? 'thumb-on' : 'thumb-off'}`} />
            </button>
            <span className="toggle-state-text" aria-hidden="true">
              {isOn ? 'ON' : 'OFF'}
            </span>
          </div>
        ) : (
          /* INACCESSIBLE SWITCH:
             - Plain <div> with onClick
             - Not focusable (cannot Tab to it)
             - Cannot press Space or Enter
             - Screen reader does not know it is a switch or what its state is
          */
          <div className="toggle-row">
            <div className="toggle-label-text">Enable Offline Airplane Mode</div>
            <div
              className={`toggle-track ${isOn ? 'track-on' : 'track-off'}`}
              onClick={toggle}
              style={{ cursor: 'pointer' }}
            >
              <div className={`toggle-thumb ${isOn ? 'thumb-on' : 'thumb-off'}`} />
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>{isOn ? 'ON' : 'OFF'}</div>
          </div>
        )}
      </div>
    </div>
  );
}
