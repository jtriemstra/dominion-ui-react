import React, { Component } from "react";

class ActionChoices extends Component {
    constructor(props) {
        super(props);
        
        this.handleChoice = this.handleChoice.bind(this);
    }

    handleChoice(e){
        e.preventDefault();
        this.props.onOptionClick(e.target.innerText);
    }

    render() {
        if (!this.props.currentChoice){
            return (<div></div>);
        }
        const choices = this.props.currentChoice.options.map((choice) => <li><a onClick={this.handleChoice} href="#">{choice}</a></li>);
        return (
            <div>
                <h2>Action</h2>
                <p>{this.props.currentChoice.prompt}</p>
                <ul>
                    {choices}
                </ul>
            </div>
        );
    }
}

export default ActionChoices;