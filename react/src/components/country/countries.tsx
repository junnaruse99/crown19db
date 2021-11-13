import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Country from './country';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import SearchBar from '../search/SearchBar';
import { isConditionalExpression } from 'typescript';

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

    interface CountryResponse {
        count: number;
        data: Country[];
    }

    interface City {
        name: string;
    }

    const [msg, setMsg] = useState('');
    const [countries, setCountries] = useState<Country[]>();
    const [currentCountries, setCurrentCountries] = useState<Country[]>();
    const [data, setData] = useState<CountryResponse>();

    const { search } = useLocation();
    const { q } = queryString.parse(search);

    const getCountries = async () => {
        try {
            console.log('calling api');
            // const response = await clientAxios.get<Country[]>('/v1/models/country/all/reduced' )
            //     .then(response => {
            //         console.log(response);
            //         setCountries(response.data)
            //         setCurrentCountries(response.data.slice(0, 12))
            //     });
            const response = await clientAxios.get<CountryResponse>('/v1/models/country')
                .then(response => {
                    // setCountries(response.data.data)
                    // setCurrentCountries(response.data.data)
                    console.log('response received:');
                    console.log(response.data);
                    setData(response.data);
                });
        } catch (error) {
            setMsg('There was an error');
            console.log(error);
        }
    }

    useEffect(() => {
        console.log('call getCountries()');
        getCountries();
    }, []);

    const handlePageClick = (data) => {
        // if (countries) {
        //     setCurrentCountries(countries.slice(data.selected*12, data.selected*12 + 12))
        // }
    }

    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                // (countries && currentCountries) ?
                (data) ?
                <>
                    <SearchBar defaultValue={q}/>
                    <br />
                    <div className="row">
                        <h2>Countries</h2>
                    </div>
                    <div className="row-grid">
                        { data ? data.data.map( country => (    
                            <Country 
                                country={country} 
                                key={country.id}
                                q={q}
                            />
                        )) : <div className="spinner-border">Loading</div>}
                    </div>
                    <div className="row">
                        {"There are " + data.count + " countries"}
                    </div>
                    {/* Pagination css is in index.css */}
                    <div className="row d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            // pageCount={countries.length/12}
                            pageCount={data.data.length/12}
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