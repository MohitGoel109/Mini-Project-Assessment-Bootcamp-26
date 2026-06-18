import { useState } from 'react';

export default function CriteriaView({ criteria, addCriterion, updateCriterion, deleteCriterion }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', weight: 20 });
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);

  return (
    <div className="animate-in">
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div className="card-title" style={{ marginBottom: 0 }}>Evaluation Criteria</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '0.72rem',
            color: totalWeight === 100 ? 'var(--omni-green)' : 'var(--omni-warn)',
            background: totalWeight === 100 ? '#001a00' : '#1a1000',
            border: `1px solid ${totalWeight === 100 ? 'var(--omni-green-dark)' : '#4a3000'}`,
            borderRadius: 4, padding: '4px 10px'
          }}>
            Total Weight: {totalWeight}%
          </span>
        </div>

        {criteria.length === 0 && (
          <div className="empty-state"><div className="empty-title">No criteria defined</div></div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {criteria.map(c => (
            <div key={c.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: '#0c130c', border: '1px solid var(--omni-border)', borderRadius: 6
            }}>
              <div style={{ flex: 1, fontWeight: 600 }}>{c.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--omni-text-dim)' }}>Weight</span>
                <input
                  type="number"
                  min={1} max={100}
                  value={c.weight}
                  onChange={e => updateCriterion(c.id, { weight: Math.max(1, Math.min(100, Number(e.target.value))) })}
                  style={{
                    width: 60, background: '#0a130a', border: '1px solid var(--omni-border)',
                    borderRadius: 4, color: 'var(--omni-green)', padding: '4px 8px',
                    fontFamily: 'var(--font-display)', fontSize: '0.82rem', textAlign: 'center'
                  }}
                />
                <span style={{ color: 'var(--omni-text-dim)', fontSize: '0.8rem' }}>%</span>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => deleteCriterion(c.id)}>🗑</button>
            </div>
          ))}
        </div>

        {adding && (
          <div style={{ marginTop: 14, padding: 14, background: '#0c130c', border: '1px solid var(--omni-green-dark)', borderRadius: 6 }}>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="label">Criterion Name</label>
                <input className="input" placeholder="e.g. Market Fit" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="label">Weight (%)</label>
                <input className="input" type="number" min={1} max={100} value={form.weight}
                  onChange={e => setForm(f => ({ ...f, weight: Number(e.target.value) }))} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btn-primary btn-sm" disabled={!form.name.trim()}
                onClick={() => { addCriterion(form); setForm({ name: '', weight: 20 }); setAdding(false); }}>
                ✓ Add
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        )}

        {!adding && (
          <button className="btn btn-ghost" style={{ marginTop: 14 }} onClick={() => setAdding(true)}>
            + Add Criterion
          </button>
        )}
      </div>

      <div className="card">
        <div className="card-title">Weight Distribution</div>
        <div style={{ display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
          {criteria.map((c, i) => {
            const hues = ['#00ff41', '#00ffe7', '#ffae00', '#ff3f3f', '#a855f7', '#3b82f6'];
            return (
              <div key={c.id} style={{
                flex: c.weight,
                background: hues[i % hues.length],
                opacity: 0.85,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.62rem', color: '#000', fontWeight: 700, fontFamily: 'var(--font-display)',
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: '0 4px'
              }}>
                {c.weight >= 10 ? `${c.weight}%` : ''}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
          {criteria.map((c, i) => {
            const hues = ['#00ff41', '#00ffe7', '#ffae00', '#ff3f3f', '#a855f7', '#3b82f6'];
            return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--omni-text-dim)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: hues[i % hues.length], display: 'inline-block' }} />
                {c.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
