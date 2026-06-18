import { useState } from 'react';
import { useStore } from './data/store.js';
import Dashboard from './components/Dashboard.jsx';
import IdeasView from './components/IdeasView.jsx';
import RankingView from './components/RankingView.jsx';
import CompareView from './components/CompareView.jsx';
import CriteriaView from './components/CriteriaView.jsx';
import IdeaModal from './components/IdeaModal.jsx';

const TABS = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'ideas', label: '💡 Ideas' },
  { id: 'ranking', label: '🏆 Rankings' },
  { id: 'compare', label: '⚖️ Compare' },
  { id: 'criteria', label: '⚙️ Criteria' },
];

export default function App() {
  const store = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modal, setModal] = useState(null); // null | { mode: 'add' } | { mode: 'edit', idea }
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = (form) => {
    if (modal?.mode === 'edit') {
      store.updateIdea(modal.idea.id, form);
      showToast('⚡ Idea updated!');
    } else {
      store.addIdea(form);
      showToast('🛸 Idea added!');
    }
  };

  const handleDelete = (id) => {
    store.deleteIdea(id);
    showToast('🗑 Idea removed');
  };

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="header">
        <div className="omnitrix-logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#000" strokeWidth="2" fill="#00ff41" />
            <circle cx="12" cy="12" r="5" fill="#005c15" />
            <circle cx="12" cy="12" r="2.5" fill="#00ff41" />
            <line x1="12" y1="3" x2="12" y2="7" stroke="#000" strokeWidth="1.5" />
            <line x1="12" y1="17" x2="12" y2="21" stroke="#000" strokeWidth="1.5" />
            <line x1="3" y1="12" x2="7" y2="12" stroke="#000" strokeWidth="1.5" />
            <line x1="17" y1="12" x2="21" y2="12" stroke="#000" strokeWidth="1.5" />
          </svg>
        </div>
        <div>
          <div className="header-title">OMNITRIX EVAL BOARD</div>
          <div className="header-sub">Startup Idea Evaluation System</div>
        </div>
        <nav className="header-nav">
          {TABS.map(t => (
            <button key={t.id} className={`nav-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            ideas={store.ideas}
            rankedIdeas={store.rankedIdeas}
            criteria={store.criteria}
            getOverallScore={store.getOverallScore}
          />
        )}
        {activeTab === 'ideas' && (
          <IdeasView
            ideas={store.ideas}
            rankedIdeas={store.rankedIdeas}
            criteria={store.criteria}
            getOverallScore={store.getOverallScore}
            onAdd={() => setModal({ mode: 'add' })}
            onEdit={(idea) => setModal({ mode: 'edit', idea })}
            onDelete={handleDelete}
          />
        )}
        {activeTab === 'ranking' && (
          <RankingView
            rankedIdeas={store.rankedIdeas}
            criteria={store.criteria}
            getOverallScore={store.getOverallScore}
          />
        )}
        {activeTab === 'compare' && (
          <CompareView
            ideas={store.ideas}
            criteria={store.criteria}
            getOverallScore={store.getOverallScore}
          />
        )}
        {activeTab === 'criteria' && (
          <CriteriaView
            criteria={store.criteria}
            addCriterion={store.addCriterion}
            updateCriterion={store.updateCriterion}
            deleteCriterion={store.deleteCriterion}
          />
        )}
      </main>

      {/* Modal */}
      {modal && (
        <IdeaModal
          idea={modal.mode === 'edit' ? modal.idea : null}
          criteria={store.criteria}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
