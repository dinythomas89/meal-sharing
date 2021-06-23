import React from 'react';
import logo from '../logo.png';
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="logo" />
            <nav>
                {/*Links to different routes */}
                <ul className="nav-elements-container">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/meals">Meals</Link>
                    </li>
                    <li>
                        <Link to="/addMeal">Become a host</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;