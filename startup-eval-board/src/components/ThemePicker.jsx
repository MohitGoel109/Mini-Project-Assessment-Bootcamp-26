import { useState, useRef, useEffect } from 'react';
import { Palette, Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemePicker() {
  const { theme, themeKey, setTheme, aliens, isUltimate, currentAlienId } = useTheme();
  const [open, setOpen] = useState(false);
  // Two-level nav: null = showing the alien list; an alien id = showing that
  // alien's Base/Ultimate sub-choice.
  const [expandedAlienId, setExpandedAlienId] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setExpandedAlienId(null);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // When opening the picker, jump straight to the currently active alien's
  // sub-menu so the user immediately sees Base/Ultimate for what they're on.
  const handleOpen = () => {
    setOpen(o => {
      const next = !o;
      if (next) setExpandedAlienId(currentAlienId);
      return next;
    });
  };

  const expandedAlien = aliens.find(a => a.id === expandedAlienId);

  return (
    <div className="theme-picker-wrap" ref={ref}>
      <button className="theme-trigger" onClick={handleOpen}>
        <span className="theme-swatch" />
        <Palette size={13} />
        <span>{theme.name}</span>
      </button>

      {open && (
        <div className="theme-dropdown">
          {!expandedAlien ? (
            <>
              <div className="theme-dropdown-title">Select Alien</div>
              {aliens.map(alien => {
                const isActiveAlien = alien.id === currentAlienId;
                const swatchForm = isActiveAlien ? theme : alien.forms.base;
                return (
                  <div
                    key={alien.id}
                    className={`theme-option ${isActiveAlien ? 'active' : ''}`}
                    onClick={() => setExpandedAlienId(alien.id)}
                  >
                    <span className="theme-option-dot" style={{ background: swatchForm.vars['--accent'], boxShadow: `0 0 8px ${swatchForm.vars['--accent']}` }} />
                    <div className="theme-option-text">
                      <div className="theme-option-name">{alien.label}</div>
                      <div className="theme-option-sub">
                        {isActiveAlien ? (isUltimate ? 'Ultimate active' : 'Base active') : 'Base + Ultimate'}
                      </div>
                    </div>
                    <ChevronRight size={15} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div
                className="theme-dropdown-title"
                style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                onClick={() => setExpandedAlienId(null)}
              >
                <ChevronLeft size={14} />
                {expandedAlien.label}
              </div>

              {['base', 'ultimate'].map(formKey => {
                const form = expandedAlien.forms[formKey];
                const key = formKey === 'base' ? expandedAlien.id : `${expandedAlien.id}:ultimate`;
                const isActive = themeKey === key;
                return (
                  <div
                    key={key}
                    className={`theme-option ${isActive ? 'active' : ''}`}
                    onClick={() => { setTheme(key); setOpen(false); setExpandedAlienId(null); }}
                  >
                    <span className="theme-option-dot" style={{ background: form.vars['--accent'], boxShadow: `0 0 8px ${form.vars['--accent']}` }} />
                    <div className="theme-option-text">
                      <div className="theme-option-name" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        {formKey === 'ultimate' && <Sparkles size={12} />}
                        {form.name}
                      </div>
                      <div className="theme-option-sub">{form.subtitle}</div>
                    </div>
                    {isActive && <Check size={15} className="theme-option-check" />}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}