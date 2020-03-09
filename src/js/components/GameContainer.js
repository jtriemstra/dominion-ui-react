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
        this.handActiveTest = this.handActiveTest.bind(this);
    }

    getPlayerName() {
        return this.props.gameState.name;
    }

    componentDidMount() {
        fetch("http://localhost:8080/bank")
        .then(res => res.json())
        .then((result) => {
            this.setState({bank: result});
        });
    }

    handlePlayCard(cardName){
        fetch("http://localhost:8080/play?card=" + cardName + "&playerName=" + this.getPlayerName())
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
            }
        });
    }

    handleBuyCard(cardName){
        fetch("http://localhost:8080/buy?card=" + cardName + "&playerName=" + this.getPlayerName())
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
            }            
        });
    }

    handleCleanup(e){
        e.preventDefault();
        fetch("http://localhost:8080/cleanup?playerName=" + this.getPlayerName())
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
            }
        });
    }

    handleAction(optionNames){
        let url = "http://localhost:8080/action?playerName=" + this.getPlayerName();
        optionNames.map((name, index) => url += "&options=" + name);

        fetch(url)
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
            }
        });
    }

    handActiveTest(card) {
        return this.props.gameState.currentChoice == null &&
            (this.props.gameState.hasActions || card.type != "ACTION");
    }

    render() {
        const gameState = this.props.gameState;
        const bank = this.state.bank;

        if (this.props.visible && gameState){
            return (        
            <div>
                <h2>{this.getPlayerName()}</h2>
                <CardSet cards={bank} faceUp={true} active={gameState.hasBuys && gameState.currentChoice == null} name="Bank" onCardClick={this.handleBuyCard} />
                <div style={{ width:'20%', float:'left' }}><CardSet cards={gameState.deck} faceUp={false} active={false} name="Deck" /></div>
                <div style={{ width:'20%', float:'left' }}><CardSet cards={gameState.hand} faceUp={true} active={true} activeTest={this.handActiveTest} name="Hand" onCardClick={this.handlePlayCard}/></div>
                <div style={{ width:'20%', float:'left' }}><CardSet cards={gameState.played} faceUp={true} active={false} name="Played"/></div>
                <div style={{ width:'20%', float:'left' }}><CardSet cards={gameState.bought} faceUp={true} active={false} name="Bought"/></div>
                <div style={{ width:'20%', float:'left' }}><CardSet cards={gameState.discard} faceUp={false} active={false} name="Discard"/></div>
                <div style={{ clear:'both'}} />
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