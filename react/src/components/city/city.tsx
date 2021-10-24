import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const City = ({ city }) => {
    // If city name are two or more words, use a '-' as a separator
    let cityName = city.Name.replace(/\s/g, '-');

    const history = useHistory();
    const handleRowClick = () => {
        history.push('/city/' + cityName);
    }

    return(
        <tr onClick={handleRowClick} style={{'cursor': 'pointer'}}>
        <th scope="row">{city.id}</th>
        <td><Link to={'/city/' + cityName}>{city.Name}</Link></td>
        <td>{city.Latitude}</td>
        <td>{city.Longitude}</td>
        <td>{city.Population}</td>
        <td>{city['Time zone']}</td>
        <td><Link to={"/country/"+ city['country/province/state']}>{city['country/province/state']}</Link></td>
        </tr>
    )
}
 
export default City;