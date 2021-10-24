import React from 'react';

const Country = ({ country }) => {
    let countryName = country.officialName.replace(/\s/g, '-');
    return(
        <tr>
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