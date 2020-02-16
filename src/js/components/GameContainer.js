import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardSet from "./CardSet"

class GameContainer extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const gameState = this.props.gameState;
        
        if (this.props.visible && gameState){
            return (        
            <div>
                <CardSet cards={gameState.deck} faceUp={false} active={false} name="Deck" />
                <CardSet cards={gameState.hand} faceUp={true} active={true} name="Hand"/>
                <CardSet cards={gameState.played} faceUp={true} active={false} name="Played"/>
                <CardSet cards={gameState.discard} faceUp={false} active={false} name="Discard"/>
            </div>
            );
        }
        else {
            return (<div></div>);
        }
      }
}

export default GameContainer;