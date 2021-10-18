import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';


// References: 
// https://testing-library.com/docs/queries/about/
// https://jestjs.io/docs/snapshot-testing
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
