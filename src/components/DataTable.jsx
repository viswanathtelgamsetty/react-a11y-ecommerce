import React, { useState } from 'react';

const INITIAL_DATA = [
  { id: 101, name: 'Alice Walker', department: 'Engineering', score: 98, status: 'Active' },
  { id: 102, name: 'Carlos Mendez', department: 'Design', score: 85, status: 'Active' },
  { id: 103, name: 'Beatrice Vance', department: 'Product', score: 92, status: 'Pending' },
  { id: 104, name: 'David Kim', department: 'Security', score: 78, status: 'Active' },
];

export default function DataTable({ isAccessible }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending');

  const handleSort = (key) => {
    const nextDir = sortKey === key && sortDirection === 'ascending' ? 'descending' : 'ascending';
    setSortKey(key);
    setSortDirection(nextDir);

    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return nextDir === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return nextDir === 'ascending' ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests table structure semantics (WCAG 1.3.1), table captions, column/row header scopes, and sortable column state (`aria-sort`).
      </p>

      {isAccessible ? (
        /* ACCESSIBLE DATA TABLE */
        <div className="table-responsive">
          <table className="data-table">
            <caption className="table-caption">
              Employee Performance Metrics (Sorted by {sortKey} {sortDirection})
            </caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col" aria-sort={sortKey === 'name' ? sortDirection : 'none'}>
                  <button
                    type="button"
                    className="th-sort-btn"
                    onClick={() => handleSort('name')}
                    aria-label={`Sort by Employee Name, currently ${
                      sortKey === 'name' ? sortDirection : 'unsorted'
                    }`}
                  >
                    Employee Name
                    <span aria-hidden="true" className="sort-icon">
                      {sortKey === 'name' ? (sortDirection === 'ascending' ? ' ▲' : ' ▼') : ' ↕'}
                    </span>
                  </button>
                </th>
                <th scope="col">Department</th>
                <th scope="col" aria-sort={sortKey === 'score' ? sortDirection : 'none'}>
                  <button
                    type="button"
                    className="th-sort-btn"
                    onClick={() => handleSort('score')}
                    aria-label={`Sort by Performance Score, currently ${
                      sortKey === 'score' ? sortDirection : 'unsorted'
                    }`}
                  >
                    Score
                    <span aria-hidden="true" className="sort-icon">
                      {sortKey === 'score' ? (sortDirection === 'ascending' ? ' ▲' : ' ▼') : ' ↕'}
                    </span>
                  </button>
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>#{row.id}</td>
                  <th scope="row" className="row-header">
                    {row.name}
                  </th>
                  <td>{row.department}</td>
                  <td>{row.score}%</td>
                  <td>
                    <span className={`badge ${row.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* INACCESSIBLE TABLE:
           - Rendered with plain <div> flex elements (no table semantics for screen readers)
           - Header clicks trigger sort visually, but no button tag or aria-sort indicator
           - Screen reader cannot announce rows, columns, or coordinates
        */
        <div className="fake-table">
          <div className="fake-table-title">Employee Performance Metrics</div>
          <div className="fake-table-header">
            <div className="fake-cell" style={{ width: '60px' }}>ID</div>
            <div
              className="fake-cell"
              style={{ flex: 1, cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => handleSort('name')}
            >
              Employee Name {sortKey === 'name' ? (sortDirection === 'ascending' ? '▲' : '▼') : ''}
            </div>
            <div className="fake-cell" style={{ flex: 1 }}>Department</div>
            <div
              className="fake-cell"
              style={{ width: '80px', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => handleSort('score')}
            >
              Score {sortKey === 'score' ? (sortDirection === 'ascending' ? '▲' : '▼') : ''}
            </div>
            <div className="fake-cell" style={{ width: '80px' }}>Status</div>
          </div>
          {data.map((row) => (
            <div key={row.id} className="fake-table-row">
              <div className="fake-cell" style={{ width: '60px' }}>#{row.id}</div>
              <div className="fake-cell" style={{ flex: 1 }}>{row.name}</div>
              <div className="fake-cell" style={{ flex: 1 }}>{row.department}</div>
              <div className="fake-cell" style={{ width: '80px' }}>{row.score}%</div>
              <div className="fake-cell" style={{ width: '80px' }}>{row.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
