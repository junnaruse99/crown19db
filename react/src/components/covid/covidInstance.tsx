import React from 'react'
import { useParams } from 'react-router-dom';
import CardRow from './cardRow';
import { Link } from 'react-router-dom';

const CovidInstance = () => {
    const covidcases = require('../../covid.json');
    let { date } = useParams();
    date = date.replace(/-/g, '/');
    let covid;

    // Find date
    for (let i = 0; i < covidcases.length; i++) {
        if (date === covidcases[i].Date) {
            covid = covidcases[i];
        }
    }

    return (
        <div className='container'>
            {covid ? (
                <div className="row justify-content-center">
                    <div className="card">
                        <h2 className="text-center text-uppercase font-weigh-bold mb-0">{date}</h2>
                        <div className="card-body">
                            <p className="card-text">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                        <th scope="row">Number of cases</th>
                                        <td>{covid.Cases}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Number of deaths</th>
                                        <td>{covid.Deaths}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Number of recovers</th>
                                        <td>{covid.Recovered}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Countries with most cases</th>
                                        <td><Link to={"/country/" + covid['Country-cases'][0].replace(/\s/g, '-')}>{covid['Country-cases']}</Link></td>
                                        </tr>
                                        {covid.Deaths === '0'  || (covid['Country-deaths'] && covid['Country-deaths'].length === 0) ? (
                                            <tr>
                                                <th scope="row">Countries with most deaths</th>
                                                <td>{covid['Country-deaths']}</td>
                                            </tr>
                                        ) : null}
                                        {covid.Recovered === '0'  || (covid['Country-recovered'] && covid['Country-recovered'].length === 0) ? (
                                            <tr>
                                                <th scope="row">Countries with most recovers</th>
                                                <td>{covid['Country-recovered']}</td>
                                            </tr>
                                        ) : null}
                                        {covid.Cases === '0'  || (covid['Country-recovered'] && covid['Country-recovered'].length === 0) ? (
                                            <tr>
                                                <th scope="row">States with most cases</th>
                                                <td>{covid['State-cases']}</td>
                                            </tr>
                                        ) : null}
                                        {covid.Deaths === '0'  || (covid['State-deaths'] && covid['State-deaths'].length === 0) ? (
                                            <tr>
                                                <th scope="row">States with most deaths</th>
                                                <td>{covid['State-deaths']}</td>
                                            </tr>
                                        ) : null}
                                        {covid.Recovered === '0'  || (covid['State-recovered'] && covid['State-recovered'].length === 0) ? (
                                            <tr>
                                                <th scope="row">States with most recovers</th>
                                                <td>{covid['State-recovered']}</td>
                                            </tr>
                                        ) : null}
                                    </tbody>
                                </table>
                            </p>
                        </div>
                    </div>
                </div>
            ) : <h2>This page is under construction</h2>} 
        </div>
    )
}
 
export default CovidInstance;