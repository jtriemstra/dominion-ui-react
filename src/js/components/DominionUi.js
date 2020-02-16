import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SplashScreen from './SplashScreen';


class DominionUi extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  render() {
    return (        
      <div>
         <Header />
        <SplashScreen />
      </div>
    );
  }
}

export default DominionUi;

