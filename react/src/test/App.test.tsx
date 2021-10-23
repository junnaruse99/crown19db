import React from 'react';
import { render, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import App from '../App';
import About from '../components/about/About';
import AllCountries from '../components/country/countries';
import CountryMedia from '../components/country/countryInstance';
import AllCities from '../components/city/cities';
import CityMedia from '../components/city/cityInstance';

configure({ adapter: new Adapter() });

// References: 
// https://testing-library.com/docs/queries/about/
// https://jestjs.io/docs/snapshot-testing
// https://enzymejs.github.io/enzyme/docs/api/shallow.html
// https://reactjs.org/docs/shallow-renderer.html
// https://gitlab.com/forbesye/fitsbits/-/tree/master/front-end/src/__tests__

/**
 * Simply expects the amount of times a particular piece of text 
 * should be on the screen. 
 * Read further from https://testing-library.com/docs/queries/about/
 * for more understanding on getBy... or getAllBy...
 **/
test('renders links', () => {
    render(<App />);
    const splashLink = screen.getAllByText(/CovidDB/i);
    expect(splashLink).toHaveLength(2);
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByText(/About us/i);
    expect(aboutLink).toBeInTheDocument();
    const countryModelLink = screen.getByText(/Country/i);
    expect(countryModelLink).toBeInTheDocument();
    const cityModelLink = screen.getAllByText(/City/i);
    expect(cityModelLink).toHaveLength(2);
    const covidModelLink = screen.getAllByText(/Covid/i);
    expect(covidModelLink).toHaveLength(6);
});

// https://enzymejs.github.io/enzyme/docs/api/shallow.html for shallow
// https://reactjs.org/docs/shallow-renderer.html for ShallowRenderer
// Probably prefer enzyme over ShallowRenderer
test('render component template', () => {
    // use ShallowRenderer to render a particular component
    const renderer = new ShallowRenderer();
    renderer.render(<About />);
    const output = renderer.getRenderOutput();

    // Or use shallow from enzyme for a particular component
    const wrapper = shallow(<About />);
    
});

// https://jestjs.io/docs/snapshot-testing
// on the first run of npm test, __snapshots__ is created
// and future runs of npm test will check against it
test('snapshot template', () => {
    
    //expect().toMatchSnapshot();
});

test('Splash section render', () => {
    const levelOne = shallow(<App />);
    expect(levelOne).toMatchSnapshot();
});

test('About section render', () => {
    const levelOne = shallow(<About />);
    expect(levelOne).toMatchSnapshot();

});

test('Country Model section render', () => {
    const levelOne = shallow(<AllCountries />);
    expect(levelOne).toMatchSnapshot();
});

test('Country Instance section render', () => {
    const levelOne = shallow(<CountryMedia />);
    expect(levelOne).toMatchSnapshot();
});

test('City Model section render', () => {
    const levelOne = shallow(<AllCities />);
    expect(levelOne).toMatchSnapshot();
});

test('City Instance section render', () => {
    const levelOne = shallow(<CityMedia />);
    expect(levelOne).toMatchSnapshot();
});

test('Navbar test', () => {
    const levelOne = shallow(<AllCities />);
    expect(levelOne).toMatchSnapshot();
});