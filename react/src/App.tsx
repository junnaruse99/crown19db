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
import CountryTimeline from './components/covid/countryTimeline';
import GlobalSearch from './components/search/GlobalSearch';
import ourVisualizations from './components/visualizations/ourVisualizations';
import TheirVisualizations from './components/visualizations/theirVisualizations';
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
        <Route exact path="/crown19db/" component={Splash} />
        <Route exact path="/crown19db/about" component={About} />
        <Route exact path="/crown19db/country" component={Countries} />
        <Route exact path="/crown19db/city" component={City} />
        <Route exact path="/crown19db/covid" component={CovidCases} />
        <Route exact path="/crown19db/country/:id" children={<CountryInstance />} />
        <Route exact path="/crown19db/city/:id" children={<CityInstance />} />
        <Route exact path="/crown19db/covid/:country_id" children={<CountryTimeline />} />
        <Route exact path="/crown19db/search" component={GlobalSearch} />
        <Route exact path="/crown19db/ourVis" component={ourVisualizations} />
        <Route exact path="/crown19db/ATWVis" component={TheirVisualizations} />
      </div>
      </Switch>
    </Router>
  );
}
