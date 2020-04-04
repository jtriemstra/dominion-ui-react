import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SplashScreen from './SplashScreen';
import EndScreen from './EndScreen';
import GameContainer from './GameContainer';


class DominionUi extends Component {
  constructor() {
    super();

    this.state = {
      gameState: null
    };

    this.handleNewState = this.handleNewState.bind(this);
  }

  handleNewState(newState){
    this.setState({gameState: newState});

    document.cookie = "playerName=" + newState.thisPlayer.name;
  }

  render() {
    const gameState = this.state.gameState;

    let splashScreen = null;
    if (!gameState){
      splashScreen = <SplashScreen onGameStart={this.handleNewState} />;
    }

    let endScreen = null;
    if (gameState && gameState.isGameOver) {
      endScreen = <EndScreen gameState={gameState} />;
    }

    return (        
      <div>
        <Header />
        {splashScreen}
        <GameContainer gameState={gameState} onGameUpdate={this.handleNewState} />
        {endScreen}
      </div>
    );
  }
}

export default DominionUi;

