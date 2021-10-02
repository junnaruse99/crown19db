import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='container'>
                <Link to='/' className="navbar-brand" href="#">CovidDB</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='about' className="nav-link" href="#">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/countries' className="nav-link" href="#">Country</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/city' className="nav-link" href="#">City</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/covid' className="nav-link" href="#">Covid</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar;