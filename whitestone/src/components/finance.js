import React, { Component } from "react";

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
                <label>Budget: $</label>
                <input type="text"
                    value={this.state.todo_description}
                    onChange={this.onChangeTodoDescription}
                />
                <h1>You can buy {this.state.amountPower / this.state.amazonAmount} Amazon Stock(s)</h1>
                <h1>You can buy {this.state.amountPower / this.state.googleAmount} Google Stock(s)</h1>
            </form>
        )
    }
}