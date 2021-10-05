import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-5">
            <div className='container'>
                <Link to='/' className="navbar-brand">CovidDB</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/about' className="nav-link">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/country' className="nav-link">Country</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/city' className="nav-link">City</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/covid' className="nav-link">Covid</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar;