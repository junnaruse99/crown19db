import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CovidDate = ({ date }) => {
    let { country } = useParams();
    // let date = covid.Date.replace(/\//g, '-');
    let day = date.date.slice(0, 10).replace(/-/g, '/');
    
    return(
        <tr>
        <td><Link to={"covid/" + day.replace(/\//g, '-')}>{day}</Link></td>
        <td>{date.confirmed_daily}</td>
        <td>{date.deaths_daily}</td>
        <td>{date.recovered_daily}</td>
        <td>{date.confirmed}</td>
        <td>{date.deaths}</td>
        </tr>
    )
}
 
export default CovidDate;