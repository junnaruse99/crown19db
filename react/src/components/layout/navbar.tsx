import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [collapseClass, handleCollapeClass] = useState('collapse');

    const handleClick = () => {
        if (collapseClass === 'collapse') {
            handleCollapeClass('')
        } else {
            handleCollapeClass('collapse')
        }
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className='container'>
                <Link to='/' className="navbar-brand">CovidDB</Link>
                <button onClick={handleClick} className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={collapseClass + " navbar-collapse"}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link onClick={handleClick} to='/crown19db/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={handleClick} to='/crown19db/about' className="nav-link">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={handleClick} to='/crown19db/country' className="nav-link">Country</Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={handleClick} to='/crown19db/city' className="nav-link">City</Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={handleClick} to='/crown19db/covid' className="nav-link">Covid</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link onClick={handleClick} to='/crown19db/ourVis' className="nav-link">Visualizations</Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={handleClick} to='/crown19db/ATWVis' className="nav-link">Provider Visualizations</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar;