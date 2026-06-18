import React from 'react';
import { CRITERIA, calcOverallScore, getScoreGrade, getScoreBarColor, getCategoryClass } from '../data/constants';

export default function IdeaCard({ idea, rank, selected, onSelect, onEdit, onDelete, onViewSwot }) {
  const overall = calcOverallScore(idea.scores);
  const grade = getScoreGrade(overall);
  const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';

  return (
    <div className={`idea-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="idea-card-header">
        <div className={`idea-rank ${rankClass}`}>{rank}</div>
        <div className="idea-name">{idea.name}</div>
        <span className={`idea-category-badge ${getCategoryClass(idea.category)}`}>
          {idea.category}
        </span>
      </div>

      <div className="idea-card-body">
        <p className="idea-description">{idea.description}</p>

        {CRITERIA.slice(0, 4).map(c => (
          <div className="score-bar-container" key={c.id}>
            <div className="score-bar-label">
              <span>{c.label}</span>
              <span>{idea.scores[c.id]}/10</span>
            </div>
            <div className="score-bar-track">
              <div
                className="score-bar-fill"
                style={{
                  width: `${idea.scores[c.id] * 10}%`,
                  background: getScoreBarColor(idea.scores[c.id]),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="idea-card-footer">
        <div className="overall-score-display">
          <span className={`overall-score-number ${grade.className}`}>{overall}</span>
          <div>
            <div className="overall-score-label">OVERALL</div>
            <span className={`badge ${grade.badge}`}>{grade.label}</span>
          </div>
        </div>

        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button className="btn btn-outline btn-sm" onClick={onViewSwot} title="SWOT Analysis">
            🔍
          </button>
          <button className="btn btn-outline btn-sm" onClick={onEdit} title="Edit">
            ✏️
          </button>
          <button className="btn btn-danger btn-sm" onClick={onDelete} title="Delete">
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}
