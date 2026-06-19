import { useState } from 'react';
import { CATEGORIES } from '../data/initial.js';

/* Live score calculator — same logic as store.getOverallScore */
function calcLiveScore(scores, criteria) {
  const total = criteria.reduce((s, c) => s + c.weight, 0);
  if (total === 0) return 0;
  const weighted = criteria.reduce((sum, c) => sum + (scores[c.id] || 0) * (c.weight / total), 0);
  return Math.round(weighted * 10) / 10;
}

function ScoreMeter({ score }) {
  const pct = (score / 10) * 100;
  const color = score >= 7 ? 'var(--primary)' : score >= 4 ? 'var(--warn)' : 'var(--danger)';
  const label = score >= 7 ? 'STRONG' : score >= 4 ? 'AVERAGE' : score === 0 ? 'NOT SCORED' : 'WEAK';

  return (
    <div style={{
      background: 'var(--bg-input)',
      border: `1px solid ${color}`,
      borderRadius: 10,
      padding: '14px 18px',
      marginBottom: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      boxShadow: `0 0 12px ${color}22`,
    }}>
      {/* Big score circle */}
      <div style={{
        width: 62,
        height: 62,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${color}11`,
        flexShrink: 0,
        boxShadow: `0 0 10px ${color}44`,
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: '0.48rem', letterSpacing: '0.1em', color, opacity: 0.7 }}>/10</span>
      </div>

      {/* Bar + label */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.15em', color }}>
            OVERALL SCORE
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.12em', color }}>
            {label}
          </span>
        </div>
        <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            borderRadius: 4,
            transition: 'width 0.3s ease',
            boxShadow: `0 0 6px ${color}`,
          }} />
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 6 }}>
          {score === 0
            ? 'Drag the sliders below to score your idea'
            : `Based on ${Math.round(pct)}% performance across all criteria`}
        </div>
      </div>
    </div>
  );
}

function ScoreInputs({ criteria, scores, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {criteria.map(c => {
        const val = scores[c.id] !== undefined ? scores[c.id] : 0;
        const color = val >= 7 ? 'var(--primary)' : val >= 4 ? 'var(--warn)' : val === 0 ? 'var(--text-dim)' : 'var(--danger)';
        return (
          <div key={c.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <label className="label" style={{ marginBottom: 0 }}>{c.name}</label>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', color, transition: 'color 0.2s' }}>
                {val}<span style={{ fontSize: '0.58rem', opacity: 0.55 }}>/10</span>
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={val}
              onChange={e => onChange({ ...scores, [c.id]: Number(e.target.value) })}
            />
          </div>
        );
      })}
    </div>
  );
}

function SwotInput({ swot, onChange }) {
  const sections = ['strengths', 'weaknesses', 'opportunities', 'threats'];
  const labels   = { strengths: 'Strengths', weaknesses: 'Weaknesses', opportunities: 'Opportunities', threats: 'Threats' };
  return (
    <div className="swot-grid" style={{ gap: 10 }}>
      {sections.map(sec => (
        <div key={sec} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label className="label">{labels[sec]}</label>
          <textarea
            className="textarea"
            style={{ minHeight: 64 }}
            placeholder="One per line…"
            value={(swot[sec] || []).join('\n')}
            onChange={e => onChange({ ...swot, [sec]: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
          />
        </div>
      ))}
    </div>
  );
}

export default function IdeaModal({ idea, criteria, onSave, onClose }) {
  const isEdit = Boolean(idea);

  /* New ideas start at 0 — user must drag sliders to set actual scores */
  const defaultScores = {};
  criteria.forEach(c => { defaultScores[c.id] = 0; });

  const [form, setForm] = useState({
    name:        idea?.name        || '',
    description: idea?.description || '',
    category:    idea?.category    || 'SaaS',
    scores:      idea?.scores      || defaultScores,
    swot:        idea?.swot        || { strengths: [], weaknesses: [], opportunities: [], threats: [] },
  });

  /* Always open on Scores tab for new ideas so user sets them right away */
  const [tab, setTab] = useState(isEdit ? 'info' : 'scores');

  const liveScore = calcLiveScore(form.scores, criteria);
  const valid = form.name.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>
            {isEdit ? 'EDIT' : 'NEW'}
          </span>
          {isEdit ? 'Edit Startup Idea' : 'Add Startup Idea'}
        </div>

        {/* Tab bar */}
        <div className="tab-bar">
          {[
            { id: 'info',   label: 'Info'   },
            { id: 'scores', label: 'Scores' },
            { id: 'swot',   label: 'SWOT'   },
          ].map(t => (
            <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Live score meter — always visible on Scores tab */}
        {tab === 'scores' && (
          <ScoreMeter score={liveScore} />
        )}

        {/* Info tab */}
        {tab === 'info' && (
          <>
            <div className="form-group">
              <label className="label">Idea Name *</label>
              <input className="input" placeholder="e.g. AlienTech Analytics"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="label">Description</label>
              <textarea className="textarea" placeholder="What does this startup do?"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="label">Category</label>
              <select className="select" value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </>
        )}

        {/* Scores tab */}
        {tab === 'scores' && (
          <ScoreInputs
            criteria={criteria}
            scores={form.scores}
            onChange={scores => setForm(f => ({ ...f, scores }))}
          />
        )}

        {/* SWOT tab */}
        {tab === 'swot' && (
          <SwotInput
            swot={form.swot}
            onChange={swot => setForm(f => ({ ...f, swot }))}
          />
        )}

        <div className="modal-footer">
          {/* Show live score in footer too */}
          {!isEdit && (
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              color: liveScore === 0 ? 'var(--text-dim)' : liveScore >= 7 ? 'var(--primary)' : 'var(--warn)',
              marginRight: 'auto',
              letterSpacing: '0.1em',
            }}>
              {liveScore === 0 ? 'Score: not set' : `Score: ${liveScore}/10`}
            </span>
          )}
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={!valid}
            onClick={() => { onSave(form); onClose(); }}>
            {isEdit ? 'Save Changes' : 'Add Idea'}
          </button>
        </div>
      </div>
    </div>
  );
}