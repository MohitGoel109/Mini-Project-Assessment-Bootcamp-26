import { useState } from 'react';
import { CATEGORIES } from '../data/initial.js';
import ScoreCircle from './ScoreCircle.jsx';
import ScoreBar from './ScoreBar.jsx';
import SwotPanel from './SwotPanel.jsx';

function IdeaCard({ idea, rank, criteria, score, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const rankCls = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';

  return (
    <div className="idea-card">
      <div className="idea-card-header">
        <div className={`rank-badge ${rankCls}`}>#{rank}</div>
        <div className="idea-info" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div className="idea-name">{idea.name}</div>
            <span className="tag">{idea.category}</span>
          </div>
          <div className="idea-desc">{idea.description}</div>
        </div>
        <ScoreCircle score={score} />
      </div>

      {/* Criteria bars */}
      <div className="criteria-scores">
        {criteria.map(c => (
          <div key={c.id} className="criteria-row">
            <span className="criteria-name">{c.name}</span>
            <ScoreBar value={idea.scores[c.id] || 0} />
            <span className="criteria-score-val">{idea.scores[c.id] || 0}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? '▲ Hide SWOT' : '▼ Show SWOT'}
        </button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(idea)}>✏️ Edit</button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(idea.id)}>🗑</button>
      </div>

      {expanded && (
        <div style={{ animation: 'fadeSlideIn 0.25s ease' }}>
          <div className="divider" style={{ margin: '10px 0' }} />
          <div className="card-title" style={{ marginBottom: 12 }}>SWOT Analysis</div>
          <SwotPanel swot={idea.swot} />
        </div>
      )}
    </div>
  );
}

export default function IdeasView({ ideas, rankedIdeas, criteria, getOverallScore, onAdd, onEdit, onDelete }) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = rankedIdeas
    .filter(i => category === 'All' || i.category === category)
    .filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()));

  const usedCategories = ['All', ...new Set(ideas.map(i => i.category))];

  return (
    <div className="animate-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <input
          className="input"
          style={{ maxWidth: 280 }}
          placeholder="Search ideas…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={onAdd}>⚡ Add Idea</button>
      </div>

      <div className="filter-bar">
        {usedCategories.map(c => (
          <button key={c} className={`filter-chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0
        ? <div className="empty-state">
            <div style={{ fontSize: 48, marginBottom: 14 }}>🛸</div>
            <div className="empty-title">No ideas found</div>
            <div className="empty-desc">Try a different filter or add your first idea</div>
          </div>
        : <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map((idea, i) => {
              const rank = rankedIdeas.findIndex(r => r.id === idea.id) + 1;
              return (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  rank={rank}
                  criteria={criteria}
                  score={getOverallScore(idea)}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </div>
      }
    </div>
  );
}
