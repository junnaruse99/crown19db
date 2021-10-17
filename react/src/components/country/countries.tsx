import React from 'react';
import Country from './country';
import ReactPaginate from 'react-paginate';

const Countries = () => {
    const {countries} = require('../../country.json');

    const handlePageClick = (data) => {
        console.log('click' + data)
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
            <div className="row d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    pageCount={20}
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