// Ben 10 alien-inspired themes.
// Each ALIEN has two FORMS: "base" and "ultimate". Each form is a full
// CSS-variable palette applied to :root. "Ben 10" (base, Omnitrix green)
// is the default selection on first load.
//
// All 16 forms (8 base + 8 ultimate) use accent hues spaced exactly 22.5deg
// apart around the color wheel (360 / 16), the maximum possible even spacing
// for 16 colors -- guaranteeing every single form, including an alien vs its
// own Ultimate, is visually distinct from every other form with no near-matches.
//
// Shape: ALIENS = [{ id, label, forms: { base: {...}, ultimate: {...} } }, ...]
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
          '--accent': '#0af59f',
          '--accent-dim': '#09ce85',
          '--accent-dark': '#0b8458',
          '--accent-glow': '#0af59f33',
          '--accent-secondary': '#f25add',
          '--bg-black': '#060c0a',
          '--bg-dark': '#0a1511',
          '--bg-panel': '#0d1c16',
          '--bg-card': '#11221c',
          '--border': '#1b372d',
          '--text': '#e1f4ed',
          '--text-dim': '#59c09a',
        },
      },
      ultimate: {
        name: 'Ultimate Ben',
        subtitle: 'Evolved Omnitrix Core',
        symbol: 'ultimate-omnitrix',
        vars: {
          '--accent': '#f50a60',
          '--accent-dim': '#ce0951',
          '--accent-dark': '#840b37',
          '--accent-glow': '#f50a6033',
          '--accent-secondary': '#5af26e',
          '--bg-black': '#0c0608',
          '--bg-dark': '#150a0e',
          '--bg-panel': '#1c0d12',
          '--bg-card': '#221117',
          '--border': '#371b25',
          '--text': '#f4e1e8',
          '--text-dim': '#c0597e',
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
          '--accent': '#f5ba0a',
          '--accent-dim': '#ce9c09',
          '--accent-dark': '#84660b',
          '--accent-glow': '#f5ba0a33',
          '--accent-secondary': '#5accf2',
          '--bg-black': '#0c0a06',
          '--bg-dark': '#15120a',
          '--bg-panel': '#1c180d',
          '--bg-card': '#221e11',
          '--border': '#37301b',
          '--text': '#f4efe1',
          '--text-dim': '#c0a659',
        },
      },
      ultimate: {
        name: 'Ultimate Four Arms',
        subtitle: 'Evolved Tetramand Warlord',
        symbol: 'ultimate-fourarms',
        vars: {
          '--accent': '#290af5',
          '--accent-dim': '#2309ce',
          '--accent-dark': '#1b0b84',
          '--accent-glow': '#290af533',
          '--accent-secondary': '#f2ba5a',
          '--bg-black': '#07060c',
          '--bg-dark': '#0b0a15',
          '--bg-panel': '#0f0d1c',
          '--bg-card': '#131122',
          '--border': '#1e1b37',
          '--text': '#e4e1f4',
          '--text-dim': '#6659c0',
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
          '--accent': '#0a9ff5',
          '--accent-dim': '#0985ce',
          '--accent-dark': '#0b5884',
          '--accent-glow': '#0a9ff533',
          '--accent-secondary': '#f25a6e',
          '--bg-black': '#060a0c',
          '--bg-dark': '#0a1115',
          '--bg-panel': '#0d161c',
          '--bg-card': '#111c22',
          '--border': '#1b2d37',
          '--text': '#e1edf4',
          '--text-dim': '#599ac0',
        },
      },
      ultimate: {
        name: 'Ultimate XLR8',
        subtitle: 'Evolved Velocity Storm',
        symbol: 'ultimate-xlr8',
        vars: {
          '--accent': '#d6f50a',
          '--accent-dim': '#b3ce09',
          '--accent-dark': '#74840b',
          '--accent-glow': '#d6f50a33',
          '--accent-secondary': '#5a92f2',
          '--bg-black': '#0b0c06',
          '--bg-dark': '#13150a',
          '--bg-panel': '#1a1c0d',
          '--bg-card': '#202211',
          '--border': '#33371b',
          '--text': '#f1f4e1',
          '--text-dim': '#b2c059',
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
          '--accent': '#0af545',
          '--accent-dim': '#09ce3a',
          '--accent-dark': '#0b8429',
          '--accent-glow': '#0af54533',
          '--accent-secondary': '#cc5af2',
          '--bg-black': '#060c07',
          '--bg-dark': '#0a150d',
          '--bg-panel': '#0d1c11',
          '--bg-card': '#112215',
          '--border': '#1b3722',
          '--text': '#e1f4e6',
          '--text-dim': '#59c072',
        },
      },
      ultimate: {
        name: 'Ultimate Diamondhead',
        subtitle: 'Evolved Crystalline Form',
        symbol: 'ultimate-diamondhead',
        vars: {
          '--accent': '#d60af5',
          '--accent-dim': '#b309ce',
          '--accent-dark': '#740b84',
          '--accent-glow': '#d60af533',
          '--accent-secondary': '#baf25a',
          '--bg-black': '#0b060c',
          '--bg-dark': '#130a15',
          '--bg-panel': '#1a0d1c',
          '--bg-card': '#201122',
          '--border': '#331b37',
          '--text': '#f1e1f4',
          '--text-dim': '#b259c0',
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
          '--accent': '#f50a0a',
          '--accent-dim': '#ce0909',
          '--accent-dark': '#840b0b',
          '--accent-glow': '#f50a0a33',
          '--accent-secondary': '#5af2a6',
          '--bg-black': '#0c0606',
          '--bg-dark': '#150a0a',
          '--bg-panel': '#1c0d0d',
          '--bg-card': '#221111',
          '--border': '#371b1b',
          '--text': '#f4e1e1',
          '--text-dim': '#c05959',
        },
      },
      ultimate: {
        name: 'Ultimate Heatblast',
        subtitle: 'Evolved Magma Core',
        symbol: 'ultimate-heatblast',
        vars: {
          '--accent': '#0af5f5',
          '--accent-dim': '#09cece',
          '--accent-dark': '#0b8484',
          '--accent-glow': '#0af5f533',
          '--accent-secondary': '#f25aa6',
          '--bg-black': '#060c0c',
          '--bg-dark': '#0a1515',
          '--bg-panel': '#0d1c1c',
          '--bg-card': '#112222',
          '--border': '#1b3737',
          '--text': '#e1f4f4',
          '--text-dim': '#59c0c0',
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
          '--accent': '#80f50a',
          '--accent-dim': '#6bce09',
          '--accent-dark': '#47840b',
          '--accent-glow': '#80f50a33',
          '--accent-secondary': '#5a5af2',
          '--bg-black': '#090c06',
          '--bg-dark': '#0f150a',
          '--bg-panel': '#141c0d',
          '--bg-card': '#1a2211',
          '--border': '#29371b',
          '--text': '#ebf4e1',
          '--text-dim': '#8cc059',
        },
      },
      ultimate: {
        name: 'Ultimate Wildmutt',
        subtitle: 'Evolved Apex Predator',
        symbol: 'ultimate-wildmutt',
        vars: {
          '--accent': '#f50aba',
          '--accent-dim': '#ce099c',
          '--accent-dark': '#840b66',
          '--accent-glow': '#f50aba33',
          '--accent-secondary': '#80f25a',
          '--bg-black': '#0c060a',
          '--bg-dark': '#150a12',
          '--bg-panel': '#1c0d18',
          '--bg-card': '#22111e',
          '--border': '#371b30',
          '--text': '#f4e1ef',
          '--text-dim': '#c059a6',
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
        subtitle: 'To\'kustar Colossus',
        symbol: 'waybig',
        vars: {
          '--accent': '#f5600a',
          '--accent-dim': '#ce5109',
          '--accent-dark': '#84370b',
          '--accent-glow': '#f5600a33',
          '--accent-secondary': '#5af2dd',
          '--bg-black': '#0c0806',
          '--bg-dark': '#150e0a',
          '--bg-panel': '#1c120d',
          '--bg-card': '#221711',
          '--border': '#37251b',
          '--text': '#f4e8e1',
          '--text-dim': '#c07e59',
        },
      },
      ultimate: {
        name: 'Ultimate Way Big',
        subtitle: 'Evolved Colossus Form',
        symbol: 'ultimate-waybig',
        vars: {
          '--accent': '#0a45f5',
          '--accent-dim': '#093ace',
          '--accent-dark': '#0b2984',
          '--accent-glow': '#0a45f533',
          '--accent-secondary': '#f2805a',
          '--bg-black': '#06070c',
          '--bg-dark': '#0a0d15',
          '--bg-panel': '#0d111c',
          '--bg-card': '#111522',
          '--border': '#1b2237',
          '--text': '#e1e6f4',
          '--text-dim': '#5972c0',
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
          '--accent': '#7f0af5',
          '--accent-dim': '#6b09ce',
          '--accent-dark': '#470b84',
          '--accent-glow': '#7f0af533',
          '--accent-secondary': '#f2f25a',
          '--bg-black': '#09060c',
          '--bg-dark': '#0f0a15',
          '--bg-panel': '#140d1c',
          '--bg-card': '#191122',
          '--border': '#291b37',
          '--text': '#ebe1f4',
          '--text-dim': '#8c59c0',
        },
      },
      ultimate: {
        name: 'Ultimate Ghostfreak',
        subtitle: 'Evolved Nemetrix Phantom',
        symbol: 'ultimate-ghostfreak',
        vars: {
          '--accent': '#29f50a',
          '--accent-dim': '#23ce09',
          '--accent-dark': '#1b840b',
          '--accent-glow': '#29f50a33',
          '--accent-secondary': '#925af2',
          '--bg-black': '#070c06',
          '--bg-dark': '#0b150a',
          '--bg-panel': '#0f1c0d',
          '--bg-card': '#132211',
          '--border': '#1e371b',
          '--text': '#e4f4e1',
          '--text-dim': '#66c059',
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