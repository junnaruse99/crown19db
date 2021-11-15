import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChild, faMountain } from '@fortawesome/free-solid-svg-icons';
import SearchableText from '../search/SearchableText';

const Country = ({ country, q }) => {

    const history = useHistory();
    const handleCardClick = () => {
        history.push("/country/"+ country.id);
    }

    // TODO : fix the css, is super ugly
    return(
        <div className='card modelrow' onClick={handleCardClick} style={{alignItems: "center", width: "250px", height: "auto", padding: "10px"}}>
            <img className='card-img-top img-card-grid' style={{width: "125px", height: "75px"}} src={country.flag} alt='Country flag'/>
            <h5 className='card-title text-center mt-6' style={{fontSize: "17px"}}>
                <SearchableText q={q}>
                    {country.officialName}
                </SearchableText>
            </h5>
            <div className='card-body'>
                <div className='row' style={{width: "270px"}}>
                    <div className='col-6 d-flex justify-content-around'>
                        <FontAwesomeIcon icon={faChild}/>
                        <span className='font-weight-bold' style={{fontSize: "14px"}}>{country.population.toLocaleString("en-US")}</span>
                    </div>
                    <div className='col-6 d-flex justify-content-around'>
                        <FontAwesomeIcon icon={faMountain}/>
                        <span className='font-weight-bold' style={{fontSize: "14px"}}>{country.area.toLocaleString("en-US")} km<sup>2</sup></span>
                    </div>
                </div><br />
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>Continent: </p>
                        <p style={{fontSize: "14px"}}>
                            <SearchableText q={q}>
                                {country.continent}
                            </SearchableText>
                        </p>
                    </div>
                </div>
                <div className='row' style={{width: "250px"}}>
                    <div className='col-12 d-flex justify-content-around'>
                        <p style={{fontSize: "14px"}}>Capital: </p>
                        <p style={{fontSize: "14px"}}>
                            <SearchableText q={q}>
                                {country.city ? country.city.name : 'None'}
                            </SearchableText>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Country;