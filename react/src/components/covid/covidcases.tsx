import React from 'react';
import Covid from './covid';

const CovidCases = () => {
    const covidcases = require('../../covid.json');
    return ( 
        <div className='container'>
        <h2>Covid Entry</h2>
        <table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Number of cases</th>
                <th scope="col">Number of deaths</th>
                <th scope="col">Number of recovers</th>
                <th scope="col">Country with most cases</th>
                </tr>
            </thead>
            <tbody>
                {covidcases.map( covid => (    
                    <Covid 
                    key={covid.Date}
                    covid={covid} 
                    />
                ))}
            </tbody>
        </table>
        </div>
    )
}
 
export default CovidCases;