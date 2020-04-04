import React, { Component } from "react";
import Utility from "../Utility"

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleStartRandom = this.handleStartRandom.bind(this);
    }

    handleStart(event){
        event.preventDefault();
        this.loadGame(this.getName(), "start");
    }
    
    handleStartRandom(event){
        event.preventDefault();
        this.loadGame(this.getName(), "start", true);
    }

    handleJoin(event) {
        event.preventDefault();
        this.loadGame(this.getName(), "join");
    }

    getName(){
        const splashForm = event.target.closest("form");
        return splashForm.querySelector("#playerName").value;
    }
    
    loadGame(playerName, action, randomCards) {
        fetch(Utility.apiServer() + "/" + action + "?playerName=" + playerName + (randomCards ? "&randomCards=true" : ""))
        .then(res => res.json())
        .then((result) => {
            this.props.onGameStart(result);
        });
    }

    render() {
        return (
            <form>
                <input type="text" id="playerName"></input>
                <button onClick={this.handleStart}>Start Game With Basic Deck</button>
                <button onClick={this.handleStartRandom}>Start Game With Random Deck</button>
                <button onClick={this.handleJoin}>Join Game</button>
            </form>
            
        );
    }
}

export default SplashScreen;