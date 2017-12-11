import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {

  return (
    <footer id='footer'>
        <div className="pull-left footers">
            <button className="btn btn-default">
               <Link to="/create/campuses">Create Campus</Link>
            </button>
            <button className="btn btn-default">
                <Link to="/create/students">Create Student</Link>
            </button>
        </div>
    </footer>
  );
}

export default Footer;
