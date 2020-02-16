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

    this.handleGameStart = this.handleGameStart.bind(this);
  }

  handleGameStart(newState){
    this.setState({gameState: newState});
  }

  render() {
    const gameState = this.state.gameState;

    return (        
      <div>
         <Header />
        <SplashScreen onGameStart={this.handleGameStart} />
        <GameContainer visible="false" gameState={gameState} />
      </div>
    );
  }
}

export default DominionUi;

