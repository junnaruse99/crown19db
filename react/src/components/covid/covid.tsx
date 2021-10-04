import React from 'react';
import { Link } from 'react-router-dom';

const Covid = ({ covid }) => {
    let date = covid.Date.replace(/\//g, '-');
    return(
        <tr>
        <th scope="row"><Link to={"/covid/" + date}>{covid.Date}</Link></th>
        <td>{covid.Cases}</td>
        <td>{covid.Deaths}</td>
        <td>{covid.Recovered}</td>
        <td><Link to={"country/" + covid['Country-cases'][0].replace(/\s/g, '-')}>{covid['Country-cases']}</Link></td>
        </tr>
    )
}
 
export default Covid;