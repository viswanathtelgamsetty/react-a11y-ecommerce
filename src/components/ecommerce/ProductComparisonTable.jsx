import React from 'react';
import { COMPARISON_PRODUCTS } from '../../data/products';

export default function ProductComparisonTable({ isAccessible, highlightIssues }) {
  return (
    <section
      className={`comparison-section ${isAccessible ? 'table-accessible' : 'table-inaccessible'} ${
        highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''
      }`}
      aria-label={isAccessible ? 'Hardware Comparison Matrix' : undefined}
    >
      <div className="section-intro">
        <span className="section-eyebrow">BENCHMARK COMPARISON</span>
        <h2 className="section-heading">How Aura SoundMax Compares to the Field</h2>
        <p className="section-subtext">
          Direct engineering breakdown against leading flagship noise-cancelling headphones.
        </p>
      </div>

      {highlightIssues && !isAccessible && (
        <div className="a11y-pill-tag tag-banner">
          [WCAG 1.3.1 Violation: Table constructed with &lt;div&gt; elements, stripping all screen reader table semantics]
        </div>
      )}

      {isAccessible ? (
        /* Accessible: Semantic <table> with <caption>, <thead>, <th scope="col">, and <th scope="row"> */
        <div className="table-responsive-wrapper">
          <table className="comparison-table">
            <caption className="visually-hidden">
              Headphone hardware specification comparison between Aura SoundMax Pro and major competitors
            </caption>
            <thead>
              <tr>
                <th scope="col" className="col-feature">Hardware Feature</th>
                <th scope="col" className="col-aura highlight-header">Aura SoundMax Pro</th>
                <th scope="col" className="col-comp">Competitor A (Premium)</th>
                <th scope="col" className="col-comp">Competitor B (Standard)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_PRODUCTS.map((row, idx) => (
                <tr key={idx}>
                  <th scope="row" className="row-feature-header">
                    {row.feature}
                  </th>
                  <td className="highlight-cell">
                    <strong>{row.aura}</strong>
                  </td>
                  <td>{row.competitorA}</td>
                  <td>{row.competitorB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Inaccessible: Built entirely with <div> flex/grid items (WCAG 1.3.1) */
        <div className="fake-div-table">
          <div className="fake-table-row fake-header-row">
            <div className="fake-cell fake-col-feature">Hardware Feature</div>
            <div className="fake-cell fake-col-aura">Aura SoundMax Pro</div>
            <div className="fake-cell">Competitor A (Premium)</div>
            <div className="fake-cell">Competitor B (Standard)</div>
          </div>
          {COMPARISON_PRODUCTS.map((row, idx) => (
            <div key={idx} className="fake-table-row">
              <div className="fake-cell fake-col-feature">{row.feature}</div>
              <div className="fake-cell fake-col-aura">{row.aura}</div>
              <div className="fake-cell">{row.competitorA}</div>
              <div className="fake-cell">{row.competitorB}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
