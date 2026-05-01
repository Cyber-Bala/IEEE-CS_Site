import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-wrap">
            <Navbar />
            <div className="notfound-content">
                <h1 className="notfound-title">404</h1>
                <h2 className="notfound-subtitle">Page Not Found</h2>
                <p className="notfound-desc">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn-primary-gold">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
