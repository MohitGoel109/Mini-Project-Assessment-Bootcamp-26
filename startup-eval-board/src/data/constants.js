export const CATEGORIES = ['All', 'SaaS', 'Marketplace', 'FinTech', 'HealthTech', 'EdTech', 'Other'];

export const CRITERIA = [
  { id: 'marketSize', label: 'Market Size', weight: 1.5 },
  { id: 'teamFit', label: 'Team Fit', weight: 1.2 },
  { id: 'innovation', label: 'Innovation', weight: 1.3 },
  { id: 'feasibility', label: 'Feasibility', weight: 1.4 },
  { id: 'revenue', label: 'Revenue Potential', weight: 1.5 },
  { id: 'competition', label: 'Low Competition', weight: 1.0 },
];

export const SAMPLE_IDEAS = [
  {
    id: '1',
    name: 'OmniLearn AI',
    category: 'EdTech',
    description: 'Personalized AI tutoring platform that adapts to individual learning styles using real-time feedback and gamification.',
    scores: { marketSize: 9, teamFit: 8, innovation: 9, feasibility: 7, revenue: 8, competition: 6 },
    swot: {
      strengths: ['Scalable AI engine', 'Strong team expertise in ML'],
      weaknesses: ['High compute costs', 'Data privacy concerns'],
      opportunities: ['Growing EdTech market', 'Remote learning demand'],
      threats: ['Google & Duolingo competition', 'Regulation around AI in education'],
    },
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'MedChain Rx',
    category: 'HealthTech',
    description: 'Blockchain-powered pharmaceutical supply chain with smart contracts that guarantee drug authenticity end-to-end.',
    scores: { marketSize: 8, teamFit: 6, innovation: 8, feasibility: 5, revenue: 9, competition: 7 },
    swot: {
      strengths: ['Unique blockchain approach', 'High-value market'],
      weaknesses: ['Complex regulatory approval', 'Long sales cycles'],
      opportunities: ['FDA push for traceability', 'Global drug counterfeiting crisis'],
      threats: ['Enterprise incumbents', 'Blockchain adoption skepticism'],
    },
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'FlexWork Hub',
    category: 'Marketplace',
    description: 'A two-sided marketplace connecting SMBs with pre-vetted fractional executives for project-based leadership roles.',
    scores: { marketSize: 7, teamFit: 9, innovation: 7, feasibility: 8, revenue: 8, competition: 5 },
    swot: {
      strengths: ['Network effects', 'Low overhead model'],
      weaknesses: ['Chicken-and-egg problem', 'Trust building required'],
      opportunities: ['Remote work normalization', 'Gig economy growth'],
      threats: ['LinkedIn entering space', 'Economic downturn risk'],
    },
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'GreenRoute',
    category: 'SaaS',
    description: 'Carbon footprint optimization SaaS for logistics companies — auto-routes shipments via lowest emission paths.',
    scores: { marketSize: 8, teamFit: 7, innovation: 8, feasibility: 7, revenue: 7, competition: 6 },
    swot: {
      strengths: ['ESG regulatory tailwinds', 'First-mover advantage'],
      weaknesses: ['Requires deep integration', 'Real-time data costs'],
      opportunities: ['EU Carbon Border Tax', 'Corporate sustainability mandates'],
      threats: ['SAP & Oracle adding features', 'Oil price fluctuations'],
    },
    createdAt: '2024-02-10',
  },
];

export function calcOverallScore(scores) {
  let total = 0;
  let weightSum = 0;
  CRITERIA.forEach(c => {
    total += (scores[c.id] || 0) * c.weight;
    weightSum += c.weight;
  });
  return Math.round((total / weightSum) * 10) / 10;
}

export function getScoreGrade(score) {
  if (score >= 8) return { label: 'Excellent', className: 'score-excellent', badge: 'badge-green' };
  if (score >= 6) return { label: 'Good', className: 'score-good', badge: 'badge-green' };
  if (score >= 4) return { label: 'Average', className: 'score-average', badge: 'badge-yellow' };
  return { label: 'Poor', className: 'score-poor', badge: 'badge-red' };
}

export function getScoreBarColor(score) {
  if (score >= 8) return 'linear-gradient(90deg, #00cc33, #00ff41)';
  if (score >= 6) return 'linear-gradient(90deg, #00a8cc, #00cfff)';
  if (score >= 4) return 'linear-gradient(90deg, #cc9900, #ffe000)';
  return 'linear-gradient(90deg, #cc2222, #ff3b3b)';
}

export function getCategoryClass(cat) {
  const map = {
    SaaS: 'cat-saas',
    Marketplace: 'cat-marketplace',
    FinTech: 'cat-fintech',
    HealthTech: 'cat-health',
    EdTech: 'cat-edtech',
  };
  return map[cat] || 'cat-other';
}
