import React from "react";
import PlayerList from "./PlayerList";
import TurnDashboard from "./TurnDashboard";
import Notifications from "./Notifications";
import Bank from "./cardset/Bank";
import CardSet from "./cardset/CardSet";
import ActionChoices from "./actionchoices/ActionChoices.js";
import Api from "../Api";

function bankActiveTest(card, cardDefs, gameState) {
    let result = gameState.thisPlayer.currentChoice === null &&
        gameState.thisPlayer.hasBuys &&
        gameState.thisPlayer.buyableBankCards.includes(card);
    
    return result;
}

function handActiveTest(card, cardDefs, gameState) {
    if (!cardDefs) {return false;}

    return gameState.thisPlayer.currentChoice == null &&
        ((gameState.thisPlayer.phase === "action" && cardDefs[card].action) 
        || (gameState.thisPlayer.phase === "buy" && cardDefs[card].treasure));
}

export default function GameContainerUI({gameState, setGameState, cardDefs, bank, playerName, handleActionsDone, handleCleanup, api = new Api()}) {
    
    let playerState = gameState.thisPlayer;
    let currentPlayerClass = "current-player-" + gameState.isCurrentPlayer;

    return (
        <div className={"game-container " + currentPlayerClass}>
            
                <PlayerList currentPlayerIndex={gameState.currentPlayerIndex} playerNames={gameState.playerNames} />
                <TurnDashboard playerState={gameState.thisPlayer} isCurrentPlayer={gameState.isCurrentPlayer} />
                <div style={{clear:"both"}}><Bank cardDefs={cardDefs} cards={bank} faceUp={true} active={playerState.hasBuys && playerState.currentChoice == null && gameState.isCurrentPlayer} name="Bank" activeTest={(card) => {return bankActiveTest(card, cardDefs, gameState);}} /></div>
                <div style={{clear:"both"}} className="notifications card-set">
                    <h2>Activity</h2>
                    <Notifications api={api} />
                </div>
                <div style={{clear:"both"}}>
                    <ActionChoices currentChoice={playerState.currentChoice} cardDefs={cardDefs} looking={gameState.thisPlayer.looking} /> 
                </div>
                <div className="card-set-container1">
                    <CardSet className="card-set-hand" cardDefs={cardDefs} cards={playerState.hand} faceUp={true} active={gameState.isCurrentPlayer && playerState.currentChoice == null} activeTest={(card) => {return handActiveTest(card, cardDefs, gameState);}} name="Hand" />
                    <div>
                        <CardSet additionalClassName="card-set-played" cardDefs={cardDefs} cards={playerState.played} faceUp={true} active={false} name="Played"/>    
                    </div>
                </div>
                <div className="clean-up-container">
                    <button disabled={playerState.currentChoice != null} onClick={(e) => handleActionsDone(e, api, playerName, setGameState)}>Skip Actions</button>
                    <button disabled={playerState.currentChoice != null} onClick={(e) => handleCleanup(e, api, playerName, setGameState)}>Clean Up</button>
                </div>
                <div className="card-set-container2">
                    <CardSet className="card-set-deck" cardDefs={cardDefs} cards={playerState.deck} faceUp={false} active={false} name="Deck" />
                    <CardSet className="card-set-bought" cardDefs={cardDefs} cards={playerState.bought} faceUp={true} active={false} name="Bought"/>
                    <CardSet className="card-set-discard" cardDefs={cardDefs} cards={playerState.discard} faceUp={false} active={false} name="Discard"/>
                </div>
                    
                <div style={{ clear:'both'}} />
       
        </div>
    );
}