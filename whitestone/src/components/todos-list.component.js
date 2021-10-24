import React, { Component } from 'react';
import pepeSad from "../pepecry.png";
import styled from 'styled-components';

const StyledH1 = styled.h1`
    font-weight: bold;
    font-size: 50px;
    color: white;
    font-family: "Times New Roman", Times, Serif;
`

const StyledP = styled.p`
    font-weight: bold;
    font-size: 25px;
    color: #D2B48C;
    font-family: "Times New Roman", Times, Serif;
`

export default class TodosList extends Component {
    render() {
        return (
            <div>
                <StyledH1>WHITESTONE</StyledH1>
                <StyledP>Welcome to STONKS!!</StyledP>
                <img src={pepeSad} width="300" height="300"/>
            </div>
        )
    }
}