import React from 'react';
import Country from './country';

const Countries = () => {
    const {countries} = require('../../country.json');
    return ( 
        <div className='container'>
            <div className="row">
            <h2>Countries</h2>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">GDP</th>
                        <th scope="col">Population</th>
                        <th scope="col">Population density</th>
                        <th scope="col">Flag</th>
                        <th scope="col">Area</th>
                        <th scope="col">Capital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map( country => (    
                            <Country 
                            key={country.id}
                            country={country} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <h3>{"There are " + countries.length + " countries"}</h3>
            </div>
        </div>
    )
}
 
export default Countries;