import React, { Component } from "react";

class Ticker extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
      }

      componentDidMount() {
        this.timerReference = setInterval(
            () => this.tick(),
            1000
          );
    }
  
    componentWillUnmount() {
        clearInterval(timerReference);
    }

    tick(){
        this.setState((state, props) => ({counter: state.counter + 1}));
    }

    render() {
        return (
            <h3>{this.state.counter}</h3>
        );
    }
}

export default Ticker;