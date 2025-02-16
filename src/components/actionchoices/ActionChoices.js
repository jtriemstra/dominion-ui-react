import React, { useState, useEffect, useContext  } from "react";
import Utility from "../../Utility.js";
import { PlayerContext } from '../../context/PlayerContext.js';
import { GameStateContext } from '../../context/GameStateContext.js';
import ActionChoicesUI from './ActionChoicesUI.js'

function handleChoice(e, playerName, gameStateSetter){
    e.preventDefault();
    let form = e.target.parentElement;
    let checkboxes = form.querySelectorAll("[name=options]");
    let selectedOptions = [];
    for (var i=0; i<checkboxes.length; i++){
        if (checkboxes[i].checked) {
            selectedOptions.push(checkboxes[i].value);
        }
    }
    
    let url = Utility.apiServer() + "/action?playerName=" + playerName;
    selectedOptions.map((name, index) => url += "&options=" + name);

        fetch(url)
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


export default function ActionChoices({currentChoice, cardDefs, looking}) {
    const playerName = useContext(PlayerContext);
    const gameStateSetter = useContext(GameStateContext);

    if (!currentChoice || !cardDefs){
        return (<div></div>);
    }

    

    return (
        <ActionChoicesUI currentChoice={currentChoice} cardDefs={cardDefs} handleChoice={(e) => handleChoice(e, playerName, gameStateSetter)} looking={looking} />        
    );
}