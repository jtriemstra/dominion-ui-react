import React, { Component } from "react";

class EndScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="end-screen">
                <div className="end-screen-content">
                    <h2>Game Over</h2>
                    <p>You have {this.props.gameState.points} points</p>
                </div>
            </div>
        );
    }
}

export default EndScreen;