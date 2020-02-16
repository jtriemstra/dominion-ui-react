import React, { Component } from "react";
import ReactDOM from "react-dom";

class CardSet extends Component {
    constructor(props) {
        super(props);
        
        this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleCardClick(e){
        e.preventDefault();
        this.props.onCardClick(e.target.innerText);
    }

    render() {
        if (!this.props.cards){
            return (<span></span>);
        }
        if (this.props.faceUp){
            const cardDisplays = this.props.cards.map((card) => <li>{card.name}</li>);
            const activeCardDisplays = this.props.cards.map((card) => <li><a href="#" onClick={this.handleCardClick}>{card.name}</a></li>);

            return (
                <div>
                <h2>{this.props.name}</h2>
                <ul>
                    {this.props.active ? activeCardDisplays : cardDisplays}
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