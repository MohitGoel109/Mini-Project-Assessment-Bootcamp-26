export default function ScoreCircle({ score, size = 70 }) {
  const cls = score >= 7.5 ? 'score-high' : score >= 5 ? 'score-mid' : 'score-low';
  return (
    <div className={`score-circle ${cls}`} style={{ width: size, height: size }}>
      <span className="score-circle-value">{score}</span>
      <span className="score-circle-label">/ 10</span>
    </div>
  );
}
