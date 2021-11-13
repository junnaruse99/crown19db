import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Country from './country';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import SearchBar from '../search/SearchBar';

const Countries = (props: any) => {

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

    const { search } = useLocation();
    const { q } = queryString.parse(search);

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
                    <SearchBar defaultValue={q}/>
                    <br />
                    <div className="row">
                        <h2>Countries</h2>
                    </div>
                    <div className="row-grid">
                        {currentCountries? currentCountries.map( country => (    
                            <Country 
                                country={country} 
                                key={country.id}
                                q={q}
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