// Ben 10 alien-inspired themes.
// Each ALIEN has two FORMS: "base" and "ultimate". Each form is a full
// CSS-variable palette applied to :root. "Ben 10" (base, Omnitrix green)
// is the default selection on first load.
//
// Shape: ALIENS = [{ id, name, forms: { base: {...}, ultimate: {...} } }, ...]
// Each form object: { name, subtitle, symbol, vars }

export const ALIENS = [
  {
    id: 'ben10',
    label: 'Ben 10',
    forms: {
      base: {
        name: 'Ben 10',
        subtitle: 'Omnitrix Default',
        symbol: 'omnitrix',
        vars: {
          '--accent': '#00ff41',
          '--accent-dim': '#00c832',
          '--accent-dark': '#007a1f',
          '--accent-glow': '#00ff4133',
          '--accent-secondary': '#00ffe7',
          '--bg-black': '#0a0a0a',
          '--bg-dark': '#111411',
          '--bg-panel': '#141a14',
          '--bg-card': '#181f18',
          '--border': '#1e2e1e',
          '--text': '#e0ffe0',
          '--text-dim': '#7aab7a',
        },
      },
      ultimate: {
        name: 'Ultimate Ben',
        subtitle: 'Evolved Omnitrix Core',
        symbol: 'ultimate-omnitrix',
        vars: {
          '--accent': '#ff0044',
          '--accent-dim': '#e0003a',
          '--accent-dark': '#8c0024',
          '--accent-glow': '#ff004433',
          '--accent-secondary': '#00eaff',
          '--bg-black': '#070306',
          '--bg-dark': '#0e060b',
          '--bg-panel': '#150811',
          '--bg-card': '#1c0a16',
          '--border': '#3a1228',
          '--text': '#ffe0ec',
          '--text-dim': '#c97a96',
        },
      },
    },
  },
  {
    id: 'fourarms',
    label: 'Four Arms',
    forms: {
      base: {
        name: 'Four Arms',
        subtitle: 'Tetramand Strength',
        symbol: 'fourarms',
        vars: {
          '--accent': '#ff5a1f',
          '--accent-dim': '#e8460e',
          '--accent-dark': '#8c2a08',
          '--accent-glow': '#ff5a1f33',
          '--accent-secondary': '#ffce54',
          '--bg-black': '#0e0805',
          '--bg-dark': '#160c07',
          '--bg-panel': '#1c0f08',
          '--bg-card': '#221209',
          '--border': '#3a1e0e',
          '--text': '#ffe8d8',
          '--text-dim': '#c98f6a',
        },
      },
      ultimate: {
        name: 'Ultimate Four Arms',
        subtitle: 'Evolved Tetramand Warlord',
        symbol: 'ultimate-fourarms',
        vars: {
          '--accent': '#7c3aed',
          '--accent-dim': '#6425d6',
          '--accent-dark': '#3a1280',
          '--accent-glow': '#7c3aed33',
          '--accent-secondary': '#ffb020',
          '--bg-black': '#08060d',
          '--bg-dark': '#0e0a16',
          '--bg-panel': '#140e20',
          '--bg-card': '#191228',
          '--border': '#2e1f4a',
          '--text': '#ece2ff',
          '--text-dim': '#9988c4',
        },
      },
    },
  },
  {
    id: 'xlr8',
    label: 'XLR8',
    forms: {
      base: {
        name: 'XLR8',
        subtitle: 'Kineceleran Velocity',
        symbol: 'xlr8',
        vars: {
          '--accent': '#1f9bff',
          '--accent-dim': '#0f7fe0',
          '--accent-dark': '#0a4a8c',
          '--accent-glow': '#1f9bff33',
          '--accent-secondary': '#aef0ff',
          '--bg-black': '#04080e',
          '--bg-dark': '#070d16',
          '--bg-panel': '#0a121e',
          '--bg-card': '#0d1624',
          '--border': '#13283e',
          '--text': '#dcf0ff',
          '--text-dim': '#6a9ec9',
        },
      },
      ultimate: {
        name: 'Ultimate XLR8',
        subtitle: 'Evolved Velocity Storm',
        symbol: 'ultimate-xlr8',
        vars: {
          '--accent': '#ffe600',
          '--accent-dim': '#e0c800',
          '--accent-dark': '#8c7d00',
          '--accent-glow': '#ffe60033',
          '--accent-secondary': '#1fd6ff',
          '--bg-black': '#0a0a04',
          '--bg-dark': '#121106',
          '--bg-panel': '#1a1808',
          '--bg-card': '#221f0a',
          '--border': '#3e370f',
          '--text': '#fffbe0',
          '--text-dim': '#bdb069',
        },
      },
    },
  },
  {
    id: 'diamondhead',
    label: 'Diamondhead',
    forms: {
      base: {
        name: 'Diamondhead',
        subtitle: 'Petrosapien Crystal',
        symbol: 'diamondhead',
        vars: {
          '--accent': '#00e0c8',
          '--accent-dim': '#00bfa8',
          '--accent-dark': '#007568',
          '--accent-glow': '#00e0c833',
          '--accent-secondary': '#b9fff5',
          '--bg-black': '#040e0c',
          '--bg-dark': '#071613',
          '--bg-panel': '#0a1c18',
          '--bg-card': '#0d231d',
          '--border': '#103a30',
          '--text': '#d6fff8',
          '--text-dim': '#5fb3a3',
        },
      },
      ultimate: {
        name: 'Ultimate Diamondhead',
        subtitle: 'Evolved Crystalline Form',
        symbol: 'ultimate-diamondhead',
        vars: {
          '--accent': '#ff2e9f',
          '--accent-dim': '#e0107f',
          '--accent-dark': '#8c0a4f',
          '--accent-glow': '#ff2e9f33',
          '--accent-secondary': '#7afcff',
          '--bg-black': '#0a0509',
          '--bg-dark': '#120810',
          '--bg-panel': '#1a0b17',
          '--bg-card': '#220e1e',
          '--border': '#3e1830',
          '--text': '#ffe0f3',
          '--text-dim': '#c2789f',
        },
      },
    },
  },
  {
    id: 'heatblast',
    label: 'Heatblast',
    forms: {
      base: {
        name: 'Heatblast',
        subtitle: 'Pyronite Inferno',
        symbol: 'heatblast',
        vars: {
          '--accent': '#ff3300',
          '--accent-dim': '#e02900',
          '--accent-dark': '#8c1a00',
          '--accent-glow': '#ff330033',
          '--accent-secondary': '#ffcc00',
          '--bg-black': '#0e0402',
          '--bg-dark': '#170603',
          '--bg-panel': '#1d0804',
          '--bg-card': '#240a05',
          '--border': '#451608',
          '--text': '#ffe3d6',
          '--text-dim': '#cc7f63',
        },
      },
      ultimate: {
        name: 'Ultimate Heatblast',
        subtitle: 'Evolved Magma Core',
        symbol: 'ultimate-heatblast',
        vars: {
          '--accent': '#2dd4ff',
          '--accent-dim': '#0fb3e0',
          '--accent-dark': '#086d8c',
          '--accent-glow': '#2dd4ff33',
          '--accent-secondary': '#ff5c00',
          '--bg-black': '#040a0e',
          '--bg-dark': '#071116',
          '--bg-panel': '#0a161d',
          '--bg-card': '#0d1c24',
          '--border': '#143040',
          '--text': '#dff7ff',
          '--text-dim': '#6fa8bd',
        },
      },
    },
  },
  {
    id: 'wildmutt',
    label: 'Wildmutt',
    forms: {
      base: {
        name: 'Wildmutt',
        subtitle: 'Vulpimancer Instinct',
        symbol: 'wildmutt',
        vars: {
          '--accent': '#c9a227',
          '--accent-dim': '#a8841c',
          '--accent-dark': '#6b5410',
          '--accent-glow': '#c9a22733',
          '--accent-secondary': '#ff8a3d',
          '--bg-black': '#0a0805',
          '--bg-dark': '#120e08',
          '--bg-panel': '#18130a',
          '--bg-card': '#1e180c',
          '--border': '#352a14',
          '--text': '#f2e8d0',
          '--text-dim': '#a89668',
        },
      },
      ultimate: {
        name: 'Ultimate Wildmutt',
        subtitle: 'Evolved Apex Predator',
        symbol: 'ultimate-wildmutt',
        vars: {
          '--accent': '#39d353',
          '--accent-dim': '#23b03c',
          '--accent-dark': '#136622',
          '--accent-glow': '#39d35333',
          '--accent-secondary': '#ff3d6e',
          '--bg-black': '#05090a',
          '--bg-dark': '#0a0f0e',
          '--bg-panel': '#0e1512',
          '--bg-card': '#121b17',
          '--border': '#1f3128',
          '--text': '#e0ffe6',
          '--text-dim': '#73a883',
        },
      },
    },
  },
  {
    id: 'waybig',
    label: 'Way Big',
    forms: {
      base: {
        name: 'Way Big',
        subtitle: "To'kustar Colossus",
        symbol: 'waybig',
        vars: {
          '--accent': '#ff2d55',
          '--accent-dim': '#e0143e',
          '--accent-dark': '#8c0a26',
          '--accent-glow': '#ff2d5533',
          '--accent-secondary': '#ffd24d',
          '--bg-black': '#0a0507',
          '--bg-dark': '#13080c',
          '--bg-panel': '#1a0a10',
          '--bg-card': '#210d14',
          '--border': '#3a1622',
          '--text': '#ffe4ea',
          '--text-dim': '#c97a8e',
        },
      },
      ultimate: {
        name: 'Ultimate Way Big',
        subtitle: "Evolved Colossus Form",
        symbol: 'ultimate-waybig',
        vars: {
          '--accent': '#00c2ff',
          '--accent-dim': '#00a0e0',
          '--accent-dark': '#00608c',
          '--accent-glow': '#00c2ff33',
          '--accent-secondary': '#ffe14d',
          '--bg-black': '#04080a',
          '--bg-dark': '#070f13',
          '--bg-panel': '#0a151a',
          '--bg-card': '#0d1b21',
          '--border': '#163240',
          '--text': '#dff6ff',
          '--text-dim': '#6fa3b8',
        },
      },
    },
  },
  {
    id: 'ghostfreak',
    label: 'Ghostfreak',
    forms: {
      base: {
        name: 'Ghostfreak',
        subtitle: 'Ectonurite Shadow',
        symbol: 'ghostfreak',
        vars: {
          '--accent': '#8c2bff',
          '--accent-dim': '#7314e0',
          '--accent-dark': '#430a8c',
          '--accent-glow': '#8c2bff33',
          '--accent-secondary': '#e0c8ff',
          '--bg-black': '#08050c',
          '--bg-dark': '#0d0814',
          '--bg-panel': '#120b1c',
          '--bg-card': '#160e22',
          '--border': '#2a1840',
          '--text': '#ece0ff',
          '--text-dim': '#9279b3',
        },
      },
      ultimate: {
        name: 'Ultimate Ghostfreak',
        subtitle: 'Evolved Nemetrix Phantom',
        symbol: 'ultimate-ghostfreak',
        vars: {
          '--accent': '#00ff9d',
          '--accent-dim': '#00d680',
          '--accent-dark': '#00804d',
          '--accent-glow': '#00ff9d33',
          '--accent-secondary': '#ff2bb3',
          '--bg-black': '#030806',
          '--bg-dark': '#060f0b',
          '--bg-panel': '#091611',
          '--bg-card': '#0c1c16',
          '--border': '#143a2a',
          '--text': '#e0fff2',
          '--text-dim': '#6fb39a',
        },
      },
    },
  },
];

// Flattened lookup: "alienId" or "alienId:ultimate" -> resolved form object
// (includes alienId/formKey so consumers can tell which alien+form is active).
function buildLookup() {
  const map = {};
  ALIENS.forEach(alien => {
    map[alien.id] = { ...alien.forms.base, alienId: alien.id, formKey: 'base', alienLabel: alien.label };
    map[`${alien.id}:ultimate`] = { ...alien.forms.ultimate, alienId: alien.id, formKey: 'ultimate', alienLabel: alien.label };
  });
  return map;
}

const THEME_LOOKUP = buildLookup();

/** Resolves a theme key ("ben10" or "fourarms:ultimate") to its full form object. */
export const getTheme = (key) => THEME_LOOKUP[key] || THEME_LOOKUP['ben10'];

/** True if the given key refers to an Ultimate form. */
export const isUltimateKey = (key) => key.endsWith(':ultimate');

/** Strips ":ultimate" suffix to get the base alien id from any theme key. */
export const alienIdFromKey = (key) => key.split(':')[0];