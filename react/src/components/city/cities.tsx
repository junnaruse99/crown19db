import React, { useState, useEffect } from 'react';
import City from './city';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';

const Cities = () => {

    interface City {
        country: string;
        country_id: number;
        id: number;
        name: string;
        population: number;
        latitude: number;
        longitude: number;
    }

    const [msg, setMsg] = useState('');
    const [cities, setCities] = useState<City[]>();
    const [currentCities, setCurrentCities] = useState<City[]>();

    const getCities = async () => {
        try {
            let response = await clientAxios.get<City[]>('/api/v1/models/city/all' )
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