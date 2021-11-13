import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
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
    const [data, setData] = useState<CountryResponse>();

    const history = useHistory();

    const { search } = useLocation();
    const { q } = queryString.parse(search);
    const { page, perPage } = queryString.parse(search);

    var currentPage = Number(page ? page : 1);
    var currentPerPage = Number(perPage ? perPage : 12);

    const getCountries = async () => {
        try {
            var uri = '/v1/models/country?'
            uri += `perPage=${currentPerPage}&`
            uri += `page=${currentPage}`
            const response = await clientAxios.get<CountryResponse>(uri)
                .then(response => {
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
        var uri = `/country?perPage=${currentPerPage}&page=${data.selected + 1}`;
        history.push(uri);
        history.go(uri);
    }

    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                data ?
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
                            pageCount={data.count/data.data.length}
                            forcePage={currentPage - 1}
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