import React, { useState, useEffect } from "react";

export default function PlayerList({playerNames, currentPlayerIndex}) {
    if (!playerNames) {
        return null;
    }

    return (
        <div className="player-list">
            <h2>Players: </h2>
            <ul>
                {playerNames.map((name, index) => <li className={index===currentPlayerIndex ? 'active' : ''}>{name}</li>)}
            </ul>
        </div>
    );
}