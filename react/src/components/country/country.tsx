import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Country = ({ country }) => {
    let capitalName = country.Capital.replace(/\s/g, '-');
    let countryName = country.name.replace(/\s/g, '-');

    const history = useHistory();
    const handleRowClick = () => {
        history.push("/country/"+ countryName);
    }

    return(
        <tr onClick={handleRowClick} style={{'cursor': 'pointer'}}>
        <th scope="row">{country.id}</th>
        <td>{country.officialName}</td>
        <td>{country.area}</td>
        <td>{country.population}</td>
        <td>{country.region}</td>
        <td>{country.subregion}</td>
        </tr>
    )
}
 
export default Country;