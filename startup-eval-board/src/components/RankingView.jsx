import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, BarChart, Bar } from 'recharts';
import ScoreCircle from './ScoreCircle.jsx';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0d1a0d', border: '1px solid #007a1f', borderRadius: 6, padding: '8px 12px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--omni-green)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: '0.82rem', color: p.color || '#00ff41' }}>{p.value}</div>
      ))}
    </div>
  );
}

export default function RankingView({ rankedIdeas, criteria, getOverallScore }) {
  const topData = rankedIdeas.slice(0, 8).map((idea, i) => ({
    name: idea.name.length > 14 ? idea.name.slice(0, 14) + '…' : idea.name,
    score: getOverallScore(idea),
    rank: i + 1,
  }));

  return (
    <div className="animate-in">
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-title">Score Distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topData}>
              <XAxis dataKey="name" tick={{ fill: '#7aab7a', fontSize: 10, fontFamily: 'Rajdhani' }} />
              <YAxis domain={[0, 10]} tick={{ fill: '#7aab7a', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {topData.map((entry, i) => (
                  <Cell key={i} fill={entry.rank <= 3 ? '#00ff41' : entry.rank <= 6 ? '#00c832' : '#007a1f'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">Score Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={topData}>
              <XAxis dataKey="name" tick={{ fill: '#7aab7a', fontSize: 10, fontFamily: 'Rajdhani' }} />
              <YAxis domain={[0, 10]} tick={{ fill: '#7aab7a', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="score" stroke="#00ff41" strokeWidth={2} dot={{ fill: '#00ff41', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section-heading">Full Rankings</div>
      <div className="rank-list">
        {rankedIdeas.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: 48, marginBottom: 14 }}>🏆</div>
            <div className="empty-title">No ideas to rank yet</div>
          </div>
        )}
        {rankedIdeas.map((idea, i) => {
          const rank = i + 1;
          const rankCls = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
          const score = getOverallScore(idea);
          const pct = (score / 10) * 100;
          return (
            <div key={idea.id} className="rank-item">
              <div className={`rank-badge ${rankCls}`}>#{rank}</div>
              <div className="rank-item-name">{idea.name}</div>
              <span className="tag" style={{ fontSize: '0.65rem' }}>{idea.category}</span>
              <div style={{ flex: 1, padding: '0 12px' }}>
                <div className="score-bar-track">
                  <div className="score-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <ScoreCircle score={score} size={52} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
