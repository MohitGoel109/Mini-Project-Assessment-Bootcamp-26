import { useState, useCallback, useEffect } from 'react';
import { DEFAULT_CRITERIA, SAMPLE_IDEAS } from './initial.js';

let idCounter = 100;
const uid = () => String(++idCounter);

function bumpCounterPastExisting(items) {
  items.forEach(item => {
    const n = Number(item.id);
    if (!Number.isNaN(n) && n > idCounter) idCounter = n;
  });
}

const IDEAS_KEY = 'omnitrix-eval-board:ideas';
const CRITERIA_KEY = 'omnitrix-eval-board:criteria';

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function useStore() {
  const [ideas, setIdeas] = useState(() => {
    const loaded = loadFromStorage(IDEAS_KEY, SAMPLE_IDEAS);
    bumpCounterPastExisting(loaded);
    return loaded;
  });
  const [criteria, setCriteria] = useState(() => {
    const loaded = loadFromStorage(CRITERIA_KEY, DEFAULT_CRITERIA);
    bumpCounterPastExisting(loaded);
    return loaded;
  });

  // Persist to localStorage whenever either collection changes, so ideas
  // survive a closed tab, refresh, or browser restart.
  useEffect(() => {
    try { localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas)); } catch { /* storage full/unavailable */ }
  }, [ideas]);

  useEffect(() => {
    try { localStorage.setItem(CRITERIA_KEY, JSON.stringify(criteria)); } catch { /* storage full/unavailable */ }
  }, [criteria]);

  const addIdea = useCallback((idea) => {
    const defaultScores = {};
    criteria.forEach(c => { defaultScores[c.id] = 5; });
    setIdeas(prev => [...prev, { ...idea, id: uid(), scores: { ...defaultScores, ...idea.scores }, swot: idea.swot || { strengths: [], weaknesses: [], opportunities: [], threats: [] } }]);
  }, [criteria]);

  const updateIdea = useCallback((id, updates) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  }, []);

  const deleteIdea = useCallback((id) => {
    setIdeas(prev => prev.filter(i => i.id !== id));
  }, []);

  const addCriterion = useCallback((criterion) => {
    const newC = { ...criterion, id: uid() };
    setCriteria(prev => {
      const totalExisting = prev.reduce((s, c) => s + c.weight, 0);
      const newWeight = Math.max(0, 100 - totalExisting);
      return [...prev, { ...newC, weight: newWeight }];
    });
    setIdeas(prev => prev.map(i => ({ ...i, scores: { ...i.scores, [newC.id]: 5 } })));
  }, []);

  const updateCriterion = useCallback((id, updates) => {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCriterion = useCallback((id) => {
    setCriteria(prev => prev.filter(c => c.id !== id));
    setIdeas(prev => prev.map(i => {
      const scores = { ...i.scores };
      delete scores[id];
      return { ...i, scores };
    }));
  }, []);

  const getOverallScore = useCallback((idea) => {
    const total = criteria.reduce((sum, c) => sum + c.weight, 0);
    if (total === 0) return 0;
    const weighted = criteria.reduce((sum, c) => {
      return sum + (idea.scores[c.id] || 0) * (c.weight / total);
    }, 0);
    return Math.round(weighted * 10) / 10;
  }, [criteria]);

  const resetToSamples = useCallback(() => {
    idCounter = 100;
    setIdeas(SAMPLE_IDEAS);
    setCriteria(DEFAULT_CRITERIA);
    try {
      localStorage.removeItem(IDEAS_KEY);
      localStorage.removeItem(CRITERIA_KEY);
    } catch { /* storage unavailable */ }
  }, []);

  const rankedIdeas = [...ideas].sort((a, b) => getOverallScore(b) - getOverallScore(a));

  return { ideas, criteria, rankedIdeas, addIdea, updateIdea, deleteIdea, addCriterion, updateCriterion, deleteCriterion, getOverallScore, resetToSamples };
}
