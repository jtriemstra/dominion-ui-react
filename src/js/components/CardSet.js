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

    getCardImageByName(cardName){
        return "images/200px-" + cardName.replace(/ /g, "_") + ".jpg"
    }

    renderInactiveCards(){
		let cardDefs = this.props.cardDefs;
		// TODO: think this transformBank is old
		const normalizedCards = this.props.cards.map ? this.props.cards : this.transformBank(this.props.cards);
        return normalizedCards.map((card) => <li><img width="160px" src={this.getCardImageByName(cardDefs[card].name)} /></li>);
    }

    renderActiveCards(){
        const normalizedCards = this.props.cards;
		let cardDefs = this.props.cardDefs;

        if (this.props.activeTest){
            return normalizedCards.map((card) => {
                if (this.props.activeTest(card)){
                    return <li className="card-active"><a href="#" data-cardname={cardDefs[card].name} onClick={this.handleCardClick}><img width="160px" src={this.getCardImageByName(cardDefs[card].name)} /></a></li>
                }
                else {
                    return <li className="card-inactive"><img width="160px" src={this.getCardImageByName(cardDefs[card].name)} /></li>
                }
            }
                
            );    
        }

        return normalizedCards.map((card) => 
            <li><a href="#" data-cardname={cardDefs[card].name} onClick={this.handleCardClick}><img width="160px" src={this.getCardImageByName(cardDefs[card].name)} /></a></li>
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
            cardList = <span class="card-set-facedown">{this.props.cards.length} cards</span>
        }

        return (
            <div className={"card-set " + this.props.className}>
                <h2>{this.props.name}</h2>
                {cardList}
            </div>
        );
    }
}

export default CardSet;