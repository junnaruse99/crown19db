import React from 'react';
import { useHistory } from 'react-router-dom';

const Country = ({ country }) => {
    // let capitalName = country.Capital.replace(/\s/g, '-');
    let countryName = country.officialName.replace(/\s/g, '-');

    const history = useHistory();
    const handleRowClick = () => {
        history.push("/country/"+ countryName);
    }

    return(
        <tr onClick={handleRowClick} className='modelrow'>
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