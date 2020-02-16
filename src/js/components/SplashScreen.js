import React, { Component } from "react";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log("clicked");
        fetch("http://localhost:8080/start")
        .then(res => res.json())
        .then((result) => {
            this.props.onGameStart(result);
        });
    }

    render() {
        return (
            <button onClick={this.handleClick}>Start Game</button>
        );
    }
}

export default SplashScreen;