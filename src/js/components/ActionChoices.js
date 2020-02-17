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

    render() {
        if (!this.props.currentChoice){
            return (<div></div>);
        }
        const choices = this.props.currentChoice.options.map((choice) => 
            <li><label>{choice}<input type="checkbox" value={choice} name="options" /></label></li>
        );

        return (
            <div>
                <h2>Action</h2>
                <p>{this.props.currentChoice.prompt}</p>
                <form>
                    <ul>
                        {choices}
                    </ul>
                    <button onClick={this.handleChoice}>Submit</button>
                </form>
            </div>
        );
    }
}

export default ActionChoices;