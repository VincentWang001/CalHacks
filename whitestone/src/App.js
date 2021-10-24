import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import pepeSad from "./stonks.jpg";
import StockFinder from './components/finance';
import Stock from "./components/stockInfo";



class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={pepeSad} width="50" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Whitestone</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/finder" className="nav-link">Finance App</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/Stock" className="nav-link">Stock App</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/finder" component={StockFinder} />
          <Route path="/Stock" component={Stock} />

        </div>
      </Router>
    );
  }
}

export default App;