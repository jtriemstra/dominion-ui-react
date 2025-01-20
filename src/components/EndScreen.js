import React, { useState, useEffect, useContext  } from "react";
import Utility from "../Utility.js";

function renderCards(cards) {
    let result = "";
    for(var cardName in cards){
        result = result + cardName + ":" + cards[cardName] + "; ";
    }
    return result;
}

function handleEndGame(e) {

}

export default function EndScreen({gameState}) {
    return (
        <div className="end-screen">
            <div className="end-screen-content">
                <h2>Game Over</h2>
                <p>You have {gameState.points} points</p>
                <p>{renderCards(gameState.cards)}</p>
                <button onClick={handleEndGame}>End Game</button>
            </div>
        </div>
    );
}