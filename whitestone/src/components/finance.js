import React, { Component } from "react";

export default class StockFinder extends Component {
    render() {
        return (
            <div>
                <form>
                    <label> Budget: $ <input type="text" name="name" /> </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}