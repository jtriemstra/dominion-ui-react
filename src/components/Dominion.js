import React, { useState, useEffect, useRef } from "react";
import DominionUI from './DominionUI.js'
import Utility from "../Utility.js";

function tryRefresh(e, playerName, gameStateSetter) {
    console.debug("refreshing");
    if (e) e.preventDefault();
  
    fetch(Utility.apiServer() + "/refresh?playerName=" + playerName)
    .then(res => {
        if (res.ok ) { return res.json(); }
        else { res.text().then(text => {
            console.error(text);
          });               
        }
    })
    .then((result) => {
        if (result){
            gameStateSetter(result);
        }
    })
    .catch(error => {console.log(error);});
  }
  
  function isGameActive(setGameActive, refreshGame, setGameState, setPlayerName) {
    console.debug("checking active");
    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
  
    var myInit = {
        method: 'GET',
        headers: myHeaders,
    };
  
    var myRequest = new Request(Utility.apiServer() + "/activeGame");
  
    fetch(myRequest, myInit)
    .then(res => {
      if (res.ok ) { return res.json(); }
      else { res.text().then(text => {
          console.error(text);
        });               
      }
    })
    .then((result) => {
        if (result.activeGame) {
          console.info("active game found on server");
          setGameActive(true);
          if (result.activeGame && result.activeGame === Utility.getGameId() && Utility.getPlayerName()) {
            console.info("rejoining active game");
            refreshGame(null, Utility.getPlayerName(), setGameState);
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
    })
    .catch(error => {
      console.log(error);
      setGameState({"error":"Server down"});
    });
  }

function Dominion() {
    const [gameState, setGameState] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [gameActive, setGameActive] = useState(false);
    const [endingGame, setEndingGame] = useState(false);
    const activeGameInterval = useRef();
    const refreshInterval = useRef();
  
    useEffect(() => {
      if (!playerName) {
        if (Utility.getPlayerName()) {
          setPlayerName(Utility.getPlayerName());
        }
      }
      
      if (!gameActive) {
        activeGameInterval.current = setInterval(() => {
            isGameActive(setGameActive, tryRefresh, setGameState, setPlayerName);
        }, 1000);
        
        //Clearing the interval
        return () => clearInterval(activeGameInterval.current);
      } else {
        if (activeGameInterval.current){
          clearInterval(activeGameInterval.current);
        }
      }
   
      if (playerName && gameActive) {
        refreshInterval.current = setInterval(() => tryRefresh(null, playerName, setGameState), 500);   
        return () => { clearInterval(refreshInterval.current); } 
      } else {
        console.log("either no playername or no active game;");
      }
  
    }, [gameActive, playerName]);
  
    let gameEndHandler = () => {
      Utility.clearGameId();
      Utility.clearPlayerName();
      setEndingGame(true);
    };

    return (
        <DominionUI gameState={gameState} 
            setGameState={setGameState} 
            tryRefresh={tryRefresh} 
            gameActive={gameActive} 
            setPlayerName={setPlayerName} 
            gameEndHandler={gameEndHandler} 
            endingGame={endingGame} />
    )
}

export default Dominion;