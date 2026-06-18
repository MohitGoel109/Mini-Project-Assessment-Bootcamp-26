import { useState, useCallback } from 'react';
import { DEFAULT_CRITERIA, SAMPLE_IDEAS } from './initial.js';

let idCounter = 100;
const uid = () => String(++idCounter);

export function useStore() {
  const [ideas, setIdeas] = useState(SAMPLE_IDEAS);
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);

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

  const rankedIdeas = [...ideas].sort((a, b) => getOverallScore(b) - getOverallScore(a));

  return { ideas, criteria, rankedIdeas, addIdea, updateIdea, deleteIdea, addCriterion, updateCriterion, deleteCriterion, getOverallScore };
}
