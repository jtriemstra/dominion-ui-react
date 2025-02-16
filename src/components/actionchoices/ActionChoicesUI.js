import React, { useState, useEffect, useContext  } from "react";
import Utility from "../../Utility.js";
import { PlayerContext } from '../../context/PlayerContext.js';


function getPlayerNameFromChoice(cardName){
    //TODO: more robust check here, names could contain :
    let playerName = cardName.indexOf(":") >= 0 ? <p>{cardName.split(":")[0].trim()}</p> : "";
    return playerName;
}

function getChoiceType(currentChoice){
    if (currentChoice.minChoices === 1 && currentChoice.maxChoices === 1){
        return "radio";
    }
    else {
        return "checkbox";
    }
}

function getChoiceUI(choiceOption, cardDefs, currentChoice) {
    if (cardDefs[choiceOption]) {
        return <><img src={getCardImageByName(cardDefs[choiceOption].name)} width="160px"/><input type={getChoiceType(currentChoice)} value={choiceOption} name="options" /></>;
    } else {
        return <><div className="no-image-choice">{choiceOption}</div><br /><br /><input type={getChoiceType(currentChoice)} value={choiceOption} name="options" className="no-image-checkbox" /></>;
    }
}

function getCardImageByName(cardName){
    //TODO: more robust check here, names could contain :
    let trueCardName = cardName.indexOf(":") >= 0 ? cardName.split(":")[1].trim() : cardName;
    return "images/200px-" + trueCardName.replace(/ /g, "_") + ".jpg"
}

function renderChoices(cardDefs, currentChoice){
    let optionsHaveCards = false;
    currentChoice.options.map((choice) => optionsHaveCards = optionsHaveCards || cardDefs[choice.text]);
     
    if (!optionsHaveCards){
        const choices = currentChoice.options.map((choiceOption) => 
            <li className="no-cards-choices" key={choiceOption.id}><label>{choiceOption.text}<input type={getChoiceType(currentChoice)} value={choiceOption.text} name="options" /></label></li>
        );

        return <div>{currentChoice.text}<ul>{choices}</ul></div>;
    }
    else {
        const choices = currentChoice.options.map((choiceOption) => 
                <li className='card-active' key={choiceOption.id} >
                    <label>{getPlayerNameFromChoice(choiceOption.text)}{getChoiceUI(choiceOption.text, cardDefs, currentChoice)}
                    
                    </label>
                </li>
        );

        return <div className='card-set'>{currentChoice.text}<ul className='card-set-active'>{choices}</ul></div>;
    }
}

function renderLooking(looking, cardDefs) {
    return looking.map((card) => 
        <li className='card-active'><img src={getCardImageByName(cardDefs[card].name)} width="160px"/></li>
    );
}

function validateAndHandleChoice(e, handleChoice, currentChoice, gameStateSetter) {
    e.preventDefault();
    e.stopPropagation();
    const choiceForm = e.target.closest("form");
    const inputs = choiceForm.querySelectorAll("input");
    let numSelected = 0;
    inputs.forEach(i => numSelected += i.checked ? 1 : 0);

    if ((numSelected < currentChoice.minChoices || numSelected > currentChoice.maxChoices) && currentChoice.options.length > 0) {
        alert("You must choose between " + currentChoice.minChoices + " and " + currentChoice.maxChoices + " options");
    } else {
        handleChoice(e);
    }
}

export default function ActionChoices({currentChoice, cardDefs, handleChoice, looking}) {
    const playerName = useContext(PlayerContext);
    
    return (
        <div className="card-set">
            <h2>Action</h2>
            <div className="active-choices">
                <p>{currentChoice.prompt}</p>
                <ul>{renderLooking(looking, cardDefs)}</ul>
                <form>
                    {renderChoices(cardDefs, currentChoice)}
                    <button onClick={(e) => validateAndHandleChoice(e, handleChoice, currentChoice)}>Make Choice</button>
                </form>
            </div>
        </div>
    );
}