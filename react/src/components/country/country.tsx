import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChild, faMountain } from '@fortawesome/free-solid-svg-icons';

const Country = ({ country }) => {

    const history = useHistory();
    const handleCardClick = () => {
        history.push("/country/"+ country.id);
    }

    // TODO : fix the css, is super ugly
    return(
        <div className='card modelrow' onClick={handleCardClick}>
            <img className='card-img-top img-card-grid' src={country.flag} alt='Country flag'/>
            <h5 className='card-title text-center mt-6'>{country.officialName}</h5>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-around'>
                        <FontAwesomeIcon icon={faChild}/>
                        <span className='font-weight-bold'>
                            {country.population.toLocaleString("en-US")}
                        </span>
                    </div>
                    <div className='col-6 d-flex justify-content-around'>
                        <FontAwesomeIcon icon={faMountain}/>
                        <span className='font-weight-bold'>
                            {country.area.toLocaleString("en-US")}
                        </span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-around'>
                        <p>Country: </p>
                        <p>{country.continent}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-around'>
                        <p>Capital: </p>
                        <p>{country.city ? country.city.name : 'None'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Country;