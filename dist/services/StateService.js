"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateService = void 0;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const STATE_FILE = 'gitgotchi.json';
class StateService {
    async loadState(defaultPetName) {
        const initialState = {
            petName: defaultPetName,
            hp: 100,
            maxHp: 100,
            xp: 0,
            mood: 'happy',
            moodScore: 5,
            level: 1,
            lastFed: new Date().toISOString(),
            streak: 0
        };
        try {
            if (fs.existsSync(STATE_FILE)) {
                console.log(`Loading state from ${STATE_FILE}`);
                const content = fs.readFileSync(STATE_FILE, 'utf8');
                return JSON.parse(content);
            }
            else {
                console.log(`State file ${STATE_FILE} not found. Starting fresh.`);
            }
        }
        catch (error) {
            core.warning(`Could not load existing state, using initial state. Error: ${error}`);
        }
        return initialState;
    }
    async saveState(state, svgContent) {
        try {
            const jsonContent = JSON.stringify(state, null, 2);
            fs.writeFileSync(STATE_FILE, jsonContent);
            fs.writeFileSync('gitgotchi.svg', svgContent);
            console.log(`Saved state to ${STATE_FILE} and image to gitgotchi.svg`);
        }
        catch (error) {
            core.error(`Failed to save state: ${error}`);
            throw error;
        }
    }
}
exports.StateService = StateService;
