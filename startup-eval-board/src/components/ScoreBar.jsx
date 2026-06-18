export default function ScoreBar({ value, max = 10 }) {
  const pct = (value / max) * 100;
  return (
    <div className="score-bar-track" style={{ flex: 1 }}>
      <div className="score-bar-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
