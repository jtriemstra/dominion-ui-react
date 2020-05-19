import React, { Component } from "react";
import ReactDOM from "react-dom";

class Bank extends Component {
    //TODO: clean up duplication between Bank and CardSet
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
        for (var i=0; i<bankObject.length; i++){
            cardList.push(bankObject[i].card);
        }
        //Object.keys(bankObject).map(cardName => cardList.push(bankObject[cardName].card));
        return cardList;
    }

    getCardImageByName(cardName){
        return "images/200px-" + cardName.replace(/ /g, "_") + ".jpg"
    }

    getOneCardQuantity(cardName) {
        for (var i=0; i<this.props.cards.length; i++){
            if (this.props.cards[i].card.name === cardName){
                return this.props.cards[i].quantity;
            }
        }
    }

    renderInactiveCards(){
        const normalizedCards = this.transformBank(this.props.cards);
        return normalizedCards.map((card) => <li><img width="160px" src={this.getCardImageByName(card.name)} /><span className="bank-quantity">{this.getOneCardQuantity(card.name)} left</span></li>);
    }

    renderActiveCards(){
        const normalizedCards = this.transformBank(this.props.cards);

        if (this.props.activeTest){
            return this.props.cards.map((bankcard) => {
                if (this.props.activeTest(bankcard.card) && bankcard.quantity > 0){
                    return <li className="card-active"><a href="#" data-cardname={bankcard.card.name} onClick={this.handleCardClick}><img width="160px" src={this.getCardImageByName(bankcard.card.name)} /></a><span className="bank-quantity">{this.getOneCardQuantity(bankcard.card.name)} left</span></li>
                }
                else {
                    return <li className="card-inactive"><img width="160px" src={this.getCardImageByName(bankcard.card.name)} /><span className="bank-quantity">{this.getOneCardQuantity(bankcard.card.name)} left</span></li>
                }
            }
                
            );    
        }

        return normalizedCards.map((card) => 
            <li><a href="#" data-cardname={card.name} onClick={this.handleCardClick}><img width="160px" src={this.getCardImageByName(card.name)} /></a></li>
        );
    }

    render() {
        if (!this.props.cards){
            return (<span></span>);
        }

        let cardList;
        if (this.props.faceUp){            
            cardList = <ul className={"card-set-" + (this.props.active ? "active" : "inactive")}>
                {this.props.active ? this.renderActiveCards() : this.renderInactiveCards()}
            </ul>                                
        }
        else{
            cardList = <span>{this.props.cards.length} cards</span>
        }

        return (
            <div className='card-set'>
                <h2>{this.props.name}</h2>
                {cardList}
            </div>
        );
    }
}

export default Bank;