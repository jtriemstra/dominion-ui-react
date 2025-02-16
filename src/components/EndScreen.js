import React, { useState, useEffect, useContext  } from "react";
import Utility from "../Utility.js";
import Api from "../Api.js";

function renderCards(cards) {
    let result = "";
    for(var cardName in cards){
        result = result + cardName + ":" + cards[cardName] + "; ";
    }
    return result;
}

function handleEndGame(e, api, callback) {
    if (e) e.preventDefault();

    api.fetchNull("/end", callback);    
}

function endGameCallback(setEndingGame) {
    Utility.clearGameId();
    Utility.clearPlayerName();
    setEndingGame(true);
}

export default function EndScreen({gameState, api = new Api(), setEndingGame}) {
    
    return (
        <div className="end-screen">
            <div className="end-screen-content">
                <h2>Game Over</h2>
                <p>You have {gameState.points} points</p>
                <p>{renderCards(gameState.cards)}</p>
                <button onClick={(e) => handleEndGame(e, api, () => endGameCallback(setEndingGame))}>End Game</button>
            </div>
        </div>
    );
}