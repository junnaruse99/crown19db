import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Covid from './covid';
import ReactPaginate from 'react-paginate';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import './covidcases.css'
import SearchBar from '../search/SearchBar';

const CovidCases = (props: any) => {

    interface CovidCases {
        country: Country;
        id: number;
        cases: number;
        deaths: string;
        recovered: number;
        country_id: number;
        lastCovidCase: string;
    }

    interface CovidCasesResponse {
        count: number;
        data: CovidCases[];
    }

    interface Country {
        commonName: string;
    }

    const [msg, setMsg] = useState('');
    const [covidCases, setCovidCases] = useState<CovidCases[]>();
    const [currentCovid, setCurrentCovid] = useState<CovidCases[]>();
    const [data, setData] = useState<CovidCasesResponse>();

    const history = useHistory();

    const { q, page, perPage, sort } = queryString.parse(props.location.search);

    var currentPageNum = Number(page ? page : 1);
    var currentPerPage = Number(perPage ? perPage : 12);

    const getCovidCases = async () => {
        try {
            var params: any = queryString.parse(props.location.search);
            if (q != null) params.q = q;
            if (sort != null) params.sort = sort;
            params.page = currentPageNum;
            params.perPage = currentPerPage;
            var uri = '/v1/models/covid?' + queryString.stringify(params);
            const response = await clientAxios.get<CovidCasesResponse>(uri)
                .then(response => {
                    setData(response.data);
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }

    useEffect(() => {
        getCovidCases();
    }, []);

    const handlePageClick = (data) => {
        var params: any = queryString.parse(props.location.search);
        params.page = data.selected + 1;
        params.perPage = currentPerPage;
        var uri = '?' + queryString.stringify(params);
        console.log('uri = ' + uri);
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
                        <h2>Country Covid Data</h2><br /><br /><br />
                        <SearchBar
                            defaultValue={q}
                            type={"country covid data"}
                        />
                        <div className="option_container">
                            <div className='select_con card border-0 text-center'>
                                <label>Filter by # of Cases</label>
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
                                <label>Filter by # of Deaths</label>
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
                                <label>Filter by # of Recovered</label>
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
                                    <option value='' selected>---</option>
                                    <option value='country'>Country Name (A-Z)</option>
                                    <option value='-country'>Country Name (Z-A)</option>
                                    <option value='cases'># of Cases (Asc)</option>
                                    <option value='-cases'># of Cases (Desc)</option>
                                    <option value='deaths'># of Deaths (Asc)</option>
                                    <option value='-deaths'># of Deaths (Desc)</option>
                                    <option value='recovered'># of Recoveries (Asc)</option>
                                    <option value='-recovered'># of Recoveries (Desc)</option>
                                </select>
                            </div>
                        </div>

                        <div style={{width: '100%', overflow:'scroll', overflowX: 'auto', overflowY: "auto"}}><br />
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Number of cases</th>
                                    <th scope="col">Number of deaths</th>
                                    <th scope="col">Number of recovered</th>
                                    <th scope="col">Last updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.map( covid => (
                                        <Covid
                                            covid={covid}
                                            key={covid.id}
                                            q={q}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
 
export default CovidCases;