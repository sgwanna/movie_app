import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="PageNav">
                <Link to="/yts">YTS</Link>
                <Link to="/boxOffice">BOX OFFICE</Link>
            </div>
        );
    }
}

export default Header;
