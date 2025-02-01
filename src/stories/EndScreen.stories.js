import EndScreen from '../components/EndScreen';
import { fn } from '@storybook/test';

export default {
  title: 'Dominion/EndScreen',
  component: EndScreen,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

let dummySetEndingGame = (x) => {console.log("set end game to " + x);};
let dummyApi = {
  fetchNull: (url, callback) => {console.log("api call to " + url); callback();}
}

export const End = {
  args: {
    setEndingGame: dummySetEndingGame,
    api: dummyApi,
    gameState: {
        "thisPlayer": {
            "name": "asdf",
            "turn": {
                "active": true,
                "buys": 0,
                "treasure": 1,
                "actionsAvailable": 1,
                "actionsTaken": [],
                "gainedToDiscard": [],
                "gainDestination": "",
                "repeatedAction": null,
                "gainReactions": [],
                "choicesAvailable": [],
                "choicesMade": [],
                "cleanupActions": [],
                "buyActions": [],
                "buying": "Province",
                "costFunctions": [],
                "playActions": {},
                "cleanup": false
            },
            "deck": [
                "Province",
                "Gold",
                "Province",
                "Gold",
                "Gold",
                "Market",
                "Province",
                "Copper",
                "Smithy",
                "Gold",
                "Estate",
                "Gold",
                "Smithy",
                "Market",
                "Province",
                "Silver",
                "Market",
                "Mine",
                "Silver"
            ],
            "discard": [
                "Gold",
                "Silver",
                "Silver",
                "Silver",
                "Copper",
                "Province",
                "Silver",
                "Province",
                "Province",
                "Province",
                "Estate",
                "Cellar",
                "Gold",
                "Gold",
                "Silver",
                "Province",
                "Estate",
                "Province"
            ],
            "hand": [
                "Silver",
                "Gold",
                "Gold",
                "Province",
                "Province"
            ],
            "looking": [],
            "played": [],
            "aside": {
                "cards": []
            },
            "revealing": {
                "cards": []
            },
            "currentAttack": null,
            "currentAttacker": null,
            "points": 75,
            "bought": [],
            "treasureAvailable": 1,
            "numberOfActions": 1,
            "numberOfBuys": 0,
            "hasActions": true,
            "currentChoice": null,
            "hasBuys": false
        },
        "playerNames": [
            "asdf"
        ],
        "isCurrentPlayer": false,
        "currentPlayerIndex": -1,
        "isGameOver": true,
        "points": 75,
        "cards": {"Provice":12, "Estate":3, "Gold":6}
    }
  },
};
