import React from 'react';
import { Link } from 'react-router-dom';

const CovidDate = ({ covid }) => {
    
    return(
        <tr>
        <td>{covid.date.slice(0,10)}</td>
        <td>{covid.totalCases}</td>
        <td>{covid.totalDeaths}</td>
        <td>{covid.totalRecovered}</td>
        </tr>
    )
}
 
export default CovidDate;