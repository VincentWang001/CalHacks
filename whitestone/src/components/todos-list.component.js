import React, { Component } from 'react';
import pepeSad from "../pepecry.png";

export default class TodosList extends Component {
    render() {
        return (
            <div>
                <p>Welcome to Todos List Component!!</p>
                <img src={pepeSad} width="300" height="300"/>
            </div>
        )
    }
}