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
        officialName: string;
    }

    const [msg, setMsg] = useState('');
    const [covidCases, setCovidCases] = useState<CovidCases[]>();
    const [currentCovid, setCurrentCovid] = useState<CovidCases[]>();
    const [data, setData] = useState<CovidCasesResponse>();

    const history = useHistory();

    const { q, page, perPage, sort, cases, deaths, recovered } = queryString.parse(props.location.search);

    var currentPageNum = Number(page ? page : 1);
    var currentPerPage = Number(perPage ? perPage : 12);

    const getCovidCases = async () => {
        try {
            var params: any = queryString.parse(props.location.search);
            if (q != null) params.q = q;
            if (sort != null) params.sort = sort;
            if (cases != null) params.cases = cases;
            if (deaths != null) params.deaths = deaths;
            if (recovered != null) params.recovered = recovered;
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
        setData(undefined);
        getCovidCases();
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
                        <h2>Country Covid Data</h2><br /><br /><br />
                        <SearchBar
                            defaultValue={q}
                            type={"country covid data"}
                        />
                        <div className="option_container">
                            <div className='select_con card border-0 text-center'>
                                <label>Filter by # of Cases</label>
                                <select id='cases' onChange={handleSortFilter.bind(this)} defaultValue={cases}>
                                    <option value='' selected>---</option>
                                    <option value='0-500000'>&#60; 500K</option>
                                    <option value='500000-1000000'>500K - 1M</option>
                                    <option value='1000000-5000000'>1M - 5M</option>
                                    <option value='5000000-10000000'>5M - 10M</option>
                                    <option value='10000000-25000000'>10M - 25M</option>
                                    <option value='25000000-99999999'>&#62; 25M</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Filter by # of Deaths</label>
                                <select id='deaths' onChange={handleSortFilter.bind(this)} defaultValue={deaths}>
                                    <option value='' selected>---</option>
                                    <option value='0-100'>&#60; 100</option>
                                    <option value='100-500'>100 - 500</option>
                                    <option value='500-1000'>500 - 1000</option>
                                    <option value='1000-5000'>1000 - 5000</option>
                                    <option value='5000-10000'>5000 - 10K</option>
                                    <option value='10000-50000'>10K - 50K</option>
                                    <option value='50000-100000'>50K - 100K</option>
                                    <option value='100000-500000'>100K - 500K</option>
                                    <option value='500000-999999'>&#62; 500K</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Filter by # of Recovered</label>
                                <select id='recovered' onChange={handleSortFilter.bind(this)} defaultValue={recovered}>
                                    <option value='' selected>---</option>
                                    <option value='0-500000'>&#60; 500K</option>
                                    <option value='500000-1000000'>500K - 1M</option>
                                    <option value='1000000-5000000'>1M - 5M</option>
                                    <option value='5000000-10000000'>5M - 10M</option>
                                    <option value='10000000-25000000'>10M - 25M</option>
                                    <option value='25000000-99999999'>&#62; 25M</option>
                                </select>
                            </div>

                            <div className='select_con card border-0 text-center'>
                                <label>Sort by</label>
                                <select id='sort' onChange={handleSortFilter.bind(this)} defaultValue={sort}>
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
 
export default CovidCases;