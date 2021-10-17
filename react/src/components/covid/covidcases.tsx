import React, { useState } from 'react';
import Covid from './covid';
import ReactPaginate from 'react-paginate';

const CovidCases = () => {
    const covidcases = require('../../covid.json');

    const [currentCovidCases, setCurrentCovidCases] = useState(covidcases.slice(0, 9));

    const handlePageClick = (data) => {
        setCurrentCovidCases(covidcases.slice(data.selected*9, data.selected*9+9))
    }

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
                        {currentCovidCases.map( covid => (    
                            <Covid 
                            key={covid.Date}
                            covid={covid} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                {"There are " + covidcases.length + " covid dates"}
            </div>
            {/* Pagination css is in index.css */}
            <div className="row d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    pageCount={covidcases.length/10}
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
 
export default CovidCases;