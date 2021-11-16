import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchableText from '../search/SearchableText';

const City = ({ city, q }) => {
    // If city name are two or more words, use a '-' as a separator

    const history = useHistory();
    const handleRowClick = () => {
        history.push('/city/' + city.id);
    }

    return(
        <tr onClick={handleRowClick} className='modelrow'>
        <th scope="row">{city.id}</th>
        <td>
            <SearchableText q={q}>
                {city.name}
            </SearchableText>
        </td>
        <td>
            <SearchableText q={q}>
                {city.country.officialName}
            </SearchableText>
        </td>
        <td>{city.population != null ? city.population.toLocaleString("en-US") : "No data"}</td>
        <td>{city.latitude}</td>
        <td>{city.longitude}</td>
        </tr>
    )
}
 
export default City;