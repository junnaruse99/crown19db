import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter, Link } from 'react-router-dom';
import AboutPage from "./About"
import FirstComponent from './FirstComponent';

function Index() {
  return (
    <div>
      <h2>Home</h2>
      <FirstComponent />
    </div>
  );
}

export default function App() {
  // May have to run "sudo apt install node-typescript" 
  // and "npm link typescript"
  // https://blog.logrocket.com/using-typescript-with-react-tutorial-examples/

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
