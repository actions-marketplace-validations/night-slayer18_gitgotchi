import * as core from '@actions/core';
import * as fs from 'fs';

export interface GameState {
  petName: string;
  hp: number;
  maxHp: number;
  xp: number;
  mood: string;
  moodScore: number;
  level: number;
  lastFed: string;
  streak: number;
}

const STATE_FILE = 'gitgotchi.json';

import * as path from 'path';

export class StateService {
  async loadState(petName: string, assetsDir: string): Promise<GameState> {
    const initialState: GameState = {
      petName: petName,
      hp: 100,
      maxHp: 100,
      xp: 0,
      mood: 'happy',
      moodScore: 5,
      level: 1,
      lastFed: new Date().toISOString(),
      streak: 0
    };

    const statePath = path.join(assetsDir, STATE_FILE);

    try {
      if (fs.existsSync(statePath)) {
        console.log(`Loading state from ${statePath}`);
        const content = fs.readFileSync(statePath, 'utf8');
        return JSON.parse(content) as GameState;
      } else {
          console.log(`State file ${statePath} not found. Starting fresh.`);
      }
    } catch (error) {
      core.warning(`Could not load existing state, using initial state. Error: ${error}`);
    }

    return initialState;
  }

  async saveState(state: GameState, svgContent: string, assetsDir: string): Promise<void> {
    try {
        if (!fs.existsSync(assetsDir)) {
          fs.mkdirSync(assetsDir, { recursive: true });
        }

        const statePath = path.join(assetsDir, STATE_FILE);
        const svgPath = path.join(assetsDir, 'gitgotchi.svg');

        const jsonContent = JSON.stringify(state, null, 2);
        fs.writeFileSync(statePath, jsonContent);
        fs.writeFileSync(svgPath, svgContent);
        console.log(`Saved state to ${statePath} and image to ${svgPath}`);
    } catch (error) {
        core.error(`Failed to save state: ${error}`);
        throw error;
    }
  }
}
