import React, { useState } from 'react';

const SECTIONS = [
  { key: 'strengths', label: 'Strengths', cls: 'swot-s', icon: '💪' },
  { key: 'weaknesses', label: 'Weaknesses', cls: 'swot-w', icon: '⚠️' },
  { key: 'opportunities', label: 'Opportunities', cls: 'swot-o', icon: '🚀' },
  { key: 'threats', label: 'Threats', cls: 'swot-t', icon: '🛡️' },
];

export default function SwotModal({ idea, onClose, onUpdate }) {
  const [inputs, setInputs] = useState({ strengths: '', weaknesses: '', opportunities: '', threats: '' });

  const addItem = (key) => {
    const val = inputs[key].trim();
    if (!val) return;
    const updated = {
      ...idea.swot,
      [key]: [...(idea.swot[key] || []), val],
    };
    onUpdate(idea.id, updated);
    setInputs(i => ({ ...i, [key]: '' }));
  };

  const removeItem = (key, idx) => {
    const updated = {
      ...idea.swot,
      [key]: idea.swot[key].filter((_, i) => i !== idx),
    };
    onUpdate(idea.id, updated);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <span className="modal-title">⚡ SWOT — {idea.name}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="swot-grid">
            {SECTIONS.map(s => (
              <div key={s.key} className={`swot-quadrant ${s.cls}`}>
                <div className="swot-label">{s.icon} {s.label}</div>

                {(idea.swot[s.key] || []).map((item, i) => (
                  <div className="swot-item" key={i}>
                    {item}
                    <button
                      onClick={() => removeItem(s.key, i)}
                      style={{
                        background: 'transparent', border: 'none',
                        color: 'var(--omni-red)', cursor: 'pointer',
                        fontSize: '0.7rem', marginLeft: 'auto', flexShrink: 0,
                      }}
                    >✕</button>
                  </div>
                ))}

                <div className="swot-add">
                  <input
                    className="swot-input"
                    placeholder={`Add ${s.label.toLowerCase()}...`}
                    value={inputs[s.key]}
                    onChange={e => setInputs(i => ({ ...i, [s.key]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addItem(s.key)}
                  />
                  <button className="swot-add-btn" onClick={() => addItem(s.key)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
