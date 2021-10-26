import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Covid = ({ covid }) => {
    const history = useHistory();

    const handleRowClick = () => {
        history.push("/covid/" + covid.country_id);
    }
    
    return(
        <tr onClick={handleRowClick} className='modelrow'>
        <th scope="row">{covid.id}</th>
        <td>{covid.country}</td>
        <td>{covid.cases}</td>
        <td>{covid.deaths}</td>
        <td>{covid.recovered}</td>
        <td>{covid.lastCovidCase.slice(0,10)}</td>
        </tr>
    )
}
 
export default Covid;