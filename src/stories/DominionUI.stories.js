import DominionUI from '../components/DominionUI.js';
import { fn } from '@storybook/test';

export default {
  title: 'Dominion/DominionUI',
  component: DominionUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    
  },
};

export const EndGame = {
    args: {
      gameState:{"thisPlayer":
        {"name":"asdf",
          "turn":{"active":true,"skipActions":false,"buys":1,"treasure":0,"actionsAvailable":1,"actionsTaken":[],"gainedToDiscard":[],"gainDestination":null,"repeatedAction":[],"gainReactions":[],"choicesAvailable":[],"choicesMade":[],"cleanupActions":[],"buyActions":[],"buying":null,"costFunctions":[],"playActions":{},"cleanup":false}
          ,"deck":["Copper","Estate","Copper","Estate","Copper"],
          "discard":[],
          "hand":["Copper","Copper","Copper","Copper","Estate"],
          "looking":[],
          "played":[],
          "aside":{"cards":[]},
          "revealing":{"cards":[]},
          "attacks":{"attacks":[]},
          "points":0,
          "bought":[],
          "treasureAvailable":0,
          "phase":"buy",
          "currentChoice":null,
          "hasActions":true,
          "numberOfActions":1,
          "numberOfBuys":1,
          "hasBuys":true,
          "buyableBankCards":["Copper","Chapel"]
        },
        "playerNames":["asdf"],
        "isCurrentPlayer":true,
        "currentPlayerIndex":0,
        "isGameOver":true,
        "cards":{"Estate":3,"Copper":7},
        "points":0
      },
      setGameState:(state)=>{}, 
      cardDefs: {"Scheme":{"name":"Scheme","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Border Village":{"name":"Border Village","cost":6,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Bureaucrat":{"name":"Bureaucrat","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Laboratory":{"name":"Laboratory","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Artisan":{"name":"Artisan","cost":6,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Wheelwright":{"name":"Wheelwright","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Develop":{"name":"Develop","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Embassy":{"name":"Embassy","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Curse":{"name":"Curse","cost":0,"victory":true,"action":false,"attackReaction":false,"treasure":false},"Poacher":{"name":"Poacher","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Jack of All Trades":{"name":"Jack of All Trades","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Spice Merchant":{"name":"Spice Merchant","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Duchy":{"name":"Duchy","cost":5,"victory":true,"action":false,"attackReaction":false,"treasure":false},"Sentry":{"name":"Sentry","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Vassal":{"name":"Vassal","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Copper":{"name":"Copper","cost":0,"victory":false,"action":false,"attackReaction":false,"treasure":true},"Spy":{"name":"Spy","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Duchess":{"name":"Duchess","cost":2,"victory":false,"action":false,"attackReaction":false,"treasure":true},"Gold":{"name":"Gold","cost":6,"victory":false,"action":false,"attackReaction":false,"treasure":true},"Festival":{"name":"Festival","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Weaver":{"name":"Weaver","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Militia":{"name":"Militia","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Berserker":{"name":"Berserker","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Estate":{"name":"Estate","cost":2,"victory":true,"action":false,"attackReaction":false,"treasure":false},"Village":{"name":"Village","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Smithy":{"name":"Smithy","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Cellar":{"name":"Cellar","cost":2,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Ill-Gotten Gains":{"name":"Ill-Gotten Gains","cost":5,"victory":false,"action":false,"attackReaction":false,"treasure":true},"Highway":{"name":"Highway","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Chapel":{"name":"Chapel","cost":2,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Silk Road":{"name":"Silk Road","cost":4,"victory":true,"action":false,"attackReaction":false,"treasure":false},"Oasis":{"name":"Oasis","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Market":{"name":"Market","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Province":{"name":"Province","cost":8,"victory":true,"action":false,"attackReaction":false,"treasure":false},"Silver":{"name":"Silver","cost":3,"victory":false,"action":false,"attackReaction":false,"treasure":true},"Witch's Hut":{"name":"Witch's Hut","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Trail":{"name":"Trail","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Fools Gold":{"name":"Fools Gold","cost":2,"victory":false,"action":false,"attackReaction":false,"treasure":true},"Souk":{"name":"Souk","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Guard Dog":{"name":"Guard Dog","cost":3,"victory":false,"action":true,"attackReaction":true,"treasure":false},"Noble Brigand":{"name":"Noble Brigand","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Library":{"name":"Library","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Moneylender":{"name":"Moneylender","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Cache":{"name":"Cache","cost":5,"victory":false,"action":false,"attackReaction":false,"treasure":true},"Chancellor":{"name":"Chancellor","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Farmland":{"name":"Farmland","cost":6,"victory":true,"action":false,"attackReaction":false,"treasure":false},"Inn":{"name":"Inn","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Feast":{"name":"Feast","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Crossroads":{"name":"Crossroads","cost":2,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Adventurer":{"name":"Adventurer","cost":6,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Moat":{"name":"Moat","cost":2,"victory":false,"action":true,"attackReaction":true,"treasure":false},"Merchant":{"name":"Merchant","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Mine":{"name":"Mine","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Cartographer":{"name":"Cartographer","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Workshop":{"name":"Workshop","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Mandarin":{"name":"Mandarin","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Witch":{"name":"Witch","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Oracle":{"name":"Oracle","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Haggler":{"name":"Hagggler","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Council Room":{"name":"Council Room","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Nomad Camp":{"name":"Nomad Camp","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Stables":{"name":"Stables","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Trader":{"name":"Trader","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Woodcutter":{"name":"Woodcutter","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Margrave":{"name":"Margrave","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Bandit":{"name":"Bandit","cost":5,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Harbinger":{"name":"Harbinger","cost":3,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Gardens":{"name":"Gardens","cost":4,"victory":true,"action":false,"attackReaction":false,"treasure":false},"Nomads":{"name":"Nomads","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Cauldron":{"name":"Cauldron","cost":5,"victory":false,"action":false,"attackReaction":false,"treasure":true},"Tunnel":{"name":"Tunnel","cost":3,"victory":true,"action":false,"attackReaction":false,"treasure":false},"Remodel":{"name":"Remodel","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false},"Throne Room":{"name":"Throne Room","cost":4,"victory":false,"action":true,"attackReaction":false,"treasure":false}},
      bank: [{"name":"Gold","quantity":30},{"name":"Silver","quantity":40},{"name":"Copper","quantity":53},{"name":"Chapel","quantity":10},{"name":"Workshop","quantity":10},{"name":"Bureaucrat","quantity":10},{"name":"Gardens","quantity":10},{"name":"Throne Room","quantity":10},{"name":"Festival","quantity":10},{"name":"Bandit","quantity":10},{"name":"Sentry","quantity":10},{"name":"Witch","quantity":10},{"name":"Artisan","quantity":10},{"name":"Estate","quantity":17},{"name":"Duchy","quantity":12},{"name":"Province","quantity":12},{"name":"Curse","quantity":30}],
      playerName:"asdf",
      handleActionsDone: (e, playerName, gameStateSetter)=>{console.log("click skip actions")},
      handleCleanup: (e, playerName, gameStateSetter)=>{console.log("click cleanup")},
      endingGame: true,
      gameEndHandler: () => {console.log("end button clicked");}
    }
  };