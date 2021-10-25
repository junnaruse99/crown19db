import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SimpleMap from '../map/SimpleMap';
import LocaleInfo from '../localeInfo/localeInfo';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';

const CountryInstance = () => {

    interface Country {
        id: number;
        area: number;
        coatOfArms: string;
        commonName: string;
        officialName: string;
        continent: string;
        flag: string;
        latitude: string;
        longitude: string;
        maps: string;
        population: number;
        region: string;
        subregion: string;
        timezone: TimeZone[];
        currency: Currency[];
        language: Language[];
        city: City;
    }   

    interface City {
        id: number;
        name: string;
    }

    interface TimeZone {
        zone: string;
    }

    interface Currency {
        zone: string;
    }

    interface Language {
        zone: string;
    }

    let { id } = useParams();

    const [country, setCountry] = useState<Country>();
    const [msg, setMsg] = useState('');

    // Get city from api
    const getCountry = async () => {
        try {
            const response = await clientAxios.get<Country>(`/api/v1/models/country/id=${id}`)
                .then(response => {
                    setCountry(response.data)
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }

    useEffect(() => {
        getCountry();
    }, []);

    return (
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : 
                country ? (
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <div className="card">
                                <h2 className="text-center text-uppercase font-weigh-bold mb-0">{country.officialName}</h2>
                                {country.flag ? (
                                    <img className="card-img-top" src={country.flag} alt={country.commonName} />
                                ) : null}
                                {country.coatOfArms ? (
                                    <img className="card-img-top" src={country.coatOfArms} alt={country.commonName} />
                                ) : null}
                                <div className="card-body">
                                    <p className="card-text">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">Area</th>
                                                <td>{country.area}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Population</th>
                                                <td>{country.population}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Region</th>
                                                <td>{country.region}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Subregion</th>
                                                <td>{country.subregion}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Capital</th>
                                                <td><Link to={"/city/"+ country.city.id}>{country.city.name}</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <a href={"/covid/" + country.id} className="btn btn-primary btn-lg active w-100" role="button" aria-pressed="true">{country.commonName}'s Covid Data</a>
                                    </p>
                                </div>
                            </div><br /><br />
                        </div>
                        <div className="col-md-8 col-12">
                            <SimpleMap info={{center:{lat:parseFloat(country.latitude), lng:parseFloat(country.longitude)}, zoom:4}}/>
                        </div>
                        <div><br /><br />
                            <LocaleInfo
                                location={country.commonName}
                                showNews={true}
                                showTests={false}/>
                        </div>
                    </div>
                ) : <Loading />}
        </div>
    )
}
 
export default CountryInstance;