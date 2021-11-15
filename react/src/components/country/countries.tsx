import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Country from './country';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import './countries.css'
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
    var location = useLocation().toString();

    const { q, page, perPage, sort } = queryString.parse(props.location.search);

    var currentPageNum = Number(page ? page : 1);
    var currentPerPage = Number(perPage ? perPage : 12);

    const getCountries = async () => {
        try {
            var params: any = queryString.parse(props.location.search);
            if (q != null) params.q = q;
            if (sort != null) params.sort = sort;
            params.page = currentPageNum;
            params.perPage = currentPerPage;
            var uri = '/v1/models/country?' + queryString.stringify(params);
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
<<<<<<< HEAD
        console.log('call getCountries()');
=======
        setData(undefined);
>>>>>>> 8db9041a0d0ebb9e026b055b12ba01fbaecb9e44
        getCountries();
    }, [props]);

    const handlePageClick = (data) => {
        var params: any = queryString.parse(props.location.search);
        params.page = data.selected + 1;
        params.perPage = currentPerPage;
        var uri = '?' + queryString.stringify(params);
        history.push(uri);
        history.go(uri);
    }

    const handleSort = (data) => {
        var params: any = queryString.parse(props.location.search);
        var uri = '?' + queryString.stringify(params);

        // Replace current sort parameter
        const sortIndex = uri.indexOf('sort');
        if (sortIndex >= 0) {
            uri = uri.substring(0, sortIndex);
        }
        
        if (data.target.value != '') {
            uri += uri.length == 1 ? 'sort=' + data.target.value : '&sort=' + data.target.value;
        }
        history.push(uri);
        history.go(uri);
    }

    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                data ?
                <>
                    <div className="row">
                        <h2>Countries</h2>
                        <SearchBar
                            defaultValue={q}
                            type={"countries"}
                        />
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
                                <select onChange={handleSort.bind(this)} defaultValue={sort}>
                                    <option value=''>---</option>
                                    <option value='officialName'>Name (A-Z)</option>
                                    <option value='-officialName'>Name (Z-A)</option>
                                    <option value='population'>Population (Asc)</option>
                                    <option value='-population'>Population (Desc)</option>
                                    <option value='area'>Land Mass (Asc)</option>
                                    <option value='-area'>Land Mass (Desc)</option>
                                </select>
                            </div>
                        </div>
                    </div><br />
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
                            forcePage={currentPageNum - 1}
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