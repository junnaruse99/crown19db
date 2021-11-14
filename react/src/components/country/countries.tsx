import React, { useState, useEffect } from 'react';
import Country from './country';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import './countries.css'

const Countries = () => {

    interface Country {
        id: number;
        area: number;
        officialName: string;
        population: number;
        continent: string;
        flag: string;
        capital: City;
    }

    interface City {
        name: string;
    }
    const [msg, setMsg] = useState('');
    const [countries, setCountries] = useState<Country[]>();
    const [currentCountries, setCurrentCountries] = useState<Country[]>();

    const getCountries = async () => {
        try {
            const response = await clientAxios.get<Country[]>('/v1/models/country/all/reduced' )
                .then(response => {
                    setCountries(response.data)
                    setCurrentCountries(response.data.slice(0, 12))
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }

    useEffect(() => {
        getCountries();
    }, []);

    const handlePageClick = (data) => {
        if (countries) {
            setCurrentCountries(countries.slice(data.selected*12, data.selected*12 + 12))
        }
    }

    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                (countries && currentCountries) ?                 
                <>
                    <div className="row">
                        <h2>Countries</h2>
                        <div className="option_container">
                            <div className='select_con card border-0 text-center'>
                                <label>Filter by Continent</label>
                                <select>
                                    <option value='' selected>---</option>
                                    <option value=''>Africa</option>
                                    <option value=''>Antarctica</option>
                                    <option value=''>Asia</option>
                                    <option value=''>Europe</option>
                                    <option value=''>North America</option>
                                    <option value=''>Oceania</option>
                                    <option value=''>South America</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Filter by Population</label>
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
                                    <option value=''>Name (A-Z)</option>
                                    <option value=''>Name (Z-A)</option>
                                    <option value=''>Population (Asc)</option>
                                    <option value=''>Population (Desc)</option>
                                    <option value=''>Land Mass (Asc)</option>
                                    <option value=''>Land Mass (Desc)</option>
                                </select>
                            </div>
                        </div>
                    </div><br />
                    <div className="row-grid">
                        {currentCountries? currentCountries.map( country => (    
                            <Country 
                            key={country.id}
                            country={country} 
                            />
                        )) : <div className="spinner-border">Loading</div>}
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
                            pageCount={countries.length/12}
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
 
export default Countries;