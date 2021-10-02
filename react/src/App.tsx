import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter, Link } from 'react-router-dom';
import Splash from './components/splash';
import Aboutus from './components/aboutus';
import Country from './components/country/country';
import City from './components/city/city';
import Covid from './components/covid/covid';
import Navbar from './components/layout/navbar';

function Index() {
  return <h2>Home</h2>;
}

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={Splash} />
        <Route exact path="/about" component={Aboutus} />
        <Route exact path="/country" component={Country} />
        <Route exact path="/city" component={City} />
        <Route exact path="/covid" component={Covid} />
      </div>
    </Router>
  );
}
