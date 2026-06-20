// Tremor-powered analytics dashboard.
// Requires `npm install` to pull in @tremor/react + Tailwind (already in package.json/tailwind.config.js).
// Swap this in for Dashboard.jsx in App.jsx if you want Tremor's chart library instead of Recharts.
import { Card, Metric, Text, BarChart, DonutChart, ProgressBar, Flex, Badge } from '@tremor/react';
import { useThemeColors } from '../hooks/useThemeColors.js';

export default function DashboardTremor({ ideas, rankedIdeas, criteria, getOverallScore }) {
  const colors = useThemeColors();
  const topIdea = rankedIdeas[0];

  const barData = rankedIdeas.slice(0, 6).map(idea => ({
    name: idea.name.length > 14 ? idea.name.slice(0, 14) + '…' : idea.name,
    Score: getOverallScore(idea),
  }));

  const catMap = {};
  ideas.forEach(idea => {
    if (!catMap[idea.category]) catMap[idea.category] = [];
    catMap[idea.category].push(getOverallScore(idea));
  });
  const donutData = Object.entries(catMap).map(([cat, scores]) => ({
    name: cat,
    value: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10,
  }));

  const avgScore = ideas.length ? Math.round((ideas.reduce((s, i) => s + getOverallScore(i), 0) / ideas.length) * 10) / 10 : 0;

  return (
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Metric cards */}
      <div className="stat-grid">
        <Card style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Text style={{ color: 'var(--text-dim)' }}>Total Ideas</Text>
          <Metric style={{ color: 'var(--accent)' }}>{ideas.length}</Metric>
        </Card>
        <Card style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Text style={{ color: 'var(--text-dim)' }}>Criteria</Text>
          <Metric style={{ color: 'var(--accent)' }}>{criteria.length}</Metric>
        </Card>
        <Card style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Text style={{ color: 'var(--text-dim)' }}>Avg Score</Text>
          <Metric style={{ color: 'var(--accent)' }}>{avgScore}</Metric>
        </Card>
        <Card style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Text style={{ color: 'var(--text-dim)' }}>Top Idea</Text>
          <Metric style={{ color: 'var(--accent-secondary)', fontSize: '1.1rem' }}>{topIdea ? topIdea.name : '—'}</Metric>
        </Card>
      </div>

      <div className="grid-2">
        <Card style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Text style={{ color: 'var(--text-dim)', marginBottom: 8 }}>Score Rankings</Text>
          <BarChart
            data={barData}
            index="name"
            categories={['Score']}
            colors={['emerald']}
            yAxisWidth={30}
            showLegend={false}
          />
        </Card>

        <Card style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Text style={{ color: 'var(--text-dim)', marginBottom: 8 }}>Category Avg Scores</Text>
          <DonutChart
            data={donutData}
            category="value"
            index="name"
            colors={['emerald', 'cyan', 'amber', 'rose', 'violet', 'blue']}
          />
        </Card>
      </div>

      <Card style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <Text style={{ color: 'var(--text-dim)', marginBottom: 12 }}>Criteria Weights</Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {criteria.map(c => (
            <div key={c.id}>
              <Flex>
                <Text style={{ color: 'var(--text)' }}>{c.name}</Text>
                <Text style={{ color: 'var(--accent)' }}>{c.weight}%</Text>
              </Flex>
              <ProgressBar value={c.weight} color="emerald" className="mt-1" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
