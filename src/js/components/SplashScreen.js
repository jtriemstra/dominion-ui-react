import React, { Component } from "react";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        event.preventDefault();
        const splashForm = event.target.closest("form");
        const playerName = splashForm.querySelector("#playerName").value;
        
        this.loadGame(playerName);
    }

    loadGame(playerName) {
        fetch("http://localhost:8080/start?playerName=" + playerName)
        .then(res => res.json())
        .then((result) => {
            this.props.onGameStart(result);
        });
    }

    render() {
        return (
            <form>
                <input type="text" id="playerName"></input>
                <button onClick={this.handleClick}>Start Game</button>
            </form>
            
        );
    }
}

export default SplashScreen;