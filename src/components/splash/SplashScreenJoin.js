import React, { useState, useEffect, useContext  } from "react";
import Utility from "../../Utility.js";

function handleJoin(event, setGameState, setPlayerName, setEndingGame) {
    event.preventDefault();

    const splashForm = event.target.closest("form");
    let playerName = splashForm.querySelector("#playerName").value;

    loadGame(playerName, "join", setGameState, setPlayerName, setEndingGame);
}

function loadGame(playerName, action, setGameState, setPlayerName, setEndingGame) {

    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    var myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    var myRequest = new Request(Utility.apiServer() + "/" + action + "?playerName=" + playerName );

    fetch(myRequest, myInit)
    .then(res => res.json())
    .then((result) => {
        localStorage.setItem("playerName", result.thisPlayer.name);
        localStorage.setItem("gameId", result.id);
        setPlayerName(result.thisPlayer.name);
        setGameState(result);
        setEndingGame(false);
    });
}

export default function SplashScreenJoin({setGameState, setPlayerName, setEndingGame}) {
    return (
        <div>
            <button onClick={(e) => handleJoin(e, setGameState, setPlayerName, setEndingGame)}>Join Game</button>
            <button>End Game</button>
        </div>
    );
}