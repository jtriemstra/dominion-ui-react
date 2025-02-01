import React, { useState, useEffect, useContext  } from "react";
import Utility from "../Utility.js";

function renderCards(cards) {
    let result = "";
    for(var cardName in cards){
        result = result + cardName + ":" + cards[cardName] + "; ";
    }
    return result;
}

function handleEndGame(e, callback) {
    if (e) e.preventDefault();

    callback();

    if (!Utility.disableNetwork()) {    
        fetch(Utility.apiServer() + "/end")
        .then(res => {
            if (res.ok) { return true; }
            else { res.text().then(text => {
                console.error(text);
                });               
            }
        })
        .then((result) => {
            if (result){
                
            }
        });
    }
}

export default function EndScreen({gameState, endGameCallback}) {
    
    return (
        <div className="end-screen">
            <div className="end-screen-content">
                <h2>Game Over</h2>
                <p>You have {gameState.points} points</p>
                <p>{renderCards(gameState.cards)}</p>
                <button onClick={(e) => handleEndGame(e, endGameCallback)}>End Game</button>
            </div>
        </div>
    );
}