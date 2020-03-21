import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SplashScreen from './SplashScreen';
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

    return (        
      <div>
        <Header />
        <SplashScreen onGameStart={this.handleNewState} />
        <GameContainer gameState={gameState} onGameUpdate={this.handleNewState} />
      </div>
    );
  }
}

export default DominionUi;

