import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Covid = ({ covid }) => {
    let day = covid.date.slice(0, 10).replace(/-/g, '/');
    let countryName = covid.country.replace(/\s/g, '-');
    const history = useHistory();
    const handleRowClick = () => {
        history.push("/covid/" + countryName);
    }
    
    return(
        <tr onClick={handleRowClick} style={{'cursor': 'pointer'}}>
        <th scope="row"><Link to={"/covid/" + countryName}>{covid.country}</Link></th>
        <td>{covid.confirmed}</td>
        <td>{covid.deaths}</td>
        <td>{covid.recovered}</td>
        <td>{day}</td>
        <td><Link to={"country/" + covid.country.replace(/\s/g, '-')}>{covid.country}</Link></td>
        <td><Link to={"city/" + "CAPITAL"}>{"CAPITAL"}</Link></td>
        </tr>
    )
}
 
export default Covid;