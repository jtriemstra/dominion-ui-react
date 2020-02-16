import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <h2>{this.props.title}</h2>
        );
    }
}

export default Header;