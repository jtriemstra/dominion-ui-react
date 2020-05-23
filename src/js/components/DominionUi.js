import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SplashScreen from './SplashScreen';
import EndScreen from './EndScreen';
import GameContainer from './GameContainer';
import Utility from "../Utility"

class DominionUi extends Component {
  constructor() {
    super();

    this.state = {
      gameState: null
    };

    this.handleNewState = this.handleNewState.bind(this);
  }

  getPlayerName() {
    //TODO: consolidate this and the same method in GameContainer
    if (document.cookie) {
        const cookies = document.cookie.split(";");
        for (var i=0; i<cookies.length; i++){
            if (cookies[i].startsWith("playerName=")){
                return cookies[i].substring(11);                    
            }
        }
    }
  }

  componentDidMount() {
    //TODO: consolidate this and the same method in GameContainer
    if(this.getPlayerName()){
        this.handleRefresh();
    }
  }

  handleRefresh(e) {
    //TODO: consolidate this and the same method in GameContainer
    if (e) e.preventDefault();

    if (!this.getPlayerName()) return;

    fetch(Utility.apiServer() + "/refresh?playerName=" + this.getPlayerName())
    .then(res => {
        if (res.ok) { return res.json(); }
        else { res.text().then(text => {
            console.error(text);
          });               
        }
    })
    .then((result) => {
        if (result){
            this.handleNewState(result);
        }
    });
  }

  handleNewState(newState){
    this.setState({gameState: newState});

    document.cookie = "playerName=" + newState.thisPlayer.name;
  }

  render() {
    const gameState = this.state.gameState;

    let splashScreen = null;
    if (!gameState){
      console.log("no game state");
      splashScreen = <SplashScreen onGameStart={this.handleNewState} />;
    }

    let endScreen = null;
    if (gameState && gameState.isGameOver) {
      endScreen = <EndScreen gameState={gameState} />;
    }

    let gameContainer = null;
    if (gameState){
      console.log("game state");
      gameContainer = <GameContainer gameState={gameState} onGameUpdate={this.handleNewState} />;
    }

    return (        
      <div>
        <Header />
        {splashScreen}
        {gameContainer}
        {endScreen}
      </div>
    );
  }
}

export default DominionUi;

