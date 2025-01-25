import React, { useState, useEffect } from "react";
import Utility from "../../Utility.js";

function handleStart(event, cardSetIndex, setGameState){
    event.stopPropagation();
    event.preventDefault();

    const splashForm = event.target.closest("form");
    let playerName = splashForm.querySelector("#playerName").value;

    const sets = ["Cellar,Market,Merchant,Militia,Mine,Moat,Remodel,Smithy,Village,Workshop",
                "Artisan,Bandit,Bureaucrat,Chapel,Festival,Gardens,Sentry,Throne Room,Witch,Workshop",
                "Artisan,Bureaucrat,Council Room,Festival,Harbinger,Laboratory,Moneylender,Sentry,Vassal,Village",
                "Cellar,Council Room,Festival,Gardens,Library,Harbinger,Militia,Poacher,Smithy,Throne Room",
                "Berserker,Highway,Nomads,Oasis,Trail,Cellar,Library,Moneylender,Throne Room,Workshop",
                "Crossroads,Fools Gold,Guard Dog,Souk,Witchs Hut,Festival,Laboratory,Remodel,Sentry,Vassal"];
    loadGame(playerName, "start", false, sets[cardSetIndex], setGameState);
}

function loadGame(playerName, action, randomCards, cardNames, setGameState) {

    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    var myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    var myRequest = new Request(Utility.apiServer() + "/" + action + "?cardNames=" + (cardNames ? cardNames : "") + "&playerName=" + playerName + (randomCards ? "&randomCards=true" : ""));

    fetch(myRequest, myInit)
    .then(res => res.json())
    .then((result) => {
        localStorage.setItem("playerName", result.thisPlayer.name);
        localStorage.setItem("gameId", result.id);
        setGameState(result);
    });
}

export default function SplashScreenStart({setGameState}) {
    return (
        <div>
            <h2>Base Game, 2nd Ed.</h2>
            <button onClick={ e=> handleStart(e, 0, setGameState)} >Start Game "First Game"</button> (Cellar,Market,Merchant,Militia,Mine,Moat,Remodel,Smithy,Village,Workshop)<br/>
            <button onClick={ e=> handleStart(e, 1, setGameState)}>Start Game "Size Distortion"</button> (Artisan,Bandit,Bureaucrat,Chapel,Festival,Gardens,Sentry,Throne Room,Witch,Workshop)<br/>
            <button onClick={ e=> handleStart(e, 2, setGameState)}>Start Game "Deck Top"</button> (Artisan,Bureaucrat,Council Room,Festival,Harbinger,Laboratory,Moneylender,Sentry,Vassal,Village)<br/>
            <button onClick={ e=> handleStart(e, 3, setGameState)}>Start Game "Sleight of Hand"</button> (Cellar,Council Room,Festival,Gardens,Library,Harbinger,Militia,Poacher,Smithy,Throne Room)<br/>
            <h2>Base Game, 2nd Ed. with Hinterlands, 2nd Ed.</h2>
            <button onClick={ e=> handleStart(e, 4, setGameState)}>Start Game With "Happy Trails"</button> (Berserker,Highway,Nomads,Oasis,Trail,Cellar,Library,Moneylender,Throne Room,Workshop)<br/>
            <button onClick={ e=> handleStart(e, 5, setGameState)}>Start Game With "Adventures Abroad"</button> (Crossroads,Fools Gold,Guard Dog,Souk,Witchs Hut,Festival,Laboratory,Remodel,Sentry,Vassal)<br/>            
        </div>
    );
}