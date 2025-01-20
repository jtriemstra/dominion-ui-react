import React, { useState, useEffect } from "react";
import Utility from "../../Utility.js";
import SplashScreenStart from "./SplashScreenStart.js";
import SplashScreenJoin from "./SplashScreenJoin.js";


export default function SplashScreen({gameState, setGameState, refreshGame, isGameActive, setPlayerName}) {
    return (
        <form>
            <label className="user-name">Enter your name: <input type="text" id="playerName"></input></label>
            {isGameActive ? <SplashScreenJoin setGameState={setGameState} setPlayerName={setPlayerName} /> : <SplashScreenStart setGameState={setGameState} />}
        </form>
    );
}