import React, { useState, useEffect } from 'react';
import Country from './country';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';

const Countries = () => {

    interface Country {
        id: number;
        area: number;
        officialName: string;
        population: number;
        region: string;
        subregion: string;
    }
    const [msg, setMsg] = useState('');
    const [countries, setCountries] = useState<Country[]>();
    const [currentCountries, setCurrentCountries] = useState<Country[]>();

    const getCountries = async () => {
        try {
            const response = await clientAxios.get<Country[]>('/api/v1/models/country/all/reduced' )
                .then(response => {
                    setCountries(response.data)
                    setCurrentCountries(response.data.slice(0, 10))
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
            setCurrentCountries(countries.slice(data.selected*10, data.selected*10 + 10))
        }
    }

    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                (countries && currentCountries) ?                 
                <>
                    <div className="row">
                    <h2>Countries</h2>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Area</th>
                            <th scope="col">Population</th>
                            <th scope="col">Region</th>
                            <th scope="col">Subregion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCountries? currentCountries.map( country => (    
                                <Country 
                                key={country.id}
                                country={country} 
                                />
                            )) : <div className="spinner-border">Loading</div>}
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
                </> :
                <>
                    <div className="text-center">
                        <div className="spinner-border" />
                        <div>Loading</div>
                    </div>
                </>
            )}
        </div>
    )
}
 
export default Countries;