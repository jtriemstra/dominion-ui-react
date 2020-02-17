import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardSet from "./CardSet"
import ActionChoices from "./ActionChoices"

class GameContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {bank: null};
        
        this.handlePlayCard = this.handlePlayCard.bind(this);
        this.handleBuyCard = this.handleBuyCard.bind(this);
        this.handleCleanup = this.handleCleanup.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/bank")
        .then(res => res.json())
        .then((result) => {
            this.setState({bank: result});
        });
    }

    handlePlayCard(cardName){
        fetch("http://localhost:8080/play?card=" + cardName)
        .then(res => res.json())
        .then((result) => {
            this.props.onGameUpdate(result);
        });
    }

    handleBuyCard(cardName){
        fetch("http://localhost:8080/buy?card=" + cardName)
        .then(res => res.json())
        .then((result) => {
            this.props.onGameUpdate(result);
        });
    }

    handleCleanup(e){
        e.preventDefault();
        fetch("http://localhost:8080/cleanup")
        .then(res => res.json())
        .then((result) => {
            this.props.onGameUpdate(result);
        });
    }

    handleAction(optionName){
        fetch("http://localhost:8080/action?option=" + optionName)
        .then(res => res.json())
        .then((result) => {
            this.props.onGameUpdate(result);
        });
    }

    render() {
        const gameState = this.props.gameState;
        const bank = this.state.bank;
        
        if (this.props.visible && gameState){
            return (        
            <div>
                <CardSet cards={bank} faceUp={true} active={true} name="Bank" onCardClick={this.handleBuyCard} />
                <CardSet cards={gameState.deck} faceUp={false} active={false} name="Deck" />
                <CardSet cards={gameState.hand} faceUp={true} active={true} name="Hand" onCardClick={this.handlePlayCard}/>
                <CardSet cards={gameState.played} faceUp={true} active={false} name="Played"/>
                <CardSet cards={gameState.bought} faceUp={true} active={false} name="Bought"/>
                <CardSet cards={gameState.discard} faceUp={false} active={false} name="Discard"/>
                <ActionChoices currentChoice={gameState.currentChoice} onOptionClick={this.handleAction}/>
                <button onClick={this.handleCleanup}>Clean Up</button>
            </div>
            );
        }
        else {
            return (<div></div>);
        }
      }
}

export default GameContainer;