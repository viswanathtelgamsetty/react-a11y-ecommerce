import React, { useState } from 'react';
import { STORE_FAQS } from '../../data/products';

export default function StoreFaqAccordion({ isAccessible, highlightIssues }) {
  const [openItem, setOpenItem] = useState(null);

  const toggle = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={`faq-section ${isAccessible ? 'faq-accessible' : 'faq-inaccessible'} ${
        highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''
      }`}
      aria-label={isAccessible ? 'Frequently Asked Questions' : undefined}
    >
      <div className="section-intro">
        <span className="section-eyebrow">HELP & SUPPORT</span>
        <h2 className="section-heading">Frequently Asked Questions</h2>
        <p className="section-subtext">
          Everything you need to know about shipping, 30-day trial periods, returns, and warranty.
        </p>
      </div>

      {highlightIssues && !isAccessible && (
        <div className="a11y-pill-tag tag-banner">
          [WCAG 2.4.3 & 4.1.2: &lt;div&gt; headers without aria-expanded • Tab lands on ghost links inside collapsed panels]
        </div>
      )}

      <div className="faq-list">
        {STORE_FAQS.map((faq) => {
          const isOpen = openItem === faq.id;

          return (
            <div key={faq.id} className="faq-card">
              {isAccessible ? (
                /* Accessible: Semantic <h3><button> with aria-expanded and aria-controls */
                <h3>
                  <button
                    type="button"
                    className="faq-trigger-btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    id={`faq-btn-${faq.id}`}
                    onClick={() => toggle(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-chevron" aria-hidden="true">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>
                </h3>
              ) : (
                /* Inaccessible: Fake <div> with onClick; no aria-expanded (WCAG 4.1.2 & 2.1.1) */
                <div
                  className="faq-trigger-fake-div"
                  onClick={() => toggle(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-chevron">{isOpen ? '▲' : '▼'}</span>
                  {highlightIssues && (
                    <span className="a11y-pill-tag tag-micro" title="WCAG 4.1.2: <div> used instead of <button>; missing aria-expanded">
                      [Div Header]
                    </span>
                  )}
                </div>
              )}

              {/* Collapsed Panel Content */}
              {isAccessible ? (
                /* Accessible: hidden attribute removes collapsed links from keyboard tab order */
                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  hidden={!isOpen}
                  className="faq-panel-accessible"
                >
                  <p className="faq-answer-text">{faq.answer}</p>
                  {faq.hasLink && (
                    <a href="#support" className="faq-link">
                      {faq.linkText} →
                    </a>
                  )}
                </div>
              ) : (
                /* Inaccessible: CSS height:0 and opacity:0 WITHOUT display:none or hidden!
                   Keyboard Tab user hits ghost invisible links when collapsed! (WCAG 2.4.3) */
                <div
                  className={`faq-panel-inaccessible ${isOpen ? 'open' : 'collapsed'}`}
                >
                  <p className="faq-answer-text">{faq.answer}</p>
                  {faq.hasLink && (
                    <a href="#support" className="faq-link">
                      {faq.linkText} →
                    </a>
                  )}
                  {highlightIssues && !isOpen && (
                    <span className="a11y-pill-tag tag-micro" title="WCAG 2.4.3: Ghost link inside collapsed panel still reachable via keyboard Tab">
                      [Ghost Link in Tab Order]
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
