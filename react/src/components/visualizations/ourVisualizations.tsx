import React from 'react';
import { useState, useEffect } from 'react';
import countries from './splashAssets/countries.jpg'
import covid from './splashAssets/covid.jpg'
import cities from './splashAssets/cities.jpg'
import Card from 'react-bootstrap/Card';
import LocaleInfo from '../localeInfo/localeInfo';
import SearchBar from '../search/SearchBar';

const ourVisualizations = (props: any) => {
    return ( 
        <div className= "container">
            <h1>Covid DB Visualizations</h1>
            <h5> Here </h5>
        </div>
    )
}
 
export default ourVisualizations;
