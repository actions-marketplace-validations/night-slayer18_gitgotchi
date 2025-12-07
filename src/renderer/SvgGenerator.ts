import { GameState } from '../services/StateService';
import { SPRITES } from './assets';

export class SvgGenerator {
  render(state: GameState): string {
    const width = 800;
    const height = 400; 
    
    // Get the SVG content string for the current level
    const spriteContent = SPRITES[state.level] || SPRITES[1];
    
    const moodColor = this.getMoodColor(state.mood);
    const hpPercent = (state.hp / state.maxHp) * 100;
    
    let nextLevelXp = 100;
    let prevLevelXp = 0;
    if (state.level === 2) { prevLevelXp = 100; nextLevelXp = 500; }
    else if (state.level === 3) { prevLevelXp = 500; nextLevelXp = 2000; }
    else if (state.level >= 4) { prevLevelXp = 2000; nextLevelXp = 5000; } 

    const xpProgress = state.level >= 4 ? 100 : Math.min(100, ((state.xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100);

    return `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradients -->
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1c29" /> 
            <stop offset="100%" style="stop-color:#2d3748" /> 
          </linearGradient>
          
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" style="stop-color:rgba(255, 255, 255, 0.05)" />
             <stop offset="100%" style="stop-color:rgba(255, 255, 255, 0.02)" />
          </linearGradient>

          <linearGradient id="hpLog" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ff4d4d" />
            <stop offset="100%" style="stop-color:#ff9e9e" />
          </linearGradient>
          
          <linearGradient id="xpLog" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#4d94ff" />
            <stop offset="100%" style="stop-color:#99c2ff" />
          </linearGradient>

          <!-- Drop Shadow -->
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
            <feOffset dx="2" dy="2" result="offsetblur"/> 
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5"/> 
            </feComponentTransfer>
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>

        <style>
          .text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; fill: #e0e0e0; }
          .title { font-size: 28px; font-weight: 700; fill: #fff; }
          .subtitle { font-size: 16px; font-weight: 400; fill: #a0aec0; }
          .stat-label { font-size: 14px; fill: #a0aec0; font-weight: 600; letter-spacing: 0.5px; }
          .stat-value { font-size: 14px; font-weight: bold; fill: #fff; }
          
          .bar-bg { fill: rgba(255, 255, 255, 0.1); rx: 6; }
          .hp-bar { fill: url(#hpLog); rx: 6; transition: width 1s ease-out; }
          .xp-bar { fill: url(#xpLog); rx: 6; transition: width 1s ease-out; }
          
          .card-bg { fill: url(#bgGradient); rx: 16; }
          .glass-panel { fill: url(#cardGradient); stroke: rgba(255, 255, 255, 0.1); stroke-width: 1; rx: 12; }
          
          /* Animations */
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          
          .pet-anim { 
             animation: float 4s ease-in-out infinite; 
             transform-origin: center;
          }
          
          .icon { fill: #a0aec0; }
        </style>
        
        <!-- Background -->
        <rect x="0" y="0" width="${width}" height="${height}" class="card-bg" />
        
        <!-- Glass Panel Overlay -->
        <rect x="20" y="20" width="${width - 40}" height="${height - 40}" class="glass-panel" />

        <!-- Pet Section -->
        <g transform="translate(60, 60)">
             <g class="pet-anim">
                ${spriteContent}
             </g>
        </g>

        <!-- Stats Section -->
        <g transform="translate(360, 70)">
          <!-- Header -->
          <text x="0" y="10" class="text title">${state.petName} <tspan fill="#a0aec0" font-weight="300">(Lvl ${state.level})</tspan></text>
          <text x="0" y="40" class="text subtitle">The Digital Guardian</text>
          
          <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.1)" stroke-width="1" />

          <!-- HP Bar -->
          <g transform="translate(0, 90)">
            <path class="icon" d="M10,0 C15,-5 20,0 10,10 C0,0 5,-5 10,0" transform="scale(1.2)" />
            <text x="30" y="10" class="text stat-label">HEALTH</text>
            <text x="380" y="10" text-anchor="end" class="text stat-value">${Math.round(state.hp)} / ${state.maxHp}</text>
            
            <rect x="0" y="20" width="380" height="12" class="bar-bg" />
            <rect x="0" y="20" width="${(hpPercent / 100) * 380}" height="12" class="hp-bar" filter="url(#dropshadow)" />
          </g>

          <!-- XP Bar -->
          <g transform="translate(0, 150)">
            <path class="icon" d="M10,0 L12,7 L19,7 L14,11 L16,18 L10,14 L4,18 L6,11 L1,7 L8,7 Z" transform="translate(0,-5) scale(0.9)" />
            <text x="30" y="10" class="text stat-label">EXPERIENCE</text>
            <text x="380" y="10" text-anchor="end" class="text stat-value">${state.xp} / ${nextLevelXp} XP</text>

            <rect x="0" y="20" width="380" height="12" class="bar-bg" />
            <rect x="0" y="20" width="${(xpProgress / 100) * 380}" height="12" class="xp-bar" filter="url(#dropshadow)" />
          </g>
          
          <!-- Info Grid -->
          <g transform="translate(0, 210)">
             <!-- Mood -->
             <g>
                <circle cx="10" cy="10" r="15" fill="rgba(255,255,255,0.05)" />
                <text x="10" y="15" text-anchor="middle" font-size="16">😊</text>
                <text x="35" y="5" class="text stat-label" font-size="12">MOOD</text>
                <text x="35" y="22" class="text stat-value" fill="${moodColor}">${state.mood.toUpperCase()}</text>
             </g>
             
             <!-- Streak -->
             <g transform="translate(140, 0)">
                <circle cx="10" cy="10" r="15" fill="rgba(255,255,255,0.05)" />
                <text x="10" y="15" text-anchor="middle" font-size="16">🔥</text>
                <text x="35" y="5" class="text stat-label" font-size="12">STREAK</text>
                <text x="35" y="22" class="text stat-value">${state.streak} DAYS</text>
             </g>
             
             <!-- Status -->
             <g transform="translate(280, 0)">
                <circle cx="10" cy="10" r="15" fill="rgba(255,255,255,0.05)" />
                <text x="10" y="15" text-anchor="middle" font-size="16">⭐</text>
                <text x="35" y="5" class="text stat-label" font-size="12">STATUS</text>
                <text x="35" y="22" class="text stat-value">ACTIVE</text>
             </g>
          </g>
        </g>
        
      </svg>
    `;
  }

  private getMoodColor(mood: string): string {
    switch (mood) {
      case 'excited': return '#4caf50';
      case 'happy': return '#8bc34a';
      case 'neutral': return '#ffc107';
      case 'sad': return '#ff9800';
      default: return '#9e9e9e';
    }
  }
}
