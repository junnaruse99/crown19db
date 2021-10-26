import React from 'react';
import countries from './splashAssets/countries.jpg'
import covid from './splashAssets/covid.jpg'
import cities from './splashAssets/cities.jpg'
import Card from 'react-bootstrap/Card';
import LocaleInfo from '../localeInfo/localeInfo';
import './splash.css';

const Splash = () => {
    return ( 
        <div className= "container">
            <h1>Welcome to CovidDB</h1>
            <h5> An extensive database tracking Covid-19 information on a day-to-day basis in the scope of countries and cities.</h5>
            <p></p>
            <p>Select the information you are after today.</p>
            <div className="container">
                <div className='row'>
                    <div className='col-12 col-md-4 mb-2'> 
                        <Card className='w-100 h-100'>
                            <a className="card-block stretched-link text-decoration-none" href="/country">
                            <Card.Img className="splash-card-image" variant="top" src={countries} />
                            <Card.Body>
                                <Card.Title>Countries</Card.Title>
                                <Card.Text>
                                    Find the most relevant information on all Countries.
                                </Card.Text>
                            </Card.Body>
                            </a>
                        </Card>
                    </div>
                    <div className='col-12 col-md-4 mb-2'> 
                        <Card className='mb-2 w-100 h-100'>
                            <a className="card-block stretched-link text-decoration-none" href="/city">
                            <Card.Img className="splash-card-image" variant="top" src={cities} />
                            <Card.Body>
                                <Card.Title>Cities</Card.Title>
                                <Card.Text>
                                    Find the most relevant information on any City around the world.
                                </Card.Text>
                            </Card.Body>
                            </a>
                        </Card>
                    </div>
                    <div className='col-12 col-md-4 mb-2'> 
                        <Card className='mb-2 w-100 h-100'>
                        <a className="card-block stretched-link text-decoration-none" href="/covid">
                            <Card.Img className="splash-card-image" variant="top" src={covid} />
                            <Card.Body>
                                <Card.Title>Covid</Card.Title>
                                <Card.Text>
                                    Look at a timeline of Covid cases and other statistics.
                                </Card.Text>
                            </Card.Body>
                        </a>
                        </Card>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <LocaleInfo
                        location={'near by'}
                        showNews={true}
                        showTests={false}/>
                    </div>
                    <div className='col-12 col-md-6'>
                        <LocaleInfo
                        location={'near by'}
                        showNews={false}
                        showTests={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Splash;