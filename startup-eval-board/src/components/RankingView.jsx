import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, BarChart, Bar } from 'recharts';
import ScoreCircle from './ScoreCircle.jsx';

/* ── Rank medal labels using Orbitron font — no emojis ── */
const RANK_META = [
  { cls: 'rank-1', numLabel: '#1', badgeLabel: 'GOLD'   },
  { cls: 'rank-2', numLabel: '#2', badgeLabel: 'SILVER' },
  { cls: 'rank-3', numLabel: '#3', badgeLabel: 'BRONZE' },
];

function RankBadge({ rank }) {
  if (rank <= 3) {
    const m = RANK_META[rank - 1];
    return (
      <div className={`rank-badge ${m.cls}`}>
        <span className="rank-badge-num">{m.numLabel}</span>
        <span className="rank-badge-label">{m.badgeLabel}</span>
      </div>
    );
  }
  return (
    <div className="rank-badge rank-other">
      <span className="rank-badge-num">#{rank}</span>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-panel)',
      border: '1px solid var(--primary-dark)',
      borderRadius: 6,
      padding: '8px 12px',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--primary)', marginBottom: 4 }}>
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: '0.82rem', color: p.color || 'var(--primary)' }}>
          Score: {p.value}
        </div>
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

  const barColor = (rank) =>
    rank <= 3 ? 'var(--primary)' : rank <= 6 ? 'var(--primary-dim)' : 'var(--primary-dark)';

  return (
    <div className="animate-in">
      {/* Charts row */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-title">Score Distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topData}>
              <XAxis dataKey="name" tick={{ fill: 'var(--text-dim)', fontSize: 10, fontFamily: 'Rajdhani' }} />
              <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-dim)', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {topData.map((entry, i) => (
                  <Cell key={i} fill={barColor(entry.rank)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">Score Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={topData}>
              <XAxis dataKey="name" tick={{ fill: 'var(--text-dim)', fontSize: 10, fontFamily: 'Rajdhani' }} />
              <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-dim)', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--primary)', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full rankings list */}
      <div className="section-heading">Full Rankings</div>
      <div className="rank-list">
        {rankedIdeas.length === 0 && (
          <div className="empty-state">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary)', marginBottom: 14 }}>
              RANK
            </div>
            <div className="empty-title">No ideas to rank yet</div>
            <div className="empty-desc">Add startup ideas to see them ranked here.</div>
          </div>
        )}
        {rankedIdeas.map((idea, i) => {
          const rank  = i + 1;
          const score = getOverallScore(idea);
          const pct   = (score / 10) * 100;
          return (
            <div key={idea.id} className="rank-item">
              <RankBadge rank={rank} />
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