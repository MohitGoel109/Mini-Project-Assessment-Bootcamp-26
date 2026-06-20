import { useState } from 'react';
import { Scale } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import SwotPanel from './SwotPanel.jsx';
import ScoreCircle from './ScoreCircle.jsx';
import { useThemeColors } from '../hooks/useThemeColors.js';

export default function CompareView({ ideas, criteria, getOverallScore }) {
  const { series: COLORS, border } = useThemeColors();
  const [selected, setSelected] = useState(ideas.slice(0, 2).map(i => i.id));

  const toggle = (id) => {
    if (selected.includes(id)) {
      if (selected.length > 1) setSelected(selected.filter(s => s !== id));
    } else {
      if (selected.length < 4) setSelected([...selected, id]);
    }
  };

  const compareIdeas = ideas.filter(i => selected.includes(i.id));

  const radarData = criteria.map(c => {
    const entry = { criterion: c.name };
    compareIdeas.forEach(idea => { entry[idea.name] = idea.scores[c.id] || 0; });
    return entry;
  });

  return (
    <div className="animate-in">
      {/* Selector */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Select Ideas to Compare (up to 4)</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ideas.map(idea => (
            <button
              key={idea.id}
              className={`filter-chip ${selected.includes(idea.id) ? 'active' : ''}`}
              onClick={() => toggle(idea.id)}
            >
              {idea.name}
            </button>
          ))}
        </div>
      </div>

      {compareIdeas.length < 2 && (
        <div className="empty-state">
          <div style={{ marginBottom: 14 }}><Scale size={44} style={{ opacity: 0.3 }} /></div>
          <div className="empty-title">Select at least 2 ideas</div>
        </div>
      )}

      {compareIdeas.length >= 2 && (
        <>
          {/* Score header */}
          <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
            {compareIdeas.map((idea, i) => (
              <div key={idea.id} className="card" style={{ flex: '1 1 180px', textAlign: 'center', borderColor: COLORS[i] + '55' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: COLORS[i], marginBottom: 10 }}>
                  {idea.name}
                </div>
                <ScoreCircle score={getOverallScore(idea)} size={64} />
                <div style={{ marginTop: 8 }}>
                  <span className="tag" style={{ borderColor: COLORS[i] + '66', color: COLORS[i] }}>{idea.category}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Radar */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-title">Criteria Radar Comparison</div>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={border} />
                <PolarAngleAxis dataKey="criterion" tick={{ fill: '#7aab7a', fontSize: 11, fontFamily: 'Rajdhani' }} />
                <Legend wrapperStyle={{ fontFamily: 'Rajdhani', fontSize: 12 }} />
                {compareIdeas.map((idea, i) => (
                  <Radar key={idea.id} name={idea.name} dataKey={idea.name}
                    stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15} />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Criteria table */}
          <div className="card" style={{ marginBottom: 20, overflowX: 'auto' }}>
            <div className="card-title">Criteria Score Table</div>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Criterion</th>
                  {compareIdeas.map((idea, i) => (
                    <th key={idea.id} style={{ color: COLORS[i] }}>{idea.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map(c => (
                  <tr key={c.id}>
                    <td style={{ color: 'var(--omni-text-dim)' }}>{c.name}</td>
                    {compareIdeas.map((idea, i) => {
                      const score = idea.scores[c.id] || 0;
                      const best = Math.max(...compareIdeas.map(ii => ii.scores[c.id] || 0));
                      return (
                        <td key={idea.id} style={{ color: score === best ? COLORS[i] : 'var(--omni-text-dim)', fontWeight: score === best ? 700 : 400 }}>
                          {score}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid var(--omni-green-dark)' }}>
                  <td style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--omni-green)' }}>Overall</td>
                  {compareIdeas.map((idea, i) => (
                    <td key={idea.id} style={{ fontFamily: 'var(--font-display)', color: COLORS[i], fontSize: '0.9rem', fontWeight: 700 }}>
                      {getOverallScore(idea)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* SWOT side by side */}
          {compareIdeas.slice(0, 2).map((idea, i) => (
            <div key={idea.id} className="card" style={{ marginBottom: 14 }}>
              <div className="card-title" style={{ color: COLORS[i] }}>SWOT — {idea.name}</div>
              <SwotPanel swot={idea.swot} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
