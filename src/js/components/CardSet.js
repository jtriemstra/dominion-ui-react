import React, { Component } from "react";
import ReactDOM from "react-dom";

class CardSet extends Component {
    constructor(props) {
        super(props);
        
        this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleCardClick(e){
        e.preventDefault();
        
        if (e.target.parentElement.dataset){
            this.props.onCardClick(e.target.parentElement.dataset.cardname);    
        }
        
    }

    transformBank(bankObject) {
        let cardList = [];
        Object.keys(bankObject).map(cardName => cardList.push(bankObject[cardName]));
        return cardList;
    }

    getCardImageByName(cardName){
        return "images/200px-" + cardName.replace(" ", "_") + ".jpg"
    }

    renderInactiveCards(){
        const normalizedCards = this.props.cards.map ? this.props.cards : this.transformBank(this.props.cards);
        return normalizedCards.map((card) => <li><img width="80px" src={this.getCardImageByName(card.name)} /></li>);
    }

    renderActiveCards(){
        const normalizedCards = this.props.cards.map ? this.props.cards : this.transformBank(this.props.cards);

        if (this.props.activeTest){
            return normalizedCards.map((card) => {
                if (this.props.activeTest(card)){
                    return <li><a href="#" data-cardname={card.name} onClick={this.handleCardClick}><img width="80px" src={this.getCardImageByName(card.name)} /></a></li>
                }
                else {
                    return <li><img width="80px" src={this.getCardImageByName(card.name)} /></li>
                }
            }
                
            );    
        }

        return normalizedCards.map((card) => 
            <li><a href="#" data-cardname={card.name} onClick={this.handleCardClick}><img width="80px" src={this.getCardImageByName(card.name)} /></a></li>
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
            <div className='card-set'>
                <h2>{this.props.name}</h2>
                {this.renderFaceUpDown()}
            </div>
        );
    }
}

export default CardSet;