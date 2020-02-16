import Form from "./js/components/Form";
import React, { Component } from "react";
import ReactDOM from "react-dom";


const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form title="This is a Test Form" />, wrapper) : false;