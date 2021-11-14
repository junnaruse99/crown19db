import React, { useState, useEffect } from 'react';
import City from './city';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import "./cities.css";

const Cities = () => {

    interface City {
        country: Country;
        country_id: number;
        id: number;
        name: string;
        population: number;
        latitude: number;
        longitude: number;
    }

    interface Country {
        commonName: string;
    }

    const [msg, setMsg] = useState('');
    const [cities, setCities] = useState<City[]>();
    const [currentCities, setCurrentCities] = useState<City[]>();

    const getCities = async () => {
        try {
            let response = await clientAxios.get<City[]>('/v1/models/city/all' )
                .then(response => {
                    setCities(response.data);
                    setCurrentCities(response.data.slice(0, 10));
                });
        } catch (error) {
            setMsg('There was an error with finding cities');
        }
    }

    useEffect(() => {
        getCities();
    }, []);

    const handlePageClick = (data) => {
        if (cities) {
            setCurrentCities(cities.slice(data.selected*10, data.selected*10+10))
        }
    }
    
    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                (cities && currentCities) ?                 
                <>
                    <div className="row">
                        <h2>Cities</h2>
                        <div className="option_container">
                            <div className='select_con card border-0 text-center'>
                                <label>Filter by Continent</label>
                                <select>
                                    <option value='' selected>---</option>
                                    <option value='Africa'>Africa</option>
                                    <option value='Antarctica'>Antarctica</option>
                                    <option value='Asia'>Asia</option>
                                    <option value='Europe'>Europe</option>
                                    <option value='North America'>North America</option>
                                    <option value='Oceania'>Oceania</option>
                                    <option value='South America'>South America</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Filter by Population</label>
                                <select>
                                    <option value='' selected>---</option>
                                    <option value='range1'>&#60; 500K</option>
                                    <option value='range2'>500K - 1M</option>
                                    <option value='range3'>1M - 5M</option>
                                    <option value='range4'>5M - 10M</option>
                                    <option value='range5'>10M - 25M</option>
                                    <option value='range6'>25M - 50M</option>
                                    <option value='range7'>50M - 100M</option>
                                    <option value='range8'>100M - 200M</option>
                                    <option value='range9'>&#62; 200M</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Sort by</label>
                                <select>
                                    <option value='' selected>---</option>
                                    <option value='Name'>Name</option>
                                    <option value='Population'>Population</option>
                                    <option value='Land Mass'>Land Mass</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="table_container"><br />
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Latitude</th>
                                    <th scope="col">Longitude</th>
                                    <th scope="col">Population</th>
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
                </> : <Loading />
            )}
        </div>
    )
}
 
export default Cities;