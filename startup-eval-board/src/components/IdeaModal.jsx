import { useState } from 'react';
import { CATEGORIES } from '../data/initial.js';

function SwotInput({ swot, onChange }) {
  const sections = ['strengths', 'weaknesses', 'opportunities', 'threats'];
  const labels = { strengths: 'Strengths', weaknesses: 'Weaknesses', opportunities: 'Opportunities', threats: 'Threats' };
  return (
    <div className="swot-grid" style={{ gap: 10 }}>
      {sections.map(sec => (
        <div key={sec} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label className="label">{labels[sec]}</label>
          <textarea
            className="textarea"
            style={{ minHeight: 64 }}
            placeholder={`One per line…`}
            value={(swot[sec] || []).join('\n')}
            onChange={e => onChange({ ...swot, [sec]: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
          />
        </div>
      ))}
    </div>
  );
}

function ScoreInputs({ criteria, scores, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {criteria.map(c => (
        <div key={c.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <label className="label" style={{ marginBottom: 0 }}>{c.name}</label>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--omni-green)' }}>
              {scores[c.id] || 5}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={scores[c.id] || 5}
            onChange={e => onChange({ ...scores, [c.id]: Number(e.target.value) })}
          />
        </div>
      ))}
    </div>
  );
}

export default function IdeaModal({ idea, criteria, onSave, onClose }) {
  const isEdit = Boolean(idea);
  const defaultScores = {};
  criteria.forEach(c => { defaultScores[c.id] = 5; });

  const [form, setForm] = useState({
    name: idea?.name || '',
    description: idea?.description || '',
    category: idea?.category || 'SaaS',
    scores: idea?.scores || defaultScores,
    swot: idea?.swot || { strengths: [], weaknesses: [], opportunities: [], threats: [] },
  });
  const [tab, setTab] = useState('info');

  const valid = form.name.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">
          <span style={{ fontSize: '1.2rem' }}>{isEdit ? '✏️' : '⚡'}</span>
          {isEdit ? 'Edit Startup Idea' : 'Add New Startup Idea'}
        </div>

        <div className="tab-bar">
          {['info', 'scores', 'swot'].map(t => (
            <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'info' ? '📋 Info' : t === 'scores' ? '📊 Scores' : '🧬 SWOT'}
            </button>
          ))}
        </div>

        {tab === 'info' && (
          <>
            <div className="form-group">
              <label className="label">Idea Name *</label>
              <input className="input" placeholder="e.g. AlienTech Analytics" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="label">Description</label>
              <textarea className="textarea" placeholder="What does this startup do?" value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="label">Category</label>
              <select className="select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </>
        )}

        {tab === 'scores' && (
          <ScoreInputs
            criteria={criteria}
            scores={form.scores}
            onChange={scores => setForm(f => ({ ...f, scores }))}
          />
        )}

        {tab === 'swot' && (
          <SwotInput
            swot={form.swot}
            onChange={swot => setForm(f => ({ ...f, swot }))}
          />
        )}

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={!valid} onClick={() => { onSave(form); onClose(); }}>
            {isEdit ? '💾 Save Changes' : '⚡ Add Idea'}
          </button>
        </div>
      </div>
    </div>
  );
}
