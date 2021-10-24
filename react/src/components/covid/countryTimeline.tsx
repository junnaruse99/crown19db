import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import CovidDate from './covidDate';
import { Chart} from "react-google-charts";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { NumberArray } from 'd3';


const CountryTimeline = () => {
    let { country } = useParams();
    if (country === "US"){
        country = "United-States"
    }
    const covidcases = require('../../' + country + 'CovidTimeline.json');
    country = country.replace(/-/g, ' ');

    const [currentCovidCases, setCurrentCovidCases] = useState(covidcases.slice(0, 9));

    const handlePageClick = (data) => {
        setCurrentCovidCases(covidcases.slice(data.selected*9, data.selected*9+9))
    }

    return ( 
        <div className='container'>
            <div className="row">
            <h2>{country} Covid Timeline</h2>
                <table className="grid">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Cases daily</th>
                        <th scope="col">Deaths daily</th>
                        <th scope="col">Recovered Daily</th>
                        <th scope="col">Total cases then</th>
                        <th scope="col">Total deaths then</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCovidCases.map( covidDate => (    
                            <CovidDate
                            key={covidDate.timelines}
                            date={covidDate} 
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


 
export default CountryTimeline;