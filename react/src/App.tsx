import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter, Link } from 'react-router-dom';
import About from "./components/About"
import FirstComponent from './FirstComponent';
import Splash from './components/splash';
import Countries from './components/country/countries';
import City from './components/city/city';
import Covid from './components/covid/covid';
import Navbar from './components/layout/navbar';

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
        <Navbar />
        <Route exact path="/" component={Splash} />
        <Route exact path="/about" component={About} />
        <Route exact path="/countries" component={Countries} />
        <Route exact path="/city" component={City} />
        <Route exact path="/covid" component={Covid} />
      </div>
    </Router>
  );
}
