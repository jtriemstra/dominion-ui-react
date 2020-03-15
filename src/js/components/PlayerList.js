import React, { Component } from "react";

class PlayerList extends Component {
    render() {
        const playerNames = this.props.playerNames;
        const currentPlayerIndex = this.props.currentPlayerIndex;

        return (
            <ul>
                {playerNames.map((name, index) => <li><span style={{ fontWeight:index===currentPlayerIndex ? 'bold' : '' }}>{name}</span></li>)}
            </ul>
        );
    }
}

export default PlayerList;