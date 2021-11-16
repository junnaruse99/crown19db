import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import SearchableText from '../search/SearchableText';

const Covid = ({ covid, q }) => {
    const history = useHistory();

    const handleRowClick = () => {
        history.push("/covid/" + covid.country_id);
    }
    
    return(
        <tr onClick={handleRowClick} className='modelrow'>
        <th scope="row">{covid.id}</th>
        <td>
            <SearchableText q={q}>
                {covid.country.officialName}
            </SearchableText>
        </td>
        <td>
            <SearchableText q={q}>
                {covid.cases.toLocaleString("en-US")}
            </SearchableText>
        </td>
        <td>
            <SearchableText q={q}>
                {covid.deaths.toLocaleString("en-US")}
            </SearchableText>
        </td>
        <td>
            <SearchableText q={q}>
                {covid.recovered.toLocaleString("en-US")}
            </SearchableText>
        </td>
        <td>
            <SearchableText q={q}>
                {covid.lastCovidCase.slice(0,10)}
            </SearchableText>
        </td>
        </tr>
    )
}
 
export default Covid;