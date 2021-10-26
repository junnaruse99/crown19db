import React from 'react';
import { Link } from 'react-router-dom';

const CovidDate = ({ covid }) => {
    
    return(
        <tr>
        <td>{covid.date.slice(0,10)}</td>
        <td>{covid.totalCases.toLocaleString("en-US")}</td>
        <td>{covid.totalDeaths.toLocaleString("en-US")}</td>
        <td>{covid.totalRecovered.toLocaleString("en-US")}</td>
        </tr>
    )
}
 
export default CovidDate;