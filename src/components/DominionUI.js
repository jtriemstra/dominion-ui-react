import Header from './Header.js';
import SplashScreen from './splash/SplashScreen.js';
import EndScreen from "./EndScreen.js";
import GameContainer from "./GameContainer.js";

function DominionUI({gameState, setGameState, tryRefresh, gameActive, setPlayerName, gameEndHandler, endingGame}) {

  
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
  
  export default DominionUI;