export default function SwotPanel({ swot }) {
  const sections = [
    { key: 'strengths', label: 'Strengths', cls: 'swot-S' },
    { key: 'weaknesses', label: 'Weaknesses', cls: 'swot-W' },
    { key: 'opportunities', label: 'Opportunities', cls: 'swot-O' },
    { key: 'threats', label: 'Threats', cls: 'swot-T' },
  ];
  return (
    <div className="swot-grid">
      {sections.map(s => (
        <div key={s.key} className={`swot-cell ${s.cls}`}>
          <div className="swot-header">{s.label}</div>
          {(swot[s.key] || []).length === 0
            ? <div className="swot-item" style={{ opacity: 0.4 }}>None added</div>
            : (swot[s.key] || []).map((item, i) => (
                <div key={i} className="swot-item">{item}</div>
              ))
          }
        </div>
      ))}
    </div>
  );
}
