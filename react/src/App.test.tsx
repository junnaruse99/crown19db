import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import About from './components/about/About';
import AllCountries from './components/country/countries';
import CountryRow from './components/country/country';
import CountryMedia from './components/country/countryInstance';
import AllCities from './components/city/cities';
import CityRow from './components/city/city';
import CityMedia from './components/city/cityInstance';


// References: 
// https://testing-library.com/docs/queries/about/
// https://jestjs.io/docs/snapshot-testing
// https://enzymejs.github.io/enzyme/docs/api/shallow.html
// https://reactjs.org/docs/shallow-renderer.html

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
test('snapshot template', () => {
    
});

test('About section render', () => {
    const levelOne = shallow(<About />);

});
