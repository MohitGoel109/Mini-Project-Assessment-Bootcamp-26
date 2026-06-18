export const DEFAULT_CRITERIA = [
  { id: 'market', name: 'Market Size', weight: 20 },
  { id: 'innovation', name: 'Innovation', weight: 20 },
  { id: 'feasibility', name: 'Feasibility', weight: 20 },
  { id: 'revenue', name: 'Revenue Potential', weight: 20 },
  { id: 'competition', name: 'Competition Level', weight: 20 },
];

export const CATEGORIES = [
  'All', 'SaaS', 'FinTech', 'HealthTech', 'EdTech', 'E-Commerce',
  'AI/ML', 'Web3', 'GreenTech', 'Social', 'B2B', 'B2C', 'Other'
];

export const SAMPLE_IDEAS = [
  {
    id: '1',
    name: 'AlienTech Analytics',
    description: 'AI-powered data analytics platform for SMEs that transforms raw data into actionable alien intelligence dashboards.',
    category: 'SaaS',
    scores: { market: 8, innovation: 9, feasibility: 7, revenue: 8, competition: 6 },
    swot: {
      strengths: ['Strong AI backbone', 'User-friendly interface', 'Scalable architecture'],
      weaknesses: ['High initial dev cost', 'Requires data literacy'],
      opportunities: ['Growing SME market', 'Digital transformation wave', 'Partner integrations'],
      threats: ['Tableau, PowerBI dominance', 'Data privacy regulations']
    }
  },
  {
    id: '2',
    name: 'OmniPay Wallet',
    description: 'Cross-border payment solution using blockchain rails to enable instant, low-fee international transfers.',
    category: 'FinTech',
    scores: { market: 9, innovation: 7, feasibility: 6, revenue: 9, competition: 5 },
    swot: {
      strengths: ['Low transaction fees', 'Fast settlements', 'Regulatory compliance'],
      weaknesses: ['Crypto volatility risk', 'Complex KYC requirements'],
      opportunities: ['Unbanked population', 'Remittance market', 'DeFi integration'],
      threats: ['Central bank digital currencies', 'PayPal, Stripe competition']
    }
  },
  {
    id: '3',
    name: 'HeroLearn Academy',
    description: 'Gamified skill-based learning platform where students earn NFT certificates and badges for real-world competencies.',
    category: 'EdTech',
    scores: { market: 7, innovation: 8, feasibility: 8, revenue: 7, competition: 7 },
    swot: {
      strengths: ['Engaging gamification', 'Verified credentials', 'Community driven'],
      weaknesses: ['NFT adoption uncertainty', 'Content creation costs'],
      opportunities: ['Remote work upskilling', 'Corporate training B2B', 'Gen Z adoption'],
      threats: ['Coursera, Udemy scale', 'NFT market sentiment']
    }
  },
];
