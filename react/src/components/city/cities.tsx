import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import City from './city';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import "./cities.css";
import SearchBar from '../search/SearchBar';

const Cities = (props: any) => {

    interface City {
        country: Country;
        country_id: number;
        id: number;
        name: string;
        population: number;
        latitude: number;
        longitude: number;
    }

    interface CityResponse {
        count: number;
        data: City[];
    }

    interface Country {
        commonName: string;
    }

    const [msg, setMsg] = useState('');
    const [data, setData] = useState<CityResponse>();

    const history = useHistory();

    const { q, page, perPage, sort, continent, population } = queryString.parse(props.location.search);

    var currentPageNum = Number(page ? page : 1);
    var currentPerPage = Number(perPage ? perPage : 12);

    const getCities = async () => {
        try {
            var params: any = queryString.parse(props.location.search);
            if (q != null) {
                if (/\d/.test(q + '')) { // if number has a comma, don't send comma to the API
                    params.q = (q + '').replaceAll(',', '');
                } else {
                    params.q = q;
                }
            }
            if (sort != null) params.sort = sort;
            if (continent != null) params.continent = continent;
            if (population != null) params.population = population;
            params.page = currentPageNum;
            params.perPage = currentPerPage;
            var uri = '/v1/models/city?' + queryString.stringify(params);
            const response = await clientAxios.get<CityResponse>(uri)
                .then(response => {
                    setData(response.data);
                })
                .catch(
                    error => {
                        if (error.response.status == 400) {
                            setMsg(error.response.data);
                            setData(undefined);
                        } else {
                            setMsg('404 Not Found');
                            console.log(error.response.data);
                            setData(undefined);
                        }
                    }
                );
        } catch (error) {
            console.log(error);
            setMsg('There was an error with finding cities');
        }
    }

    useEffect(() => {
        setData(undefined);
        getCities();
    }, [props]);

    const handlePageClick = (data) => {
        var params: any = queryString.parse(props.location.search);
        params.page = data.selected + 1;
        params.perPage = currentPerPage;
        var uri = '?' + queryString.stringify(params);
        console.log('uri = ' + uri);
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
                        <h2>Cities</h2>
                        <SearchBar
                            defaultValue={q}
                            location={props.location}
                            type={"cities"}
                        >
                        </SearchBar>
                        <div className="option_container">
                            <div className='select_con card border-0 text-center'>
                                <label>Filter by Continent</label>
                                <select id='continent' onChange={handleSortFilter.bind(this)} defaultValue={continent + ''}>
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
                                <select id='population' onChange={handleSortFilter.bind(this)} defaultValue={population + ''}>
                                    <option value='' selected>---</option>
                                    <option value='0-500000'>&#60; 500K</option>
                                    <option value='500000-1000000'>500K - 1M</option>
                                    <option value='1000000-5000000'>1M - 5M</option>
                                    <option value='5000000-10000000'>5M - 10M</option>
                                    <option value='10000000-25000000'>10M - 25M</option>
                                    <option value='25000000-50000000'>&#62; 25M</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Sort by</label>
                                <select id='sort' onChange={handleSortFilter.bind(this)} defaultValue={sort + ''}>
                                    <option value='' selected>---</option>
                                    <option value='name'>City Name (A-Z)</option>
                                    <option value='-name'>City Name (Z-A)</option>
                                    <option value='country'>Country Name (A-Z)</option>
                                    <option value='-country'>Country Name (Z-A)</option>
                                    <option value='population'>Population (Asc)</option>
                                    <option value='-population'>Population (Desc)</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="table_container"><br />
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Population</th>
                                    <th scope="col">Latitude</th>
                                    <th scope="col">Longitude</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.map( city => (
                                        <City 
                                            city={city}
                                            key={city.id}
                                            q={q}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        {"There are " + data.count + " cities"}
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
 
export default Cities;