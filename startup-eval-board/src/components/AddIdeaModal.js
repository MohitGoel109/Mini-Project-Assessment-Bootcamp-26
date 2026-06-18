import React, { useState } from 'react';
import { CATEGORIES, CRITERIA } from '../data/constants';

const defaultScores = () =>
  CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 5 }), {});

export default function AddIdeaModal({ onClose, onSave, existing }) {
  const [form, setForm] = useState(
    existing || {
      name: '',
      category: 'SaaS',
      description: '',
      scores: defaultScores(),
    }
  );

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const updateScore = (key, val) =>
    setForm(f => ({ ...f, scores: { ...f.scores, [key]: Number(val) } }));

  const handleSave = () => {
    if (!form.name.trim()) return alert('Please enter an idea name');
    onSave({
      ...form,
      id: existing?.id || Date.now().toString(),
      createdAt: existing?.createdAt || new Date().toISOString().split('T')[0],
      swot: existing?.swot || { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">
            {existing ? '✏️ EDIT IDEA' : '⚡ NEW STARTUP IDEA'}
          </span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Idea Name</label>
            <input
              className="form-input"
              placeholder="e.g. OmniLearn AI"
              value={form.name}
              onChange={e => update('name', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={form.category}
                onChange={e => update('category', e.target.value)}
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Describe the startup idea, problem it solves, and target market..."
              value={form.description}
              onChange={e => update('description', e.target.value)}
            />
          </div>

          <hr className="divider" />

          <div className="form-label" style={{ marginBottom: '1rem', fontSize: '0.65rem', letterSpacing: '2px' }}>
            EVALUATION SCORES (1–10)
          </div>

          {CRITERIA.map(c => (
            <div className="score-slider-group" key={c.id}>
              <div className="score-slider-header">
                <span>{c.label} <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>(weight ×{c.weight})</span></span>
                <strong>{form.scores[c.id]}</strong>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={form.scores[c.id]}
                onChange={e => updateScore(c.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            {existing ? 'Save Changes' : 'Add Idea'}
          </button>
        </div>
      </div>
    </div>
  );
}
