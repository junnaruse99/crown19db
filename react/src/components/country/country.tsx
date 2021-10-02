import React from 'react';

const Country = ({ country }) => {
    return(
        <tr>
        <th scope="row">{country.id}</th>
        <td>{country.name}</td>
        <td>{country.Gdp}</td>
        <td>{country.Population}</td>
        <td>{country['Population density']}</td>
        <td><img src={country.Flag}/></td>
        <td>{country.Area}</td>
        <td>{country.Capital}</td>
        </tr>
    )
}
 
export default Country;