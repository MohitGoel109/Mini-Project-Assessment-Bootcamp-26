import { useState, useRef, useEffect } from 'react';
import { useStore } from './data/store.js';
import Dashboard from './components/Dashboard.jsx';
import IdeasView from './components/IdeasView.jsx';
import RankingView from './components/RankingView.jsx';
import CompareView from './components/CompareView.jsx';
import CriteriaView from './components/CriteriaView.jsx';
import IdeaModal from './components/IdeaModal.jsx';

/* ── Tab definitions (no emojis in nav, Orbitron handles style) ── */
const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'ideas',     label: 'Ideas' },
  { id: 'ranking',   label: 'Rankings' },
  { id: 'compare',   label: 'Compare' },
  { id: 'criteria',  label: 'Criteria' },
];

/* ── Theme definitions ── */
const THEMES = [
  { id: 'default',     name: 'Ben 10',       sub: 'Omnitrix Green',   color: '#00ff41' },
  { id: 'heatblast',   name: 'Heatblast',    sub: 'Pyronite Fire',    color: '#ff6a00' },
  { id: 'xlr8',        name: 'XLR8',         sub: 'Kineceleran Blue', color: '#00cfff' },
  { id: 'fourarms',    name: 'Four Arms',     sub: 'Tetramand Red',    color: '#ff2244' },
  { id: 'diamondhead', name: 'Diamondhead',  sub: 'Petrosapien Teal', color: '#00ffd5' },
  { id: 'ghostfreak',  name: 'Ghostfreak',   sub: 'Ectonurite Purple',color: '#cc88ff' },
  { id: 'upgrade',     name: 'Upgrade',      sub: 'Galvanic Silver',  color: '#88ccff' },
  { id: 'cannonbolt',  name: 'Cannonbolt',   sub: 'Arburian Gold',    color: '#ffe033' },
  { id: 'wildvine',    name: 'Wildvine',     sub: 'Florauna Lime',    color: '#66ff44' },
];

/* ── Omnitrix SVG (reusable) ── */
function OmnitrixSVG({ color = '#00ff41' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#000" strokeWidth="2" fill={color} />
      <circle cx="12" cy="12" r="5" fill="#000" fillOpacity="0.5" />
      <circle cx="12" cy="12" r="2.5" fill={color} />
      <line x1="12" y1="3"  x2="12" y2="7"  stroke="#000" strokeWidth="1.5" />
      <line x1="12" y1="17" x2="12" y2="21" stroke="#000" strokeWidth="1.5" />
      <line x1="3"  y1="12" x2="7"  y2="12" stroke="#000" strokeWidth="1.5" />
      <line x1="17" y1="12" x2="21" y2="12" stroke="#000" strokeWidth="1.5" />
    </svg>
  );
}

/* ── Ben 10 Transformation overlay ── */
function TransformOverlay({ theme, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1150);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="xform-overlay">
      <div className="xform-ring">
        <OmnitrixSVG color={theme.color} />
      </div>
      <div className="xform-name">{theme.name}</div>
      <div className="xform-sub">{theme.sub}</div>
    </div>
  );
}

/* ── Theme Switcher dropdown ── */
function ThemeSwitcher({ current, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const currentTheme = THEMES.find(t => t.id === current) || THEMES[0];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="theme-switcher" ref={ref}>
      <button className="theme-btn" onClick={() => setOpen(o => !o)}>
        <span className="theme-dot" style={{ background: currentTheme.color, boxShadow: `0 0 6px ${currentTheme.color}` }} />
        {currentTheme.name}
        <span style={{ opacity: 0.5 }}>▾</span>
      </button>
      {open && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-title">Select Alien Theme</div>
          {THEMES.map(t => (
            <div
              key={t.id}
              className={`theme-option ${current === t.id ? 'active' : ''}`}
              onClick={() => { onChange(t); setOpen(false); }}
            >
              <span className="theme-option-dot" style={{ background: t.color, boxShadow: `0 0 5px ${t.color}` }} />
              <div>
                <div className="theme-option-name">{t.name}</div>
                <div className="theme-option-sub">{t.sub}</div>
              </div>
              {current === t.id && <span className="theme-option-check">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const store = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [themeId, setThemeId] = useState('default');
  const [transforming, setTransforming] = useState(null); // theme object during anim

  /* Apply theme to <html> data attribute */
  useEffect(() => {
    const root = document.documentElement;
    if (themeId === 'default') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', themeId);
  }, [themeId]);

  const handleThemeChange = (theme) => {
    setTransforming(theme);
    // Apply theme mid-animation (at ~40% mark)
    setTimeout(() => setThemeId(theme.id), 450);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = (form) => {
    if (modal?.mode === 'edit') {
      store.updateIdea(modal.idea.id, form);
      showToast('Idea updated!');
    } else {
      store.addIdea(form);
      showToast('Idea added!');
    }
  };

  const handleDelete = (id) => {
    store.deleteIdea(id);
    showToast('Idea removed');
  };

  const currentTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  return (
    <div className="app-shell">

      {/* Transformation animation overlay */}
      {transforming && (
        <TransformOverlay
          theme={transforming}
          onDone={() => setTransforming(null)}
        />
      )}

      {/* Header */}
      <header className="header">
        <div className="omnitrix-logo" title="Omnitrix">
          <OmnitrixSVG color={currentTheme.color} />
        </div>
        <div>
          <div className="header-title">OMNITRIX EVAL BOARD</div>
          <div className="header-sub">Startup Idea Evaluation System</div>
        </div>
        <nav className="header-nav">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`nav-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
          <ThemeSwitcher current={themeId} onChange={handleThemeChange} />
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

      {/* Idea modal */}
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