import React, { Component } from "react";
import styled from 'styled-components';

const StockLine = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const StyledLabel = styled.label`
  font-family: 'Times New Roman', serif;
  font-weight: bold;
  font-size: 1.5em;
  color: #000000;
`;

export default class StockFinder extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.state = {
            amountPower: '',
            amazonAmount: 3335.55,
            googleAmount: 2772.50

        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            amountPower: e.target.value
        });
    }


    render() {
        return (
            <form>
                <StyledLabel>Budget: $</StyledLabel>
                <input type="text"
                    value={this.state.todo_description}
                    onChange={this.onChangeTodoDescription}
                />
                <StockLine>You can buy {this.state.amountPower / this.state.amazonAmount} Amazon Stock(s)</StockLine>
                <StockLine>You can buy {this.state.amountPower / this.state.googleAmount} Google Stock(s)</StockLine>
            </form>
        )
    }
}