import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemePicker() {
  const { theme, currentAlienId, setTheme, aliens } = useTheme();
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
        <span>{theme.alienLabel}</span>
      </button>

      {open && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-title">Select Alien</div>
          {aliens.map(alien => {
            const isActive = alien.id === currentAlienId;
            return (
              <div
                key={alien.id}
                className={`theme-option ${isActive ? 'active' : ''}`}
                onClick={() => { setTheme(alien.id); setOpen(false); }}
              >
                <span className="theme-option-dot" style={{ background: alien.forms.base.vars['--accent'], boxShadow: `0 0 8px ${alien.forms.base.vars['--accent']}` }} />
                <div className="theme-option-text">
                  <div className="theme-option-name">{alien.label}</div>
                  <div className="theme-option-sub">{alien.forms.base.subtitle}</div>
                </div>
                {isActive && <Check size={15} className="theme-option-check" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}