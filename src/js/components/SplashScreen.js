import React, { Component } from "react";

class SplashScreen extends Component {
    handleClick(){
        alert("clicked");
    }

    render() {
        return (
            <button onClick={this.handleClick}>Start Game</button>
        );
    }
}

export default SplashScreen;