import React, { useState, useEffect, useContext } from "react";
import CardsetBase from "./CardsetBase.js";
import { PlayerContext } from '../../context/PlayerContext.js';
import { GameStateContext } from '../../context/GameStateContext.js';
import Utility from "../../Utility.js";

function getCardImageByName(cardName){
    return "images/200px-" + cardName.replace(/ /g, "_") + ".jpg"
}

function renderInactiveCards(cardDefs, cards){
    return cards.map((bankcard) => <li key={bankcard.name}><img width="160px" src={getCardImageByName(bankcard.name)} /><span className="bank-quantity">{bankcard.quantity} left</span></li>);
}

function handleBuyCard(e, playerName, gameStateSetter){
    e.preventDefault();
    
    if (e.target.parentElement.dataset){
        let cardName = e.target.parentElement.dataset.cardname;

        fetch(Utility.apiServer() + "/buy?card=" + cardName + "&playerName=" + playerName)
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
                });               
            }
        })
        .then((result) => {
            if (result){
                gameStateSetter(result);
            }            
        });
    }
}

function renderActiveCards(cardDefs, cards, activeTest, playerName, gameStateSetter){
    if (activeTest){
        return cards.map((bankcard) => {
            if (activeTest(bankcard.name) && bankcard.quantity > 0){
                return <li className="card-active" key={bankcard.name}><a href="#" data-cardname={bankcard.name} ><img width="160px" src={getCardImageByName(bankcard.name)} onClick={(e) => handleBuyCard(e, playerName, gameStateSetter)} /></a><span className="bank-quantity">{bankcard.quantity} left</span></li>
            }
            else {
                return <li className="card-inactive" key={bankcard.name}><img width="160px" src={getCardImageByName(bankcard.name)} /><span className="bank-quantity">{bankcard.quantity} left</span></li>
            }
        });    
    }

    return cards.map((bankcard) => 
        <li key={bankcard.name}><a href="#" data-cardname={bankcard.name} ><img width="160px" src={getCardImageByName(bankcard.name)} /></a></li>
    );
}

export default function Bank(props) {
    const playerName = useContext(PlayerContext);
    const gameStateSetter = useContext(GameStateContext);
    
    return <CardsetBase {...props} playerName={playerName} renderActiveCards={renderActiveCards} renderInactiveCards={renderInactiveCards} gameStateSetter={gameStateSetter} />
}