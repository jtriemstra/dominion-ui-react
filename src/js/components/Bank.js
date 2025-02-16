import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardSet from './CardSet'

class Bank extends CardSet {
    //TODO: look into a way to pass a "renderer" to CardSet instead of inheriting?
    constructor(props) {
        super(props);
    }

    renderInactiveCards(){
		let cardDefs = this.props.cardDefs;
        return this.props.cards.map((bankcard) => <li><img width="160px" src={this.getCardImageByName(bankcard.name)} /><span className="bank-quantity">{bankcard.quantity} left</span></li>);
    }

    renderActiveCards(){
		let cardDefs = this.props.cardDefs;
        if (this.props.activeTest){
            return this.props.cards.map((bankcard) => {
                if (this.props.activeTest(bankcard.name) && bankcard.quantity > 0){
                    return <li className="card-active"><a href="#" data-cardname={bankcard.name} onClick={this.handleCardClick}><img width="160px" src={this.getCardImageByName(bankcard.name)} /></a><span className="bank-quantity">{bankcard.quantity} left</span></li>
                }
                else {
                    return <li className="card-inactive"><img width="160px" src={this.getCardImageByName(bankcard.name)} /><span className="bank-quantity">{bankcard.quantity} left</span></li>
                }
            }
                
            );    
        }

        return this.props.cards.map((bankcard) => 
            <li><a href="#" data-cardname={bankcard.name} onClick={this.handleCardClick}><img width="160px" src={this.getCardImageByName(bankcard.name)} /></a></li>
        );
    }
}

export default Bank;