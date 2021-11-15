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

    const { q, page, perPage } = queryString.parse(props.location.search);

    var currentPageNum = Number(page ? page : 1);
    var currentPerPage = Number(perPage ? perPage : 12);

    const getCities = async () => {
        try {
            var params: any = queryString.parse(props.location.search);
            if (q != null) params.q = q;
            params.page = currentPageNum;
            params.perPage = currentPerPage;
            var uri = '/v1/models/city?' + queryString.stringify(params);
            const response = await clientAxios.get<CityResponse>(uri)
                .then(response => {
                    setData(response.data);
                });
        } catch (error) {
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
    
    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                data ?
                <>
                    <div className="row">
                        <h2>Cities</h2>
                        <SearchBar
                            defaultValue={q}
                            type={"cities"}
                        >
                        </SearchBar>
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
                                    <option value=''>City Name (A-Z)</option>
                                    <option value=''>City Name (Z-A)</option>
                                    <option value=''>Country Name (A-Z)</option>
                                    <option value=''>Country Name (Z-A)</option>
                                    <option value=''>Population (Asc)</option>
                                    <option value=''>Population (Desc)</option>
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
 
export default Cities;