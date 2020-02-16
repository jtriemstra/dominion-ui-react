import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SplashScreen from './SplashScreen';
import GameContainer from './GameContainer';


class DominionUi extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  handleGameStart(gameState){
    console.log(gameState);
  }

  render() {
    return (        
      <div>
         <Header />
        <SplashScreen onGameStart={this.handleGameStart} />
        <GameContainer visible="false" />
      </div>
    );
  }
}

export default DominionUi;

