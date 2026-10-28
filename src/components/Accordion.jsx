import React, { useState } from 'react';

const ACCORDION_ITEMS = [
  {
    id: 'sec-1',
    title: 'What accessibility standards are supported?',
    content:
      'We test against WCAG 2.1 and 2.2 Level A, AA, and AAA criteria, including Section 508 and EN 301 549 standards.',
    link: '#standards-info',
  },
  {
    id: 'sec-2',
    title: 'How does automated testing differ from manual testing?',
    content:
      'Automated audits (like Axe-core and Lighthouse) typically detect 30% to 50% of WCAG issues. Screen readers and keyboard navigation testing are mandatory for complete coverage.',
    link: '#audit-guide',
  },
  {
    id: 'sec-3',
    title: 'Can screen readers read collapsed content?',
    content:
      'Properly collapsed panels using hidden attributes or display:none are hidden from screen readers. Bad implementations merely set opacity:0, causing "ghost" tab stops.',
    link: '#screen-reader-faq',
  },
];

export default function Accordion({ isAccessible }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests collapsible disclosure widgets: keyboard navigation, `aria-expanded` state communication, and avoiding invisible keyboard traps in collapsed content.
      </p>

      <div className="accordion-group">
        {ACCORDION_ITEMS.map((item, idx) => {
          const isItemOpen = openIndex === idx;

          return (
            <div key={item.id} className="accordion-item">
              {isAccessible ? (
                /* ACCESSIBLE ACCORDION:
                   - Header wrapped in proper semantic heading
                   - Trigger is a <button> with aria-expanded & aria-controls
                   - Panel has role="region", aria-labelledby, and is truly hidden
                */
                <>
                  <h3 className="accordion-heading">
                    <button
                      type="button"
                      id={`acc-btn-${item.id}`}
                      aria-expanded={isItemOpen}
                      aria-controls={`acc-panel-${item.id}`}
                      className="accordion-trigger"
                      onClick={() => toggle(idx)}
                    >
                      <span>{item.title}</span>
                      <span aria-hidden="true" className="accordion-icon">
                        {isItemOpen ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`acc-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`acc-btn-${item.id}`}
                    hidden={!isItemOpen}
                    className="accordion-panel"
                  >
                    <p>{item.content}</p>
                    <a href={item.link} className="demo-link">
                      Learn more about {item.title} &rarr;
                    </a>
                  </div>
                </>
              ) : (
                /* INACCESSIBLE ACCORDION:
                   - Fake header with div onclick
                   - No aria-expanded
                   - Collapsed content is styled with opacity: 0 and height: 0
                     (Tab focus will land on invisible link inside collapsed panel!)
                */
                <>
                  <div
                    className="accordion-trigger"
                    onClick={() => toggle(idx)}
                    style={{ cursor: 'pointer', fontWeight: 600 }}
                  >
                    <span>{item.title}</span>
                    <span className="accordion-icon">{isItemOpen ? '−' : '+'}</span>
                  </div>
                  <div
                    className={`accordion-panel-inaccessible ${isItemOpen ? 'open' : 'closed'}`}
                    style={
                      isItemOpen
                        ? { padding: '14px 16px', display: 'block' }
                        : {
                            maxHeight: 0,
                            opacity: 0,
                            overflow: 'hidden',
                            /* Intentionally NOT display:none so tab focus gets trapped on hidden link! */
                          }
                    }
                  >
                    <p>{item.content}</p>
                    <a href={item.link} className="demo-link">
                      Learn more about {item.title} &rarr;
                    </a>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
