import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardSet from "./CardSet"

class GameContainer extends Component {
    render() {
        if (this.props.visible){
            return (        
            <div>
                <CardSet name="deck" faceUp="false" active="false" />
                <CardSet name="hand" faceUp="true" active="true" />
                <CardSet name="played" faceUp="true" active="false" />
                <CardSet name="discard" faceUp="false" active="false" />
            </div>
            );
        }
      }
}

export default GameContainer;