import { SvgGenerator } from '../src/renderer/SvgGenerator';
import { GameState } from '../src/services/StateService';

describe('SvgGenerator', () => {
  let generator: SvgGenerator;
  let baseState: GameState;

  beforeEach(() => {
    generator = new SvgGenerator();
    baseState = {
      petName: 'TestPet',
      hp: 100,
      maxHp: 100,
      xp: 0,
      mood: 'happy',
      moodScore: 5,
      level: 1,
      lastFed: new Date().toISOString(),
      streak: 0
    };
  });

  test('should generate SVG string', () => {
    const svg = generator.render(baseState);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  test('should include pet name and stats', () => {
    const svg = generator.render(baseState);
    expect(svg).toContain('TestPet');
    // Check for new labels
    expect(svg).toContain('Health 100%'); 
    expect(svg).toContain('XP 0 / 100');
    expect(svg).toContain('HAPPY'); // Mood text
  });

  test('should render vector pet content', () => {
    const svg = generator.render(baseState);
    // Check for some unique vector elements from our assets
    expect(svg).toContain('<defs>');
    expect(svg).toContain('<radialGradient');
    expect(svg).toContain('<ellipse');
  });
});
