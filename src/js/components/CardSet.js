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

        if (this.props.activeTest){
            return normalizedCards.map((card) => {
                if (this.props.activeTest(card)){
                    return <li><a href="#" onClick={this.handleCardClick}>{card.name}</a> {this.props.name === "Bank" ? "(" + card.cost + ")" : ""}</li>
                }
                else {
                    return <li>{card.name} {this.props.name === "Bank" ? "(" + card.cost + ")" : ""}</li>
                }
            }
                
            );    
        }

        //TODO: keying off the name of 'Bank' is flimsy, but ultimately would like the UI to be an image, not text anyway so a better solution may not matter
        return normalizedCards.map((card) => 
            <li><a href="#" onClick={this.handleCardClick}>{card.name}</a> {this.props.name === "Bank" ? "(" + card.cost + ")" : ""}</li>
        );
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