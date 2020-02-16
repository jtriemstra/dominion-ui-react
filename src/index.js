import DominionUi from "./js/components/DominionUi";
import React, { Component } from "react";
import ReactDOM from "react-dom";


const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<DominionUi  />, wrapper) : false;