import React from 'react';
import { Link } from 'react-router-dom';

const CovidDate = ({ covid }) => {
    
    return(
        <tr>
        <td>{covid.date}</td>
        <td>{covid.totalCases}</td>
        <td>{covid.totalDeaths}</td>
        <td>{covid.totalRecovered}</td>
        </tr>
    )
}
 
export default CovidDate;