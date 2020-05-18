import React, { Component } from "react";
import Utility from "../Utility"

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleStartRandom = this.handleStartRandom.bind(this);
    }

    handleStart(event){
        event.preventDefault();
        const sets = ["Cellar,Market,Militia,Mine,Moat,Remodel,Smithy,Village,Woodcutter,Workshop",
                    "Adventurer,Bureaucrat,Chancellor,Chapel,Feast,Laboratory,Market,Mine,Moneylender,Throne Room",
                    "Bureaucrat,Chancellor,Council Room,Festival,Library,Militia,Moat,Spy,Thief,Village",
                    "Cellar,Chapel,Feast,Gardens,Laboratory,Thief,Village,Witch,Woodcutter,Workshop",
                    "Bureaucrat,Cellar,Festival,Library,Market,Remodel,Smithy,Throne Room,Village,Woodcutter",
                    "Cache,Crossroads,Develop,Haggler,Jack of All Trades,Margrave,Nomad Camp,Oasis,Spice Merchant,Stables",
                    "Cartographer,Crossroads,Embassy,Inn,Jack of All Trades,Mandarin,Nomad Camp,Oasis,Oracle,Tunnel",
                    "Cellar,Library,Moneylender,Throne Room,Workshop,Highway,Inn,Margrave,Noble Brigand,Oasis",
                    "Border Village,Cartographer,Develop,Duchess,Farmland,Ill-Gotten Gains,Noble Brigand,Silk Road,Stables,Trader",
                    "Border Village,Cache,Duchess,Fools Gold,Haggler,Highway,Nomad Camp,Scheme,Spice Merchant,Trader"];
        const setIndex = event.target.dataset.setindex;
        this.loadGame(this.getName(), "start", false, sets[setIndex]);
    }
    
    handleStartRandom(event){
        event.preventDefault();
        this.loadGame(this.getName(), "start", true);
    }

    handleJoin(event) {
        event.preventDefault();
        this.loadGame(this.getName(), "join");
    }

    getName(){
        const splashForm = event.target.closest("form");
        return splashForm.querySelector("#playerName").value;
    }
    
    loadGame(playerName, action, randomCards, cardNames) {

        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');

        var myInit = {
            method: 'GET',
            headers: myHeaders,
        };

        var myRequest = new Request(Utility.apiServer() + "/" + action + "?cardNames=" + (cardNames ? cardNames : "") + "&playerName=" + playerName + (randomCards ? "&randomCards=true" : ""));

        fetch(myRequest, myInit)
        .then(res => res.json())
        .then((result) => {
            this.props.onGameStart(result);
        });
    }

    render() {
        return (
            <form>
                <input type="text" id="playerName"></input>
                <button onClick={this.handleStart} data-setindex="0">Start Game With Basic Deck</button><br/>
                <button onClick={this.handleStart} data-setindex="1">Start Game With Big Money</button><br/>
                <button onClick={this.handleStart} data-setindex="2">Start Game With Interaction</button><br/>
                <button onClick={this.handleStart} data-setindex="3">Start Game With Size Distortion</button><br/>
                <button onClick={this.handleStart} data-setindex="4">Start Game With Village Square</button><br/>
                <button onClick={this.handleStart} data-setindex="5">Start Game With Hinterlands Intro</button><br/>
                <button onClick={this.handleStart} data-setindex="6">Start Game With Hinterlands Gambits</button><br/>
                <button onClick={this.handleStart} data-setindex="7">Start Game With Hinterlands Highway Robbery</button><br/>
                <button onClick={this.handleStart} data-setindex="8">Start Game With Hinterlands Fair Trades</button><br/>
                <button onClick={this.handleStart} data-setindex="9">Start Game With Hinterlands Bargains</button><br/>
                <button onClick={this.handleStartRandom}>Start Game With Random Deck</button><br/>
                <button onClick={this.handleJoin}>Join Game</button>
            </form>
            
        );
    }
}

export default SplashScreen;