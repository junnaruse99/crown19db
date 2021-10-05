import React from 'react';
import Covid from './covid';

const CovidCases = () => {
    const covidcases = require('../../covid.json');
    return ( 
        <div className='container'>
            <div className="row">
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
                        {covidcases.slice(0, 3).map( covid => (    
                            <Covid 
                            key={covid.Date}
                            covid={covid} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <h3>{"There are " + covidcases.slice(0, 3).length + " covid dates"}</h3>
            </div>
        
        </div>
    )
}
 
export default CovidCases;