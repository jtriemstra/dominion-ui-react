import React, { useState, useEffect, useContext } from "react";
import CardsetBase from "./CardsetBase.js";
import Utility from "../../Utility";
import { PlayerContext } from '../../context/PlayerContext.js';
import { GameStateContext } from '../../context/GameStateContext.js';

function getCardImageByName(cardName){
    return "images/200px-" + cardName.replace(/ /g, "_") + ".jpg"
}

function handleCardClick(e, playerName, gameStateSetter){
    e.preventDefault();
    
    if (e.target.parentElement.dataset){
        let cardName = e.target.parentElement.dataset.cardname;

        fetch(Utility.apiServer() + "/play?card=" + cardName + "&playerName=" + playerName)
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
                //TODO: only do this if there's a trigger for it
                //this.loadBank();
            }
        }); 
    }    
}

function renderInactiveCards(cardDefs, cards){
    if (!cardDefs) {return null;}

    const normalizedCards = cards;
    return normalizedCards.map((card) => <li><img width="160px" src={getCardImageByName(cardDefs[card].name)} /></li>);
}

function renderActiveCards(cardDefs, cards, activeTest, playerName, gameStateSetter){
    const normalizedCards = cards;

    if (!cardDefs) {return null;}

    if (activeTest){
        return normalizedCards.map((card) => {
            if (activeTest(card)){
                return <li className="card-active"><a href="#" data-cardname={cardDefs[card].name} ><img width="160px" src={getCardImageByName(cardDefs[card].name)} onClick={(e) => handleCardClick(e, playerName, gameStateSetter)} /></a></li>
            }
            else {
                return <li className="card-inactive"><img width="160px" src={getCardImageByName(cardDefs[card].name)} /></li>
            }
        }
            
        );    
    }

    return normalizedCards.map((card) => 
        <li><a href="#" data-cardname={cardDefs[card].name}><img width="160px" src={getCardImageByName(cardDefs[card].name)} /></a></li>
    );
}

export default function CardSet(props) {
    const playerName = useContext(PlayerContext);
    const gameStateSetter = useContext(GameStateContext);
    return <CardsetBase {...props} playerName={playerName} renderActiveCards={renderActiveCards} renderInactiveCards={renderInactiveCards} gameStateSetter={gameStateSetter} />
}