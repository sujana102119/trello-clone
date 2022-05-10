import React from 'react';
import './Header.css';

function Header(props) {

    const { title } = props;

    return (
        <div className="header">
            <h1 className="title">{title}</h1>
            <button className="signOut">Sign Out</button>
        </div>
    )
}

export default Header;