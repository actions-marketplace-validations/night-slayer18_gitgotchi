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
const GameEngine_1 = require("./game/GameEngine");
const SvgGenerator_1 = require("./renderer/SvgGenerator");
const StateService_1 = require("./services/StateService");
const fs = __importStar(require("fs"));
async function run() {
    console.log('Running GitGotchi Locally - Template Mode...');
    // Create a mock template if it doesn't exist
    if (!fs.existsSync('TEMPLATE.md')) {
        fs.writeFileSync('TEMPLATE.md', '# My Profile\n\nHere is my pet:\n{{ gitgotchi }}\n\nThanks for visiting!');
        console.log('Created mock TEMPLATE.md');
    }
    const game = new GameEngine_1.GameEngine();
    const svgGen = new SvgGenerator_1.SvgGenerator();
    const stateService = new StateService_1.StateService();
    // Load state (local file)
    const state = await stateService.loadState('LocalPet');
    // Mock Logic (Add 10 XP)
    state.xp += 10;
    state.level = state.xp > 100 ? 2 : 1;
    const svgContent = svgGen.render(state);
    // Save State
    await stateService.saveState(state, svgContent);
    // Template Logic
    let templateContent = fs.readFileSync('TEMPLATE.md', 'utf8');
    const imageTag = `![GitGotchi](./gitgotchi.svg)`;
    templateContent = templateContent.replace('{{ gitgotchi }}', imageTag);
    fs.writeFileSync('README.md', templateContent);
    console.log('Generated README.md from TEMPLATE.md');
}
run().catch(console.error);
