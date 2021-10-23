import React from 'react';
import { Link } from 'react-router-dom';

const Covid = ({ covid }) => {
    let day = covid.date.slice(0, 10).replace(/-/g, '/');
    let countryName = covid.country.replace(/\s/g, '-');
    return(
        <tr>
        <th scope="row"><Link to={"/covid/" + countryName}>{covid.country}</Link></th>
        <td>{covid.confirmed}</td>
        <td>{covid.deaths}</td>
        <td>{covid.recovered}</td>
        <td>{day}</td>
        <td><Link to={"country/" + covid.country.replace(/\s/g, '-')}>{covid.country}</Link></td>
        <td><Link to={"city/" + "CAPITAL"}>{"CAPITAL"}</Link></td>
        </tr>
        // <tr>
        // <th scope="row"><Link to={"/covid/" + date}>{covid.Date}</Link></th>
        // <td>{covid.Cases}</td>
        // <td>{covid.Deaths}</td>
        // <td>{covid.Recovered}</td>
        // <td><Link to={"country/" + covid['Country-cases'][0].replace(/\s/g, '-')}>{covid['Country-cases']}</Link></td>
        // </tr>
    )
}
 
export default Covid;