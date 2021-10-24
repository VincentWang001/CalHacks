import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import TodoApp from "./components/make-todo.component";

import pepeSad from "./poster.jpeg";
import StockFinder from './components/finance';
import Stock from "./components/stockInfo";



class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={pepeSad} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Whitestone</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/todoEdit" className="nav-link">Todo App</Link>
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
          <Route path="/create" component={CreateTodo} />
          <Route path="/finder" component={StockFinder} />
          <Route path="/todoEdit" component={TodoApp} />
          <Route path="/Stock" component={Stock} />

        </div>
      </Router>
    );
  }
}

export default App;