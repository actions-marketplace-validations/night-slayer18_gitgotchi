
export interface Theme {
  name: string;
  background: {
    start: string;
    end: string;
  };
  card: {
    overlayStart: string;
    overlayEnd: string;
  };
  text: {
    title: string;
    subtitle: string;
    label: string;
    value: string;
  };
  bars: {
    hp: { start: string; end: string };
    xp: { start: string; end: string };
  };
  accent: string; // Helper for glows
  ring: string; // Helper for borders
  mood: {
    excited: string;
    happy: string;
    neutral: string;
    sad: string;
    angry: string;
  };
}

export const THEMES: { [key: string]: Theme } = {
  dark: {
    name: 'Dark',
    background: { start: '#0B1021', end: '#2B32B2' }, // Deep Blue Night
    card: { overlayStart: 'rgba(255, 255, 255, 0.08)', overlayEnd: 'rgba(255, 255, 255, 0.03)' },
    text: { title: '#fff', subtitle: '#a0aec0', label: '#718096', value: '#e2e8f0' },
    accent: '#64b5f6',
    ring: 'rgba(100, 181, 246, 0.3)',
    bars: {
      hp: { start: '#ef5350', end: '#ffcdd2' },
      xp: { start: '#2196f3', end: '#bbdefb' },
    },
    mood: {
      excited: '#00e676', happy: '#66bb6a', neutral: '#ffee58', sad: '#ffa726', angry: '#ef5350'
    }
  },
  light: {
    name: 'Light',
    background: { start: '#ffffff', end: '#ece9e6' },
    card: { overlayStart: 'rgba(0, 0, 0, 0.02)', overlayEnd: 'rgba(0, 0, 0, 0.05)' },
    text: { title: '#1a202c', subtitle: '#4a5568', label: '#718096', value: '#2d3748' },
    accent: '#ff9800',
    ring: 'rgba(255, 152, 0, 0.3)',
    bars: {
      hp: { start: '#ef5350', end: '#ffcdd2' },
      xp: { start: '#42a5f5', end: '#bbdefb' },
    },
    mood: {
        excited: '#2e7d32', happy: '#558b2f', neutral: '#f9a825', sad: '#ef6c00', angry: '#c62828'
    }
  },
  ocean: {
    name: 'Ocean',
    background: { start: '#000000', end: '#0f9b0f' }, // Deep Sea
    card: { overlayStart: 'rgba(255, 255, 255, 0.1)', overlayEnd: 'rgba(255, 255, 255, 0.05)' },
    text: { title: '#e0f2f1', subtitle: '#80deea', label: '#4dd0e1', value: '#e0f7fa' },
    accent: '#18ffff',
    ring: 'rgba(24, 255, 255, 0.3)',
    bars: {
        hp: { start: '#ff6b6b', end: '#ff8e8e' },
        xp: { start: '#00bcd4', end: '#80deea' } 
    },
    mood: {
        excited: '#00e676', happy: '#69f0ae', neutral: '#ffd740', sad: '#ffab40', angry: '#ff5252'
    }
  },
  dracula: {
    name: 'Dracula',
    background: { start: '#282a36', end: '#44475a' },
    card: { overlayStart: 'rgba(255, 255, 255, 0.05)', overlayEnd: 'rgba(255, 255, 255, 0.02)' },
    text: { title: '#f8f8f2', subtitle: '#6272a4', label: '#bd93f9', value: '#f8f8f2' },
    accent: '#bd93f9',
    ring: 'rgba(189, 147, 249, 0.3)',
    bars: {
      hp: { start: '#ff5555', end: '#ff6e6e' },
      xp: { start: '#8be9fd', end: '#a4ffff' },
    },
    mood: {
      excited: '#50fa7b', happy: '#8be9fd', neutral: '#f1fa8c', sad: '#ffb86c', angry: '#ff5555'
    }
  }
};

export function getTheme(name?: string): Theme {
  return THEMES[name?.toLowerCase() || 'dark'] || THEMES['dark'];
}
