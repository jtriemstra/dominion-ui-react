import React, { Component } from "react";
import ReactDOM from "react-dom";

class CardSet extends Component {
    render() {
        if (!this.props.cards){
            return (<span></span>);
        }
        if (this.props.faceUp){
            const cardDisplays = this.props.cards.map((card) => <li>{card.name}</li>);
            return (
                <div>
                <h2>{this.props.name}</h2>
                <ul>
                    {cardDisplays}
                </ul>                
                </div>
            );
        }
        else{
            return (<div><h2>{this.props.name}</h2><span>{this.props.cards.length} cards</span></div>);
        }
    }
}

export default CardSet;