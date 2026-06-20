// Keyword-based score suggestion engine.
//
// Works against arbitrary, user-defined criteria (since criteria can be renamed/
// added/deleted in the Criteria tab) by first classifying each criterion name into
// one of a fixed set of "dimensions" (market, innovation, feasibility, revenue,
// competition, other), then scoring that dimension from keywords found in the
// idea's name + description + category. Unrecognized criteria fall back to a
// neutral baseline derived from the overall keyword "energy" of the text.

const DIMENSION_KEYWORDS = {
  market: {
    boosters: [
      'global', 'worldwide', 'mass market', 'everyone', 'consumers', 'billion',
      'million users', 'population', 'demand', 'widespread', 'mainstream',
      'unbanked', 'underserved', 'gen z', 'millennial', 'enterprise', 'b2b', 'b2c',
    ],
    dampeners: ['niche', 'small market', 'limited', 'local only', 'narrow', 'hobbyist'],
  },
  innovation: {
    boosters: [
      'ai', 'artificial intelligence', 'machine learning', 'ml', 'blockchain',
      'novel', 'first-of-its-kind', 'breakthrough', 'patent', 'proprietary',
      'cutting-edge', 'next-gen', 'disrupt', 'revolutionary', 'unique', 'nft',
      'vr', 'ar', 'quantum', 'autonomous', 'generative', 'neural',
    ],
    dampeners: ['traditional', 'standard', 'conventional', 'existing', 'clone', 'copycat', 'me-too'],
  },
  feasibility: {
    boosters: [
      'simple', 'easy', 'straightforward', 'proven', 'existing tech', 'low cost to build',
      'lean', 'mvp', 'quick to launch', 'off-the-shelf', 'no-code', 'saas', 'subscription',
      'app', 'platform', 'web', 'mobile',
    ],
    dampeners: [
      'complex', 'regulatory', 'regulation', 'compliance', 'hardware', 'manufacturing',
      'biotech', 'clinical trial', 'fda', 'capital-intensive', 'infrastructure-heavy',
      'requires license', 'years to build', 'r&d', 'research-heavy',
    ],
  },
  revenue: {
    boosters: [
      'subscription', 'recurring', 'saas', 'transaction fee', 'commission',
      'premium', 'monetize', 'pricing', 'high margin', 'enterprise contracts',
      'licensing', 'marketplace fee', 'ads', 'advertising',
    ],
    dampeners: ['free', 'non-profit', 'donation', 'no monetization', 'open source', 'unclear revenue'],
  },
  competition: {
    // Note: higher score here = LESS competition (more favorable), matching the
    // "Competition Level" criterion convention used in the default criteria set
    // (lower competitive pressure scores higher).
    boosters: ['unbanked', 'underserved', 'first mover', 'no direct competitor', 'blue ocean', 'untapped'],
    dampeners: [
      'crowded', 'saturated', 'many competitors', 'dominant players', 'amazon', 'google',
      'facebook', 'established players', 'red ocean', 'incumbents',
    ],
  },
};

const DIMENSION_NAME_HINTS = {
  market: ['market', 'size', 'demand', 'audience', 'reach', 'tam'],
  innovation: ['innovat', 'novelty', 'tech', 'creative', 'uniqueness', 'differentiat'],
  feasibility: ['feasib', 'viability', 'execution', 'buildable', 'complexity', 'ease'],
  revenue: ['revenue', 'monetiz', 'profit', 'pricing', 'margin', 'financial'],
  competition: ['competit', 'rival', 'saturation', 'moat'],
};

/**
 * Classifies a criterion name into the closest known dimension, or null if
 * nothing matches (caller should use a neutral fallback in that case).
 */
function classifyCriterion(criterionName) {
  const lower = criterionName.toLowerCase();
  for (const [dimension, hints] of Object.entries(DIMENSION_NAME_HINTS)) {
    if (hints.some(h => lower.includes(h))) return dimension;
  }
  return null;
}

/**
 * Scores a single dimension (1-10) from the combined idea text.
 */
function scoreDimension(dimension, text) {
  const rules = DIMENSION_KEYWORDS[dimension];
  if (!rules) return 5;

  let score = 5.5; // slightly above neutral baseline so a "blank" idea isn't punished
  rules.boosters.forEach(kw => { if (text.includes(kw)) score += 1.1; });
  rules.dampeners.forEach(kw => { if (text.includes(kw)) score -= 1.1; });

  return clampScore(score);
}

/**
 * Generic fallback score for criteria that don't match a known dimension:
 * based on overall "signal density" of the text — longer, more specific
 * descriptions nudge slightly higher than a one-line idea.
 */
function scoreGeneric(text, description) {
  let score = 5;
  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount > 25) score += 1;
  if (wordCount > 50) score += 0.5;
  const allBoosters = Object.values(DIMENSION_KEYWORDS).flatMap(d => d.boosters);
  const hits = allBoosters.filter(kw => text.includes(kw)).length;
  score += Math.min(hits * 0.3, 1.5);
  return clampScore(score);
}

function clampScore(n) {
  return Math.max(1, Math.min(10, Math.round(n * 10) / 10));
}

/**
 * Main entry point. Given criteria (array of {id, name}) and idea fields,
 * returns a { [criterionId]: number } suggestion map. Scores are 1-10,
 * rounded to one decimal place — the slider UI rounds further on display.
 */
export function suggestScores({ name = '', description = '', category = '' }, criteria) {
  const text = `${name} ${description} ${category}`.toLowerCase();
  const suggestions = {};

  criteria.forEach(c => {
    const dimension = classifyCriterion(c.name);
    suggestions[c.id] = dimension
      ? scoreDimension(dimension, text)
      : scoreGeneric(text, description);
  });

  return suggestions;
}

/** True if the idea has enough text to produce a meaningful suggestion. */
export function hasEnoughTextForSuggestion({ name = '', description = '' }) {
  return (name.trim() + description.trim()).length >= 8;
}
