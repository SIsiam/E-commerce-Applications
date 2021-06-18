import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-dark ">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon rounded bg-light"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to="/shop">Shop</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/review">Order Review</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/inventory">Manage Inventory</Link>
                            </li>
                            <li class="nav-item">
                                <button className="btn btn-danger" onClick={() => setLoggedInUser({})}>Sign out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;