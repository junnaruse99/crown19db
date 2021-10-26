import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clientAxios from '../../config/axios';

const City = ({ city }) => {
    // If city name are two or more words, use a '-' as a separator

    const history = useHistory();
    const handleRowClick = () => {
        history.push('/city/' + city.id);
    }

    return(
        <tr onClick={handleRowClick} className='modelrow'>
        <th scope="row">{city.id}</th>
        <td>{city.name}</td>
        <td>{city.latitude}</td>
        <td>{city.longitude}</td>
        <td>{city.population.toLocaleString("en-US")}</td>
        <td>{city.country.commonName}</td>
        </tr>
    )
}
 
export default City;