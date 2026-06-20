import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, BarChart, Bar } from 'recharts';
import { Trophy, Medal, Award, Hash, TrendingUp, AlertTriangle } from 'lucide-react';
import ScoreCircle from './ScoreCircle.jsx';
import { useThemeColors } from '../hooks/useThemeColors.js';

function CustomTooltip({ active, payload, label, colors }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: colors.bgPanel, border: `1px solid ${colors.accentDark}`, borderRadius: 6, padding: '8px 12px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: colors.accent, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: '0.82rem', color: p.color || colors.accent }}>{p.value}</div>
      ))}
    </div>
  );
}

// Rank icon — font/vector icons (lucide-react) instead of emoji
function RankIcon({ rank, size = 16 }) {
  if (rank === 1) return <Trophy size={size} className="rank-icon-wrap" />;
  if (rank === 2) return <Medal size={size} className="rank-icon-wrap" />;
  if (rank === 3) return <Award size={size} className="rank-icon-wrap" />;
  return <Hash size={size - 2} className="rank-icon-wrap" />;
}

export default function RankingView({ rankedIdeas, criteria, getOverallScore }) {
  const colors = useThemeColors();
  const topData = rankedIdeas.slice(0, 8).map((idea, i) => ({
    name: idea.name.length > 14 ? idea.name.slice(0, 14) + '…' : idea.name,
    score: getOverallScore(idea),
    rank: i + 1,
  }));

  // Detect ideas that still have every criterion at the untouched default (5) —
  // these will look "tied" until the user opens Edit and sets real scores.
  const isUnscored = (idea) => criteria.length > 0 && criteria.every(c => (idea.scores[c.id] ?? 5) === 5);

  return (
    <div className="animate-in">
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-title">Score Distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topData}>
              <XAxis dataKey="name" tick={{ fill: colors.textDim, fontSize: 10, fontFamily: 'Rajdhani' }} />
              <YAxis domain={[0, 10]} tick={{ fill: colors.textDim, fontSize: 10 }} />
              <Tooltip content={<CustomTooltip colors={colors} />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {topData.map((entry, i) => (
                  <Cell key={i} fill={entry.rank <= 3 ? colors.accent : entry.rank <= 6 ? colors.accentDim : colors.accentDark} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">Score Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={topData}>
              <XAxis dataKey="name" tick={{ fill: colors.textDim, fontSize: 10, fontFamily: 'Rajdhani' }} />
              <YAxis domain={[0, 10]} tick={{ fill: colors.textDim, fontSize: 10 }} />
              <Tooltip content={<CustomTooltip colors={colors} />} />
              <Line type="monotone" dataKey="score" stroke={colors.accent} strokeWidth={2} dot={{ fill: colors.accent, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section-heading">
        <TrendingUp size={15} style={{ marginRight: 2 }} />
        Full Rankings
      </div>

      <div className="rank-list">
        {rankedIdeas.length === 0 && (
          <div className="empty-state">
            <Trophy size={44} style={{ opacity: 0.3, marginBottom: 14 }} />
            <div className="empty-title">No ideas to rank yet</div>
          </div>
        )}
        {rankedIdeas.map((idea, i) => {
          const rank = i + 1;
          const rankCls = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
          const score = getOverallScore(idea);
          const pct = (score / 10) * 100;
          const unscored = isUnscored(idea);
          return (
            <div key={idea.id} className="rank-item">
              <div className={`rank-badge ${rankCls}`}>
                <RankIcon rank={rank} size={rank <= 3 ? 15 : 13} />
              </div>
              <div className="rank-item-name">
                {idea.name}
                {unscored && (
                  <span title="Every criterion is still at the neutral default (5) — add a description or click Suggest Scores"
                    style={{ marginLeft: 8, color: 'var(--omni-warn)', display: 'inline-flex', verticalAlign: -2 }}>
                    <AlertTriangle size={13} />
                  </span>
                )}
              </div>
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
