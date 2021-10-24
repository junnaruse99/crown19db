import React from 'react';
import { render, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import * as Enzyme from 'enzyme'

import App from '../App';
import About from '../components/about/About';
import Country from '../components/country/country';
import AllCountries from '../components/country/countries';
import City from '../components/city/city';
import AllCities from '../components/city/cities';
import Covid from '../components/covid/covid';
import CovidCases from '../components/covid/covidcases';
import CovidDate from '../components/covid/covidDate';
import CardRow from '../components/covid/cardRow';
import CovidInstance from '../components/covid/covidInstance'
import Navbar from '../components/layout/navbar'
import SimpleMap from '../components/map/SimpleMap'
import LocaleInfo from '../components/localeInfo/localeInfo'

Enzyme.configure({ adapter: new Adapter() });

// References: 
// https://testing-library.com/docs/queries/about/
// https://jestjs.io/docs/snapshot-testing
// https://enzymejs.github.io/enzyme/docs/api/shallow.html
// https://reactjs.org/docs/shallow-renderer.html
// https://gitlab.com/forbesye/fitsbits/-/tree/master/front-end/src/__tests__

// // https://enzymejs.github.io/enzyme/docs/api/shallow.html for shallow
// // https://reactjs.org/docs/shallow-renderer.html for ShallowRenderer
// // Probably prefer enzyme over ShallowRenderer
// test('render component template', () => {
//     // use ShallowRenderer to render a particular component
//     const renderer = new ShallowRenderer();
//     renderer.render(<About />);
//     const output = renderer.getRenderOutput();

//     // Or use shallow from enzyme for a particular component
//     const wrapper = shallow(<About />);
    
// });

// // https://jestjs.io/docs/snapshot-testing
// // on the first run of npm test, __snapshots__ is created
// // and future runs of npm test will check against it
// test('snapshot template', () => {
    
//     //expect().toMatchSnapshot();
// });

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

test('Singular Country snapshot test', () => {
    const dummyInfo = {
        id: 1,
        name: "United States",
        Gdp: "20.94 Trillion Dollars as of 2020",
        Population: "329.5 million as of 2020",
        "Population density": "36 (P/Km²)",
        Flag: "https://www.countryflags.io/us/flat/64.png",
        Area: "3.797 million mi²",
        Map: "",
        Capital: "Washington DC",
        Latitude: "38.897957",
        Longitude: "-97.036560",
        Covid: "10/2/21"
    }
    const levelOne = shallow(
        <Country
            country={dummyInfo}
        />);
    expect(levelOne).toMatchSnapshot();
});

test('City Model section render', () => {
    const levelOne = shallow(<AllCities />);
    expect(levelOne).toMatchSnapshot();
});

test('Singular City snapshot test', () => {
    const dummyInfo = {
        id: 2,
        Name: "Mexico City",
        Latitude: "19.4326",
        Longitude: "-99.1332",
        Population: "12,294,193",
        Map: "",
        "Time zone": "America/Mexico City",
        "country/province/state": "Mexico",
        img: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i9EEQ2PmgRmI/v1/1200x937.jpg",
        covid: "10/2/21"
    }
    const levelOne = shallow(
        <City
            city={dummyInfo}
        />);
    expect(levelOne).toMatchSnapshot();
});

test('Covid Cases test', () => {
    const levelOne = shallow(<CovidCases />);
    expect(levelOne).toMatchSnapshot();
});

test('Card Row for Covid test', () => {
    const dummyInfo={name:"foo",
                     description:"bar",
                     condition:false,
                     Component:"null",
                     to:"h",
                     img:null}
    const levelOne = shallow(
        <CardRow 
            info={dummyInfo}
        />);
    expect(levelOne).toMatchSnapshot();
});

test('Navbar test', () => {
    const levelOne = shallow(<Navbar />);
    expect(levelOne).toMatchSnapshot();
});

test('Map component test', () => {
    const dummyInfo={center: 
                        {lat:100,
                         lng:100},
                     zoom:10}
    const levelOne = shallow(
        <SimpleMap 
            info={dummyInfo}
        />);
    expect(levelOne).toMatchSnapshot();
});

test('Locale information test', () => {
    const levelOne = shallow(
        <LocaleInfo
            location= "Brazil"
            showNews={true}
            showTests={false}
        />);
    expect(levelOne).toMatchSnapshot();
});
