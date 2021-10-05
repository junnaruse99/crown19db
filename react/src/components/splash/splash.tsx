import React from 'react';
import countries from './splashAssets/countries.jpg'
import covid from './splashAssets/covid.jpeg'
import cities from './splashAssets/cities.jpeg'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './splash.css';

const Splash = () => {
    return ( 
        <div className= "container">
            <h1>Welcome to CovidDB</h1>
            <h5> An extensive database tracking Covid-19 information on a day-to-day basis in the scope of countries and cities.</h5>
            <p></p>
            <p>Select the information you are after today.</p>
            <div className="container">
                <Row>
                    <Col> 
                        <Card style={{ width: '24rem', height: '24rem'} }>
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
                    </Col>
                    <Col> 
                        <Card style={{ width: '24rem', height: '24rem' }}>
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
                    </Col>
                    <Col> 
                        <Card style={{ width: '24rem', height: '24rem' }}>
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
                    </Col>
                </Row>
            </div>
        </div>
    )
}
 
export default Splash;