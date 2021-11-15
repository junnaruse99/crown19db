import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import clientAxios from '../../config/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChild, faMountain } from '@fortawesome/free-solid-svg-icons';
import Loading from '../layout/Loading';
import Country from '../country/country';
import City from '../city/city';
import Covid from '../covid/covid';
import SearchBar from "./SearchBar";
import SearchableText from "./SearchableText";

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

interface CovidCases {
    country: Country;
    id: number;
    cases: number;
    deaths: number;
    recovered: number;
    country_id: number;
    lastCovidCase: string;
}

interface CovidCasesResponse {
    count: number;
    data: CovidCases[];
}

interface AllResponse {
    City: CityResponse;
    Country: CountryResponse;
    Covid: CovidCasesResponse;
}

const MAX_CARD_DISPLAY = 7;

export default function GlobalSearch(props: any) {

    const [msg, setMsg] = useState('');
    const [data, setData] = useState<AllResponse>();

    const { q, page, perPage } = queryString.parse(props.location.search);

    var currentPageNum = Number(page ? page : 1);
    var currentPerPage = Number(perPage ? perPage : 12);

    const getAll = async () => {
        try {
            var uri = '/v1/models/all' + props.location.search;
            const response = await clientAxios.get<AllResponse>(uri)
                .then(response => {
                    setData(response.data);
                });
        } catch (error) {
            setMsg('There was an error');
            console.log(error);
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    return ( 
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : (
                data ?
                <>
                    <div className="row">
                        <h2>CovidDB</h2>
                        <SearchBar
                            defaultValue={q}
                            type={"CovidDB"}
                        />
                    </div><br />

                    <h3>Countries</h3>
                    <CountrySearchResults
                        data={data}
                        moreRedirect={"/country" + props.location.search}
                        q={q}
                    />

                    <br />
                    <h3>Cities</h3>
                    <CitySearchResults
                        data={data}
                        moreRedirect={"/city" + props.location.search}
                        q={q}
                    />

                    <br />
                    <h3>Covid</h3>
                    <CovidSearchResults
                        data={data}
                        moreRedirect={"/covid" + props.location.search}
                        q={q}
                    />
                </> : <Loading />
            )}
        </div>
    )
}

function CountrySearchResults(props: any) {
    var data: any = props.data;
    var q: string = props.q;
    var moreRedirect: string = props.moreRedirect;

    if (data.Country.data.length == 0) {
        return <>No search results</>
    }
    
    return (
        <div className="row-grid">
        {   
            data.Country.data.length < 6
            ?   data.Country.data.map( country =>
                    <CountryCard
                        country={country}
                        q={q}
                    />
                )
            :   <>
                {
                    data.Country.data.slice(0, MAX_CARD_DISPLAY).map( country =>
                        <CountryCard
                            country={country}
                            q={q}
                        />
                    )
                }
                {
                    <CountryCard
                        redirect={moreRedirect}
                        redirectPrompt={
                            // "Click here to search $ more countries"
                            `Click here to search ${data.Country.count - MAX_CARD_DISPLAY} more countries`
                        }
                    />
                }
                </>
        }
        </div>
    );
}

function CitySearchResults(props: any) {
    var data: any = props.data;
    var q: string = props.q;
    var moreRedirect: string = props.moreRedirect;

    if (data.City.data.length == 0) {
        return <>No search results</>
    }

    return (
        <div className="row-grid">
        {
            data.City.data.length < 6
            ?   data.City.data.map( city =>
                <CityCard
                    city={city}
                    q={q}
                />
            )
            :   <>
                {
                    data.City.data.slice(0, MAX_CARD_DISPLAY).map( city =>
                        <CityCard
                            city={city}
                            q={q}
                        />
                    )
                }
                {
                    <CityCard
                        redirect={moreRedirect}
                        redirectPrompt={
                            // "Click here to search $ more cities"
                            `Click here to search ${data.City.count - MAX_CARD_DISPLAY} more cities`
                        }
                    />
                }
                </>
        }
        </div>
    );
}

function CovidSearchResults(props: any) {
    var data: any = props.data;
    var q: string = props.q;
    var moreRedirect: string = props.moreRedirect;

    if (data.Covid.data.length == 0) {
        return <>No search results</>;
    }

    return (
        <div className="row-grid">
        {
            data.Covid.data.length < 6
            ? data.Covid.data.map( covid =>
                <CovidCard
                    covid={covid}
                    q={q}
                />
            )
            :   <>
                {
                    data.Covid.data.slice(0, MAX_CARD_DISPLAY).map( covid =>
                        <CovidCard
                            covid={covid}
                            q={q}
                        />
                    )
                }
                <CovidCard
                    redirect={moreRedirect}
                    redirectPrompt={
                        // "Click here to search $ more country's covid data"
                        `Click here to search ${data.Covid.count - MAX_CARD_DISPLAY} more country's covid data`
                    }
                />
                </>
        }
        </div>
    );
}

function CountryCard(props: any) {
    var country: Country = props.country;
    var q: string = props.q;
    var redirect: string = props.redirect;
    var redirectPrompt: string = props.redirectPrompt;

    const history = useHistory();

    if (redirect != null) {
        const handleCardClick = () => {
            history.push(redirect);
        }

        return (
            <div className='card modelrow' onClick={handleCardClick} style={{alignItems: "center", width: "250px", height: "auto"}}>
                <div className='card-body' style={{display: "flex", alignItems: "center"}}>
                    <h5 className='card-title text-center mt-6' style={{fontSize: "17px"}}>
                        {redirectPrompt}
                    </h5>
                </div>
            </div>
        );
    }

    return (
        <Country 
            country={country}
            key={country.id}
            q={q}
        />
    );
}

function CityCard(props: any) {
    var city: City = props.city;
    var q: string = props.q;
    var redirect: string = props.redirect;
    var redirectPrompt: string = props.redirectPrompt;

    const history = useHistory();

    if (redirect != null) {
        const handleCardClick = () => {
            history.push(redirect);
        }

        return (
            <div className='card modelrow' onClick={handleCardClick} style={{alignItems: "center", width: "250px", height: "auto"}}>
                <div className='card-body' style={{display: "flex", alignItems: "center"}}>
                    <h5 className='card-title text-center mt-6' style={{fontSize: "17px"}}>
                        {redirectPrompt}
                    </h5>
                </div>
            </div>
        );
    }

    const handleCardClick = () => {
        history.push("/city/" + city.country_id);
    }

    return (
        <div className='card modelrow' onClick={handleCardClick} style={{alignItems: "center", width: "250px", height: "auto"}}>
            <br />
            <h5 className='card-title text-center mt-6' style={{fontSize: "17px"}}>
                <SearchableText q={q}>
                    {city.name}
                </SearchableText>
            </h5>
            <div className='card-body'>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>
                            Latitude: 
                        </p>
                        <p style={{fontSize: "14px"}}>
                            {city.latitude}
                        </p>
                    </div>
                </div>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>
                            Longitude: 
                        </p>
                        <p style={{fontSize: "14px"}}>
                            {city.longitude}
                        </p>
                    </div>
                </div>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>
                            Population
                        </p>
                        <p style={{fontSize: "14px"}}>
                            {city.population}
                        </p>
                    </div>
                </div>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>Country: </p>
                        <p style={{fontSize: "14px"}}>
                            <SearchableText q={q}>
                                {city.country.officialName}
                            </SearchableText>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CovidCard(props: any) {
    var covid: CovidCases = props.covid;
    var q: string = props.q;
    var redirect: string = props.redirect;
    var redirectPrompt: string = props.redirectPrompt;

    const history = useHistory();

    if (redirect != null) {
        const handleCardClick = () => {
            history.push(redirect);
        }

        return (
            <div className='card modelrow' onClick={handleCardClick} style={{alignItems: "center", width: "250px", height: "auto"}}>
                <div className='card-body' style={{display: "flex", alignItems: "center"}}>
                    <h5 className='card-title text-center mt-6' style={{fontSize: "17px"}}>
                        {redirectPrompt}
                    </h5>
                </div>
            </div>
        );
    }

    const handleCardClick = () => {
        history.push("/covid/" + covid.country_id);
    }

    return (
        <div className='card modelrow' onClick={handleCardClick} style={{alignItems: "center", width: "250px", height: "auto"}}>
            <br />
            <h5 className='card-title text-center mt-6' style={{fontSize: "17px"}}>
                <SearchableText q={q}>
                    {covid.country.officialName}
                </SearchableText>
            </h5>
            <div className='card-body'>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>
                            Number of cases: 
                        </p>
                        <p style={{fontSize: "14px"}}>
                            {covid.cases.toLocaleString("en-US")}
                        </p>
                    </div>
                </div>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>
                            Number of deaths: 
                        </p>
                        <p style={{fontSize: "14px"}}>
                            {covid.deaths.toLocaleString("en-US")}
                        </p>
                    </div>
                </div>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>
                            Number of recovered: 
                        </p>
                        <p style={{fontSize: "14px"}}>
                            {covid.recovered.toLocaleString("en-US")}
                        </p>
                    </div>
                </div>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>Last updated: </p>
                        <p style={{fontSize: "14px"}}>
                            {covid.lastCovidCase.slice(0,10)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
