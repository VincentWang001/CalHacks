import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import pepeSad from "../pepecry.png";
import styled from 'styled-components';
import Stock from "./stockInfo";

const StyledH1 = styled.h1`
    font-weight: bold;
    font-size: 50px;
    color: skyblue;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    text-align: center;
`

const StyledP = styled.p`
    font-weight: bold;
    font-size: 25px;
    color: skyblue;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    text-align: center;
`

const StyledImage = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
`

export default class TodosList extends Component {
    render() {
        return (
            <div>
                <StyledH1>WHITESTONE</StyledH1>
                <StyledP>Welcome to Whitestone, the place for you to know all about the stocks you're interested in!</StyledP>
                <Router>
                    <a to ="/Stock"><StyledImage src={pepeSad} width="300" height="300" /></a>
                    <Route path="/Stock" component={Stock} />
                </Router>
            </div>
        )
    }
}