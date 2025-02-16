import React, { useState, useEffect } from "react";
import Utility from "../../Utility.js";
import Api from "../../Api.js";

function handleStart(event, api, cardSetIndex, setGameState, setEndingGame){
    event.stopPropagation();
    event.preventDefault();

    const splashForm = event.target.closest("form");
    let playerName = splashForm.querySelector("#playerName").value;

    const sets = ["Cellar,Market,Merchant,Militia,Mine,Moat,Remodel,Smithy,Village,Workshop",
                "Artisan,Bandit,Bureaucrat,Chapel,Festival,Gardens,Sentry,Throne Room,Witch,Workshop",
                "Artisan,Bureaucrat,Council Room,Festival,Harbinger,Laboratory,Moneylender,Sentry,Vassal,Village",
                "Cellar,Council Room,Festival,Gardens,Library,Harbinger,Militia,Poacher,Smithy,Throne Room",
                "Berserker,Highway,Nomads,Oasis,Trail,Cellar,Library,Moneylender,Throne Room,Workshop",
                "Border Village,Cauldron,Fools Gold,Haggler,Highway,Scheme,Souk,Trader,Trail,Wheelwright",
                ""];
    loadGame(api, playerName, "start", false, sets[cardSetIndex], setGameState, setEndingGame);
}

function loadGame(api, playerName, action, randomCards, cardNames, setGameState, setEndingGame) {
    api.fetchJSON("/" + action + "?cardNames=" + (cardNames ? cardNames : "") + "&playerName=" + playerName + (randomCards ? "&randomCards=true" : ""), (result) => {
        localStorage.setItem("playerName", result.thisPlayer.name);
        localStorage.setItem("gameId", result.id);
        setGameState(result);
        setEndingGame(false);
    });
}

export default function SplashScreenStart({setGameState, api = new Api(), setEndingGame}) {
    return (
        <div>
            <h2>Base Game, 2nd Ed.</h2>
            <button onClick={ e=> handleStart(e, api, 0, setGameState, setEndingGame)} >Start Game "First Game"</button> (Cellar,Market,Merchant,Militia,Mine,Moat,Remodel,Smithy,Village,Workshop)<br/>
            <button onClick={ e=> handleStart(e, api, 1, setGameState, setEndingGame)}>Start Game "Size Distortion"</button> (Artisan,Bandit,Bureaucrat,Chapel,Festival,Gardens,Sentry,Throne Room,Witch,Workshop)<br/>
            <button onClick={ e=> handleStart(e, api, 2, setGameState, setEndingGame)}>Start Game "Deck Top"</button> (Artisan,Bureaucrat,Council Room,Festival,Harbinger,Laboratory,Moneylender,Sentry,Vassal,Village)<br/>
            <button onClick={ e=> handleStart(e, api, 3, setGameState, setEndingGame)}>Start Game "Sleight of Hand"</button> (Cellar,Council Room,Festival,Gardens,Library,Harbinger,Militia,Poacher,Smithy,Throne Room)<br/>
            <h2>Base Game, 2nd Ed. with Hinterlands, 2nd Ed.</h2>
            <button onClick={ e=> handleStart(e, api, 4, setGameState, setEndingGame)}>Start Game With "Happy Trails"</button> (Berserker,Highway,Nomads,Oasis,Trail,Cellar,Library,Moneylender,Throne Room,Workshop)<br/>
            <h2>Hinterlands, 2nd Ed.</h2>
            <button onClick={ e=> handleStart(e, api, 5, setGameState, setEndingGame)}>Start Game With "Bargains"</button> (Border Village,Cauldron,Fools Gold,Haggler,Highway,Scheme,Souk,Trader,Trail,Wheelwright)<br/>            
        </div>
    );
}