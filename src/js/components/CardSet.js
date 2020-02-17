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

    transformBank(bankObject) {
        let cardList = [];
        Object.keys(bankObject).map(cardName => cardList.push(bankObject[cardName]));
        return cardList;
    }

    renderInactiveCards(){
        const normalizedCards = this.props.cards.map ? this.props.cards : this.transformBank(this.props.cards);
        return normalizedCards.map((card) => <li>{card.name}</li>);
    }

    renderActiveCards(){
        const normalizedCards = this.props.cards.map ? this.props.cards : this.transformBank(this.props.cards);
        return normalizedCards.map((card) => <li><a href="#" onClick={this.handleCardClick}>{card.name}</a></li>);
    }

    renderFaceUpDown(){
        if (this.props.faceUp){            
            return (
                <ul>
                    {this.props.active ? this.renderActiveCards() : this.renderInactiveCards()}
                </ul>                                
            );
        }
        else{
            return (<span>{this.props.cards.length} cards</span>);
        }
    }

    render() {
        if (!this.props.cards){
            return (<span></span>);
        }
        
        return (
            <div>
                <h2>{this.props.name}</h2>
                {this.renderFaceUpDown()}
            </div>
        );
    }
}

export default CardSet;