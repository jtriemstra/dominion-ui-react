import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardSet from "./CardSet"
import ActionChoices from "./ActionChoices"
import PlayerList from "./PlayerList"

class GameContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {bank: null};
        
        this.handlePlayCard = this.handlePlayCard.bind(this);
        this.handleBuyCard = this.handleBuyCard.bind(this);
        this.handleCleanup = this.handleCleanup.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handActiveTest = this.handActiveTest.bind(this);
    }

    getPlayerName() {
        return this.props.gameState.thisPlayer.name;
    }

    componentDidMount() {
        fetch("http://localhost:8080/bank")
        .then(res => res.json())
        .then((result) => {
            this.setState({bank: result});
        });

        setInterval(() => {
            if (this.props.gameState && !this.props.gameState.isCurrentPlayer){
                this.handleRefresh();
            }
        }, 5000);
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

    handleRefresh(e) {
        if (e) e.preventDefault();
        fetch("http://localhost:8080/refresh?playerName=" + this.getPlayerName())
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
        return this.props.gameState.thisPlayer.currentChoice == null &&
            (this.props.gameState.thisPlayer.hasActions || card.type != "ACTION");
    }

    render() {
        if (!this.props.gameState) {
            return null;
        }
        
        const gameState = this.props.gameState;
        const playerState = gameState.thisPlayer;
        const bank = this.state.bank;

        if (this.props.visible && gameState){
            return (        
            <div>
                <PlayerList currentPlayerIndex={gameState.currentPlayerIndex} playerNames={gameState.playerNames} />
                <button onClick={this.handleRefresh}>Refresh</button>
                <CardSet cards={bank} faceUp={true} active={playerState.hasBuys && playerState.currentChoice == null && gameState.isCurrentPlayer} name="Bank" onCardClick={this.handleBuyCard} />
                <div style={{ width:'20%', float:'left' }}><CardSet cards={playerState.deck} faceUp={false} active={false} name="Deck" /></div>
                <div style={{ width:'20%', float:'left' }}><CardSet cards={playerState.hand} faceUp={true} active={gameState.isCurrentPlayer} activeTest={this.handActiveTest} name="Hand" onCardClick={this.handlePlayCard}/></div>
                <div style={{ width:'20%', float:'left' }}><CardSet cards={playerState.played} faceUp={true} active={false} name="Played"/></div>
                <div style={{ width:'20%', float:'left' }}><CardSet cards={playerState.bought} faceUp={true} active={false} name="Bought"/></div>
                <div style={{ width:'20%', float:'left' }}><CardSet cards={playerState.discard} faceUp={false} active={false} name="Discard"/></div>
                <div style={{ clear:'both'}} />
                <ActionChoices currentChoice={playerState.currentChoice} onOptionClick={this.handleAction}/>
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