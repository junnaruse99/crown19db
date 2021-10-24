import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SimpleMap from '../map/SimpleMap';
import LocaleInfo from '../localeInfo/localeInfo'
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import Cities from './cities';

const CityInstance = () => {
    let { id } = useParams();

    interface City {
        country: string;
        country_id: number;
        id: number;
        name: string;
        population: number;
        latitude: number;
        longitude: number;
    }
    
    // Find city
    const [city, setCity] = useState<City>();
    const [msg, setMsg] = useState('');

    // Get city from api
    const getCity = async () => {
        try {
            const response = await clientAxios.get<City>(`/api/v1/models/city/id=${id}`)
                .then(response => {
                    setCity(response.data)
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }

    useEffect(() => {
        getCity();
    }, []);


    return (
        <div className='container'>
            {msg ? (<h3> {msg} </h3>) : 
                city ? (
                    <div className="row align-items-center">
                        <div className="col-8">
                            <SimpleMap info={{center:{lat:city.latitude, lng:city.longitude}, zoom:11}}/>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <h2 className="text-center text-uppercase font-weigh-bold mb-0">{city.name}</h2>
                                <img className="card-img-top" src={''} alt={city.name}/>
                                <div className="card-body">
                                    <p className="card-text">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                <th scope="row">Latitude</th>
                                                <td>{city.latitude}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Longitude</th>
                                                <td>{city.longitude}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Population</th>
                                                <td>{city.population}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Country</th>
                                                <td><Link to={"/country/"+ city.country_id}>{city.country}</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <a href={"/covid/" + city.name.replace(/ /g, '-')} className="btn btn-primary btn-lg active w-100" role="button" aria-pressed="true">{city['country/province/state']}'s Covid Data</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <LocaleInfo
                                location={city.name}
                                showNews={true}
                                showTests={false}/>
                        </div>
                    </div>
                ) : <Loading />
            }
        </div>
    )
}
 
export default CityInstance;