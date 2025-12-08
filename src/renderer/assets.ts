
export const SPRITES: Record<string, Record<number, string>> = {
  dragon: {
    1: `
      <!-- Egg -->
      <defs>
        <radialGradient id="eggGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" style="stop-color:#fce4ec" />
          <stop offset="100%" style="stop-color:#f06292" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(100, 100) scale(3)">
        <ellipse cx="0" cy="0" rx="25" ry="32" fill="url(#eggGrad)" stroke="#880e4f" stroke-width="1.5"/>
        <path d="M-15,-10 Q-5,0 -15,10" fill="none" stroke="#f8bbd0" stroke-width="2" opacity="0.6"/>
        <circle cx="10" cy="-15" r="3" fill="white" opacity="0.4"/>
      </g>
    `,
    2: `
      <!-- Baby Dragon -->
      <defs>
        <linearGradient id="babyBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#b388ff" /> <!-- Light Purple -->
          <stop offset="100%" style="stop-color:#651fff" /> <!-- Deep Purple -->
        </linearGradient>
      </defs>
      <g transform="translate(100, 100) scale(2.2)">
        <!-- Tail -->
        <path d="M-20,20 Q-40,30 -30,10" fill="none" stroke="#651fff" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Body -->
        <circle cx="0" cy="10" r="20" fill="url(#babyBody)" stroke="#311b92" stroke-width="1.5"/>
        
        <!-- Head -->
        <circle cx="0" cy="-15" r="18" fill="url(#babyBody)" stroke="#311b92" stroke-width="1.5"/>
        
        <!-- Eyes -->
        <circle cx="-6" cy="-15" r="4" fill="white"/>
        <circle cx="-6" cy="-15" r="1.5" fill="black"/>
        <circle cx="6" cy="-15" r="4" fill="white"/>
        <circle cx="6" cy="-15" r="1.5" fill="black"/>
        
        <!-- Little Wings -->
        <path d="M20,10 Q35,-5 20,-10" fill="#b388ff" stroke="#311b92" stroke-width="1"/>
        <path d="M-20,10 Q-35,-5 -20,-10" fill="#b388ff" stroke="#311b92" stroke-width="1"/>
        
        <!-- Horns -->
        <path d="M-5,-30 L-8,-40 L-2,-32 Z" fill="#ede7f6" stroke="#311b92" stroke-width="1"/>
        <path d="M5,-30 L8,-40 L2,-32 Z" fill="#ede7f6" stroke="#311b92" stroke-width="1"/>
      </g>
    `,
    3: `
      <!-- Teen Dragon -->
      <defs>
        <linearGradient id="teenBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#64ffda" /> <!-- Teal -->
          <stop offset="100%" style="stop-color:#00bfa5" /> <!-- Darker Teal -->
        </linearGradient>
      </defs>
      <g transform="translate(100, 100) scale(1.8)">
        <!-- Body -->
        <path d="M-15,30 Q0,50 15,30 L10,-10 L-10,-10 Z" fill="url(#teenBody)" stroke="#004d40" stroke-width="1.5"/>
        
        <!-- Neck -->
        <path d="M-5,-10 Q0,-30 5,-10" fill="url(#teenBody)" stroke="#004d40" stroke-width="1.5"/>
        
        <!-- Head -->
        <path d="M-12,-35 Q0,-55 12,-35 Q15,-15 0,-10 Q-15,-15 -12,-35 Z" fill="url(#teenBody)" stroke="#004d40" stroke-width="1.5"/>
        
        <!-- Eyes (Bored look) -->
        <path d="M-8,-30 L-2,-30" stroke="black" stroke-width="2"/>
        <path d="M2,-30 L8,-30" stroke="black" stroke-width="2"/>
        
        <!-- Wings -->
        <path d="M10,0 Q40,-20 50,10 L30,20 Z" fill="#a7ffeb" stroke="#004d40" stroke-width="1.5"/>
        <path d="M-10,0 Q-40,-20 -50,10 L-30,20 Z" fill="#a7ffeb" stroke="#004d40" stroke-width="1.5"/>
        
        <!-- Spikes -->
        <path d="M0,-55 L-3,-65 L3,-65 Z" fill="#004d40"/>
        <path d="M0,50 L-3,65 L3,60 Z" fill="#004d40"/>
      </g>
    `,
    4: `
      <!-- Adult Dragon -->
      <defs>
        <linearGradient id="adultBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff5252" /> <!-- Red -->
          <stop offset="100%" style="stop-color:#b71c1c" /> <!-- Dark Red -->
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="2" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(100, 100) scale(1.5)" filter="url(#shadow)">
        <!-- Tail -->
        <path d="M-20,40 Q-60,60 -40,10" fill="none" stroke="#b71c1c" stroke-width="6" stroke-linecap="round"/>
        
        <!-- Wings (Majestic) -->
        <path d="M15,0 Q60,-40 90,0 Q70,40 20,20 Z" fill="#ff8a80" stroke="#b71c1c" stroke-width="2"/>
        <path d="M-15,0 Q-60,-40 -90,0 Q-70,40 -20,20 Z" fill="#ff8a80" stroke="#b71c1c" stroke-width="2"/>
        
        <!-- Body -->
        <path d="M-20,40 Q0,60 20,40 L15,-10 L-15,-10 Z" fill="url(#adultBody)" stroke="#b71c1c" stroke-width="2"/>
        
        <!-- Head -->
        <path d="M-15,-10 Q-20,-50 0,-60 Q20,-50 15,-10 Z" fill="url(#adultBody)" stroke="#b71c1c" stroke-width="2"/>
        
        <!-- Eyes (Fierce) -->
        <path d="M-10,-35 L-2,-30 L-10,-28 Z" fill="#ffeb3b"/>
        <path d="M10,-35 L2,-30 L10,-28 Z" fill="#ffeb3b"/>
        
        <!-- Horns -->
        <path d="M-10,-55 L-20,-80 L-5,-60 Z" fill="#212121"/>
        <path d="M10,-55 L20,-80 L5,-60 Z" fill="#212121"/>
        
        <!-- Belly Scales -->
        <path d="M-10,10 L10,10" stroke="#ffcdd2" stroke-width="2" opacity="0.5"/>
        <path d="M-12,20 L12,20" stroke="#ffcdd2" stroke-width="2" opacity="0.5"/>
        <path d="M-14,30 L14,30" stroke="#ffcdd2" stroke-width="2" opacity="0.5"/>
      </g>
    `,
    5: `
      <!-- Ghost -->
      <defs>
        <radialGradient id="ghostGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ffffff" />
          <stop offset="100%" style="stop-color:#cfd8dc" />
        </radialGradient>
      </defs>
      <g transform="translate(100, 100) scale(2.0)" opacity="0.7">
        <!-- Body -->
        <path d="M-25,30 Q-25,-40 0,-40 Q25,-40 25,30 Q15,10 0,30 Q-15,10 -25,30" fill="url(#ghostGrad)" stroke="#90a4ae" stroke-width="1.5"/>
        
        <!-- Eyes -->
        <circle cx="-8" cy="-10" r="3" fill="#37474f"/>
        <circle cx="8" cy="-10" r="3" fill="#37474f"/>
        
        <!-- Mouth -->
        <circle cx="0" cy="5" r="4" fill="none" stroke="#37474f" stroke-width="1.5"/>
        
        <!-- Halo -->
        <ellipse cx="0" cy="-55" rx="15" ry="3" fill="none" stroke="#ffd700" stroke-width="2"/>
      </g>
    `
  },
  cat: {
    1: `
      <!-- Cat Egg (Yarn Ball) -->
      <defs>
        <radialGradient id="yarnGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" style="stop-color:#ffccbc" />
          <stop offset="100%" style="stop-color:#ff5722" />
        </radialGradient>
      </defs>
      <g transform="translate(100, 100) scale(2.5)">
        <circle cx="0" cy="0" r="25" fill="url(#yarnGrad)" />
        <path d="M-20,-10 Q0,-25 20,-10" fill="none" stroke="#e64a19" stroke-width="2" opacity="0.6"/>
        <path d="M-22,0 Q0,15 22,0" fill="none" stroke="#e64a19" stroke-width="2" opacity="0.6"/>
        <path d="M-15,15 Q0,25 15,15" fill="none" stroke="#e64a19" stroke-width="2" opacity="0.6"/>
        <path d="M10,-20 Q20,0 10,20" fill="none" stroke="#e64a19" stroke-width="2" opacity="0.6"/>
        <!-- Loose thread -->
        <path d="M15,15 Q30,30 40,20" fill="none" stroke="#ff5722" stroke-width="3" stroke-linecap="round"/>
      </g>
    `,
    2: `
      <!-- Kitten -->
      <defs>
        <linearGradient id="catBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#fff3e0" /> 
          <stop offset="100%" style="stop-color:#ffe0b2" /> 
        </linearGradient>
      </defs>
      <g transform="translate(100, 100) scale(2.2)">
        <!-- Ears -->
        <path d="M-20,-25 L-5,-15 L-25,-5 Z" fill="#ffe0b2" stroke="#ff9800" stroke-width="1.5"/>
        <path d="M20,-25 L5,-15 L25,-5 Z" fill="#ffe0b2" stroke="#ff9800" stroke-width="1.5"/>
        
        <!-- Head/Body Blob -->
        <ellipse cx="0" cy="0" rx="25" ry="20" fill="url(#catBody)" stroke="#ff9800" stroke-width="1.5"/>
        
        <!-- Eyes -->
        <circle cx="-10" cy="-5" r="4" fill="#3e2723"/>
        <circle cx="-10" cy="-6" r="1.5" fill="white"/>
        <circle cx="10" cy="-5" r="4" fill="#3e2723"/>
        <circle cx="10" cy="-6" r="1.5" fill="white"/>
        
        <!-- Nose/Mouth -->
        <path d="M-2,2 L0,4 L2,2" fill="#ffab91" stroke="#3e2723" stroke-width="0.5"/>
        <path d="M0,4 L0,7 M-3,7 Q0,10 3,7" fill="none" stroke="#3e2723" stroke-width="1"/>
        
        <!-- Whiskers -->
        <path d="M-30,-2 L-15,2" stroke="#3e2723" stroke-width="0.5" opacity="0.5"/>
        <path d="M-30,4 L-15,4" stroke="#3e2723" stroke-width="0.5" opacity="0.5"/>
        <path d="M30,-2 L15,2" stroke="#3e2723" stroke-width="0.5" opacity="0.5"/>
        <path d="M30,4 L15,4" stroke="#3e2723" stroke-width="0.5" opacity="0.5"/>
      </g>
    `,
    3: `
      <!-- Teen Cat -->
      <g transform="translate(100, 100) scale(1.8)">
        <!-- Body (Stretching) -->
        <path d="M-20,10 Q0,30 20,10 L25,-5 Q10,-15 -5,-5 Z" fill="#ffcc80" stroke="#ef6c00" stroke-width="1.5"/>
        
        <!-- Head -->
        <ellipse cx="-15" cy="-10" rx="15" ry="12" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1.5"/>
        
        <!-- Ears -->
        <path d="M-25,-20 L-20,-10 L-28,-8 Z" fill="#ffcc80" stroke="#ef6c00" stroke-width="1"/>
        <path d="M-5,-20 L-10,-10 L-2,-8 Z" fill="#ffcc80" stroke="#ef6c00" stroke-width="1"/>
        
        <!-- Tail (Upright) -->
        <path d="M25,-5 Q35,-15 35,-25" fill="none" stroke="#ffcc80" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Eyes (Winking) -->
        <path d="M-20,-12 L-14,-12" stroke="#3e2723" stroke-width="1.5"/> <!-- Closed -->
        <circle cx="-10" cy="-12" r="1.5" fill="#3e2723"/> <!-- Open -->
      </g>
    `,
    4: `
      <!-- Adult Cat (Bastet Inspired) -->
      <defs>
        <linearGradient id="adultCat" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#4e342e" /> <!-- Dark Brown -->
          <stop offset="100%" style="stop-color:#3e2723" /> <!-- Very Dark Brown -->
        </linearGradient>
      </defs>
      <g transform="translate(100, 100) scale(1.6)">
        <!-- Body (Sitting) -->
        <path d="M-15,40 L-15,0 Q-10,-20 10,-20 Q30,-20 35,0 L35,40 Z" fill="url(#adultCat)" stroke="#3e2723" stroke-width="1"/>
        
        <!-- Chest Patch -->
        <path d="M-5,0 Q10,10 25,0 L25,30 Q10,40 -5,30 Z" fill="#d7ccc8" opacity="0.3"/>
        
        <!-- Head -->
        <path d="M-5,-45 Q10,-55 25,-45 Q35,-25 10,-20 Q-15,-25 -5,-45 Z" fill="url(#adultCat)" stroke="#3e2723" stroke-width="1"/>
        
        <!-- Ears (Tall) -->
        <path d="M-5,-45 L-5,-65 L5,-48 Z" fill="#4e342e"/>
        <path d="M25,-45 L25,-65 L15,-48 Z" fill="#4e342e"/>
        
        <!-- Gold Necklace -->
        <path d="M-10,-15 Q10,0 30,-15" fill="none" stroke="#ffd700" stroke-width="3"/>
        
        <!-- Eyes (Green) -->
        <path d="M0,-35 Q5,-40 10,-35 Q5,-30 0,-35" fill="#64dd17"/> 
        <path d="M20,-35 Q25,-40 30,-35 Q25,-30 20,-35" fill="#64dd17"/>
      </g>
    `,
    5: `
      <!-- Ghost Cat -->
      <g transform="translate(100, 100) scale(2.0)" opacity="0.7">
        <!-- Body -->
        <path d="M-20,30 Q-20,-30 0,-30 Q20,-30 20,30 Q10,20 0,30 Q-10,20 -20,30" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1.5"/>
        <!-- Ears -->
        <path d="M-15,-25 L-5,-10 L-20,-10 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1"/>
        <path d="M15,-25 L5,-10 L20,-10 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1"/>
        
        <!-- Face -->
        <circle cx="-7" cy="-5" r="2" fill="#455a64"/>
        <circle cx="7" cy="-5" r="2" fill="#455a64"/>
        <path d="M-2,2 L0,4 L2,2" stroke="#455a64" fill="none" stroke-width="1"/>
        
        <!-- Halo -->
        <ellipse cx="0" cy="-40" rx="15" ry="3" fill="none" stroke="#ffd700" stroke-width="2"/>
      </g>
    `
  },
  ghost: {
    1: `
      <!-- Wisp (Egg) -->
      <defs>
        <radialGradient id="wispGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#e1f5fe" />
          <stop offset="100%" style="stop-color:#81d4fa" />
        </radialGradient>
        <filter id="blur">
           <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      <g transform="translate(100, 100) scale(2.5)">
        <circle cx="0" cy="0" r="15" fill="url(#wispGrad)" filter="url(#blur)"/>
        <circle cx="0" cy="0" r="10" fill="#ffffff" opacity="0.8"/>
      </g>
    `,
    2: `
      <!-- Baby Ghost -->
      <g transform="translate(100, 100) scale(2.2)">
        <path d="M-20,20 Q-20,-30 0,-30 Q20,-30 20,20 Q10,10 0,20 Q-10,10 -20,20" fill="#b3e5fc" stroke="#0277bd" stroke-width="1.5"/>
        <circle cx="-7" cy="-5" r="2.5" fill="#01579b"/>
        <circle cx="7" cy="-5" r="2.5" fill="#01579b"/>
        <circle cx="0" cy="5" r="2" fill="#ff8a80" opacity="0.6"/> <!-- Blush -->
      </g>
    `,
    3: `
      <!-- Teen Ghost (Hoodie) -->
      <g transform="translate(100, 100) scale(1.8)">
        <!-- Hood -->
        <path d="M-25,30 L-25,-10 Q0,-40 25,-10 L25,30" fill="#37474f" stroke="#263238" stroke-width="2"/>
        <!-- Face Hole -->
        <ellipse cx="0" cy="-5" rx="15" ry="18" fill="#000000"/>
        <!-- Glowing Eyes -->
        <circle cx="-5" cy="-5" r="3" fill="#00e5ff"/>
        <circle cx="5" cy="-5" r="3" fill="#00e5ff"/>
      </g>
    `,
    4: `
      <!-- Adult Ghost (Reaper) -->
      <defs>
        <linearGradient id="reaper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#212121" />
          <stop offset="100%" style="stop-color:#000000" />
        </linearGradient>
      </defs>
      <g transform="translate(100, 100) scale(1.6)">
         <!-- Robe -->
         <path d="M-30,50 L-25,-20 Q0,-60 25,-20 L30,50" fill="url(#reaper)" stroke="#000" stroke-width="2"/>
         
         <!-- Scythe -->
         <path d="M30,50 L30,-30" stroke="#8d6e63" stroke-width="3"/>
         <path d="M30,-30 Q10,-50 -10,-40" fill="none" stroke="#cfd8dc" stroke-width="4"/>
         
         <!-- Face -->
         <path d="M-15,-20 Q0,0 15,-20" fill="#000" opacity="0.5"/>
         <circle cx="-5" cy="-10" r="2" fill="#ff1744"/>
         <circle cx="5" cy="-10" r="2" fill="#ff1744"/>
      </g>
    `,
    5: `
      <!-- Tombstone (Dead) -->
      <g transform="translate(100, 100) scale(2.0)">
         <path d="M-20,40 L-20,0 Q0,-30 20,0 L20,40 Z" fill="#9e9e9e" stroke="#616161" stroke-width="2"/>
         <text x="0" y="10" text-anchor="middle" font-size="8" font-family="monospace" fill="#424242">R.I.P</text>
         <path d="M-10,40 L-10,35" stroke="#4caf50" stroke-width="2"/> <!-- Grass -->
         <path d="M10,40 L10,32" stroke="#4caf50" stroke-width="2"/>
      </g>
    `
  }
};
