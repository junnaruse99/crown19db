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
import CountryInstance from '../components/country/countryInstance';
import City from '../components/city/city';
import CityInstance from '../components/city/cityInstance';
import Covid from '../components/covid/covid'
import CardRow from '../components/covid/cardRow';
import CovidDate from '../components/covid/covidDate';
import CovidTimeline from '../components/covid/countryTimeline';
import Navbar from '../components/layout/navbar';
import SimpleMap from '../components/map/SimpleMap';
import LocaleInfo from '../components/localeInfo/localeInfo';
import Loading from '../components/layout/Loading';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: () => ({
            pathname: "/"
        }) 
    }), 
    useParams: () => ({

    })
}));

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
describe ("Render Non-model Components", () => {
    test('Splash section render', () => {
        const levelOne = shallow(<App />);
        expect(levelOne).toMatchSnapshot();
    });
    
    test('About section render', () => {
        const levelOne = shallow(<About />);
        expect(levelOne).toMatchSnapshot();
    
    });
    test('Navbar test', () => {
        const levelOne = shallow(<Navbar 
                                
                                />);
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
    
    test('Loading test', () => {
        const levelOne = shallow(
            <Loading />);
        expect(levelOne).toMatchSnapshot();
    });
});

describe ("Render Country components", () => {
    test('Singular Country snapshot test', () => {
        const dummyInfo = {
            id: 1,
            officialName: "United States",
            population: "329500000",
            flag: "https://www.countryflags.io/us/flat/64.png",
            area: "3797000",
            continent: "North America"
        }
        const levelOne = shallow(
            <Country
                country={dummyInfo}
                q={"Mexico"}
            />);
        expect(levelOne).toMatchSnapshot();
    });
    test('Country Instance snapshot test', () => {
        const levelOne = shallow(<CountryInstance />);
        expect(levelOne).toMatchSnapshot();
    })
});

describe ("Render City Components", () => {
    test('Singular City snapshot test', () => {
        const dummyInfo = {
            id: 2,
            name: "Mexico City",
            latitude: "19.4326",
            longitude: "-99.1332",
            population: "12,294,193",
            country: "Mexico"}
        const levelOne = shallow(
            <City
                city={dummyInfo}
                q=''
            />);
        expect(levelOne).toMatchSnapshot();
    });
    test('City Model section render', () => {
        const levelOne = shallow(<CityInstance />);
        expect(levelOne).toMatchSnapshot();
    });
});

describe ("Render Covid Components", ()=> {
    test('Covid test', () => {
        const dummyInfo={"cases":1203429,
                        "deaths":24066,
                        "country":"Canada",
                        "lastCovidCase":"2021-04-27T00:00:00.000Z",
                        "population":75750184,
                        "recovered":1099133,
                        "country_id":61,
                        "id":33}
        const levelOne = shallow(
            <Covid 
                covid={dummyInfo}
                q={null}
            />);
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
    
    test('CovidDate test', () => {
        const dummyInfo={"totalCases":51621,
                    "totalDeaths":3559,
                    "country":"Canada",
                    "date":"2020-04-27T00:00:00.000Z",
                    "totalRecovered":18268}
    
        const levelOne = shallow(
            <CovidDate 
                covid={dummyInfo}
            />);
        expect(levelOne).toMatchSnapshot();
    });

    test ('Covid Timeline snapshot test', () => {
        const levelOne = shallow(<CovidTimeline />);
        expect(levelOne).toMatchSnapshot();
    });
    
});


