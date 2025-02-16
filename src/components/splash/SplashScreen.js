import React, { useState, useEffect } from "react";
import Api from "../../Api.js";
import SplashScreenStart from "./SplashScreenStart.js";
import SplashScreenJoin from "./SplashScreenJoin.js";


export default function SplashScreen({gameState, setGameState, refreshGame, isGameActive, setPlayerName, api = new Api(), setEndingGame}) {
    return (
        <form>
            <label className="user-name">Enter your name: <input type="text" id="playerName"></input></label>
            {isGameActive ? <SplashScreenJoin setGameState={setGameState} setPlayerName={setPlayerName} setEndingGame={setEndingGame} /> : <SplashScreenStart setGameState={setGameState} api={api} setEndingGame={setEndingGame} />}
        </form>
    );
}