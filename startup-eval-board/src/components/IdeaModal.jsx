import { useState } from 'react';
import { FileText, SlidersHorizontal, Layers3, Pencil, Zap, Info, Wand2, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/initial.js';
import { suggestScores, hasEnoughTextForSuggestion } from '../data/autoScore.js';
import { useClickSound } from '../hooks/useClickSound.js';

function SwotInput({ swot, onChange }) {
  const sections = ['strengths', 'weaknesses', 'opportunities', 'threats'];
  const labels = { strengths: 'Strengths', weaknesses: 'Weaknesses', opportunities: 'Opportunities', threats: 'Threats' };
  return (
    <div className="swot-grid" style={{ gap: 10 }}>
      {sections.map(sec => (
        <div key={sec} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label className="label">{labels[sec]}</label>
          <textarea className="textarea" style={{ minHeight: 64 }} placeholder="One per line…"
            value={(swot[sec] || []).join('\n')}
            onChange={e => onChange({ ...swot, [sec]: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })} />
        </div>
      ))}
    </div>
  );
}

function ScoreInputs({ criteria, scores, autoFlags, onScoreChange, onSuggest, canSuggest }) {
  const playClick = useClickSound();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px',
        background: 'var(--bg-dark)', border: '1px solid var(--accent-dark)', borderRadius: 6,
        fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4
      }}>
        <Info size={15} style={{ flexShrink: 0, marginTop: 1, color: 'var(--accent)' }} />
        <span>Scores are <b style={{ color: 'var(--accent)' }}>auto-suggested</b> from the idea's name, description
          and category. Drag any slider to override it manually — once you move a slider it switches to <b>Manual</b>.</span>
      </div>

      <button className="btn btn-ghost btn-sm" disabled={!canSuggest}
        onClick={() => { playClick('confirm'); onSuggest(); }}
        style={{ alignSelf: 'flex-start' }}
        title={canSuggest ? 'Re-run keyword analysis on current name/description' : 'Add a name or description first'}>
        <Wand2 size={13} /> Suggest Scores from Text
      </button>

      {criteria.map(c => {
        const isAuto = autoFlags[c.id] !== false;
        return (
          <div key={c.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <label className="label" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: 7 }}>
                {c.name}
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.05em',
                  textTransform: 'uppercase', padding: '1px 7px', borderRadius: 10,
                  color: isAuto ? 'var(--accent-secondary)' : 'var(--text-dim)',
                  border: `1px solid ${isAuto ? 'var(--accent-secondary)' : 'var(--border)'}`, opacity: 0.85,
                }}>
                  {isAuto ? 'Auto' : 'Manual'}
                </span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--omni-green)' }}>
                  {scores[c.id] || 5}
                </span>
                {!isAuto && (
                  <button title="Reset this criterion to its auto-suggested value"
                    onClick={() => { playClick('tick'); onSuggest(c.id); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', display: 'flex', padding: 2 }}>
                    <RotateCcw size={12} />
                  </button>
                )}
              </div>
            </div>
            <input type="range" min={1} max={10} value={scores[c.id] || 5}
              onChange={e => onScoreChange(c.id, Number(e.target.value))} />
          </div>
        );
      })}
    </div>
  );
}

export default function IdeaModal({ idea, criteria, onSave, onClose }) {
  const isEdit = Boolean(idea);
  const playClick = useClickSound();
  const defaultScores = {};
  criteria.forEach(c => { defaultScores[c.id] = 5; });

  const initialScores = idea?.scores || defaultScores;
  const initialAutoFlags = {};
  criteria.forEach(c => { initialAutoFlags[c.id] = !isEdit; });

  const [form, setForm] = useState({
    name: idea?.name || '',
    description: idea?.description || '',
    category: idea?.category || 'SaaS',
    scores: initialScores,
    swot: idea?.swot || { strengths: [], weaknesses: [], opportunities: [], threats: [] },
  });
  const [autoFlags, setAutoFlags] = useState(initialAutoFlags);
  const [tab, setTab] = useState('info');

  const valid = form.name.trim().length > 0;
  const canSuggest = hasEnoughTextForSuggestion(form);

  const runSuggest = (onlyCriterionId) => {
    const suggested = suggestScores(form, criteria);
    if (typeof onlyCriterionId === 'string') {
      setForm(f => ({ ...f, scores: { ...f.scores, [onlyCriterionId]: suggested[onlyCriterionId] } }));
      setAutoFlags(f => ({ ...f, [onlyCriterionId]: true }));
      return;
    }
    setForm(f => {
      const nextScores = { ...f.scores };
      criteria.forEach(c => { if (autoFlags[c.id] !== false) nextScores[c.id] = suggested[c.id]; });
      return { ...f, scores: nextScores };
    });
  };

  const handleScoreChange = (criterionId, value) => {
    setForm(f => ({ ...f, scores: { ...f.scores, [criterionId]: value } }));
    setAutoFlags(f => ({ ...f, [criterionId]: false }));
  };

  const handleFieldChange = (field, value) => {
    setForm(f => {
      const next = { ...f, [field]: value };
      if (!isEdit && hasEnoughTextForSuggestion(next)) {
        const suggested = suggestScores(next, criteria);
        const nextScores = { ...next.scores };
        criteria.forEach(c => { if (autoFlags[c.id] !== false) nextScores[c.id] = suggested[c.id]; });
        next.scores = nextScores;
      }
      return next;
    });
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">
          {isEdit ? <Pencil size={18} /> : <Zap size={18} />}
          {isEdit ? 'Edit Startup Idea' : 'Add New Startup Idea'}
        </div>

        <div className="tab-bar">
          {['info', 'scores', 'swot'].map(t => (
            <button key={t} className={`tab ${tab === t ? 'active' : ''}`}
              onClick={() => { playClick('tick'); setTab(t); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {t === 'info' && <FileText size={13} />}
              {t === 'scores' && <SlidersHorizontal size={13} />}
              {t === 'swot' && <Layers3 size={13} />}
              {t === 'info' ? 'Info' : t === 'scores' ? 'Scores' : 'SWOT'}
            </button>
          ))}
        </div>

        {tab === 'info' && (
          <>
            <div className="form-group">
              <label className="label">Idea Name *</label>
              <input className="input" placeholder="e.g. AlienTech Analytics" value={form.name}
                onChange={e => handleFieldChange('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="label">Description</label>
              <textarea className="textarea" placeholder="What does this startup do?" value={form.description}
                onChange={e => handleFieldChange('description', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="label">Category</label>
              <select className="select" value={form.category} onChange={e => handleFieldChange('category', e.target.value)}>
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </>
        )}

        {tab === 'scores' && (
          <ScoreInputs criteria={criteria} scores={form.scores} autoFlags={autoFlags}
            onScoreChange={handleScoreChange} onSuggest={runSuggest} canSuggest={canSuggest} />
        )}

        {tab === 'swot' && (
          <SwotInput swot={form.swot} onChange={swot => setForm(f => ({ ...f, swot }))} />
        )}

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={() => { playClick('tick'); onClose(); }}>Cancel</button>
          <button className="btn btn-primary" disabled={!valid}
            onClick={() => { playClick('confirm'); onSave(form); onClose(); }}>
            {isEdit ? <><Pencil size={13} /> Save Changes</> : <><Zap size={13} /> Add Idea</>}
          </button>
        </div>
      </div>
    </div>
  );
}