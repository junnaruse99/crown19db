import React from 'react';
import { Link } from 'react-router-dom';

const City = ({ city }) => {
    // If city name are two or more words, use a '-' as a separator
    let cityName = city.Name.replace(/\s/g, '-');

    return(
        <tr>
        <th scope="row">{city.id}</th>
        <td><Link to={'/city/' + cityName}>{city.Name}</Link></td>
        <td>{city.Latitude}</td>
        <td>{city.Longitude}</td>
        <td>{city.Population}</td>
        <td>{city['Time zone']}</td>
        <td>{city['country/province/state']}</td>
        </tr>
    )
}
 
export default City;