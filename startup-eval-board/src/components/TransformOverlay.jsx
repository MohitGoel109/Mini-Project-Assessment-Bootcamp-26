import { useTheme } from '../context/ThemeContext.jsx';

// Simple original geometric glyphs evoking each alien's silhouette/motif —
// not reproductions of any copyrighted character art. Ultimate variants reuse
// the base motif with an added outer ring/halo to read as "evolved".
function AlienGlyph({ symbol }) {
  const common = { width: 46, height: 46, viewBox: '0 0 24 24', fill: 'none', stroke: '#000', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const ultimateRing = <circle cx="12" cy="12" r="11" strokeDasharray="2.4 2.4" opacity="0.55" />;

  switch (symbol) {
    case 'fourarms':
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="3.2" fill="#000" />
          <path d="M5 6 L9 9 M19 6 L15 9 M5 18 L9 13 M19 18 L15 13" />
          <path d="M12 12 L12 17" />
        </svg>
      );
    case 'ultimate-fourarms':
      return (
        <svg {...common}>
          {ultimateRing}
          <circle cx="12" cy="9" r="3.2" fill="#000" />
          <path d="M5 6 L9 9 M19 6 L15 9 M5 18 L9 13 M19 18 L15 13" />
          <path d="M12 12 L12 17" />
        </svg>
      );

    case 'xlr8':
      return (
        <svg {...common}>
          <path d="M4 8 L11 12 L4 16" />
          <path d="M10 8 L17 12 L10 16" />
          <path d="M16 8 L21 12 L16 16" />
        </svg>
      );
    case 'ultimate-xlr8':
      return (
        <svg {...common}>
          {ultimateRing}
          <path d="M4 8 L11 12 L4 16" />
          <path d="M10 8 L17 12 L10 16" />
          <path d="M16 8 L21 12 L16 16" />
        </svg>
      );

    case 'diamondhead':
      return (
        <svg {...common}>
          <path d="M12 3 L19 10 L12 21 L5 10 Z" fill="#000" opacity="0.25" />
          <path d="M12 3 L19 10 L12 21 L5 10 Z" />
          <path d="M12 3 L12 21 M5 10 L19 10" />
        </svg>
      );
    case 'ultimate-diamondhead':
      return (
        <svg {...common}>
          {ultimateRing}
          <path d="M12 3 L19 10 L12 21 L5 10 Z" fill="#000" opacity="0.25" />
          <path d="M12 3 L19 10 L12 21 L5 10 Z" />
          <path d="M12 3 L12 21 M5 10 L19 10" />
        </svg>
      );

    case 'heatblast':
      return (
        <svg {...common}>
          <path d="M12 3 C9 7 7 9 7 13 a5 5 0 0 0 10 0 c0-2-1-3-2-4 c0 2-1 3-2 2 c1-3-1-5-1-8 Z" fill="#000" opacity="0.2" />
          <path d="M12 3 C9 7 7 9 7 13 a5 5 0 0 0 10 0 c0-2-1-3-2-4 c0 2-1 3-2 2 c1-3-1-5-1-8 Z" />
        </svg>
      );
    case 'ultimate-heatblast':
      return (
        <svg {...common}>
          {ultimateRing}
          <path d="M12 3 C9 7 7 9 7 13 a5 5 0 0 0 10 0 c0-2-1-3-2-4 c0 2-1 3-2 2 c1-3-1-5-1-8 Z" fill="#000" opacity="0.2" />
          <path d="M12 3 C9 7 7 9 7 13 a5 5 0 0 0 10 0 c0-2-1-3-2-4 c0 2-1 3-2 2 c1-3-1-5-1-8 Z" />
        </svg>
      );

    case 'wildmutt':
      return (
        <svg {...common}>
          <path d="M6 5 L8 19 M11 4 L12.5 19 M16 5 L18 19" />
        </svg>
      );
    case 'ultimate-wildmutt':
      return (
        <svg {...common}>
          {ultimateRing}
          <path d="M6 5 L8 19 M11 4 L12.5 19 M16 5 L18 19" />
        </svg>
      );

    case 'waybig':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" opacity="0.3" />
          <circle cx="12" cy="12" r="6.5" fill="#000" opacity="0.2" />
          <circle cx="12" cy="12" r="6.5" />
          <circle cx="12" cy="12" r="2.5" fill="#000" />
        </svg>
      );
    case 'ultimate-waybig':
      return (
        <svg {...common}>
          {ultimateRing}
          <circle cx="12" cy="12" r="9.5" opacity="0.3" />
          <circle cx="12" cy="12" r="6.5" fill="#000" opacity="0.2" />
          <circle cx="12" cy="12" r="6.5" />
          <circle cx="12" cy="12" r="2.5" fill="#000" />
        </svg>
      );

    case 'ghostfreak':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="9" ry="6" />
          <circle cx="12" cy="12" r="2.6" fill="#000" />
        </svg>
      );
    case 'ultimate-ghostfreak':
      return (
        <svg {...common}>
          {ultimateRing}
          <ellipse cx="12" cy="12" rx="9" ry="6" />
          <circle cx="12" cy="12" r="2.6" fill="#000" />
        </svg>
      );

    case 'ultimate-omnitrix':
      return (
        <svg {...common}>
          {ultimateRing}
          <circle cx="12" cy="12" r="9" fill="#000" opacity="0.15" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="2" fill="#000" />
          <line x1="12" y1="3" x2="12" y2="7" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <line x1="3" y1="12" x2="7" y2="12" />
          <line x1="17" y1="12" x2="21" y2="12" />
        </svg>
      );
    case 'omnitrix':
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" fill="#000" opacity="0.15" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="2" fill="#000" />
          <line x1="12" y1="3" x2="12" y2="7" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <line x1="3" y1="12" x2="7" y2="12" />
          <line x1="17" y1="12" x2="21" y2="12" />
        </svg>
      );
  }
}

export default function TransformOverlay() {
  const { transforming } = useTheme();
  if (!transforming) return null;

  return (
    <div className="transform-overlay" key={`${transforming.alienId}-${transforming.formKey}`}>
      <div className="transform-ring" style={{ borderColor: transforming.vars['--accent'] }} />
      <div
        className="transform-dial"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${transforming.vars['--accent']}, ${transforming.vars['--accent-dark']})`,
          borderColor: transforming.vars['--accent'],
          boxShadow: `0 0 40px ${transforming.vars['--accent']}`,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AlienGlyph symbol={transforming.symbol} />
        </div>
      </div>
      <div className="transform-flash" />
      <div className="transform-label" style={{ color: transforming.vars['--accent'], textShadow: `0 0 20px ${transforming.vars['--accent']}` }}>
        {transforming.name}
      </div>
      <div className="transform-sublabel">{transforming.subtitle}</div>
    </div>
  );
}