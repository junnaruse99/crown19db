import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SimpleMap from '../map/SimpleMap';
import LocaleInfo from '../localeInfo/localeInfo'

const CityInstance = () => {
    const {cities} = require('../../city.json');
    let { cityName } = useParams();
    cityName = cityName.replace(/-/g, ' ');
    let city;

    // Find city
    for (let i = 0; i < cities.length; i++) {
        if (cityName === cities[i].Name) {
            city = cities[i];
            console.log(city);
        }
    }

    let date = city.covid.replace(/\//g, '-');

    return (
        <div className='container'>
            {city ? (
                <div className="row align-items-center">
                    <div className="col-8">
                        <SimpleMap info={{center:{lat:parseFloat(city.Latitude), lng:parseFloat(city.Longitude)}, zoom:11}}/>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <h2 className="text-center text-uppercase font-weigh-bold mb-0">{cityName}</h2>
                            <img className="card-img-top" src={city.img} alt={cityName}/>
                            <div className="card-body">
                                <p className="card-text">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                            <th scope="row">Latitude</th>
                                            <td>{city.Latitude}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Longitude</th>
                                            <td>{city.Longitude}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Population</th>
                                            <td>{city.Population}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Time zone</th>
                                            <td>{city["Time zone"]}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Country</th>
                                            <td><Link to={"/country/"+ city['country/province/state']}>{city['country/province/state']}</Link></td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Last date of covid case</th>
                                            <td><Link to={"/covid/"+ date}>{city.covid}</Link></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <LocaleInfo
                            location={cityName}
                            showNews={true}
                            showTests={false}/>
                    </div>
                </div>
            ) : <h2>This page is under construction</h2>} 
        </div>
    )
}
 
export default CityInstance;