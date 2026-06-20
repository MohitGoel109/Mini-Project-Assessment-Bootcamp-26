import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemePicker() {
  const { theme, themeId, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="theme-picker-wrap" ref={ref}>
      <button className="theme-trigger" onClick={() => setOpen(o => !o)}>
        <span className="theme-swatch" />
        <Palette size={13} />
        <span>{theme.name}</span>
      </button>

      {open && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-title">Select Alien Form</div>
          {themes.map(t => (
            <div
              key={t.id}
              className={`theme-option ${t.id === themeId ? 'active' : ''}`}
              onClick={() => { setTheme(t.id); setOpen(false); }}
            >
              <span className="theme-option-dot" style={{ background: t.vars['--accent'], boxShadow: `0 0 8px ${t.vars['--accent']}` }} />
              <div className="theme-option-text">
                <div className="theme-option-name">{t.name}</div>
                <div className="theme-option-sub">{t.subtitle}</div>
              </div>
              {t.id === themeId && <Check size={15} className="theme-option-check" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
