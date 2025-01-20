import React, { useState, useEffect, useContext  } from "react";
import PlayerList from "./PlayerList";
import TurnDashboard from "./TurnDashboard";
import Bank from "./cardset/Bank";
import Utility from "../Utility";
import CardSet from "./cardset/CardSet";
import GameContainerUI from "./GameContainerUI.js";
import { PlayerContext } from '../context/PlayerContext.js';
import { GameStateContext } from '../context/GameStateContext.js';

function getCardData(setCardDefsState) {
    fetch(Utility.apiServer() + "/cards")
    .then(res => {
        if (res.ok) { return res.json(); }
        else { res.text().then(text => {
            console.error(text);
            });               
        }
    })
    .then((result) => {
        if (result){
            setCardDefsState(result);
        }
    });
}

function getBankData(setBankState) {
    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    var myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    var myRequest = new Request(Utility.apiServer() + "/bank?nocache=" + Date.now());

    fetch(myRequest, myInit)
    .then(res => res.json())
    .then((result) => {
        setBankState(result);
    })
    .catch(error => {console.log(error);});
}

function handleCleanup(e, playerName, gameStateSetter){
    e.preventDefault();
    fetch(Utility.apiServer() + "/cleanup?playerName=" + playerName)
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

function handleActionsDone(e, playerName, gameStateSetter){
    e.preventDefault();
    fetch(Utility.apiServer() + "/skipAction?playerName=" + playerName)
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


export default function GameContainer({gameState, setGameState}) {
    const [cardDefs, setCardDefs] = useState(null);
    const [bank, setBank] = useState(null);
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        if (!cardDefs) {
            getCardData(setCardDefs);
        }
    }, [cardDefs]);

    useEffect(() => {
        if (!bank) {
            getBankData(setBank);
        }
        const interval = setInterval(() => {
            getBankData(setBank);
        }, 2000);
 
        //Clearing the interval
        return () => clearInterval(interval);
    }, [bank]);

    useEffect(() => {
        if (!playerName) {
            setPlayerName(Utility.getPlayerName());
        }
    }, []);

    if (!gameState) {
        return null;
    }

    return (
        <GameStateContext.Provider value={setGameState}>
        <PlayerContext.Provider value={playerName}>
        <GameContainerUI gameState={gameState} setGameState={setGameState} cardDefs={cardDefs} bank={bank} playerName={playerName} handleActionsDone={handleActionsDone} handleCleanup={handleCleanup} />
        </PlayerContext.Provider>
        </GameStateContext.Provider>
    );
}