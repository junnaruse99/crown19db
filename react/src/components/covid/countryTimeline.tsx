import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import CovidDate from './covidDate';
import { Chart} from "react-google-charts";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { NumberArray } from 'd3';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import CovidGraph from '../covidGraph/covidGraph';
import LocaleInfo from '../localeInfo/localeInfo';
import { countReset } from 'console';
import City from '../city/city';

const CountryTimeline = () => {

    interface CovidInstance {
        country: Country;
        country_id: number;
        date: string;
        id: number;
        totalCases: number;
        city: City;
    }

    interface City {
        name: string;
        id: number;
    }

    interface Country {
        commonName: string;
    }

    let { country_id } = useParams();

    const [covid, setCovid] = useState<CovidInstance[]>();
    const [currentCovid, setCurrentCovid] = useState<CovidInstance[]>();
    const [msg, setMsg] = useState('');

    const getCovid = async () => {
        try {
            const response = await clientAxios.get<CovidInstance[]>(`/v1/models/covidInstance/country_id=${country_id}`)
                .then(response => {
                    setCovid(response.data)
                    setCurrentCovid(response.data.slice(0, 10))
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }

    useEffect(() => {
        getCovid();
    }, []);

    //add connection to city and country
    // try catch for countries that are not found
    
    const handlePageClick = (data) => {
        if (covid) {
            setCurrentCovid(covid.slice(data.selected*10, data.selected*10+10))
        }
    }

    return ( 
        <div className='container'>
            {msg ? (<h3>{msg}</h3>) : (
                (covid && currentCovid) ? 
                <>
                    <div className="row">
                        <div className='col-12 col-md-4 mb-2'> 
                            <h2>{covid[0].country.commonName} Covid Timeline</h2>
                        </div>
                        <div className='col-12 col-md-4 mb-2'> 
                            <a href={"/country/" + country_id} className="btn btn-primary btn-lg active w-100" role="button" aria-pressed="true">{covid[0].country.commonName}'s General Info</a>
                        </div>
                        {covid[0].city ? (
                            <div className='col-12 col-md-4 mb-2'> 
                                <a href={"/city/" + covid[0].city.id} className="btn btn-primary btn-lg active w-100" role="button" aria-pressed="true">{covid[0].city.name}'s General Info</a>
                            </div>
                        ) : null}
                        
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Cases daily</th>
                                <th scope="col">Deaths daily</th>
                                <th scope="col">Recovered Daily</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCovid.map( covidDate => (    
                                    <CovidDate
                                    key={covidDate.id}
                                    covid={covidDate} 
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        {"There are " + covid.length + " covid dates"}
                    </div>
                    {/* Pagination css is in index.css */}
                    <div className="row d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={covid.length/10}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={4}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'pagination-active'}
                        />
                    </div>
                    <div><br />
                        <CovidGraph location = {covid[0].country.commonName}/>
                    </div>
                    <div><br />
                            <LocaleInfo
                                location={covid[0].country.commonName}
                                showNews={true}
                                showTests={false}/>
                        </div>
                </>: <Loading />
            )}
        </div>
    )
}


 
export default CountryTimeline;