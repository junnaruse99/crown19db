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
        <td><Link to={"/country/"+ countryName}>{country.name}</Link></td>
        <td>{country.Gdp}</td>
        <td>{country.Population}</td>
        <td>{country['Population density']}</td>
        <td><img src={country.Flag} alt={country.name}/></td>
        <td>{country.Area}</td>
        <td><Link to={"/city/"+ capitalName}>{country.Capital}</Link></td>
        </tr>
    )
}
 
export default Country;