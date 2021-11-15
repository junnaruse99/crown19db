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

    const { q, page, perPage, sort, continent, population } = queryString.parse(props.location.search);

    var currentPageNum = Number(page ? page : 1);
    var currentPerPage = Number(perPage ? perPage : 12);

    const getCountries = async () => {
        try {
            var params: any = queryString.parse(props.location.search);
            if (q != null) params.q = q;
            if (sort != null) params.sort = sort;
            if (continent != null) params.continent = continent;
            if (population != null) params.population = population;
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
        setData(undefined);
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

    const handleSortFilter = (data) => {
        const name = data.target.id;
        const value = data.target.value;

        var params: any = queryString.parse(props.location.search);
        var uri = '?' + queryString.stringify(params);
        uri = uri.replace(/page=\d\d*/, 'page=1');

        // Remove current parameter
        const index = uri.indexOf(name);
        const tmp1 = uri.substring(0, index);
        const tmp2 = uri.substring(index);
        if (index >= 0) {
            var andIndex = tmp2.indexOf('&');
            if (andIndex != -1) {
                andIndex += tmp1.length;
                uri = uri.substring(0, index) + uri.substring(andIndex);
            } else {
                uri = uri.substring(0, index);
            }
        }
        
        if (value != '') {
            uri += uri.length == 1 ? name + '=' + value : '&' + name + '=' + value;
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
                                <select id='continent' onChange={handleSortFilter.bind(this)} defaultValue={continent}>
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
                                <select id='population' onChange={handleSortFilter.bind(this)} defaultValue={population}>
                                    <option value='' selected>---</option>
                                    <option value='0-500000'>&#60; 500K</option>
                                    <option value='500000-1000000'>500K - 1M</option>
                                    <option value='1000000-5000000'>1M - 5M</option>
                                    <option value='5000000-10000000'>5M - 10M</option>
                                    <option value='10000000-25000000'>10M - 25M</option>
                                    <option value='25000000-50000000'>25M - 50M</option>
                                    <option value='50000000-100000000'>50M - 100M</option>
                                    <option value='100000000-200000000'>100M - 200M</option>
                                    <option value='200000000-999999999999'>&#62; 200M</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Sort by</label>
                                <select id='sort' onChange={handleSortFilter.bind(this)} defaultValue={sort}>
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
                            pageCount={data.count/12}
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