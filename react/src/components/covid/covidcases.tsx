import React, { useState, useEffect } from 'react';
import Covid from './covid';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';

const CovidCases = () => {

    interface CovidCases {
        country: string;
        id: number;
        cases: number;
        deaths: string;
        recovered: number;
        country_id: number;
        lastCovidCase: string;
    }

    const [msg, setMsg] = useState('');
    const [covidCases, setCovidCases] = useState<CovidCases[]>();
    const [currentCovid, setCurrentCovid] = useState<CovidCases[]>();

    const getCovidCases = async () => {
        try {
            const response = await clientAxios.get<CovidCases[]>('/api/v1/models/covid/all' )
                .then(response => {
                    setCovidCases(response.data)
                    setCurrentCovid(response.data.slice(0, 10))
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }

    useEffect(() => {
        getCovidCases();
    }, []);

    const handlePageClick = (data) => {
        if (covidCases) {
            setCurrentCovid(covidCases.slice(data.selected*10, data.selected*10+10))
        }
    }

    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                (covidCases && currentCovid) ?                 
                <>
                    <div className="row">
                    <h2>Country Covid Data</h2>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Country</th>
                                <th scope="col">Number of cases</th>
                                <th scope="col">Number of deaths</th>
                                <th scope="col">Number of recovered</th>
                                <th scope="col">Last updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCovid.map( covid => (    
                                    <Covid 
                                    key={covid.id}
                                    covid={covid} 
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        {"There are " + currentCovid.length + " covid dates"}
                    </div>
                    {/* Pagination css is in index.css */}
                    <div className="row d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={currentCovid.length/10}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={4}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'pagination-active'}
                        />
                    </div>
                </> : <Loading />
            )}
        </div>
    )
}
 
export default CovidCases;