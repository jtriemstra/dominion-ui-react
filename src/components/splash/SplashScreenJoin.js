import React, { useState, useEffect, useContext  } from "react";
import Utility from "../../Utility.js";

function handleJoin(event, setGameState, setPlayerName) {
    event.preventDefault();

    const splashForm = event.target.closest("form");
    let playerName = splashForm.querySelector("#playerName").value;

    loadGame(playerName, "join", setGameState, setPlayerName);
}

function loadGame(playerName, action, setGameState, setPlayerName) {

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
        document.cookie = "playerName=" + result.thisPlayer.name;
        setPlayerName(result.thisPlayer.name);
        setGameState(result);
    });
}

export default function SplashScreenJoin({setGameState, setPlayerName}) {
    return (
        <div>
            <button onClick={(e) => handleJoin(e, setGameState, setPlayerName)}>Join Game</button>
            <button>End Game</button>
        </div>
    );
}