import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
         BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import ScoreBar from './ScoreBar.jsx';
import { useThemeColors } from '../hooks/useThemeColors.js';

function CustomTooltip({ active, payload, label, colors }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: colors.bgPanel, border: `1px solid ${colors.accentDark}`, borderRadius: 6, padding: '8px 12px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: colors.accent, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: '0.82rem', color: p.color }}>{p.name}: <b>{p.value}</b></div>
      ))}
    </div>
  );
}

export default function Dashboard({ ideas, rankedIdeas, criteria, getOverallScore }) {
  const colors = useThemeColors();
  const topIdea = rankedIdeas[0];

  // Bar chart data
  const barData = rankedIdeas.slice(0, 6).map(idea => ({
    name: idea.name.length > 14 ? idea.name.slice(0, 14) + '…' : idea.name,
    score: getOverallScore(idea),
  }));

  // Radar data for top 3
  const radarData = criteria.map(c => {
    const entry = { criterion: c.name };
    rankedIdeas.slice(0, 3).forEach(idea => {
      entry[idea.name.slice(0, 10)] = idea.scores[c.id] || 0;
    });
    return entry;
  });

  // Avg scores per category
  const catMap = {};
  ideas.forEach(idea => {
    if (!catMap[idea.category]) catMap[idea.category] = [];
    catMap[idea.category].push(getOverallScore(idea));
  });
  const catData = Object.entries(catMap).map(([cat, scores]) => ({
    name: cat,
    avg: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10,
  }));

  const avgScore = ideas.length ? Math.round((ideas.reduce((s, i) => s + getOverallScore(i), 0) / ideas.length) * 10) / 10 : 0;

  return (
    <div className="animate-in">
      {/* Stat Grid */}
      <div className="stat-grid">
        <div className="stat-box">
          <div className="stat-value">{ideas.length}</div>
          <div className="stat-label">Total Ideas</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{criteria.length}</div>
          <div className="stat-label">Criteria</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ fontSize: '1.6rem' }}>{avgScore}</div>
          <div className="stat-label">Avg Score</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ fontSize: '1.2rem', color: 'var(--omni-blue)' }}>
            {topIdea ? topIdea.name.slice(0, 10) : '—'}
          </div>
          <div className="stat-label">Top Idea</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Score Rankings Bar */}
        <div className="card">
          <div className="card-title">Score Rankings</div>
          {ideas.length === 0
            ? <div className="empty-state"><div className="empty-title">No ideas yet</div></div>
            : <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} margin={{ top: 4, right: 10, bottom: 4, left: -10 }}>
                  <XAxis dataKey="name" tick={{ fill: colors.textDim, fontSize: 11, fontFamily: 'Rajdhani' }} />
                  <YAxis domain={[0, 10]} tick={{ fill: colors.textDim, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip colors={colors} />} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {barData.map((_, i) => <Cell key={i} fill={colors.series[i % colors.series.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
          }
        </div>

        {/* Category Performance */}
        <div className="card">
          <div className="card-title">Category Avg Scores</div>
          {catData.length === 0
            ? <div className="empty-state"><div className="empty-title">No data</div></div>
            : <ResponsiveContainer width="100%" height={220}>
                <BarChart data={catData} layout="vertical" margin={{ top: 4, right: 20, bottom: 4, left: 20 }}>
                  <XAxis type="number" domain={[0, 10]} tick={{ fill: colors.textDim, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: colors.textDim, fontSize: 11, fontFamily: 'Rajdhani' }} width={70} />
                  <Tooltip content={<CustomTooltip colors={colors} />} />
                  <Bar dataKey="avg" radius={[0, 4, 4, 0]} fill={colors.accentDim} />
                </BarChart>
              </ResponsiveContainer>
          }
        </div>
      </div>

      {/* Radar + Criteria Breakdown */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Top 3 Radar Comparison</div>
          {ideas.length === 0
            ? <div className="empty-state"><div className="empty-title">No ideas yet</div></div>
            : <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke={colors.border} />
                  <PolarAngleAxis dataKey="criterion" tick={{ fill: colors.textDim, fontSize: 11, fontFamily: 'Rajdhani' }} />
                  {rankedIdeas.slice(0, 3).map((idea, i) => (
                    <Radar key={idea.id} name={idea.name} dataKey={idea.name.slice(0, 10)}
                      stroke={colors.series[i]} fill={colors.series[i]} fillOpacity={0.15} />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
          }
        </div>

        <div className="card">
          <div className="card-title">Criteria Weights</div>
          <div className="criteria-scores">
            {criteria.map(c => (
              <div key={c.id} className="criteria-row">
                <span className="criteria-name">{c.name}</span>
                <ScoreBar value={c.weight} max={100} />
                <span className="criteria-score-val">{c.weight}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
