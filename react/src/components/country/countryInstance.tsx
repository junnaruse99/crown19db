import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SimpleMap from '../map/SimpleMap';

const CountryInstance = () => {
    const {countries} = require('../../country.json');
    let { countryName } = useParams();
    countryName = countryName.replace(/-/g, ' ');
    let country;

    // Find city
    for (let i = 0; i < countries.length; i++) {
        if (countryName === countries[i].name) {
            country = countries[i];
            console.log(country);
        }
    }

    return (
        <div className='container'>
            {country ? (
                <div className="row">
                    <div className="col-8">
                        <SimpleMap info={{center:{lat:parseFloat(country.Latitude), lng:parseFloat(country.Longitude)}, zoom:4}}/>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <h2 className="text-center text-uppercase font-weigh-bold mb-0">{countryName}</h2>
                            <img className="card-img-top" src={country.Flag} alt={country.name} />
                            <div className="card-body">
                                <p className="card-text">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                            <th scope="row">GDP</th>
                                            <td>{country.Gdp}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Population</th>
                                            <td>{country.Population}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Population Density</th>
                                            <td>{country['Population density']}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Area</th>
                                            <td>{country.Area}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Captial</th>
                                            <td><Link to={"/city/"+ country.Capital}>{country.Capital}</Link></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <a href={"/covid/" + countryName.replace(/ /g, '-')} className="btn btn-primary btn-lg active w-100" role="button" aria-pressed="true">{countryName}'s Covid Data</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <h2>This page is under construction</h2>} 
        </div>
    )
}
 
export default CountryInstance;