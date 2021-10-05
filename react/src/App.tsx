import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter, Link } from 'react-router-dom';
import About from "./components/about/About"
import Splash from './components/splash/splash';
import Countries from './components/country/countries';
import City from './components/city/cities';
import CovidCases from './components/covid/covidcases';
import Navbar from './components/layout/navbar';
import CountryInstance from './components/country/countryInstance';
import CityInstance from './components/city/cityInstance';
import CovidInstance from './components/covid/covidInstance';
require('dotenv').config();

function Index() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default function App() {
  // May have to run "sudo apt install node-typescript" 
  // and "npm link typescript"
  // https://blog.logrocket.com/using-typescript-with-react-tutorial-examples/

  return (
    <Router>
      <Switch>
      <div>
        <Navbar />
        <Route exact path="/" component={Splash} />
        <Route exact path="/about" component={About} />
        <Route exact path="/country" component={Countries} />
        <Route exact path="/city" component={City} />
        <Route exact path="/covid" component={CovidCases} />
        <Route exact path="/country/:countryName" children={<CountryInstance />} />
        <Route exact path="/city/:cityName" children={<CityInstance />} />
        <Route exact path="/covid/:date" children={<CovidInstance />} />
      </div>
      </Switch>
    </Router>
  );
}
