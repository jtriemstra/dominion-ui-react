import React, { useState, useEffect, useRef } from "react";
import DominionUI from './DominionUI.js'
import Utility from "../Utility.js";
import Api from "../Api.js";

function tryRefresh(e, api, playerName, gameStateSetter) {
  if (e) e.preventDefault();
  api.fetchJSON("/refresh?playerName=" + playerName, gameStateSetter);  
}
  
function isGameActive(api, utility, setGameActive, refreshGame, setGameState, setPlayerName) {
  api.fetchJSON("/activeGame", (result) => {
    if (result.activeGame) {
        console.info("active game found on server");
        setGameActive(true);
        if (result.activeGame && result.activeGame === utility.getGameId() && utility.getPlayerName()) {
          console.info("rejoining active game");
          refreshGame(null, api, utility.getPlayerName(), setGameState);
        } else {
          console.info("active game on server doesn't match local info, clearing player name");
          Utility.clearPlayerName();
          setPlayerName("");
          setGameState(null);
        }       
      } else {
        console.info("no active game found on server, clearing player name");
        Utility.clearPlayerName();
        Utility.clearGameId();
        setPlayerName("");
        setGameState(null);
      }
  });  
}

function Dominion({api = new Api(), utility = new Utility()}) {
    const [gameState, setGameState] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [gameActive, setGameActive] = useState(false);
    const [endingGame, setEndingGame] = useState(false);
    const activeGameInterval = useRef();
    const refreshInterval = useRef();

    //console.log(api);
  
    useEffect(() => {
      if (!playerName) {
        if (utility.getPlayerName()) {
          setPlayerName(utility.getPlayerName());
        }
      }
      
      if (!gameActive) {
        activeGameInterval.current = setInterval(() => {
            isGameActive(api, utility, setGameActive, tryRefresh, setGameState, setPlayerName);
        }, 1000);
        
        //Clearing the interval
        return () => clearInterval(activeGameInterval.current);
      } else {
        if (activeGameInterval.current){
          clearInterval(activeGameInterval.current);
        }
      }

      if (endingGame) {
        clearInterval(refreshInterval.current);
        setGameState(null);
        setGameActive(false);
        setEndingGame(false);
      } else if (playerName && gameActive) {
        refreshInterval.current = setInterval(() => tryRefresh(null, api, playerName, setGameState), 500);   
        return () => { clearInterval(refreshInterval.current); } 
      } else {
        console.log("either no playername or no active game;");
      }
  
    }, [gameActive, playerName, endingGame]);
  
    return (
        <DominionUI gameState={gameState} 
            setGameState={setGameState} 
            tryRefresh={tryRefresh} 
            gameActive={gameActive} 
            setPlayerName={setPlayerName} 
            setEndingGame={setEndingGame} 
            endingGame={endingGame}
            api={api} 
            utility={utility} />
    )
}

export default Dominion;