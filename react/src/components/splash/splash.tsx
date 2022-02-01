import React from 'react';
import { useState, useEffect } from 'react';
import countries from './splashAssets/countries.jpg'
import covid from './splashAssets/covid.jpg'
import cities from './splashAssets/cities.jpg'
import Card from 'react-bootstrap/Card';
import LocaleInfo from '../localeInfo/localeInfo';
import SearchBar from '../search/SearchBar';
import './splash.css';

const Splash = (props: any) => {

    const onMouseOver = event => {
        const el = event.target;
        el.style.color = '#0000EE';
      };
      
      const onMouseOut = event => {
        const el = event.target;
        let black = "#000000";
        el.style.color = black;
      };

    return ( 
        <div className= "container">
            <h1>Welcome to CovidDB</h1>
            <h5> An extensive database tracking Covid-19 information on a day-to-day basis in the scope of countries and cities.</h5>
            <p></p>
            <SearchBar
                location={props.location}
                redirect={"/crown19db/search"}
                type={"for the information you are after today"}
            />
            <p>Select the information you are after today.</p>
            <div className="container">
                <div className='row'>
                    <div className='col-12 col-md-4 mb-2'> 
                        <Card className='w-100 h-100'>
                        <a className="card-block stretched-link card-link" href="/crown19db/country" onMouseEnter={event => onMouseOver(event)} onMouseOut={event => onMouseOut(event)}>
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
                            <a className="card-block stretched-link card-link" href="/crown19db/city" onMouseEnter={event => onMouseOver(event)} onMouseOut={event => onMouseOut(event)}>
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
                            <a className="card-block stretched-link card-link" href="/crown19db/covid" onMouseEnter={event => onMouseOver(event)} onMouseOut={event => onMouseOut(event)}>
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