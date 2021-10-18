import React, { useState } from 'react';
import City from './city';
import ReactPaginate from 'react-paginate';

const Cities = () => {
    const {cities} = require('../../city.json');

    const [currentCities, setCurrentCities] = useState(cities.slice(0, 9));

    const handlePageClick = (data) => {
        setCurrentCities(cities.slice(data.selected*9, data.selected*9+9))
    }
    
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
                        {currentCities.map( city => (    
                            <City 
                            key={city.id}
                            city={city} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                {"There are " + cities.length + " cities"}
            </div>
            {/* Pagination css is in index.css */}
            <div className="row d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    pageCount={cities.length/10}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={4}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'pagination-active'}
                />
            </div>
        </div>
    )
}
 
export default Cities;