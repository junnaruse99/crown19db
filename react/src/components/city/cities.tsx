import React from 'react';
import City from './city';

const Cities = () => {
    const {cities} = require('../../city.json');
    return ( 
        <div className='container'>
            <div className="row">
                <h2>Cities</h2>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Population</th>
                        <th scope="col">Time Zone</th>
                        <th scope="col">Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map( city => (    
                            <City 
                            key={city.id}
                            city={city} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <h3>{"There are " + cities.length + " cities"}</h3>
            </div>
        </div>
    )
}
 
export default Cities;