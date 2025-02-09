import React, { useState, useEffect, useRef  } from "react";
import PlayerList from "./PlayerList";
import TurnDashboard from "./TurnDashboard";
import Bank from "./cardset/Bank";
import Api from "../Api";
import Utility from "../Utility";
import CardSet from "./cardset/CardSet";
import GameContainerUI from "./GameContainerUI.js";
import { PlayerContext } from '../context/PlayerContext.js';
import { GameStateContext } from '../context/GameStateContext.js';

function getCardData(api, setCardDefsState) {
    api.fetchJSON("/cards", setCardDefsState);    
}

function getBankData(api, setBankState) {
    api.fetchJSON("/bank?nocache=" + Date.now(), setBankState);        
}

function handleCleanup(e, api, playerName, gameStateSetter){
    e.preventDefault();
    api.fetchJSON("/cleanup?playerName=" + playerName, gameStateSetter); 
}

function handleActionsDone(e, api, playerName, gameStateSetter){
    e.preventDefault();
    api.fetchJSON("/skipAction?playerName=" + playerName, gameStateSetter); 
}

export default function GameContainer({gameState, setGameState, endGameFlag, api = new Api(), utility}) {
    const [cardDefs, setCardDefs] = useState(null);
    const [bank, setBank] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const bankIntervalRef = useRef();

    if (endGameFlag) {
        clearInterval(bankIntervalRef.current);
    }

    useEffect(() => {
        if (!cardDefs) {
            getCardData(api, setCardDefs);
        }
    }, [cardDefs]);

    useEffect(() => {
        if (endGameFlag) {
            return;
        }
        
        if (!bank) {
            getBankData(api, setBank);
        }
        // TODO: are there times I can pause this?
        bankIntervalRef.current = setInterval(() => {
            getBankData(api, setBank);
        }, 2000);
 
        //Clearing the interval
        return () => clearInterval(bankIntervalRef.current);
    }, [bank]);

    useEffect(() => {
        if (!playerName) {
            setPlayerName(utility.getPlayerName());
        }
    }, []);

    if (!gameState) {
        return null;
    }

    return (
        <GameStateContext.Provider value={setGameState}>
        <PlayerContext.Provider value={playerName}>
        <GameContainerUI gameState={gameState} setGameState={setGameState} cardDefs={cardDefs} bank={bank} playerName={playerName} handleActionsDone={handleActionsDone} handleCleanup={handleCleanup} api={api} />
        </PlayerContext.Provider>
        </GameStateContext.Provider>
    );
}