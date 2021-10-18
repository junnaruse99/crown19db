import React, { useState } from 'react';
import Country from './country';
import ReactPaginate from 'react-paginate';

const Countries = () => {
    const {countries} = require('../../country.json');

    const [currentCountries, setCurrentCountries] = useState(countries.slice(0, 9));

    const handlePageClick = (data) => {
        setCurrentCountries(countries.slice(data.selected*9, data.selected*9+9))
    }

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
                        {currentCountries.map( country => (    
                            <Country 
                            key={country.id}
                            country={country} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                {"There are " + countries.length + " countries"}
            </div>
            {/* Pagination css is in index.css */}
            <div className="row d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    pageCount={countries.length/10}
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
 
export default Countries;