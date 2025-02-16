import React, { Component } from "react";

class ActionChoices extends Component {
    constructor(props) {
        super(props);
        
        this.handleChoice = this.handleChoice.bind(this);
    }

    handleChoice(e){
        e.preventDefault();
        let form = e.target.parentElement;
        let checkboxes = form.querySelectorAll("[name=options]");
        let selectedOptions = [];
        for (var i=0; i<checkboxes.length; i++){
            if (checkboxes[i].checked) {
                selectedOptions.push(checkboxes[i].value);
            }
        }
        
        this.props.onOptionClick(selectedOptions);
    }

    getChoiceType(){
        if (this.props.currentChoice.minOptions === 1 && this.props.currentChoice.maxOptions === 1){
            return "radio";
        }
        else {
            return "checkbox";
        }
    }

    getCardImageByName(cardName){
        //TODO: more robust check here, names could contain :
        let trueCardName = cardName.indexOf(":") >= 0 ? cardName.split(":")[1].trim() : cardName;
        return "images/200px-" + trueCardName.replace(/ /g, "_") + ".jpg"
    }
    
    getChoiceUI(choice) {
		if (this.props.cardDefs[choice]) {
			return <><img src={this.getCardImageByName(this.props.cardDefs[choice].name)} width="160px"/><input type={this.getChoiceType()} value={choice} name="options" checked="false" /></>;
		} else {
			return <><input type={this.getChoiceType()} value={choice} name="options" className="no-image-checkbox" checked="false" /><div className="no-image-choice">{choice}</div></>;
		}
	}

    getPlayerNameFromChoice(cardName){
        //TODO: more robust check here, names could contain :
        let playerName = cardName.indexOf(":") >= 0 ? <p>{cardName.split(":")[0].trim()}</p> : "";
        return playerName;
    }

    getChoices(){
		let cardDefs = this.props.cardDefs;
		let optionsHaveCards = false;
		this.props.currentChoice.options.map((choice) => optionsHaveCards = optionsHaveCards || cardDefs[choice]);
		 
        if (!optionsHaveCards){
            const choices = this.props.currentChoice.options.map((choice) => 
                <li><label>{choice}<input type={this.getChoiceType()} value={choice} name="options" /></label></li>
            );

            return <div>{this.props.currentChoice.text}<ul>{choices}</ul></div>;
        }
        else {
			
            const choices = this.props.currentChoice.options.map((choice) => 
                    <li class='card-active'>
                        <label>{this.getPlayerNameFromChoice(choice)}{this.getChoiceUI(choice)}
                        
                        </label>
                    </li>
            );

            return <div class='card-set'>{this.props.currentChoice.text}<ul class='card-set-active'>{choices}</ul></div>;
        }
    }

    

    render() {
        if (!this.props.currentChoice){
            return (<div></div>);
        }

        const choices = this.getChoices();

        return (
            <div className="actions-background">
                <div className="actions-dialog">
                    <h2>Action</h2>
                    <p>{this.props.currentChoice.prompt}</p>
                    <form>
                        {choices}
                        <button onClick={this.handleChoice}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ActionChoices;