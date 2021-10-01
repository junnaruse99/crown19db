import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter, Link } from 'react-router-dom';
import AboutPage from "./about.js"

function Index() {
  return <h2>Home</h2>;
}

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/" component={Index} />
        <Route exact path="/about" component={AboutPage} />
      </div>
    </Router>
  );
}
