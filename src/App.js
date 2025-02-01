import React, { useState, useEffect, useRef } from "react";
import './App.css';
import Header from './components/Header.js';
import SplashScreen from './components/splash/SplashScreen.js';
import EndScreen from "./components/EndScreen.js";
import GameContainer from "./components/GameContainer.js";
import Utility from "./Utility.js";

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

function App() {
  const [gameState, setGameState] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [gameActive, setGameActive] = useState(false);
  const [endingGame, setEndingGame] = useState(false);
  const activeGameInterval = useRef();
  const refreshInterval = useRef();

  useEffect(() => {
    console.info("running App effect");
    if (!playerName) {
      console.info("no playerName in state");
      if (Utility.getPlayerName()) {
        console.info("setting playerName from cookie");
        setPlayerName(Utility.getPlayerName());
      }
    }
    
    if (!gameActive) {
      console.info("no active game in JS state, checking server");
      activeGameInterval.current = setInterval(() => {
          isGameActive(setGameActive, tryRefresh, setGameState, setPlayerName);
      }, 1000);
      
      //Clearing the interval
      return () => clearInterval(activeGameInterval.current);
    } else {
      console.info("active game in JS state, stopping check");
      if (activeGameInterval.current){
        clearInterval(activeGameInterval.current);
      }
    }
 
    if (playerName && gameActive) {
      console.log("playerName in state and active game, starting refresh");
      refreshInterval.current = setInterval(() => tryRefresh(null, playerName, setGameState), 500);   
      console.log("starting " + refreshInterval.current); 
      return () => { console.log("clearing " + refreshInterval.current); clearInterval(refreshInterval.current); } 
    } else {
      console.log("either no playername or no active game; playerName:");
      console.log(playerName);
      console.log("active");
      console.log(gameActive);
    }

  }, [gameActive, playerName]);

  let gameEndHandler = () => {
    Utility.clearGameId();
    Utility.clearPlayerName();
    setEndingGame(true);
  };

  let splashScreen = null;
  if (!gameState){
    splashScreen = <SplashScreen gameState={gameState} setGameState={setGameState} refreshGame={tryRefresh} isGameActive={gameActive} setPlayerName={setPlayerName} />;
  }

  let endScreen = null;
  if (gameState && gameState.isGameOver) {
    endScreen = <EndScreen gameState={gameState} endGameCallback={gameEndHandler} />;
  }

  let gameContainer = null;
  if (gameState && !gameState.error){
    gameContainer = <GameContainer gameState={gameState} setGameState={setGameState} endGameFlag={endingGame} />;
  }

  let error;
  if (gameState && gameState.error) {
    error = <p>The server appears to be down</p>;
  }

  return (
    <div>
      <Header />
      {error}
      {splashScreen}
      {gameContainer}
      {endScreen}
    </div>
  );
}

export default App;
