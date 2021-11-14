import React, { useState, useEffect } from 'react';
import Covid from './covid';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import './covidcases.css'

const CovidCases = () => {

    interface CovidCases {
        country: Country;
        id: number;
        cases: number;
        deaths: string;
        recovered: number;
        country_id: number;
        lastCovidCase: string;
    }

    interface Country {
        commonName: string;
    }

    const [msg, setMsg] = useState('');
    const [covidCases, setCovidCases] = useState<CovidCases[]>();
    const [currentCovid, setCurrentCovid] = useState<CovidCases[]>();

    const getCovidCases = async () => {
        try {
            const response = await clientAxios.get<CovidCases[]>('/v1/models/covid/all' )
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
                        <h2>Country Covid Data</h2><br /><br /><br />
                        <div className="option_container">
                            <div className='select_con card border-0 text-center'>
                                <label>Filter by # of Cases</label>
                                <select>
                                    <option value='' selected>---</option>
                                    <option value=''>&#60; 500K</option>
                                    <option value=''>500K - 1M</option>
                                    <option value=''>1M - 5M</option>
                                    <option value=''>5M - 10M</option>
                                    <option value=''>10M - 25M</option>
                                    <option value=''>25M - 50M</option>
                                    <option value=''>50M - 100M</option>
                                    <option value=''>100M - 200M</option>
                                    <option value=''>&#62; 200M</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Filter by # of Deaths</label>
                                <select>
                                    <option value='' selected>---</option>
                                    <option value=''>&#60; 500K</option>
                                    <option value=''>500K - 1M</option>
                                    <option value=''>1M - 5M</option>
                                    <option value=''>5M - 10M</option>
                                    <option value=''>10M - 25M</option>
                                    <option value=''>25M - 50M</option>
                                    <option value=''>50M - 100M</option>
                                    <option value=''>100M - 200M</option>
                                    <option value=''>&#62; 200M</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Filter by # of Recovered</label>
                                <select>
                                    <option value='' selected>---</option>
                                    <option value=''>&#60; 500K</option>
                                    <option value=''>500K - 1M</option>
                                    <option value=''>1M - 5M</option>
                                    <option value=''>5M - 10M</option>
                                    <option value=''>10M - 25M</option>
                                    <option value=''>25M - 50M</option>
                                    <option value=''>50M - 100M</option>
                                    <option value=''>100M - 200M</option>
                                    <option value=''>&#62; 200M</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Sort by</label>
                                <select>
                                    <option value='' selected>---</option>
                                    <option value=''>Country Name (A-Z)</option>
                                    <option value=''>Country Name (Z-A)</option>
                                    <option value=''># of Cases (Asc)</option>
                                    <option value=''># of Cases (Desc)</option>
                                    <option value=''># of Deaths (Asc)</option>
                                    <option value=''># of Deaths (Desc)</option>
                                    <option value=''># of Recoveries (Asc)</option>
                                    <option value=''># of Recoveries (Desc)</option>
                                </select>
                            </div>
                        </div>

                        <div style={{width: '100%', overflow:'scroll', overflowX: 'auto', overflowY: "auto"}}><br />
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
                    </div>
                    <div className="row">
                        {"There are " + covidCases.length + " countries"}
                    </div>
                    {/* Pagination css is in index.css */}
                    <div className="row d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={covidCases.length/10}
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